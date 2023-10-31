var ScrollToWaysToConnect =  false;
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
    
    if (params !== undefined){
      ScrollToWaysToConnect = params.ScrollToWaysToConnect;
    }
    gblSettings(this);
    this.setParentSize(this.view.flxMainContainer);
    this.view.preShow = this.preShow;
    this.view.postShow = this.postShow;
    this.initPage();
    
  },
  preShow: function(eventobject){
    this.view.flxContainerByPhoneHeading.accessibilityConfig = {
      "a11yLabel" : this.view.lblHeadingConnectToHearing.text,
      "a11yARIA":{"role":"heading", "aria-level":"1"},
      "a11yIndex" : 0,
      "a11yHidden" : false
    };
    var scope = this;
    this.view.onBreakpointChange = function() {
      scope.onBreakpointChange(kony.application.getCurrentBreakpoint());
      
    };
    this.initActions();
    voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },

  initActions: function(){

  },

  postShow: function() {
    this.view.hamburgerMenu.adjustMenuSize();
    this.adjustContentSize();
    this.view.navHeaderBar.setCurrentPage('frmConnectToHearing');
    this.view.hamburgerMenu.setCurrentPage('frmConnectToHearing');   							
    if (ScrollToWaysToConnect === "true"){
      var ScrollToViewOptions = {behavior: "auto", block: "start", inline: "nearest"};
      window.document.getElementById("frmConnectToHearing_lblHeadingConnectToHearing").scrollIntoView(ScrollToViewOptions);        
    }
    this.view.forceLayout();
  },

  initPage: function() {
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

  onBreakpointChange: function(width){
    try{
    // setting headers & footer sizes
    this.setParentSize(this.view.flxMainContainer);
    this.view.puInformationDialog.onBreakpointChange(this, width);
    this.view.mainNavigation.breakPointChange(width);
    this.view.navHeaderBar.breakPointChange(width);
    this.view.navFooterBar.breakPointChange(width);
    
    this.view.largeVideoRowMeeting.breakPointChange(width);
    this.view.twoRowsCompileEvidence.breakPointChange(width);
    this.view.imageGraphicFlowThreeStages.breakPointChange(width);
    this.view.twoRowsHearingCategories.breakPointChange(width);
    this.view.twoRowsPresentingYourClass.breakPointChange(width);
    this.view.questionsList.breakPointChange(width);
    this.view.richTextOneRow.breakPointChange(width);
    this.view.twoRowsStillHaveQuestions.breakPointChange(width);

    //this.view.ApplicationRoadMap.updateResponsiveView(this.AdjustScreen);
    //this.responsiveUtils.setFooterAlignment();
            
    if(width >= 900 && width <= 1130){
      this.view.lblTitleHearingByPhone.skin='lblFont700017OpenSansSemiBold38px';
      this.view.lblDesciptPhone.skin='lblFont000000OpenSansRegular24px';
      
      this.view.lblTitleHearingByDevice.skin='lblFont700017OpenSansSemiBold38px';
      this.view.RTxtHearingByDevice.skin='richTextNormalBlack24px';
      
      this.view.lblTitleHearingByTeams.skin='lblFont700017OpenSansSemiBold38px';
      this.view.rTxtHearingByTeams.skin='richTextNormalBlack24px';
    } 
    if(width >= 768 && width <= 900){
      this.view.lblTitleHearingByPhone.skin='lblFont700017OpenSansSemiBold38px';
      this.view.lblDesciptPhone.skin='lblFont000000OpenSansRegular24px';
      
      this.view.lblTitleHearingByDevice.skin='lblFont700017OpenSansSemiBold38px';
      this.view.RTxtHearingByDevice.skin='richTextNormalBlack24px'; 

      this.view.lblTitleHearingByTeams.skin='lblFont700017OpenSansSemiBold38px';
      this.view.rTxtHearingByTeams.skin='richTextNormalBlack24px';
    }
    if(width >= 720  && width <= 768){
      this.view.lblTitleHearingByPhone.skin='lblFont700017OpenSansSemiBold38px';
      this.view.lblDesciptPhone.skin='lblFont000000OpenSansRegular24px';
      
      this.view.lblTitleHearingByDevice.skin='lblFont700017OpenSansSemiBold38px';
      this.view.RTxtHearingByDevice.skin='richTextNormalBlack24px';      
      
      this.view.lblTitleHearingByTeams.skin='lblFont700017OpenSansSemiBold38px';
      this.view.rTxtHearingByTeams.skin='richTextNormalBlack24px';
    }  
    if(width <= 720 ){
      this.view.lblTitleHearingByPhone.skin='lblFont700017OpenSansSemiBold33px';
      this.view.lblDesciptPhone.skin='lblFont000000OpenSansRegular18px';
      
      this.view.lblTitleHearingByDevice.skin='lblFont700017OpenSansSemiBold33px';
      this.view.RTxtHearingByDevice.skin='richTextNormalBlack18px';
      
      this.view.lblTitleHearingByTeams.skin='lblFont700017OpenSansSemiBold33px';
      this.view.rTxtHearingByTeams.skin='richTextNormalBlack18px';
    } 
    if(width > 1130){
      this.view.lblTitleHearingByPhone.skin='lblFont700017OpenSansSemiBold38px';
      this.view.lblDesciptPhone.skin='lblFont000000OpenSansRegular24px';
      
      this.view.lblTitleHearingByDevice.skin='lblFont700017OpenSansSemiBold38px';
      this.view.RTxtHearingByDevice.skin='richTextNormalBlack24px';      
      
      this.view.lblTitleHearingByTeams.skin='lblFont700017OpenSansSemiBold38px';
      this.view.rTxtHearingByTeams.skin='richTextNormalBlack24px';
    }    
    this.view.forceLayout();
    
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
    
    this.view.hamburgerMenu.adjustMenuSize();
    this.adjustContentSize();
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