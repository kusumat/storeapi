var withdrawType="";

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
  onNavigate:function(data){
    gblSettings(this);
    if(data)
    	this.withdrawType = data.withdrawType;
    var appealDetailsForm = "frmAppealDetails";
    if(gblIsARUser){
      appealDetailsForm = "frmGeneralAppealDetails";
    }
    this.view.headerCancelRHearing.toHearingRequest(appealDetailsForm);

    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    if(gblIsARUser){
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } 
    else{
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);  
    }    
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
	this.view.fContinueBackButton.btnBackOnClick=this.goBack;    
    this.view.fContinueBackButton.btnContinueOnClick = this.submitWithdrawRequest; 
    this.setHearingInformation();
    var prog_issue="";
    selectedAppeals.forEach(function(val, key, map) {
      prog_issue = prog_issue + val.lblProgram+" - "+val.lblIssue+", ";
    });    
    this.view.snSumaryWithDraw.setComponentData(this.view.fContinueBackButton);
    this.view.miniBoxSelectedList.lblRescheduleSummaryHeaderText ="Withdrawing Appeal(s)";
    this.setSummaryValues();
    if(this.withdrawType == "AA"){
      this.view.headerCancelRHearing.lblRequestCancelText="Withdraw Admin Appeal";
      this.view.snSumaryWithDraw.IblTitle1Text = "You are about to withdraw Admin Appeal for "+prog_issue.substring(0, prog_issue.lastIndexOf(',')) +".";
      this.view.snSumaryWithDraw.hideForAA();
    } else {
      this.view.snSumaryWithDraw.IblTitle1Text = "You are about to withdraw your State Hearing Request for your "+prog_issue.substring(0, prog_issue.lastIndexOf(',')) +".";
      this.view.snSumaryWithDraw.IblTitle2Text = ""+gblPortalReasons_value;
    }
    if(withdrawRequest.withdrawReasonText !== undefined && withdrawRequest.withdrawReasonText !== "") {
    	this.view.snSumaryWithDraw.IblTitle2Text = this.view.snSumaryWithDraw.IblTitle2Text + "\n\n" + "Reason: " + withdrawRequest.withdrawReasonText;  
    }
    this.view.onBreakpointChange = this.onBreakpointChange;     
    this.view.forceLayout();
	this.view.preShow = this.preShow;    
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
    this.view.flxContainerBody.height = "100%";
                                                                                                                                       
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
    adjustAppealsSummarySection(form, width);
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },  
  
  setHearingInformation:function() {
    var details = gblHearingInfo;
    if(details !== null && details !== undefined) {
      var showQuickAction = false;
      details.showQuickAction = showQuickAction;
      this.view.snHearingInfoDetails.setHearingData(details); 
    }
  },  
  
  setSummaryValues:function() {
	var data = [];
    selectedAppeals.forEach(function(val, key, map) {
	  data.push(val);
    });    
    this.view.miniBoxSelectedList.setData(data);
  },
  
  submitWithdrawRequest:function() {
   
    if(gblWithdrawAgree === true){
          
	operationName =  "addShWithdrawByListOfAppealIdAndHatsUserId";

    if(this.withdrawType == "AA")
      operationName =  "addAAWithdrawalByListOfAppealIdAndHatsUserId";
        
    var appealId="";
    selectedAppeals.forEach(function(val, key, map) {
      appealId = appealId + "{appealIds:"+ val.appealId+"}, ";
    });       
          
	withdrawRequest.appealIds = appealId.substring(0, appealId.lastIndexOf(','));

    var data= {"appealIds": "["+withdrawRequest.appealIds+"]",
               "reasonTexts": withdrawRequest.reasonTexts,
               "reasonCode": withdrawRequest.reasonCode,
               "withdrawReasonText": withdrawRequest.withdrawReasonText,
               "hatsUserId": withdrawRequest.hatsUserId};   
      
    //alert(JSON.stringify(data));
      
    var headers= {"Content-Type": "application/json"};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    //this.submitWithdrawRequestSuccess();
    showLoadingIndicator();
    integrationObj.invokeOperation(operationName, headers, data, this.submitWithdrawRequestSuccess, this.submitWithdrawRequestFailure);
    }
    
    else {
      if(this.withdrawType == "AA")
        alert('In order to complete Withdraw Admin Appeal, please check “I Agree” and press “Submit Request”. If you do not wish to complete Withdraw Admin Appeal, press the “X” in the upper left corner of the screen next to “Withdraw Admin Appeal”.');
      else
        alert('In order to complete your withdrawal, please check “I Agree” and press “Submit Request”. If you do not wish to complete your withdrawal, press the “X” in the upper left corner of the screen next to “Withdraw Hearing Request”.');
    }
  },
  
  submitWithdrawRequestSuccess:function(response) {
    dismissLoadingIndicator();

    if(response.errorCode !== undefined) {
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
        if (response.errorMessage  === "User has a previous withdraw")
        {
          alert("Withdrawal request has already been submitted for these appeals");
          resetFlow();        
          var ntf = new kony.mvc.Navigation("frmAppellantDash");
          ntf.navigate();	
        }
        else
        {
          var ntf1 = new kony.mvc.Navigation("frmWithdrawHearingStep4");
          ntf1.navigate({"withdrawType": this.withdrawType}); 
        }
      }
    }
  },
  
  submitWithdrawRequestFailure:function(error) {
    dismissLoadingIndicator();
    alert("Failure: " + JSON.stringify(error));
  },
  
   goBack:function() {
 	var ntf = new kony.mvc.Navigation("frmWithdrawHearingStep2");
   	if(this.withdrawType == "AA")
      ntf.navigate({"withdrawType": this.withdrawType});  
    else
      ntf.navigate(); 
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