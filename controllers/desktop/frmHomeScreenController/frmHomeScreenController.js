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
   
    const DateNow = Date.now();
    
    var s = '2021-04-22 15:00';
    var bits = s.split(/\D/);
    var dateStart = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
    
    var e = '2021-04-27 08:00';
    bits = e.split(/\D/);
    var dateEnd = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
    this.view.noticeMessage.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
    //this.view.noticeMessage.checkforMaintMsg(this);
    
    /*if (DateNow >= dateStart && DateNow <= dateEnd){
      this.view.NoticeMessage.isVisible = true;
    }
    else
      {
         this.view.NoticeMessage.isVisible = false;
      }*/
  },

  onNavigate:function(startInstructions){
    if ((typeof(startInstructions) !== "undefined") && (typeof(startInstructions.restart) !== "undefined")) {
      kony.print("... instructions received to restart App from frmHomeScreen");
      kony.application.destroyForm("frmAppellantDash");
      kony.application.destroyForm("frmAuthorizedRepDash");
      invalidateGlobalSecureToken();
      resetFlow();
      resetAllGlobals();
    }
	
    this.view.noticeMessage.height = '0px';
    this.view.noticeMessage.isVisible = false;
    
    gblSettings(this);
    
    this.setParentSize(this.view.flxMainContainer);
    this.view.preShow = this.preShow;
    this.view.postShow = this.postShow;
    this.initPage();
  },

  preShow: function(eventobject){
 //Reverting changes back and added additional flag for initial call. 
    if (this.view.noticeMessage.isVisible === true || gblcheckforMaintMsg === true){
      this.view.noticeMessage.checkforMaintMsg(this);
      gblcheckforMaintMsg=false;
	}
    
    gblSettings(this);
    
    var scope = this;
    this.view.onBreakpointChange = function() {
      scope.onBreakpointChange(kony.application.getCurrentForm(), kony.application.getCurrentBreakpoint());
    };

    // for frmHomeScreen only, move this to the postShow.  The screen bp does not appear to be ready ...
    // TODO: Short-cut for everyone ... pretend open, then click-to-close; refactor HELPER from the click-event
    //     this.view.chatbotFAQiframe.isVisible = true;
    //     this.onClickChat();

    // TODO: 1/23/2020 - the browser "refresh" button will try to return to "index screen" (aka start screen)
    // if the previous form is frmHomeScreen, then this is just initialization or a desired state from frmHomeScreen.accessibilityConfig.
    // May need to capture more state information to change the desired "refresh" screen.

    // TODO: bug -- comparing form names to form objects -- not helpful
    //     let tmpCurrentFormId = kony.application.getCurrentForm().id;
    //     if (tmpCurrentFormId != previousFrm) {
    //       var ntfRefresh = new kony.mvc.Navigation(previousFrm);
    //       ntfRefresh.navigate();
    //     }

    this.initActions();
    voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },

  initActions: function(){
  },

  postShow: function() {
    this.view.hamburgerMenu.adjustMenuSize();
    this.adjustContentSize();
    this.view.navHeaderBar.setCurrentPage('frmHomeScreen');
    this.view.hamburgerMenu.setCurrentPage('frmHomeScreen');
    this.view.largeVIdeoRowReverse.parent.forceLayout();
    // TODO: Short-cut for everyone ... pretend open, then click-to-close; refactor HELPER from the click-event
    this.view.chatbotFAQiframe.isVisible = true;
    this.onClickChat();
    //mehmet amplify.publish("unhideChatbutton");
  },

  initPage: function() {
    this.view.hamburgerMenu.setParentView(this.view);
    this.view.hamburgerMenu.centerX = '150%';  
    this.view.hamburgerMenu.setParentView(this.view);
    this.view.hamburgerMenu.centerX = '150%';
    this.view.hamburgerMenu.isVisible = false;
    this.view.flxContentScroll.isVisible = true;
  },

  adjustContentSize: function() {
    this.view.forceLayout();
    var pForm =  kony.application.getCurrentForm();
    var mainheight = 0;
    var screenheight = kony.os.deviceInfo().screenHeight;
    var headerSize = (pForm.changeLanguaje) ? pForm.changeLanguaje.frame.height : 0;
    mainheight =  headerSize + pForm.mainNavigation.frame.height + pForm.navHeaderBar.frame.height;
    this.view.flxContentScroll.height = (screenheight-mainheight)+'px';
    //this.view.top = mainheight+'px';
    this.view.forceLayout();
  },

  onBreakpointChange: function(form, width){
    try{
    // setting headers & footer sizes
    // NOTE: The parent's frame is not set until this occurs  -----+
    this.setParentSize(this.view.flxMainContainer);               //
    // +-----------------------------------------------------------+
    this.view.puInformationDialog.onBreakpointChange(this, width);
    this.view.noticeMessage.onBreakpointChange(this, width);
    this.view.mainNavigation.breakPointChange(width);
    this.view.navHeaderBar.breakPointChange(width);
    this.view.navFooterBar.breakPointChange(width);
    this.view.welcomeBanner.breakPointChange(width);
    this.view.textOneRow.breakPointChange(width);
    this.view.twoRowsHearingCategories.breakPointChange(width);
    this.view.twoRowsStartLogin.breakPointChange(width);
    this.view.textOneRowWhyShare.breakPointChange(width);
    this.view.imageGraphicFlowThreeStages.breakPointChange(width);
    this.view.largeVIdeoRowReverse.breakPointChange(width);
    this.view.twoRowsStillHaveQuestions.breakPointChange(width);

    if(width <= 640){

    }else if(width > 640){

    }

    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);

    this.view.hamburgerMenu.adjustMenuSize();
    this.adjustContentSize();
    this.view.forceLayout();
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
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