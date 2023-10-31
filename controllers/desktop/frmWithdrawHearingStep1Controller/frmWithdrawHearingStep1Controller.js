var withdrawType="";
var appealId="";
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
    
    currentFlow = "Withdraw Appeal";
    if(data){
      	if(data.withdrawType)
    		this.withdrawType = data.withdrawType;
      	else
          	this.withdrawType = "";
    	if(data.appealId)
    		this.appealId = data.appealId;
      	else
          	this.appealId = "";
    }
    kony.print("data: "+ this.withdrawType);
    selectedAppeals = new Map();
    selectedAppeals2 = new Map();
    var appealDetailsForm = "frmAppealDetails";
    if(gblIsARUser){
      appealDetailsForm = "frmGeneralAppealDetails";
    }
    this.view.headerCancelRHearing.toHearingRequest(appealDetailsForm);    
    this.view.miniBoxSelectedList.lblRescheduleSummaryHeaderText ="Withdrawing Appeal(s)";
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    if(gblIsARUser){
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } 
    else{
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);  
    }
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.view.snHearingInfoDetails.btnRescheduleSetVisibility(false);
    this.view.fContinueButton.btnContinueOnClick = this.navigateToAppealList;
	this.setHearingInformation();
    this.view.snHearingInfoDetails.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeWithdraw(this);
    if(this.withdrawType == "AA"){
      this.view.snLetsGetStarted.hideForAA();
      this.view.headerCancelRHearing.lblRequestCancelText="Withdraw Admin Appeal";
      currentFlow = "Withdraw Admin Appeal";
      this.view.snLetsGetStarted.textLblTitle1 ="Withdrawing Admin Appeal Request";
    }
	this.view.preShow = this.preShow;
    this.view.onBreakpointChange = this.onBreakpointChange;    
    this.view.forceLayout();
    withdraw_reasons_key = "";
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

  navigateToAppealList:function() {
    var navigator = new kony.mvc.Navigation("frmWithdrawHearingStep11", null);
    navigator.navigate({"withdrawType": this.withdrawType});
  },

  setSummaryValues:function() {
	var data = [];
    selectedAppeals.forEach(function(val, key, map) {
	  data.push(val);
    });
    try{
    this.view.miniBoxSelectedList.setData(data);
    this.view.forceLayout();
    }catch(err){
      kony.print("setSummaryValues"+err);
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