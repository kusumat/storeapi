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

  onNavigate:function(){    
    gblRescheduleAgree = null;
    gblSettings(this);
    var formCancel = "";
    if (gblIsARUser) {
      formCancel = "frmGeneralAppealDetails";
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } 
    else {
      formCancel = "frmAppealDetails";
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);      
    }
	this.view.preShow = this.preShow;    
    this.view.headerCancelRHearing.toHearingRequest(formCancel);
    this.view.fContinueBackButton.navigatingBFormsBack("frmRescheduleHearing4");
    this.view.fContinueBackButton.btnContinueOnClick = this.sendRescheduleHearingRequest;
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.setHearingInformation();
    rescheduleHearingRequest.hatsUserId = testHatsUserId;
    this.view.snSumaryItemsReschedule.setComponentData(rescheduleHearingRequest, this.view.fContinueBackButton);
    this.setSummaryValues();
    this.view.onBreakpointChange = this.onBreakpointChange; 
    addToFlow(this.view.id, this.view);
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
    this.view.flxContentBody.height = "100%";
    
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
    this.view.forceLayout(); 
    appealsSummaryLayoutDirection(form, width);
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },  
  
  setHearingInformation:function() {
    showLoadingIndicator();
    var details = gblHearingInfo;
    if(details !== null && details !== undefined) {
      var showQuickAction = false;
      details.showQuickAction = showQuickAction;
      this.view.snHearingInfoDetails.setHearingData(details);        
    }
    dismissLoadingIndicator();
  },   

  
  sendRescheduleHearingRequest:function() {

    if(gblRescheduleAgree === true){
      operationName =  "addReschedRequestByListOfAppealIdAndHatsUserId";
      var appealId="";
      var appealIds = [];

      selectedAppeals.forEach(function(val, key, map) {
        appealId = val.appealId;
        appealIds.push({"appealId": appealId});    
      });      

      var data = {"appealIds": appealIds,
                  "hatsUserId": testHatsUserId,
                  "interpreterReqInd": rescheduleHearingRequest.interptrReqInd,
                  "languageId": rescheduleHearingRequest.intprLangId,
                  "text1":rescheduleHearingRequest.noticeOfActionDate,
                  "text2":rescheduleHearingRequest.rescheduleReasonText,
                  "rescheduleReasonCode" : rescheduleHearingRequest.rescheduleReasonCode,
                  "eventDetails": rescheduleHearingRequest.eventDetails,
                  "goodCauseDocument": rescheduleHearingRequest.goodCauseDocument};
      var headers = {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      //       alert(JSON.stringify(data));
      showLoadingIndicator();
      integrationObj.invokeOperation(operationName, headers, data, this.sendRescheduleHearingRequestSuccess, this.sendRescheduleHearingRequestFailure);
    }
    else {
      // alert('In order to complete your Reschedule Hearing Request, please check “I Agree” and press “Submit Request”. If you do not wish to complete your Reschedule Hearing Request, press the “X” in the upper left corner of the screen next to “Reschedule Hearing Request”.');
      let msgAgreement = 'In order to complete your Reschedule Hearing Request, please check “I Agree” and press “Submit Request”. If you do not wish to complete your Reschedule Hearing Request, press the “X” in the upper left corner of the screen next to “Reschedule a Hearing.”';
      alert(msgAgreement);
    }
  },

  sendRescheduleHearingRequestSuccess:function(response) {
    dismissLoadingIndicator();
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errSubmitRescheduleRequest;
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
      
      if(response.errorStatus) {
        var errorStatus = response.errorStatus[0];
        dismissLoadingIndicator();
        alert(errorStatus.errorMessage);
      }
      else 
      {
        resetFlow();
        var ntf = new kony.mvc.Navigation("frmRescheduleHearing7");
        ntf.navigate();
      }
    }
  },

  sendRescheduleHearingRequestFailure:function(error) {
    dismissLoadingIndicator();
    if(error.errorStatus !== null && typeof(response.errorStatus) !== 'undefined' && error.errorStatus.length > 0) {
      this.displayErrorMessages(error.errorStatus); 
    }
    else {
      var callSpecificMsg = "Unable to submit the Reschedule Hearing Request.";
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
      currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
      currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
      currentFrm.view.puInformationDialog.isVisible = true; 
      currentFrm.view.forceLayout();
    }
  },

  displayErrorMessages:function(errorStatus) {
    var alertMessage = "";
    for(var i = 0; i < errorStatus.length; i++) {
      alertMessage = alertMessage += errorStatus[i].errorMessage;
      if(i !== errorStatus.length) {
        alertMessage += "\n";
      }
    }

    //alert(alertMessage);
    var alertBasic = {alertTitle:"Input Error", message:alertMessage,alertType:constants.ALERT_TYPE_ERROR};
    var alertPSP = {};
    var alert = kony.ui.Alert(alertBasic, alertPSP);      

  },

  setSummaryValues:function() {
    var data = [];
    selectedAppeals.forEach(function(val, key, map) {
      data.push(val);
    });    
    this.view.miniBoxSelectedList.setData(data);
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
