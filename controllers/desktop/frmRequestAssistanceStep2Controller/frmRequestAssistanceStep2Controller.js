var docTypeId = "";
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

  onNavigate:function(params) {
    gblSettings(this);
    this.params = params;
    docTypeId = params.docTypeId;
    this.view.preShow = this.preShow;
    this.view.fContinueBackButton.btnBackOnClick = this.navigateBack;
    this.view.fContinueBackButton.btnContinueOnClick = this.navigateForward;
    this.view.headerCancelRHearing.onCancelClick = this.navigateOnCancel;
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.view.onBreakpointChange = this.onBreakpointChange;    
    this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType();
    this.view.snAppealToReschedule.reset();
    this.view.forceLayout();
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
    adjustRequestAssistanceSummary(this.view, width);
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },   

  navigateForward:function() {
    if(selectedAppeals.size === 0) {
      alert("Select at least one Appeal");
    }
    else {
      this.setDataForMiniBoxSelectedAppeals();
      var ntf = new kony.mvc.Navigation("frmRequestAssistanceStep3");
      ntf.navigate(this.params);    
    }
  },

  navigateBack:function() {
    var ntf = new kony.mvc.Navigation("frmRequestAssistanceStep1");
    ntf.navigate(this.params);          
  },

  navigateOnCancel:function() {
    resetFlow();
    var ntf = new kony.mvc.Navigation("frmAppealDetails");
    ntf.navigate();
  },

  getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType:function(){
    operationName = "getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType";
    var data = {
      "appealId": gblSelectedAppealId, 
      "hatsUserId": testHatsUserId, 
      "docType": docTypeId
    };
    var headers = {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure);
  },    

  getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess:function(response){
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errServerAppealsAndDispositions;
        response.userAction = apiActions.actionWait;
        navigateToErrorPage(response);  
      }
      else
      {
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.errorStatus = response.errorStatus;
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }   
        else 
        {      
          if(response.associatedAppealsWithDispositions !== null && response.associatedAppealsWithDispositions !== undefined) {
            var appealsWithDispositions = response.associatedAppealsWithDispositions;

            for(var i = 0; i < appealsWithDispositions[0].associatedAppealsAndDispositions.length; i++) {
              var appeal = appealsWithDispositions[0].associatedAppealsAndDispositions[i]; 
              selectedAppeals.set(appeal.appealNbr, appeal);
              selectedAppeals2.set(appeal.appealNbr, appeal);  
            }

            this.view.snAppealToReschedule.setComponentDataForQuickLinksFlows();
            this.view.snAppealToReschedule.forceLayout();
            this.setDataForMiniBoxSelectedAppeals();
            this.view.miniBoxSelectedList.setData(this.params.dataForSelectedAppealsCard);
          }
        }
      }
    }
    this.view.miniBoxSelectedList.forceLayout();
    this.view.forceLayout();
  },

  getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure:function(error){
    alert("No appeals and dispositions found for the input document type.");
    resetFlow();
    var ntf = new kony.mvc.Navigation("frmAppealDetails");
    ntf.navigate();
  },

  setDataForMiniBoxSelectedAppeals:function() {
    var data = [];
    
    selectedAppeals.forEach(function(val, key, map) {
      var program = val.portalProgramDesc !== undefined ? val.portalProgramDesc : val.lblTypeTitle;
      var issue = val.portalIssueCd !== undefined ? val.portalIssueCd : val.lblTextStatus;
      var appealNumber = val.appealNbr !== undefined ? val.appealNbr : val.appealNumber;
      var appealId = val.appealId; 
      
      var row = {
        "lblProgram": program,
        "lblOBName": "",
        "lblIssue": issue,
        "lblAppealId": appealNumber,
        "appealId":val.appealId
      };
      data.push(row);
    });    
    
    if (this.params.dataForSelectedAppealsCard) {
      delete this.params.dataForSelectedAppealsCard;
    }
    Object.assign(this.params, {"dataForSelectedAppealsCard": data});
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