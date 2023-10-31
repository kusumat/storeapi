var appellantInfo = {};

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
    isSummaryEdit = false;
	this.view.preShow = this.preShow;    
    if (params !== undefined && params.isSummaryEdit !== undefined) {
      isSummaryEdit = params.isSummaryEdit;
      appellantInfo = params.appellantInfo;
      params = params.appellantInfo;
    }    

    if (gblIsARUser) {
      appellantInfo = params;
      this.view.headerCancelRHearing.toHearingRequest(gblARHearingFrom);      
      this.view.lblTextHeaderStep5.text = "Did your Appellant receive a notice?";
      this.view.miniBoxARAppealInfo.setData(params);
      this.view.miniBoxARAppealInfo.onUpdateClick("frmARHearingRequestStep2");
      this.view.miniBoxARAppealInfo.setVisibility(true);
      this.view.miniBoxARAppealInfo.isVisFlxMainContainer = true;
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } else {
      this.view.headerCancelRHearing.toHearingRequest("frmAppellantDash");
      this.view.lblTextHeaderStep5.text = "Did you receive a notice?"; 
      this.view.miniBoxARAppealInfo.setVisibility(false);
      this.view.miniBoxARAppealInfo.isVisFlxMainContainer = false;
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    }
    this.view.fContinueBackButton.btnBackOnClick = this.handleGoBack;
    this.view.fContinueBackButton.btnContinueOnClick = this.validateInput;
    this.view.snProvideCaseNumber.btnMissingCaseNumberOnClick = this.noCaseNumber;
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    //this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    this.setARStepNumbers();
    this.view.onBreakpointChange = this.onBreakpointChange;
    this.view.postShow = this.postShowOps;    
    this.view.forceLayout();
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
  handleGoBack:function() {
    if(gblIsARUser) {
      this.navigateToNesxtPage("frmARHearingRequestStep2");
    }
    else {
      this.navigateToNesxtPage("frmHearingRequestStep1");
    }
  },

  setARStepNumbers:function() {
    if(gblIsARUser) {
      //adjust numbers
      this.view.lblNumberOfStep2.text = 3;
      this.view.lblNumberOfStep3.text = 4;
      this.view.lblNumberOfStep4.text = 5;
      this.view.lblNumberOfStep5.text = 6;
      this.view.lblNumberOfStep6.text = 7;
      this.view.lblTextHeaderStep6.text = "Upload documents for their case?";
      this.view.lblNumberOfStep7.text = 8;
      this.view.lblTextHeaderStep7.text = "Special Accomodations";
      this.view.lblNumberOfStep8.text = 9;
    }
  },

  validateInput:function() {
    var caseNumber = this.view.snProvideCaseNumber.txtBoxEnterCaseNumberText;
    caseNumber = caseNumber.trim();
    var isNumeric = kony.string.isNumeric(caseNumber);
    var containsPeriod = kony.string.containsChars (caseNumber, ['.']);
    var nextPage = "frmHearingRequestStep3";
    if(isSummaryEdit) {
      nextPage = "frmHearingRequestStep8";
    }
    if(isNumeric && !containsPeriod) {
      hearingRequest.caseNumber = caseNumber;
      this.navigateToNesxtPage(nextPage);
    }
    else {
      if(caseNumber !== "") {
        hearingRequest.caseNumber = ""; 
        alert("Case Number must be numeric");          
      }
      else {
        this.navigateToNesxtPage(nextPage);
      }
    }    
  },

  navigateToNesxtPage:function(nextPage) {
    var ntf = new kony.mvc.Navigation(nextPage);
    ntf.navigate(appellantInfo);    
  },

  noCaseNumber:function() {
    this.view.snProvideCaseNumber.txtBoxEnterCaseNumberText = "";
    hearingRequest.caseNumber = "";
    var ntf = new kony.mvc.Navigation("frmHearingRequestStep3");
    ntf.navigate(appellantInfo);    
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