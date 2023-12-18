var selectedRepresentingOption = "";
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

  //Type your controller code here 
  onNavigate:function() {
    gblSettings(this);
    currentFlow = "Create Login";
    var representingSelectedOption = "";
    this.view.snLoginBoxBStart.step1ContinueButtonOnClick = this.step1Continue;
    this.view.onBreakpointChange = this.onBreakpointChange;
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
    
    if(width <= gblBreakPoint) {
      this.view.flxBoxLoginContainer.width = '100%';
    }
    else {
      this.view.flxBoxLoginContainer.width = '464px';
    }      
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  }, 
 
  step1Continue:function() {
    //kony.print("Representing option user selected: "+gblRepresentingOption);
    if(gblRepresentingOption === undefined || gblRepresentingOption === null || gblRepresentingOption === "" ) {
      alert("Please select option that matches your criteria.");      
    } else { //Appellant/AR Navigation
      kony.print("User's choice is "+gblRepresentingOption+", going to show the form to collect info");
      var ntf = new kony.mvc.Navigation("frmLoginProvideInfo");
      ntf.navigate();
    } //else if(gblRepresentingOption == "Yes") {       //AR Navigation
      //kony.print("User's choice is Yes, going to show the form to collect info");
      //var ntf = new kony.mvc.Navigation("frmLoginProvideInfo");
      //ntf.navigate();
    //}
  },
  refreshAppellantVsARComponents:function() {
    this.view.snLoginAditionalInfo.showOrHideCompanyInfo();
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