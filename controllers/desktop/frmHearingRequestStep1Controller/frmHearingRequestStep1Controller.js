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
  /**
   * @function
   frmHearingRequestStep1
   *
   */
  onNavigate:function(){
    gblSettings(this);
    currentFlow = "Hearing Request";
	this.view.preShow = this.preShow;
    this.view.headerCancelRHearing.toHearingRequest("frmAppellantDash");
    this.view.fContinueButton.navigatingBFormsOnlyContinue("frmHearingRequestStep2");
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    if(gblIsARUser){
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } 
    else{
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    }
    this.setComponentData();
    this.view.onBreakpointChange = this.onBreakpointChange;
    this.view.postShow = this.postShowOps;  
    addToFlow(this.view.id, this.view);    
  },
  preShow: function(eventobject){
	voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },
  postShowOps:function() {
	this.view.forceLayout(); 
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
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },
  setComponentData:function() {
    this.view.snLetsGetStarted.textLblTitle1 = "Do you disagree with the actions that the county agency has taken on your case?";
    this.view.snLetsGetStarted.textLblDesc1 = "We are here to help guide you through the process of how to request a hearing. In a few quick and easy steps we will help you to request a hearing and provide any documents for your case.";
  	
    var dataRows = [];
    var dataRow1 = {"lblemptySpace":" ", "lblNameItemList":"Your Case Number", "lblUILine":""};
    var dataRow2 = {"lblemptySpace":" ", "lblNameItemList":"Benefits Program Information", "lblUILine":""};
    var dataRow3 = {"lblemptySpace":" ", "lblNameItemList":"Any documents related to your case", "lblUILine":""};
    
    dataRows.push(dataRow1);
    dataRows.push(dataRow2);
    dataRows.push(dataRow3);
    
    this.view.snLetsGetStarted.data = dataRows;
  },
  
  goToAppellantDash:function() {
    var ntf = new kony.mvc.Navigation("frmAppellantDash");
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