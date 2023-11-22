var docTypeId = "";
var selectAppeals = [];
var frmName = "frmUploadDocment2";
var gblAppealCount = 0;
define({   
  stateCfg: { 
    // See also: "chatBpSpecs" in gblChatSpecs.js
    parentContainer: null,
    chatSpec: {},

  },

  setParentSize: function(flxContainer) {
    this.stateCfg.parentContainer = flxContainer;
    this.stateCfg.parentSize = { height: flxContainer.frame.height, width: flxContainer.frame.width };
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
  },
  onNavigate:function(params) {
    gblSettings(this);
    currentFlow = "Upload Document";
    if (params.docToUpload !== null && params.docToUpload !== undefined && params.docToUpload !== "") {
      delete params.docToUpload;
    }

    docTypeId = params.docTypeId;
	this.view.preShow = this.preShow; 
    this.view.snAppealToReschedule.reset();
	selectedAppeals = new Map();
    selectedAppeals2 = new Map();
    if (flowName === "Request Admin Appeal" || flowName === "Request - CR" || flowName === "MCP Denial Form") {
      this.view.flxContainerHeaderStep5.isVisible = false;
      this.view.lblNumberOfStep6.text = "3";
    }
    if (flowName === "Request Admin Appeal") {
      this.view.headerCancelRHearing.lblRequestCancelText = "Upload Admin Appeal";
    }
    if (flowName === "Request - CR") 
      this.view.headerCancelRHearing.lblRequestCancelText="Upload County Review Document";

    if (flowName === "MCP Denial Form") 
      this.view.headerCancelRHearing.lblRequestCancelText="Upload MCP Denial Document";

    if (flowName === "Exhibit - County") 
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Exhibit - County Document";
    
    if (flowName === "Appeal Summary") 
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Appeal Summary Document";


    if (flowName === "Compliance") {
      this.getListOfAssociatedAppealsByAppellantIdAndHatsUserIdAndDocType();
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Compliance Document";
      this.view.lblTextHeaderStep4.text="Select Compliance Document Type";
      this.view.lblTextHeaderStep5.text="Provide document to upload";
    } else
      this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType();
    this.view.headerCancelRHearing.onCancelClick = this.navigateOnCancel;
    this.view.fContinueBackButton.navigatingBFormsBack("frmAppealDetails");
    this.view.fContinueBackButton.btnContinueOnClick = this.navigateForward;
    this.view.fContinueBackButton.btnBackVisibility(false);

    this.view.miniBoxSelectedList.lblRescheduleSummaryHeaderText ="Selected Appeals";
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    if(gblIsARUser){
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } 
    else{
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);  
    }
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.params = params;
    addToFlow(this.view.id, this.view);
    this.view.onBreakpointChange = this.onBreakpointChange; 
    this.view.forceLayout();
  },
  preShow: function(eventobject){
	voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },  
  onBreakpointChange: function(form, width){
    try{
    amplify.publish("authorizedDash", form, width);
    this.view.navFooterBarPostLogin.breakPointChange(width);

    this.view.headerCancelRHearing.height = "35px";
    heightAdjust = 0;
    if(width <= gblBreakPoint){ 
      this.view.mainHeaderScreens.height ='130px'; 

      heightAdjust = (165/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";
    }
    else{
      this.view.mainHeaderScreens.height ='100px';   
      heightAdjust = (135/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";     
    }   

    this.view.flxGroupContent.height = kony.os.deviceInfo().screenHeight + "px";      								   
    this.view.flxContainerBody.height = "100%";

    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
    appealsSummaryLayoutDirection(this.view, width);
    this.view.forceLayout();
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  }, 

  navigateOnCancel:function() {
    var ntf;

    if (flowName === "MCP Denial Form" || flowName === "Exhibit - County" || flowName === "Appeal Summary" ||flowName === "Compliance") 
      ntf = new kony.mvc.Navigation("frmGeneralAppealDetails");
    if (flowName === "Request - CR" || flowName === "Request Admin Appeal") 
      ntf = new kony.mvc.Navigation("frmAppellantDash");
    if (flowName === "Upload Hearing Document") 
      ntf = new kony.mvc.Navigation("frmAppealDetails");
    if (flowName === "Upload Hearing Document" && gblIsARUser) 
      ntf = new kony.mvc.Navigation("frmGeneralAppealDetails");

    resetFlow();
    ntf.navigate();    
  },
  
  navigateForward:function() {

    var appealIds = selectedAppeals.size;
    if(appealIds === 0 || selectedAppeals.size === 0) {
      alert("Select one or more Appeals");
      return;
    }
    this.setDataForMiniBoxSelectedAppeals();
    
    if (flowName === "Compliance"){ 
      frmName = "frmUploadDocment11";
      gblComplianceDocumentTypes = [];
      gblAppealCount = 0;

      selectAppeals = [];

      selectedAppeals.forEach(function(val, key, map) {
        var appealId = val.appealId;
        if(appealId)
          selectAppeals.push(appealId.trim());
      });    
      ComplianceStatusPendReject = false;
      for (i = 0; i < selectAppeals.length; i++)  {
        if (ComplianceAppealIds.includes(selectAppeals[i], 0)){
           ComplianceStatusPendReject = true;
        }
        operationName = "getComplianceDocumentListByAppealIdAndHatsUserId";
        var data = {"appealId": selectAppeals[i],"hatsUserId": testHatsUserId};
        var headers = {};
        var serviceName = "appellantServices";
        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        integrationObj.invokeOperation(operationName, headers, data, this.getComplianceDocumentsListSuccess, this.getComplianceDocumentsListFailure);
      }
    }
    else {
      //SO-181: Steps numbered differently in Request - AA flow
      //this.view.flxContainerHeaderStep5.isVisible = true;
      //this.view.lblNumberOfStep6.text = "4";
      var ntf = new kony.mvc.Navigation(frmName);
      ntf.navigate(this.params); 
    }
  },

 
  getComplianceDocumentsListSuccess:function(response){
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errDocumentTypeList;
      response.userAction = apiActions.actionWait;
      navigateToErrorPage(response);  
    }
    else
    {
      if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
        response.errorStatus = response.errorStatus;
        response.userAction = apiActions.actionWait;
        navigateToErrorPage(response);  
      }      
      else 
      {      
        if(response !== undefined && response.availableComplianceDocuments !== undefined) {                   
          gblAppealCount++;
          if (response.availableComplianceDocuments.length < 3){
            gblComplianceDocumentTypes = response.availableComplianceDocuments; 
          }
          else
            {
              if (gblComplianceDocumentTypes.length !== 2){
                gblComplianceDocumentTypes = response.availableComplianceDocuments; 
              }
            }
        }
      }
      if (gblAppealCount === selectedAppeals.size) {
        var ntf = new kony.mvc.Navigation(frmName);
        ntf.navigate(this.params); 
      }
    }
  },

  getComplianceDocumentsListFailure:function(error){
  },    
    
  getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType:function(){
    operationName = "getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType";
    var data = {
      "appealId": gblSelectedAppealId, 
      "hatsUserId": testHatsUserId, 
      "docType": docTypeId
    };
    var headers = {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure);
  }, 

  getListOfAssociatedAppealsByAppellantIdAndHatsUserIdAndDocType:function(){
    operationName = "getListOfAssociatedAppealsByAppellantIdAndHatsUserIdAndDocType";
    var data = {
      "appellantId": gblSelectedAppealId, 
      "hatsUserId": testHatsUserId, 
      "docType": docTypeId
    };
    var headers = {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure);
  },  

  getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess:function(response){
    kony.print('Appeal List:'+JSON.stringify(response));
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errServerAppeals;
        response.userAction = apiActions.actionWait;
        navigateToErrorPage(response);  
      }
      else
      {
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.errorStatus = response.errorStatus;
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }         
        else 
        {      
          if(response.associatedAppealsWithDispositions !== null && response.associatedAppealsWithDispositions !== undefined) {
            var appealsWithDispositions = response.associatedAppealsWithDispositions;
			ComplianceAppealIds ="";
            for(var i = 0; i < appealsWithDispositions[0].associatedAppealsAndDispositions.length; i++) {
              var appeal = appealsWithDispositions[0].associatedAppealsAndDispositions[i];
              if (appeal.complicanceStatusCode !== undefined){
                if (appeal.complicanceStatusCode !== 'Rejected'){
                  selectedAppeals.set(appeal.appealNbr, appeal);
                  selectedAppeals2.set(appeal.appealNbr, appeal); 
                } 
              }
              else
              {
                selectedAppeals.set(appeal.appealNbr, appeal);
                selectedAppeals2.set(appeal.appealNbr, appeal);
              }
              if (appeal.complicanceStatusCode === 'Pending Reject') {
                 ComplianceAppealIds = ComplianceAppealIds + appeal.appealId + ",";
              }
            }

            if (flowName === "Upload Hearing Document") {
              var detail = appealsWithDispositions[0].errorStatus;
              if (detail !== null && detail !== undefined && detail.length > 0) {
                if (detail[0].errorMessage !== null && detail[0].errorMessage !== undefined && detail[0].errorMessage !== "") {
                  Object.assign(this.params, {"title": detail[0].errorMessage});
                }
              }        
            }
            

            
            this.view.snAppealToReschedule.setComponentDataForQuickLinksFlows();
            this.view.snAppealToReschedule.forceLayout();
            this.setDataForMiniBoxSelectedAppeals();
            this.view.miniBoxSelectedList.setData(this.params.dataForSelectedAppealsCard);
            this.view.miniBoxSelectedList.forceLayout();    
            this.view.forceLayout();
          }
        }
      }
    }
  },

  getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure:function(error){
    alert("No appeals and dispositions found for the input document type.");
    resetFlow();
    var ntf = new kony.mvc.Navigation("frmAppealDetails");
    ntf.navigate();
  },

  setDataForMiniBoxSelectedAppeals:function() {
    var data = [];
    selectedAppeals.forEach(function(value, key, map) {
      var row = {
        "lblProgram": value.portalProgramDesc,
        "lblOBName": "",
        "lblIssue": value.portalIssueCd,
        "lblAppealId": value.appealNbr
      };
      data.push(row);      
    });
    if (this.params.dataForSelectedAppealsCard) {
      delete this.params.dataForSelectedAppealsCard;
    }
    Object.assign(this.params, {"dataForSelectedAppealsCard": data});
  },

  displayProfileMenu:function() {
    displayProfileMenu(this.view);
  },

  selectProfileMenuItem:function() {
    selectProfileMenuItem(this.view);
  }, 
  
   
  onEnableChat: function() {
    gblSetEnableChat(this, true);
  },

  onDisableChat: function() {
    //gblSetEnableChat(this, false);
  },

  onClickChat: function() {
    if (this.view.chatbotFAQiframe.isConversationOpen()) {
      kony.print("????? >>>> CLICK closeChat");
      this.view.chatbotFAQiframe.closeChat();
      // Overlay -- position & size
      let overlaySpec = this.stateCfg.chatSpec.overlay.close;
      this.view.flxOverlayChat.bottom = 50 +'dp';
      this.view.flxOverlayChat.right = 30 + 'dp';
      this.view.flxOverlayChat.height = overlaySpec.h;
      this.view.flxOverlayChat.width = overlaySpec.w;
      // Chat iFrame - visibility
      let frameSpec = this.stateCfg.chatSpec.frame.close;
      this.view.chatbotFAQiframe.setVisibility(false);
      // Button 
      let buttonSpec = this.stateCfg.chatSpec.button.close;
      this.view.chatbotButton.right = 30+'dp';
      this.view.chatbotButton.bottom = 50+'dp';
    } else {
      kony.print("????? >>>> CLICK openChat");
      this.view.chatbotFAQiframe.openChat(this.onClickChat);
      // Overlay -- position & size
      let overlaySpec = this.stateCfg.chatSpec.overlay.open;
      this.view.flxOverlayChat.bottom = 50 +'dp';
      this.view.flxOverlayChat.right = 30 + 'dp';
      this.view.flxOverlayChat.height = overlaySpec.h;
      this.view.flxOverlayChat.width = overlaySpec.w;
      // Chat iFrame - size and visibility
      let frameSpec = this.stateCfg.chatSpec.frame.open;
      this.view.chatbotFAQiframe.setVisibility(true);
      this.view.chatbotFAQiframe.height = frameSpec.h;
      this.view.chatbotFAQiframe.width = frameSpec.w;
      this.view.chatbotFAQiframe.right = 30+'dp';
      this.view.chatbotFAQiframe.bottom = 0+'dp';
      // Button 
      let buttonSpec = this.stateCfg.chatSpec.button.open;
      this.view.chatbotButton.right = 30+'dp';
      this.view.chatbotButton.bottom = 50+'dp';
    }
    this.view.forceLayout();
  },   
});