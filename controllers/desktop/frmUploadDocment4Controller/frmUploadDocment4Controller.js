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

    if (flowName === "Request Admin Appeal") {
      this.view.lblNumberOfStep6.text = "3";
      this.view.headerCancelRHearing.lblRequestCancelText = "Upload Admin Appeal";
    }

    if (flowName === "Request - CR") {
      this.view.lblNumberOfStep6.text = "3";
      this.view.headerCancelRHearing.lblRequestCancelText="Upload County Review Document";
    }
    
    if (flowName === "MCP Denial Form") 
      this.view.headerCancelRHearing.lblRequestCancelText="Upload MCP Denial Document";

    if (flowName === "Exhibit - County") 
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Exhibit - County Document";
    
    if (flowName === "Appeal Summary") 
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Appeal Summary Document";

    if (flowName === "Compliance") 
     this.view.headerCancelRHearing.lblRequestCancelText="Upload Compliance Document";

	this.view.headerCancelRHearing.onCancelClick = this.navigateOnDone;
    this.view.fContinueButton.btnContinueOnClick = this.navigateOnDone;
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    if(gblIsARUser){
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } 
    else{
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);  
    }
    this.view.miniBoxSelectedList.lblRescheduleSummaryHeaderText ="Selected Appeals";
    if(params.dataForSelectedAppealsCard) {
      this.view.miniBoxSelectedList.setData(params.dataForSelectedAppealsCard);
    }
    this.view.onBreakpointChange = this.onBreakpointChange; 
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
	this.view.snDocCauses.setFileName(gblUploadedFileName);
    this.view.snDocCauses.isVisibleBtnDel = false;
    this.view.snDocCauses.isVisiblelblTitleAchievedDate = params.complianceType === "4";
    this.view.snDocCauses.isVisibleflxGroupAchievedDate = params.complianceType === "4";
    this.view.snDocCauses.setAchievedDate(params.achievedDate);
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
    appealsSummaryLayoutDirection(this.view, width);
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },
  
  navigateOnDone:function() {
    this.view.snDocCauses.removeDocument();
    var ntf;
    
    // TODO: refactored as a switch statement

    var frmNext = null;
    switch (flowName) {
      case "MCP Denial Form":
      case "Exhibit - County":
      case "Appeal Summary":
      case "Compliance":
        frmNext = "frmGeneralAppealDetails";
        break;
      case "Request - CR":
      case "Request Admin Appeal":
    	frmNext = "frmAppellantDash";
        break;
      case "Upload Hearing Document":
        if (gblIsARUser) {
          frmNext = "frmGeneralAppealDetails";
        } else {
          frmNext = "frmAppealDetails";
        }
		break;        
      default:
        frmNext = dashboardPage;
    }
    ntf = new kony.mvc.Navigation(frmNext);
    resetFlow();
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