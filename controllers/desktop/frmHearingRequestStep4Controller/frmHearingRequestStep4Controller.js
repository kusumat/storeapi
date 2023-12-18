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
	if (gblIsARUser) {
	  this.view.headerCancelRHearing.toHearingRequest(gblARHearingFrom);
      this.view.lblTextHeaderStep5.text = "Did your Appellant receive a notice?";
	  if (params.appellantInfo !== undefined) {
		this.view.miniBoxARAppealInfo.setData(params.appellantInfo);
		appellantInfo = params.appellantInfo;
	  } else {
		this.view.miniBoxARAppealInfo.setData(params);
		appellantInfo = params;
	  }
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
	this.view.preShow = this.preShow;
    this.view.fContinueBackButton.btnBackOnClick = this.navigateBack;
    this.view.fContinueBackButton.btnContinueOnClick = this.validateInput;
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    // this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    this.view.onBreakpointChange = this.onBreakpointChange;
    this.setSummaryValues();
    this.populatePrograms(params); 
    this.loadSelections(params);
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

  navigateBack:function() {
    var ntf = new kony.mvc.Navigation("frmHearingRequestStep3");
    ntf.navigate(appellantInfo);    
  },
  
  loadSelections:function(params) {
    var isBack = false;
    if (params !== undefined && params.isBack !== undefined) {
      isBack = params.isBack;
    }
    if (params !== undefined && params.isSummaryEdit !== undefined) {
      isSummaryEdit = params.isSummaryEdit;
      appellantInfo = params.appellantInfo;
      params = params.appellantInfo;
    }   
    var containsEmptyIssue = this.containsEmptyIssue();

    if(isSummaryEdit) {
      this.view.snWhatHappend.setWhatHappenedData();
      this.view.snWhatHappend.setSelectedIssue(gblWhatHappenedCode);
    }
    else if(!isBack && (containsEmptyIssue || gblEditIssue || gblWhatHappenedText === "")) {
      gblEditIssue = false;
      this.view.snWhatHappend.setWhatHappenedData();  
    }    
  },

  populatePrograms: function(params) {
    var entries;
    var element;
    var program;
    var issue;
    var issueComments;
    var entry;
    var isBack = false;
    var isAddAnother = false;

    if (params !== undefined && params.isBack !== undefined) {
      isBack = params.isBack;
    }
    if (params !== undefined && params.isAddAnother !== undefined) {
      isAddAnother = params.isAddAnother;
    }

    if (!isBack) {
      if (gblBenefitsProgram !== "") {
        if(isAddAnother || programsAndIssues.size === 0) {
          var programsAndIssuesSize = programsAndIssues.size;
          programsAndIssues.set(new Date().getTime(), [gblBenefitsProgram, "", ""]);
        }
      }
    }
    var dataRows = [];
    var issueNumber = -1;
              
    if(!Object.entries) { //IE11
      programsAndIssues.forEach(function(entry) {
        var program = entry[0];
        var issue = entry[1];
        var issueCode = entry[2];            
        var issueComments = entry[3];
        var issueNumber = entry[4]; 
        var dataRow = {
            "lblProgram": program,
            "lblIssue": issue,
            "issueCode": issueCode,
            "issueComments": issueComments,
            "issueNumber": issueNumber
          }; 
        dataRows.push(dataRow);
      }); 	
    }
    else {
      entries = programsAndIssues.entries();
      element = entries.next();
      while(!element.done) {
        entry = element.value[1];
        program = entry[0];
        issue = entry[1];
        issueCode = entry[2];            
        issueComments = entry[3];
        issueNumber++;
        var dataRow = {
            "lblProgram": program,
            "lblIssue": issue,
            "issueCode": issueCode,
            "issueComments": issueComments,
            "issueNumber": issueNumber
          }; 
        dataRows.push(dataRow);
        element = entries.next();        
      }
    }
    this.view.miniBoxSummaryHearing.sgmProgramIssueSetData(dataRows);
  },

  validateInput: function() {
    var selectedKey = this.view.snWhatHappend.getSelectedKey();
    if (gblWhatHappenedText.toLowerCase() === "other" && gblWhatHappenedComments === "")
    {
      alert("Comments are required when Other is selected");
    }
    else
    {
      if (selectedKey === null || selectedKey === undefined || selectedKey === "") {
        alert("Select What happened");
      } else {
        var nextPage = "frmHearingRequestStep5";
        if(isSummaryEdit) {
          nextPage = "frmHearingRequestStep8";
          this.updateProgramsAndIssues();
        }
        else{
          var issueNumber = -1;
          if(!Object.entries) {
            
            programsAndIssues.forEach(function(entry, key, map) {
              issueNumber++;
              program = entry[0];
              issue = entry[1];
              //***** adding an issue to a newly selected program
              if(entry[4] === issueNumber) {
                entry[1] = gblWhatHappenedText;
                entry[2] = gblWhatHappenedCode; 
                entry[3] = gblWhatHappenedComments; 
                entry[4] = issueNumber;
                newEntryExists = true;
              }
            });          
          }
          else {
            entries = programsAndIssues.entries();
            element = entries.next();
            while(!element.done) {
              issueNumber++;
              entry = element.value[1];
              program = entry[0];
              issue = entry[1];
              issueComments = entry[3];

              //***** adding an issue to a newly selected program
              if(issue === "" && program === gblBenefitsProgram) {
                //if the specific combination exists then delete the new row that has a blank issue.
                //otherwise, if the combination does not exist then add the issue information.
                entry[1] = gblWhatHappenedText;
                entry[2] = selectedKey; 
                entry[3] = gblWhatHappenedComments; 
                entry[4] = issueNumber;
                newEntryExists = true;
                break;
              }
              element = entries.next();
            }
          }
            
        }
        var ntf = new kony.mvc.Navigation(nextPage);
        ntf.navigate(appellantInfo);
      }
    }
  },

  updateProgramsAndIssues:function() {

    var entries;
    var element;
    var program;
    var issue;
    var issuseCode;
    var issueComments;
    var issueNumber;
    var entry;
    
    entries = programsAndIssues.entries();
    element = entries.next();
    while(!element.done) {
      entry = element.value[1];
      program = entry[0];
      issue = entry[1];
      issueCode = entry[2];
      issueComments = entry[3];
      issueNumber = entry[4];
      if(issueNumber === gblIssueNumber) {
        entry[1] = gblWhatHappenedText;
        entry[2] = gblWhatHappenedCode; 
        entry[3] = gblWhatHappenedComments; 
        break;
      }
      newEntryExists = true;
      element = entries.next();
    }        
    isAddAnother = false;
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
  },

  containsEmptyIssue:function() {
    var containsEmptyIssue = false;
    if(!Object.entries) {
      programsAndIssues.forEach(function(entry) {
        var program = entry[0];
        var issueCode = entry[2];
        if (issueCode === "") {
          containsEmptyIssue = true;
          //        break;
        }
      });       
    }
    else {
      var entries = programsAndIssues.entries();
      var element = entries.next();
      while(!element.done) {
        var entry = element.value[1];        
        var issueCode = entry[2];
        if (issueCode === "") {
          containsEmptyIssue = true;
          break;
        }
        element = entries.next();
      }    
    }

    return containsEmptyIssue;
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