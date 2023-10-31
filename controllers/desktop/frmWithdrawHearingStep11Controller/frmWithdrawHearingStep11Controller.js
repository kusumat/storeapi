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
    this.setHearingInformation();
    this.view.snAppealToReschedule.setComponentData(gblRescheduleHearingAppealsList);
    
    this.view.miniBoxSelectedList.lblRescheduleSummaryHeaderText ="Withdrawing Appeal(s)";
    this.view.lblTextHeaderStep3.text ="What is the reason you are requesting a withdraw?";
    this.view.lblTextHeaderStep2.text="Which Appeals are you requesting to withdraw?";
    this.view.lblTextHeaderStep4.text ="Summary";
    this.view.headerCancelRHearing.lblRequestCancelText="Withdraw Hearing Request"; 
    this.view.flxBoxColorStausStep5.setVisibility(false);
    this.view.lblTextHeaderStep5.setVisibility(false);
    this.view.flxBoxColorStausStep6.setVisibility(false);
    this.view.lblTextHeaderStep6.setVisibility(false);

    this.view.fContinueBackButton.btnContinueOnClick = this.validateInput;
    this.view.fContinueBackButton.btnBackOnClick=this.goBack;
    this.setSummaryValues();
    rescheduleHearingRequest.appealIds = [];  
    
    if(this.withdrawType == "AA"){
      this.view.headerCancelRHearing.lblRequestCancelText="Withdraw Admin Appeal";
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
  
 validateInput:function() {
 
    var appealIds = selectedAppeals.size;
    if(appealIds === 0) {
      alert("Select one or more Appeals");
    }
    else {
      var formName = "frmWithdrawHearingStep2";
      if(fromWithdraw === true)
        formName = "frmWithdrawHearingStep2";
      
      this.setSelectedApeals();
      var ntf = new kony.mvc.Navigation(formName);
      ntf.navigate({"withdrawType": this.withdrawType});    
    }
  },
  
 goBack:function() {
 	var ntf = new kony.mvc.Navigation("frmWithdrawHearingStep1");
   	if(this.withdrawType == "AA")
      ntf.navigate({"withdrawType": this.withdrawType});  
    else
      ntf.navigate(); 
  },  

  setSummaryValues:function() {
	var data = [];
    selectedAppeals.forEach(function(val, key, map) {
	  data.push(val);
    });    
    this.view.miniBoxSelectedList.setData(data);
  },
  
 
  setSelectedApeals:function() {
	var dataRows = [];
	
	for(var i = 0; i < gblRescheduleHearingAppealsList.length; i++) {
	  var detail = gblRescheduleHearingAppealsList[0].associatedAppealsAndDispositions;
      
	  for(var j = 0; j < detail.length; j++){     
		if (selectedAppeals.has(detail[j].appealNbr)) {
		  selectedAppeals.delete(detail[j].appealNbr);
          selectedAppeals2.delete(detail[j].appealNbr);
		  selectedAppeals.set(detail[j].appealNbr, {"lblProgram":detail[j].portalProgramDesc,
													"lblIssue":detail[j].portalIssueCd,
													"lblOBName": (detail[j].obPersonName !== null && 
																  detail[j].obPersonName !== undefined &&
																  detail[j].obPersonName !== "null") ? detail[j].obPersonName : "",
													"lblAppealId":detail[j].appealNbr,
                                                    "appealId": detail[j].appealId
												   });
          selectedAppeals2.set(detail[j].appealNbr, {"lblProgram":detail[j].portalProgramDesc,
													"lblIssue":detail[j].portalIssueCd,
													"lblOBName": (detail[j].obPersonName !== null && 
																  detail[j].obPersonName !== undefined &&
																  detail[j].obPersonName !== "null") ? detail[j].obPersonName : "",
													"lblAppealId":detail[j].appealNbr,
                                                    "appealId": detail[j].appealId
												   });
		}
	  }
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