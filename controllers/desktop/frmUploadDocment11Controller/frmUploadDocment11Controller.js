var docTypeId = "";
var reasonsKey= null;
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
    this.params = params;	
    if (params.docToUpload !== null && params.docToUpload !== undefined && params.docToUpload !== "") {
      delete params.docToUpload;
    }

    this.view.RadioButtonGroupCompliance.onSelection = this.onSelectProgramDescription;
 
    
    if(this.params.complianceType)
      this.view.RadioButtonGroupCompliance.selectedKey= this.params.complianceType;
	
    docTypeId = params.docTypeId;
    this.view.snComplianceAchievedDate.mysetAchievedDate(params.achievedDate);

    if (flowName === "Request Admin Appeal" || flowName === "Request - CR") {
      this.view.flxContainerHeaderStep5.isVisible = false;
      this.view.lblNumberOfStep6.text = "3";
    }
    if (flowName === "Request - CR") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload County Review Document";
    }
    
    if (flowName === "Compliance") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Compliance Document";
    }

    this.setComplianceDocumentTypes();
    this.view.headerCancelRHearing.onCancelClick = this.navigateOnCancel;
    this.view.fContinueBackButton.btnBackOnClick = this.navigateBack;
    this.view.fContinueBackButton.btnContinueOnClick = this.navigateForward;

    this.view.miniBoxSelectedList.lblRescheduleSummaryHeaderText ="Selected Appeals";
    if(params.dataForSelectedAppealsCard) {
      this.view.miniBoxSelectedList.setData(this.params.dataForSelectedAppealsCard);
    }
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
    this.view.preShow = this.preShow;
    
    this.view.forceLayout();
  },
  
  preShow:function(eventobject) {
    if(this.view.RadioButtonGroupCompliance.selectedKey === "4") {
      this.view.snComplianceAchievedDate.isVisible = this.view.RadioButtonGroupCompliance.selectedKey === "4";
      this.view.snComplianceAchievedDate.isVisibleAchieveCalendar = this.view.snComplianceAchievedDate.isVisible;
      this.view.snComplianceAchievedDate.isVisibleAchieveDate = this.view.snComplianceAchievedDate.isVisible;
    } else {
      this.view.snComplianceAchievedDate.isVisible = (this.view.RadioButtonGroupCompliance.selectedKey === "168" && ComplianceStatusPendReject === true);    
      this.view.snComplianceAchievedDate.isVisibleAchieveCalendar = this.view.snComplianceAchievedDate.isVisible;
      this.view.snComplianceAchievedDate.isVisibleAchieveDate = this.view.snComplianceAchievedDate.isVisible;
    }

	this.view.forceLayout();
    voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },
   
  navigateBack:function() {
    var ntf = new kony.mvc.Navigation("frmUploadDocment1");
    ntf.navigate(this.params);          
  },

  navigateOnCancel:function() {
    var ntf;
    if (flowName === "MCP Denial Form" || flowName === "Exhibit - County" || flowName === "Appeal Summary" || flowName === "Compliance") 
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

    if (!this.validateForm()) {
      return;
    }
    Object.assign(this.params, {"complianceType": this.reasonsKey});
    if ((this.reasonsKey === "4") || (this.reasonsKey === "168" && ComplianceStatusPendReject === true))// (this.view.RadioButtonGroupCompliance.selectedKey === "168" && ComplianceStatusPendReject === true))
    {
      Object.assign(this.params, {"achievedDate": this.view.snComplianceAchievedDate.myformattedDate()});
    }
    else
    {
      Object.assign(this.params, {"achievedDate": null});
    }

    this.view.flxContainerHeaderStep5.isVisible = true;
    this.view.lblNumberOfStep6.text = "4";
    this.setDataForMiniBoxSelectedAppeals();
    var ntf = new kony.mvc.Navigation("frmUploadDocment2");
    ntf.navigate(this.params);    
  },
  validateForm: function(){
    if (!this.reasonsKey) {
      alert('Please select Compliance Document Type.');
      return false;
    }
    if (this.view.snComplianceAchievedDate.isVisible === true)
    {
      let myformattedDate = this.view.snComplianceAchievedDate.myformattedDate();
      if ((myformattedDate === null) || (myformattedDate.length <= 0)) {
        alert("Please select the date this was achieved.");
        return false;
      }
    }
    else
    {
      this.view.snComplianceAchievedDate.myresetAchievedDateToPlaceholder();
    }
    
    return true;
  },
  onBreakpointChange: function(form, width) {
    try{
    amplify.publish("authorizedDash", form, width);
    this.view.navFooterBarPostLogin.breakPointChange(width);
    
    this.view.headerCancelRHearing.height = "35px";
    heightAdjust = 0;
    if(width <= gblBreakPoint){ 
      this.view.mainHeaderScreens.height ='130px'; 

      heightAdjust = (165/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";
      this.view.RadioButtonGroupCompliance.width="90%";
      this.view.lblComplianceFinalMessage.width="90%";
      this.view.lblComplianceFinalMessage.left="10px";
      this.view.lblComplianceFinalMessage.text ="Compliance - Final is not available because a selected appeal doesn't have Pending Compliance.";      
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
  
  setComplianceDocumentTypes:function() {
    if(gblComplianceDocumentTypes !== undefined && gblComplianceDocumentTypes.length > 0) {
      var questionlength = gblComplianceDocumentTypes.length;

      if(questionlength > 0) {
    	this.view.lblComplianceFinalMessage.isVisible = true;
        var radioButtonData = [];
        for(var j = 0; j < questionlength; j++) {
          var descriptionChoice = [];
          descriptionChoice.push(gblComplianceDocumentTypes[j].complianceDocumentId);
          descriptionChoice.push(gblComplianceDocumentTypes[j].complianceDocumentDescription);
          if (gblComplianceDocumentTypes[j].complianceDocumentId === "4"){
 	         this.view.lblComplianceFinalMessage.isVisible = false;
          }
          radioButtonData.push(descriptionChoice);
        }

        this.view.RadioButtonGroupCompliance.masterData = radioButtonData;
        this.view.RadioButtonGroupCompliance.selectedKey = "";
        if(this.params.complianceType)
          this.view.RadioButtonGroupCompliance.selectedKey= this.params.complianceType;

      }
    }
    else {
      this.getComplianceDocumentsList();
    }

  },

  getComplianceDocumentsList :function(){
    operationName = "getComplianceDocumentListByAppealIdAndHatsUserId";
    var data = {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};   
    var headers = {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.getComplianceDocumentsListSuccess, this.getComplianceDocumentsListFailure);
  }, 


  getComplianceDocumentsListSuccess:function(response){
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errDocumentTypeList;
      response.userAction = apiActions.actionNull;
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
        if(response !== undefined && response.availableComplianceDocuments !== undefined && response.availableComplianceDocuments.length > 0) {
          gblComplianceDocumentTypes = response.availableComplianceDocuments;
          this.setComplianceDocumentTypes();
        }
      }
    }
  },

  getComplianceDocumentsListFailure:function(error){
    alert("Unable to get Compliance Document Type list");
    resetFlow();
    var ntf = new kony.mvc.Navigation("frmAppealDetails");
    ntf.navigate();
  },

  setDataForMiniBoxSelectedAppeals:function() {
    var data = [];
    selectedAppeals.forEach(function(val, key, map) {
      var row = {
        "lblProgram": val.portalProgramDesc,
        "lblOBName": "",
        "lblIssue": val.portalIssueCd,
        "lblAppealId": val.appealNbr
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

  onSelectProgramDescription:function() {
    var reasons_Key = this.view.RadioButtonGroupCompliance.selectedKey;
    this.reasonsKey = reasons_Key; 
    if(this.view.RadioButtonGroupCompliance.selectedKey === "4"){
      this.view.snComplianceAchievedDate.isVisible = this.view.RadioButtonGroupCompliance.selectedKey === "4";
      this.view.snComplianceAchievedDate.isVisibleAchieveCalendar = this.view.snComplianceAchievedDate.isVisible;
      this.view.snComplianceAchievedDate.isVisibleAchieveDate = this.view.snComplianceAchievedDate.isVisible;
    } else {
      this.view.snComplianceAchievedDate.isVisible = (this.view.RadioButtonGroupCompliance.selectedKey === "168" && ComplianceStatusPendReject === true);    
      this.view.snComplianceAchievedDate.isVisibleAchieveCalendar = this.view.snComplianceAchievedDate.isVisible;
      this.view.snComplianceAchievedDate.isVisibleAchieveDate = this.view.snComplianceAchievedDate.isVisible;
    }
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