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
	this.view.preShow = this.preShow;
    this.view.headerCancelRHearing.onCancelClick = this.navigateOnCancel;
    this.view.fContinueBackButton.btnBackOnClick = this.navigateBack;
    if(params.dataForSelectedAppealsCard) {
      this.view.miniBoxSelectedList.setData(this.params.dataForSelectedAppealsCard);
    }
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.view.fContinueBackButton.btnContinueOnClick = this.sendAddAuthorizedRepresentativeRequest;
    this.view.onBreakpointChange = this.onBreakpointChange;
    gblHearingInfo.showQuickAction = false;
    this.view.snHearingInfoDetails.setHearingData(gblHearingInfo);
    this.view.snSumaryReqAssistance.setComponenentData();
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
    adjustRequestAssistanceSummary(this.view, width);
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },   

  navigateBack:function() {
    var ntf = new kony.mvc.Navigation("frmRequestAssistanceStep4");
    ntf.navigate(this.params);          
  },

  navigateOnCancel:function() {
    resetFlow();
    var ntf = new kony.mvc.Navigation("frmAppealDetails");
    ntf.navigate();
  },  

  sendAddAuthorizedRepresentativeRequest:function() {
    showLoadingIndicator();
    var data = addAuthorizedRepRequest;
    //alert(JSON.stringify(data));
    operationName =  "addAuthorizedRepByListOfAppealIdAndHatsUserId";
    var headers= {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.sendAddAuthorizedRepresentativeRequestSuccess, this.sendAddAuthorizedRepresentativeRequestFailure);
  },

  sendAddAuthorizedRepresentativeRequestSuccess:function(response) {
    dismissLoadingIndicator();
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errSubmitAuthRep;
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
        this.getInterestedParties();
      }
    }
  },

  sendAddAuthorizedRepresentativeRequestFailure:function(error) {
    dismissLoadingIndicator();
    if(error.errorStatus !== null && error.errorStatus !== undefined && error.errorStatus.length > 0) {
      this.displayErrorMessages(error.errorStatus); 
    }
    else {
      var callSpecificMsg = "Unable to Request Authorized Representative.";
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
      currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
      currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
      currentFrm.view.puInformationDialog.isVisible = true; 
      currentFrm.view.forceLayout();
    }    
  },

  getInterestedParties:function() {
    gblInterestedParties = [];
    operationName =  "getInterestedPartiesByAppealIdAndHatsUserId";
    var data= {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};
    var headers= {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.getInterestedPartiesSuccess, this.getInterestedPartiesFailure);
  },

  getInterestedPartiesSuccess:function(response) {
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errInterestedParties;
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
        if(response !== null && response !== undefined) {
          if(response.interestedParties !== null && response.interestedParties !== undefined) {
            gblInterestedParties = response.interestedParties;  
          }
        }
        this.resetFlowAndExit();
      }
    }
  },

  getInterestedPartiesFailure:function(error) {
    this.resetFlowAndExit();      
  },

  resetFlowAndExit:function() {
    resetFlow();
    var ntf = new kony.mvc.Navigation("frmRequestAssistanceStep6");
    ntf.navigate();
  },

  displayErrorMessages:function(errorStatus) {
    var alertMessage = "";
    for(var i = 0; i < errorStatus.length; i++) {
      alertMessage = alertMessage += errorStatus[i].errorMessage;
      if(i !== errorStatus.length) {
        alertMessage += "\n";
      }
    }
    var alertBasic = {alertTitle:"Input Error", message:alertMessage,alertType:constants.ALERT_TYPE_ERROR};
    var alertPSP = {};
    var alert = kony.ui.Alert(alertBasic, alertPSP);      
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