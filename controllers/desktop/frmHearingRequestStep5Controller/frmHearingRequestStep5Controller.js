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
      this.view.lblTextHeaderStep5.text = "Did your Appellant receive a notice?";      
      this.view.miniBoxARAppealInfo.setData(params);
      this.view.miniBoxARAppealInfo.onUpdateClick("frmARHearingRequestStep2");
      this.view.miniBoxARAppealInfo.setVisibility(true);
      this.view.miniBoxARAppealInfo.isVisFlxMainContainer = true;
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
      appellantInfo = params;
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
    this.view.fContinueBackButton.btnSubmitAnotherIssueOnClick = this.submitAnotherIssue;
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    //this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.view.onBreakpointChange = this.onBreakpointChange;
    this.setSummaryValues();
    this.populatePrograms(params);
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
      
      this.view.lblTextHeaderStep5.width = 80 + "%";
     }
    else{
      this.view.mainHeaderScreens.height ='100px';   
      heightAdjust = (135/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";     
    }   

    this.view.flxGroupContent.height = kony.os.deviceInfo().screenHeight + "px";      								   
    this.view.flxContainerBody.height = "100%";
                                                                                                                                        
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
    adjustSummarySection(form, width);
    this.view.forceLayout();
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
    var ntf = new kony.mvc.Navigation("frmHearingRequestStep4");
    ntf.navigate(appellantInfo);    
  },

  populatePrograms: function(params) {
    var isBack = false;
    if (params !== undefined && params.isBack !== undefined) {
      isBack = params.isBack;
    }    
    var entries;
    var element;
    var program;
    var issue;
    var entry;

    if (!isBack) {
      if (gblBenefitsProgram !== "" && gblWhatHappenedText !== "") {
        //check for existing program / issue combination
        var comboExists = false; 
        if(!Object.entries) {
          programsAndIssues.forEach(function(entry) {
            program = entry[0];
            issue = entry[1];
            issueComments = entry[3];
            if(issue === gblWhatHappenedText && program === gblBenefitsProgram) {
              comboExists = true;
              //            break;
            }
          });           
        }
        else {
          entries = programsAndIssues.entries();
          element = entries.next();
          while(!element.done) {
            entry = element.value[1];
            program = entry[0];
            issue = entry[1];
            issueComments = entry[3];
            if(issue === gblWhatHappenedText && program === gblBenefitsProgram) {
              comboExists = true;
              break;
            }
            element = entries.next();
          }        
        }

        var newEntryExists = false;
        if(!Object.entries) {
          programsAndIssues.forEach(function(entry, key, map) {
            program = entry[0];
            issue = entry[1];
            //***** adding an issue to a newly selected program
            if(issue === "" && program === gblBenefitsProgram) {
              //if the specific combination exists then delete the new row that has a blank issue.
              //otherwise, if the combination does not exist then add the issue information.
              if(comboExists) {
                programsAndIssues.delete(key);
              }			            
              else {
                entry[1] = gblWhatHappenedText;
                entry[2] = gblWhatHappenedCode; 
                entry[3] = gblWhatHappenedComments; 
              }
              newEntryExists = true;
              //			break;
            }
          });          
        }
        else {
          entries = programsAndIssues.entries();
          element = entries.next();
          while(!element.done) {
            entry = element.value[1];
            program = entry[0];
            issue = entry[1];
            issueComments = entry[3];
            
            //***** adding an issue to a newly selected program
            if(issue === "" && program === gblBenefitsProgram) {
              //if the specific combination exists then delete the new row that has a blank issue.
              //otherwise, if the combination does not exist then add the issue information.
              if(comboExists) {
                programsAndIssues.delete(element[0]);
              }			            
              else {
                entry[1] = gblWhatHappenedText;
                entry[2] = gblWhatHappenedCode; 
                entry[3] = gblWhatHappenedComments; 
              }
              newEntryExists = true;
              break;
            }
            element = entries.next();
          }
        }

        //if new entry does not exist then we must be editing the last entry
        var entriesSize = programsAndIssues.size;
        var index = 0;

        if(!Object.entries) {
          programsAndIssues.forEach(function(entry, key, map) {
            program = entry[0];
            issue = entry[1];
            if(issue === "" && program === gblBenefitsProgram) {
              //if the specific combination exists then delete the new row that has a blank issue.
              //otherwise, if the combination does not exist then add the issue information.
              if(comboExists) {
                programsAndIssues.delete(key);
              }			            
              else {
                entry[1] = gblWhatHappenedText;
                entry[2] = gblWhatHappenedCode; 
                entry[3] = gblWhatHappenedComments;
              }
              newEntryExists = true;
              // 			break;
            }
            index++;
            if(index === entriesSize) {
              //if the last entry has the same Program then change the Issue, 
              //might change to find most recently added program instead of always the last record
              if(program === gblBenefitsProgram) {
                entry[1] = gblWhatHappenedText;
                entry[2] = gblWhatHappenedCode; 
                entry[3] = gblWhatHappenedComments;
              }
            }
          });         
        }
        else {
          entries = programsAndIssues.entries();
          element = entries.next();
          while(!element.done) {
            entry = element.value[1];
            program = entry[0];
            issue = entry[1];
            issueComments = entry[3];
            if(issue === "" && program === gblBenefitsProgram) {
              //if the specific combination exists then delete the new row that has a blank issue.
              //otherwise, if the combination does not exist then add the issue information.
              if(comboExists) {
                programsAndIssues.delete(element[0]);
              }			            
              else {
                entry[1] = gblWhatHappenedText;
                entry[2] = gblWhatHappenedCode;
                entry[3] = gblWhatHappenedComments;
              }
              newEntryExists = true;
              break;
            }
            index++;
            if(index === entriesSize) {
              //if the last entry has the same Program then change the Issue, 
              //might change to find most recently added program instead of always the last record
              if(program === gblBenefitsProgram) {
                entry[1] = gblWhatHappenedText;
                entry[2] = gblWhatHappenedCode; 
                entry[3] = gblWhatHappenedComments;
              }
            }
            element = entries.next();
          }          
        }
        isAddAnother = false;
      }
    }
    var dataRows = [];
    if(!Object.entries) {
      programsAndIssues.forEach(function(entry) {
        program = entry[0];
        issue = entry[1];
        var dataRow = {"lblProgram": program,"lblIssue": issue};
        dataRows.push(dataRow);
      });         
    } else {
      entries = programsAndIssues.entries();
      element = entries.next();
      while(!element.done) {
        entry = element.value[1];
        program = entry[0];
        issue = entry[1];
        var dataRow = {"lblProgram": program,"lblIssue": issue};
        dataRows.push(dataRow);
        element = entries.next();
      }
    }
    this.view.miniBoxSummaryHearing.sgmProgramIssueSetData(dataRows);
  },
  
  submitAnotherIssue: function() {
    gblBenefitsProgram = "";
    
    gblWhatHappenedText = "";
    gblWhatHappenedCode = "";
    gblWhatHappenedComments = "";
    gblEditIssue = false;
    var ntf = new kony.mvc.Navigation("frmHearingRequestStep3");
    var params = {
	  "isAddAnother": true,
	  "appellantInfo": appellantInfo
	};
    ntf.navigate(params);
  },
  
  validateInput: function() {
    gblReceivedNoticeDate = this.view.snReceiveNotice.getReceivedNoticeDate();
    if (gblReceivedNotice === "") {
      alert("Were you sent a Notice? Select \"Yes\" or \"No\"");
    } else if (gblReceivedNotice === "Yes" && gblReceivedNoticeDate === "") {
      alert("Enter the date the notice was sent");
    } else if (this.isFutureDate(gblReceivedNoticeDate)) {
      alert("Notice date must be prior to today.");
    } else {
      hearingRequest.noticeDateInd = gblReceivedNotice === "Yes" ? "Y" : "N";
      if (hearingRequest.noticeDateInd === "N") {
        gblReceivedNoticeDate = "";
      }
      hearingRequest.noticeDate = gblReceivedNoticeDate;
      var nextPage = "frmHearingRequestStep6";
      if(isSummaryEdit) {
        nextPage = "frmHearingRequestStep8";
      }      
      var ntf = new kony.mvc.Navigation(nextPage);
      ntf.navigate(appellantInfo);
    }
  },
  
  setSummaryValues: function() {
    this.view.miniBoxSummaryHearing.lblDescCaseNumbSummary = hearingRequest.caseNumber;
    this.view.miniBoxSummaryHearing.lblDescReceivedNoticeText = gblReceivedNoticeDate;
    if (gblReceivedNotice === ""){
      this.view.snReceiveNotice.resetReceivedNoticeSelection();
    }
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
  
  displayProfileMenu:function() {
    displayProfileMenu(this.view);
  },

  selectProfileMenuItem:function() {
    selectProfileMenuItem(this.view);
  },  

  isFutureDate:function(noticeDate) {
    var rightNow = new Date();
    rightNow.setDate(rightNow.getDate() + -1);
    var dateEntered = new Date(noticeDate);
    if (rightNow < dateEntered) {
      return true;
    } else {
      return false;
    }
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