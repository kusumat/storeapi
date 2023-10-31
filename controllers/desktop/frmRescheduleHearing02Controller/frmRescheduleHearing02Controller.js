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
    var formCancel = "";
    if (gblIsARUser) {
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
      formCancel = "frmGeneralAppealDetails";
    } 
    else {
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
      formCancel = "frmAppealDetails";
    }
	this.view.preShow = this.preShow;    
    this.view.headerCancelRHearing.toHearingRequest(formCancel);
    this.setHearingInformation();
    this.view.snAppealToReschedule.setComponentData(gblRescheduleHearingAppealsList);
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.view.fContinueBackButton.btnBackOnClick = this.navigateBack;
    this.view.fContinueBackButton.btnContinueOnClick = this.validateInput;
    this.setSummaryValues();
    this.view.onBreakpointChange = this.onBreakpointChange; 
    rescheduleHearingRequest.appealIds = [];  
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
    }
    else{
      this.view.mainHeaderScreens.height ='100px';   
      heightAdjust = (135/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";     
    }   

    this.view.flxGroupContent.height = kony.os.deviceInfo().screenHeight + "px";      								   
    this.view.flxContainerContentStep.height = "100%";
    
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

  navigateBack:function() {
		var formName = "frmRescheduleHearing01";
    	var ntf = new kony.mvc.Navigation(formName);
      	ntf.navigate();
   },
  
  validateInput:function() {
 
    var appealIds = selectedAppeals.size;
    if(appealIds === 0) {
      alert("Select one or more Appeals");
    }
    else {
      var formName = "frmRescheduleHearing22";
	  this.setSelectedApeals();
      var ntf = new kony.mvc.Navigation(formName);
      ntf.navigate();      
    }
  },

  setSummaryValues:function() {
	var data = [];
    selectedAppeals.forEach(function(val, key, map) {
	  data.push(val);
    });    
    this.view.miniBoxSelectedList.setData(data);
    this.view.forceLayout();
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