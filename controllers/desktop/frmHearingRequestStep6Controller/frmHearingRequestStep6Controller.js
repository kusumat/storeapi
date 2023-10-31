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
  
  onNavigate: function(params) {
    gblSettings(this);
    isSummaryEdit = false;
    if (params !== undefined && params.isSummaryEdit !== undefined) {
      isSummaryEdit = params.isSummaryEdit;
      appellantInfo = params.appellantInfo;
      params = params.appellantInfo;
    } 
	if (gblIsARUser) {
	  this.view.headerCancelRHearing.toHearingRequest(gblARHearingFrom);
	  this.view.miniBoxARAppealInfo.setData(params);
	  this.view.miniBoxARAppealInfo.onUpdateClick("frmARHearingRequestStep2");
	  this.view.miniBoxARAppealInfo.setVisibility(true);
      this.view.miniBoxARAppealInfo.isVisFlxMainContainer = true;
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
	  appellantInfo = params;
	} else {
	  this.view.headerCancelRHearing.toHearingRequest("frmAppellantDash");
	  this.view.miniBoxARAppealInfo.setVisibility(false);
      this.view.miniBoxARAppealInfo.isVisFlxMainContainer = false;
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
	}
	this.view.preShow = this.preShow;
    this.view.fContinueBackButton.btnBackOnClick = this.navigateBack;
    this.view.fContinueBackButton.btnContinueOnClick = this.validateInput;
    this.view.snDocumentsToProvide.btnMissingDocumentsOnClick = this.validateInput;
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;

    this.view.snDocumentsToProvide.setComponentData();
    this.view.onBreakpointChange = this.onBreakpointChange;
    
    this.setSummaryValues();
    addToFlow(this.view.id, this.view);
    this.setARStepNumbers();    
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
      
      this.view.lblTextHeaderStep6.width = 80 + "%"; 
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
    adjustSummarySection(form, width);
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },  
  
  navigateBack:function() {
    var ntf = new kony.mvc.Navigation("frmHearingRequestStep5");
    ntf.navigate(appellantInfo);    
  },
  
  validateInput:function() {
	if(gblIsARUser) {
      //if document is empty show alert
      if(gblUploadedFileName === "") {
        alert("Document is required");
      }
      else {
        if (gblARFormAttached === false)
        {
          alert("Please indicate that you have uploaded the Authorized Representative Form signed by the Appellant.");
        }
        else {
          this.navigateForward(); 
        }
      }
    }    
    else {
      this.navigateForward();
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
  
  setSummaryValues: function() {
    this.view.miniBoxSummaryHearing.lblDescCaseNumbSummary = hearingRequest.caseNumber;
    this.view.miniBoxSummaryHearing.lblDescReceivedNoticeText = gblReceivedNoticeDate;
    var displayCaseNumber = hearingRequest.caseNumber === "" ? false : true;
    var displayNotice = gblReceivedNoticeDate === "" ? false : true;
    if (!displayCaseNumber && displayNotice) {
      this.view.miniBoxSummaryHearing.flxCaseNumberIsVisible = true;
      this.view.miniBoxSummaryHearing.lblTlteCaseNumberIsVisible = displayCaseNumber;
      this.view.miniBoxSummaryHearing.flxStatusNumbSummaryIsVisible = displayCaseNumber;
      this.view.miniBoxSummaryHearing.flxReceivedNoticeisVisible = displayNotice;
    } else {
      this.view.miniBoxSummaryHearing.lblTlteCaseNumberIsVisible = displayCaseNumber;
      this.view.miniBoxSummaryHearing.flxStatusNumbSummaryIsVisible = displayCaseNumber;
      this.view.miniBoxSummaryHearing.flxCaseNumberIsVisible = displayCaseNumber;
      this.view.miniBoxSummaryHearing.flxReceivedNoticeisVisible = displayNotice;
    }
    this.populatePrograms();
  },
  populatePrograms: function() {
    var dataRows = [];
    if(!Object.entries) { //IE11
      programsAndIssues.forEach(function(entry) {
        var program = entry[0];
        var issue = entry[1];
        var issueComments = entry[3];
        var dataRow = {
          "lblProgram": program,
          "lblIssue": issue
        };
        dataRows.push(dataRow);
      });        
    }
    else {
      var entries = programsAndIssues.entries();
      var element = entries.next();
      while(!element.done) {
        var entry = element.value[1];
        var program = entry[0];
        var issue = entry[1];
        var issueComments = entry[3];
        var dataRow = {
          "lblProgram": program,
          "lblIssue": issue
        };
        dataRows.push(dataRow);
        element = entries.next();          
      }
    }    
    this.view.miniBoxSummaryHearing.sgmProgramIssueSetData(dataRows);
  },
  navigateForward: function() {
    var nextPage = "frmHearingRequestStep7";
    if(isSummaryEdit) {
      nextPage = "frmHearingRequestStep8";
    }      
    var ntf = new kony.mvc.Navigation(nextPage);
    ntf.navigate(appellantInfo);
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
