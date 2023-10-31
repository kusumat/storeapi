var isSummaryEdit = false;
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

  onNavigate:function(params){
    gblSettings(this);
    var formCancel = "";
    if (gblIsARUser) {
      formCancel = "frmGeneralAppealDetails";
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } 
    else {
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
      formCancel = "frmAppealDetails";
    }
	this.view.preShow = this.preShow;
    this.view.headerCancelRHearing.toHearingRequest(formCancel);
    this.view.fContinueBackButton.navigatingBFormsBack("frmRescheduleHearing22");
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.snSpecialAccommodationSimple.languagesSetVisibility(false);
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.setHearingInformation();
    if (params !== undefined && params.isSummaryEdit !== undefined) {
      isSummaryEdit = params.isSummaryEdit;
    }    
    this.view.fContinueBackButton.btnContinueOnClick = this.validateInput;
    this.setSummaryValues();
    this.displayLanguageList();
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
      this.view.flxContainerCol2.height = "450px";
      var ua = kony.os.deviceInfo().userAgent;
      if (ua.includes("Android")) {
        this.view.flxContainerCol2.height = "475px";
      }
      this.view.miniBoxSelectedList.top = "10px";
    }
    else{
      this.view.miniBoxSelectedList.top = "60px";
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

  displayLanguageList:function() {
    var selectedInterpreter = this.view.snSpecialAccommodationSimple.getSelectedInterpreter();
    if(selectedInterpreter === "Yes") {
      this.view.snSpecialAccommodationSimple.lstAvailableLanguagesIsVisible = true;
    }
    else {
      //reset language to default values
      rescheduleHearingRequest.languageDesc = "";
      rescheduleHearingRequest.intprLangId = 36;       
      this.view.snSpecialAccommodationSimple.lstAvailableLanguagesIsVisible = false;  
    }    
  },
  setSummaryValues:function() {
    var data = [];
    selectedAppeals.forEach(function(val, key, map) {
	  data.push(val);
    });     
    this.view.miniBoxSelectedList.setData(data);

    gblEventDetails = rescheduleHearingRequest.eventDetails = [];
    gblLanguageDesc = rescheduleHearingRequest.languageDesc;
  },

  validateInput:function() {
    var nextPage = "frmRescheduleHearing4";
    if(isSummaryEdit) {
      nextPage = "frmRescheduleHearing5";
    }
    if(gblNeedInterpreter === "") {
      alert("Do you need an Interpreter? Select \"Yes\" or \"No\"");
    }
    else {
      this.view.snSpecialAccommodationSimple.setEventData();     
      var ntf = new kony.mvc.Navigation(nextPage);
      ntf.navigate();    
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