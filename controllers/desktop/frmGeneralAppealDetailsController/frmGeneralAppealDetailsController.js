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
    currentFlow = "Not Started";
    dismissLoadingIndicator();
    //always reload data unless told not to such as the initial load
    var reloadData = true;
    if(params !== undefined && params.reloadData !== undefined) {
      reloadData = params.reloadData;
    }
    selectedAppeals = new Map();
    selectedAppeals2 = new Map();
    this.view.preShow = this.preShow;
    this.view.subNavigationHeaders.subHeaderBackOnClick = this.goToAppellantDash;
    this.view.subNavigationHeaders.btnArrowLeftNavBackOnClick = this.goToAppellantDash;
    this.setAppellentDemographics();
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    if(gblIsARUser){
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } 
    else{
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    }
    if(reloadData) {
      this.loadDocumentLists();  
    }
    this.setDocumentTypeInfo();
    this.setAppealDetailInfo();
    this.setHearingInformation();
    this.view.snAuthorizedRepresentativesDetails.loadAR(this);
    this.view.snStateHearingDetails.setDocumentData();
    this.view.snStateHearingDetails.setAssociatedAppealData();
    this.view.snCompliance.setDocumentData();
    this.view.snCompliance.setComplianceAgencies();
    this.view.snGeneralInfoDetails.reset();
    this.view.snGeneralInfoDetails.setComponentData();
    this.view.onBreakpointChange = this.onBreakpointChange;
  },
  preShow: function(eventobject){
	voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },  
  onBreakpointChange: function(form, width){
    try{
    amplify.publish("authorizedDash", form, width);
    this.view.navFooterBarPostLogin.breakPointChange(width);
    
    this.view.subNavigationHeaders.height = "35px";
    heightAdjust = 0;
    if(width <= gblBreakPoint){ 
      this.view.mainHeaderScreens.height ='130px'; 
      this.view.snGeneralInfoDetails.height='420px';
      heightAdjust = (165/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";
    }
    else{
      this.view.mainHeaderScreens.height ='100px';
      this.view.snGeneralInfoDetails.height='240px';
      heightAdjust = (135/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%"; 
    }      	                                                                                                                         
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },  
  
  loadDocumentLists:function() {
    gblAppellantDocuments = [];
    gblComplianceDocuments = [];
    operationName =  "viewDocumentListByAppealIdAndHatsUserId";
    var data= {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};
    var headers= {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, 
                                   this.loadDocumentListsSuccess, 
                                   this.loadDocumentListsFailure);
  },

  loadDocumentListsSuccess:function(response) {
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errServerDemographics;
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
        var complianceKeyword = "compliance";
        if(response.docList !== undefined && response.docList !== null) {
          var docListAll = response.docList;
          for(var i = 0; i < docListAll.length; i++) {
            var documentTitle = docListAll[i].documentTitle;
            var documentType = docListAll[i].documentType;
            if(documentTitle.toLowerCase().includes(complianceKeyword) || 
               documentType.toLowerCase().includes(complianceKeyword)) {
              gblComplianceDocuments.push(docListAll[i]);  
            }
            else {
              gblAppellantDocuments.push(docListAll[i]);
            }
          }
          this.view.snCompliance.isVisible = docListAll.length > 0;
        }
        this.view.snStateHearingDetails.setDocumentData();
        this.view.snCompliance.setDocumentData();
        this.view.forceLayout();
      }
    }
  },

  loadDocumentListsFailure:function(error) {
    this.navigateOnDone();
  },  

  navigateOnDone: function() {
    ntf = new kony.mvc.Navigation(dashboardPage);
    ntf.navigate();
  },

  setAppealDetailInfo:function() {
    var details = gblAppealDetailInfo;
    if(details !== null && details !== undefined) {
      var showQuickAction = this.view.snQuickActionsBox.getHasWithdrawal();
      gblRequestDate = details.requestDate;
      gblReceivedDate = details.receivedDate;
      gblProgram = details.program;
      details.noticeDate = details.noticeDate === undefined ? "": details.noticeDate;
      details.receivedDate = details.receivedDate === undefined ? "": details.receivedDate;
      details.requestDate = details.requestDate === undefined ? "": details.requestDate;
      details.hearingDate = details.hearingDate === undefined ? "": details.hearingDate;

      this.view.snStateHearingDetails.setComponentData(details.person, details.program, details.noticeDate, 
                                                       details.fairHearingBenefitStatus, 
                                                       details.hearingDate, details.receivedDate, 
                                                       details.caseNumber, details.requestDate, 
                                                       details.appealNumber, details.portalIssueCode, showQuickAction);
      this.addAppealInfoToQuickLinks(details);
    }
  }, 
  
  setHearingInformation:function() {
    var details = gblHearingInfo;
    if(details !== null && details !== undefined) {
      var showQuickAction = this.view.snQuickActionsBox.getHasReschedule();
      details.showQuickAction = showQuickAction;
      this.view.snHearingInfoDetails.setHearingData(details);  
      this.view.snHearingInfoDetails.HearingInfoDetailsIsVisible = gblSnHearingInfoVisible;
    }
  }, 
  
  setDocumentTypeInfo:function() {
    var documentTypes = gblDocumentTypes;
    if(documentTypes !== null && documentTypes !== undefined && documentTypes.length > 0) {
      this.view.snQuickActionsBox.setComponentData(documentTypes);
      this.view.snQuickActionsBox.QuickActionsIsVisible = true;
      this.view.snQuickActionsBox.isVisible = true;
    }
    else {
      this.view.snQuickActionsBox.isVisible = false;  
      this.view.snQuickActionsBox.QuickActionsIsVisible = false;
    }
  },  
  
  setAppellentDemographics:function() {
    this.view.mainHeaderScreens.userNameText = gblDemographicInfo.AppellantFirstName; 
  },  

  goToAppellantDash:function() {
    var ntf = new kony.mvc.Navigation("frmAppellantDash");
    
    if (gblARSearchTab === "Compliance" || gblARSearchTab === "CompletedHearings" || gblARSearchTab === "HearingSchedules")
    {
      ntf = new kony.mvc.Navigation("frmAuthorizedRepDash");
    }
    ntf.navigate();
  },

  displayProfileMenu:function() {
    displayProfileMenu(this.view);
  },

  selectProfileMenuItem:function() {
    selectProfileMenuItem(this.view);
  },  

   displayAppealList:function() {
    this.view.puRemoveARF.loadAppealList(this);
  },
  
  addAppealInfoToQuickLinks:function(data) {
    var appealInfo = {
      "programName": data.PortalProgramDesc,
      "programDescription": data.AppealTypeDesc,
      "personName": data.OhioBenefitsPersonName,
      "caseNumber": data.CaseNumber,
      "issueName": data.PortalIssueCode,
      "hearingDate": data.RequestDate
    };
    this.view.snQuickActionsBox.addAppealInfoToParams(appealInfo);
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
