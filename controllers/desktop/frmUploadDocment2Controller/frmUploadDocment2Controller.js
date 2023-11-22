var docTypeId = "";
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
  onNavigate: function(params) {
    gblSettings(this);
    this.params = params;
    gblAttestationAgree = false;


    if (flowName === "Request Admin Appeal" || flowName === "Request - CR" ) {
      this.view.snDocCauses.textLblTitle = "Provide any document you may have";
      this.view.flxContainerHeaderStep5.isVisible = false;
      this.view.lblNumberOfStep6.text = "3";
    }
    if (flowName === "Upload Hearing Document") {
      this.view.snDocCauses.textLblTitle = params.title;
      this.view.headerCancelRHearing.lblRequestCancelText = "Upload Document";
    }
    if (flowName === "Request Admin Appeal") {
      this.view.headerCancelRHearing.lblRequestCancelText = "Upload Admin Appeal";
    }

    if (flowName === "MCP Denial Form") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload MCP Denial Document";
      this.view.snDocCauses.textLblTitle = " ";
    }

    if (flowName === "Request - CR") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload County Review Document";
      this.view.snDocCauses.textLblTitle = " ";
    }

    if (flowName === "Exhibit - County") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Exhibit - County Document";
      this.view.snDocCauses.textLblTitle = " ";
    }  
	if (flowName === "Appeal Summary") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Appeal Summary Document";
      this.view.snDocCauses.textLblTitle = " ";
    } 
    if (flowName === "Compliance") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Compliance Document";
      this.view.lblNumberOfStep4.text="3";
      this.view.flxContainerHeaderStep5.setVisibility(false);
      this.view.snDocCauses.textLblTitle = " ";
      // TODO: May want to display the achieved date for summary
    }
    /*if (!this.params.isBack) {
      this.view.snDocCauses.removeDocument();      
    } else {
      delete this.params.isBack;
    }*/
	this.view.preShow = this.preShow;
    this.view.snDocCauses.setComponentData(this.view.fContinueBackButton);
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
    this.view.onBreakpointChange = this.onBreakpointChange; 
    addToFlow(this.view.id, this.view);
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
    this.view.snDocCauses.removeDocument();
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

  navigateBack:function() {
    var frmName="frmUploadDocment1";
    if(flowName === "Compliance")
      frmName="frmUploadDocment11";
    var ntf = new kony.mvc.Navigation(frmName);
    ntf.navigate(this.params);          
  },

  navigateForward:function() {
    if ((flowName === "Compliance" || flowName === "Request - CR") && gblAttestationAgree === false && gblIsTPMUser === true){
      alert('Please attest that the document that you have uploaded is true, accurate, and complete only to the appellant associated with this appeal(s).'); 
      return;
    }

    var ntf;
    var doc = this.view.snDocCauses.getDocument();
    Object.assign(this.params, {"docToUpload": doc});
    if (doc === null || doc === undefined || doc === "") {
      alert("Please select file to upload!");
    } else {
      var fileToUpload = this.params.docToUpload;
      switch (flowName) {
        case "Request Admin Appeal":
          this.sendAdmninAppeal();
          return;
        case "Request - CR":
          this.addCountyReviewAppealByListOfDispositionIdAndHatsUserId();
          return; 
        case "Compliance":
          this.addComplianceDocumentByListOfComplianceXREFID();
          return;   
      }

      ntf = new kony.mvc.Navigation("frmUploadDocment3");
      ntf.navigate(this.params);
    }
  },

  /*
  	TODO: new in Kony Fabric, 5/14/2020
  	{
    "complianceXREFIds": [
        #foreach $complianceXREFIds 
		#if($velocityCount!=1)
		,
		#end
      	"$complianceXREFId"
      	#end
    ],
    "hatsUserId": $hatsUserId,
    "complianceDocumentTypeId":$complianceDocumentTypeId,
	"uploadDocument":"$uploadDocument",
    "achievedDate": "$achievedDate"
}
  */
  addComplianceDocumentByListOfComplianceXREFID:function() {
    console.log("**** CALENDAR " + JSON.stringify(this.params));
    showLoadingIndicator();
    operationName =  "AddComplianceDocumentByListOfComplianceXREFID";
    var dispositionIds = [];

    selectedAppeals.forEach(function(val, key, map) {
      var dispositionId = val.compliancePartyTypeXrefID;
      if(dispositionId)
        dispositionIds.push({"complianceXREFId": dispositionId});
    });     

    var data = {
      "complianceXREFIds": dispositionIds,
      "complianceDocumentTypeId" : this.params.complianceType,
      "hatsUserId": testHatsUserId,
      "uploadDocument": this.params.docToUpload,    
      "hipaaInd": gblDocContainsHipaaData,
      "attestationInd" : gblAttestationAgree
      
    };
    if ((typeof(this.params.achievedDate) !== "undefined") && (this.params.achievedDate !== null)) {
      data.achievedDate = this.params.achievedDate;
    }

    var headers = {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var options = {
    "httpRequestOptions": {
        "timeoutIntervalForRequest": 180,
        "timeoutIntervalForResource": 600
    }
	};
    integrationObj.invokeOperation(operationName, headers, data, this.sendAdmninAppealSuccess, this.sendAdmninAppealFailure,options);

  },

  addCountyReviewAppealByListOfDispositionIdAndHatsUserId:function() {
    showLoadingIndicator();
    operationName =  "addCountyReviewAppealByListOfDispositionIdAndHatsUserId";
    var dispositionIds = [];

    selectedAppeals.forEach(function(val, key, map) {
      var dispositionId = val.type;
      if(dispositionId)
        dispositionIds.push({"dispositionId": (dispositionId.substring(3)).trim()});
    });    

    var data = {
      "dispositionIds": dispositionIds,
      "hatsUserId": testHatsUserId,
      "uploadDocument": this.params.docToUpload,
      "hipaaInd": gblDocContainsHipaaData,
      "attestationInd" : gblAttestationAgree,
    };

    var headers = {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.sendAdmninAppealSuccess, this.sendAdmninAppealFailure);
  },


  sendAdmninAppeal:function() {
    showLoadingIndicator();
    operationName =  "addAdminAppealRequestByListOfDispositionIdAndHatsUserId";
    var dispositionIds = [];

    selectedAppeals.forEach(function(val, key, map) {
      var dispositionId = val.type;
      if(dispositionId)
        dispositionIds.push({"dispositionId": (dispositionId.substring(3)).trim()});
    });    

    var data = {
      "dispositionIds": dispositionIds,
      "hatsUserId": testHatsUserId,
      "uploadDocument": this.params.docToUpload,
      "hipaaInd": gblDocContainsHipaaData,
      "attestationInd" : gblAttestationAgree,
    };
    var headers = {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.sendAdmninAppealSuccess, this.sendAdmninAppealFailure);
  },

  sendAdmninAppealSuccess:function(response) {
    dismissLoadingIndicator();
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errServerUnreachable;
        response.userAction = apiActions.actionCheckNetwork;
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
          this.view.flxContainerHeaderStep5.isVisible = true;
          this.view.lblNumberOfStep6.text = "4";
          ntf = new kony.mvc.Navigation("frmUploadDocment4");
          ntf.navigate(this.params);    
        }  
      }
    }
  },

  sendAdmninAppealFailure:function(error) {
    dismissLoadingIndicator();
    if(error.errmsg  !== null && error.errmsg  !== undefined && error.errmsg !== "") {
      alert("Error: " + error.errmsg);
    } else {
      alert("Service Error: " + JSON.stringify(error));
    } 
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