var isAddAnother = false;
var currentSelection = null;
var isSummaryEdit = false;
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
    if (params !== undefined && params.isSummaryEdit !== undefined) {
      isSummaryEdit = params.isSummaryEdit;
      appellantInfo = params.appellantInfo;
      params = params.appellantInfo;
    }  
    if (gblIsARUser) {
      this.view.headerCancelRHearing.toHearingRequest(gblARHearingFrom);
      this.view.lblTextHeaderStep5.text = "Did your Appellant receive a notice?";
      this.view.miniBoxARAppealInfo.onUpdateClick("frmARHearingRequestStep2");
      this.view.miniBoxARAppealInfo.setVisibility(true);
      this.view.miniBoxARAppealInfo.isVisFlxMainContainer = true;
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
      
      if (params.isAddAnother !== undefined) {
        this.view.miniBoxARAppealInfo.setData(params.appellantInfo);
        appellantInfo = params.appellantInfo;
      } else {
        this.view.miniBoxARAppealInfo.setData(params);
        appellantInfo = params;
      }
    } else {
      this.view.headerCancelRHearing.toHearingRequest("frmAppellantDash");
      this.view.lblTextHeaderStep5.text = "Did you receive a notice?"; 
      this.view.miniBoxARAppealInfo.setVisibility(false);
      this.view.miniBoxARAppealInfo.isVisFlxMainContainer = false;
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    }
    this.view.fContinueBackButton.btnBackOnClick = this.goBack;
    //     this.view.fContinueBackButton.navigatingBFormsBack("frmHearingRequestStep2");
    this.view.fContinueBackButton.btnContinueOnClick = this.validateInput;
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    //this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    if (params !== undefined && params.isAddAnother !== undefined) {
      isAddAnother = params.isAddAnother;
    }
   
	this.view.preShow = this.preShow;
    this.view.onBreakpointChange = this.onBreakpointChange;  
    this.loadSelections();
    this.setSummaryValues();
    this.populatePrograms();
    this.view.forceLayout();
    this.setARStepNumbers();    
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
    adjustSummarySection(form, width);
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
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

  goBack:function() {
    this.navigateToNesxtPage("frmHearingRequestStep2", appellantInfo);
  },

  loadSelections:function() {
    if(isAddAnother) {
      //reload benefit program list and set current selection to null
      currentSelection = null;
      this.view.snBenefitsProgram.loadPortalIssueQuestions();
    }
    else if(isSummaryEdit) {
      currentSelection = gblBenefitsProgram;
      this.view.snBenefitsProgram.setSelectedBenefitsProgram(currentSelection);
    }
    else {
      //set the current selection
      currentSelection = this.view.snBenefitsProgram.getSelectedKey();
    }    
  },

  populatePrograms:function() {

    if (programsAndIssues.size > 0) {
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
      this.view.miniBoxSummaryHearing.flxProgramIssueHeaderIsVisible = true;
      this.view.miniBoxSummaryHearing.flxProgramsIssueInfoisVisible = true;
      this.view.miniBoxARAppealInfo.top = "10px";
      this.view.miniBoxSummaryHearing.sgmProgramIssueSetData(dataRows);
      this.view.forceLayout();
    } else {
      this.view.miniBoxSummaryHearing.flxProgramIssueHeaderIsVisible = false;
      this.view.miniBoxSummaryHearing.flxProgramsIssueInfoisVisible = false;
      this.view.miniBoxARAppealInfo.top = "5px";
    }
  },  

  navigateToNesxtPage:function(nextPage, params) {
    var ntf = new kony.mvc.Navigation(nextPage);
    ntf.navigate(params);    
  },  

  validateInput: function() {
    var selectedKey = this.view.snBenefitsProgram.getSelectedKey();
    if (selectedKey === null || selectedKey === undefined || selectedKey === "") {
      alert("Select a Benefits Program");
    } 
    else 
    {
      if(currentSelection !== null && currentSelection !== selectedKey) {
        gblEditIssue = true;
        programsAndIssues.forEach(function(entry, key, map) {
          program = entry[0];
          issue = entry[1];
          issueComments = entry[3];
          if (currentSelection === program) {
            programsAndIssues.delete(key);
            hasEmptyIssue = true;
          }
        });  
      }
      var params = {
        "isAddAnother": isAddAnother, "isSummaryEdit": isSummaryEdit, "appellantInfo" : appellantInfo
      };
      this.navigateToNesxtPage("frmHearingRequestStep4", params);
    }
  },  

  setSummaryValues: function() {
    this.view.miniBoxSummaryHearing.lblDescCaseNumbSummary = hearingRequest.caseNumber;
    this.view.miniBoxSummaryHearing.lblDescReceivedNoticeText = gblReceivedNoticeDate;
    var displayNotice = gblReceivedNoticeDate === "" ? false : true;
    var displayCaseNumber = hearingRequest.caseNumber === "" ? false : true;
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

