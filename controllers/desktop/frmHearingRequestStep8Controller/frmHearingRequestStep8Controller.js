var appellantInfo = {};

define({ 

  //Type your controller code here 
  /**
   * @function
   *
   */

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
    if (gblIsARUser) {
      this.view.headerCancelRHearing.toHearingRequest(gblARHearingFrom);
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
      appellantInfo = params;
    } else {
      this.view.headerCancelRHearing.toHearingRequest("frmAppellantDash");
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    }
	this.view.preShow = this.preShow;
    this.view.fContinueBackButton.btnBackOnClick = this.navigateBack;
    this.view.fContinueBackButton.btnContinueOnClick = this.sendHearingRequest;
    this.view.snSumaryItems.btnUpdateSummaryOnClick = this.displayUpdatePersonalInfo;
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.setAppellentDemographics();
    this.setFinalSummaryValues();
    this.setARStepNumbers();    
    addToFlow(this.view.id, this.view);
    this.view.onBreakpointChange = this.onBreakpointChange;
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
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },
  
  navigateBack:function() {
    var ntf = new kony.mvc.Navigation("frmHearingRequestStep7");
    ntf.navigate(appellantInfo);    
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

  setAppellentDemographics:function() {
    
    //this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);
    
    this.view.snSumaryItems.setDemographicDataForSummary();
  },  

  displayUpdatePersonalInfo:function() {
    displayUpdateInfoForm(this.view);
  },

  sendHearingRequest:function() {
    showLoadingIndicator();

    //clean up the events due to empty row values
    for(var i = 0; i < hearingRequest.eventDetails.length; i++) {
      var event = hearingRequest.eventDetails[i];
      var eventName = event.eventName;
      var eventDate = event.eventDate;
      if(eventName === "" && eventDate === "") {
        hearingRequest.eventDetails.splice(i);
      }
    }
    if(!Object.entries) {
      programsAndIssues.forEach(function(entry) {
        var program = entry[0];
        var issue = entry[1];
        var issueComments = entry[3];

        var SpCharacter = decodeString('&#92;&#92;');
        issueComments = issueComments.split(decodeString('&#92;')).join(SpCharacter);

        while(issueComments.indexOf("\n") != -1)
        {
          issueComments = issueComments.replace("\n","\\\\n");
        }

        var stateHearingRequest = {"programDesc": program, "portalIssueQuestionCode": entry[2], "issueComment": issueComments,};
        hearingRequest.stateHearingRequests.push(stateHearingRequest);
      });   
    }
    else {
      var entries = programsAndIssues.entries();
      var element = entries.next();
      while(!element.done) {
        entry = element.value[1];
        var program = entry[0];
        var issue = entry[1];
        var issueComments = entry[3];

        var SpCharacter = decodeString('&#92;&#92;');
        issueComments = issueComments.split(decodeString('&#92;')).join(SpCharacter);
        
        while(issueComments.indexOf("\n") != -1)
        {
          issueComments = issueComments.replace("\n","\\\\n");
        }
        var stateHearingRequest = {"programDesc":program, "portalIssueQuestionCode":entry[2], "issueComment":issueComments,};
        hearingRequest.stateHearingRequests.push(stateHearingRequest);
        element = entries.next();
      } 
    }

    operationName =  "addStateHearingRequest";
    
    var data = {};
    var documents = this.getDocuments(hearingRequest.uploadDocuments);
    if(gblIsARUser) {
      data= {"hatsUserId": testHatsUserId,
             "appellantFirstName": hearingRequest.appellantFirstName,
             "appellantLastName": hearingRequest.appellantLastName,
             "appellantMiddleName": hearingRequest.appellantMiddleName,
             "appellantId": null,
             "caseNumber": "",
             "inCareOf": "",
             "noticeDateInd": hearingRequest.noticeDateInd,
             "noticeDate": hearingRequest.noticeDate,
             "preHearingResolustionInd": hearingRequest.preHearingResolustionInd,
             "countyConferanceInd": hearingRequest.countyConferanceInd,
             "interptrReqInd": hearingRequest.interptrReqInd,
             "languageDesc": hearingRequest.languageDesc,
             "intprLangId": hearingRequest.intprLangId,
             "appeallantHomelessIndMsgTxt": "",
             "email": hearingRequest.email,
             "briefExplanation": "",
             "homelessInd": hearingRequest.homelessInd,
             "monAMInd": hearingRequest.avoidDays[0].monAMInd,
             "monPMInd": hearingRequest.avoidDays[0].monPMInd,
             "tueAMInd": hearingRequest.avoidDays[0].tueAMInd,
             "tuePMInd": hearingRequest.avoidDays[0].tuePMInd,
             "wedAMInd": hearingRequest.avoidDays[0].wedAMInd,
             "wedPMInd": hearingRequest.avoidDays[0].wedPMInd,
             "thurAMInd": hearingRequest.avoidDays[0].thurAMInd,
             "thurPMInd": hearingRequest.avoidDays[0].thurPMInd,                               
             "addressDetails": prepareZipCodes(hearingRequest.addressDetails),
             "phoneDetails": this.getPhoneNumbers(hearingRequest.phoneDetails),
             "stateHearingRequests": hearingRequest.stateHearingRequests,
             "eventDetails": hearingRequest.eventDetails,
             "uploadDocument1": documents[0],
             "uploadDocument2": documents[1],
             "uploadDocument3": documents[2],
             "uploadDocument4": documents[3],
             "uploadDocument5": documents[4],
             "uploadDocument6": documents[5],
             "uploadDocument7": documents[6],
             "uploadDocument8": documents[7],
             "uploadDocument9": documents[8],
             "uploadDocument10": documents[9]
            };             
    }
    else {
      data= {"hatsUserId": testHatsUserId,
             "appellantFirstName": gblDemographicInfo.AppellantFirstName,
             "appellantLastName": gblDemographicInfo.AppellantLastName,
             "appellantMiddleName": gblDemographicInfo.AppellantMiddleName,
             "appellantId": gblDemographicInfo.AppellantId,
             "caseNumber": hearingRequest.caseNumber,
             "inCareOf": gblDemographicInfo.inCareOf,
             "noticeDateInd": hearingRequest.noticeDateInd,
             "noticeDate": hearingRequest.noticeDate,
             "preHearingResolustionInd": hearingRequest.preHearingResolustionInd,
             "countyConferanceInd": hearingRequest.countyConferanceInd,
             "interptrReqInd": hearingRequest.interptrReqInd,
             "languageDesc": hearingRequest.languageDesc,
             "intprLangId": hearingRequest.intprLangId,
             "appeallantHomelessIndMsgTxt": gblDemographicInfo.AppellantHomelessIndMessageText,
             "email": gblDemographicInfo.Email,
             "briefExplanation": "",
             "homelessInd": gblDemographicInfo.HomelessIndicator,
             "monAMInd": hearingRequest.avoidDays[0].monAMInd,
             "monPMInd": hearingRequest.avoidDays[0].monPMInd,
             "tueAMInd": hearingRequest.avoidDays[0].tueAMInd,
             "tuePMInd": hearingRequest.avoidDays[0].tuePMInd,
             "wedAMInd": hearingRequest.avoidDays[0].wedAMInd,
             "wedPMInd": hearingRequest.avoidDays[0].wedPMInd,
             "thurAMInd": hearingRequest.avoidDays[0].thurAMInd,
             "thurPMInd": hearingRequest.avoidDays[0].thurPMInd,   
             "addressDetails": prepareZipCodes(gblDemographicInfo.AddressDetails),
             "phoneDetails": this.getPhoneNumbers(gblDemographicInfo.PhoneDetails),
             "stateHearingRequests": hearingRequest.stateHearingRequests,
             "eventDetails": hearingRequest.eventDetails,
             "uploadDocument1": documents[0],
             "uploadDocument2": documents[1],
             "uploadDocument3": documents[2],
             "uploadDocument4": documents[3],
             "uploadDocument5": documents[4],
             "uploadDocument6": documents[5],
             "uploadDocument7": documents[6],
             "uploadDocument8": documents[7],
             "uploadDocument9": documents[8],
             "uploadDocument10": documents[9]
            };      
    }

    var headers = {"Content-Type":"application/json"};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.sendHearingRequestSuccess, this.sendHearingRequestFailure);
  },

  getPhoneNumbers:function(phoneDetails) {
    var phoneDetail = {};
    var typeCode = "";
    var phoneNumber = "";
    var detail = {};
    var details = [];

    //first get the primary phone number, regardless of priority
    for (var i = 0; i < phoneDetails.length; i++) {
      phoneDetail = phoneDetails[i];
      if(phoneDetail.primaryInd === "Y") { // <--primary
        typeCode = phoneDetail.phoneTypCD;
        phoneNumber = phoneDetail.phoneNumber;        
        if(phoneNumber !== null && phoneNumber !== undefined && phoneNumber !== "") {
          phoneNumber = phoneNumber.replace(/\D/g,'');
        }          
        detail = {
          "phoneTypCD": phoneDetail.phoneTypCD,
          "phoneNumber": phoneNumber,
          "ext": phoneDetail.ext,
          "primaryInd": phoneDetail.primaryInd,
          "phoneXrefId": phoneDetail.phoneXrefId
        };         
        details.push(detail);
        break;
      }
    }

    //next, go through non primary numbers to get additional numbers for the payload
    var phoneTypeList = ["Cell","Home","Work","Business","Fax"];
    for(i = 0; i < phoneTypeList.length; i++) {
      var phoneType = phoneTypeList[i];
      for (var j = 0; j < phoneDetails.length; j++) {
        phoneDetail = phoneDetails[j];
        if(phoneDetail.primaryInd !== "Y") { // <--non primary
          typeCode = phoneDetail.phoneTypCD;
          phoneNumber = phoneDetail.phoneNumber;
          if(typeCode === phoneType) {
            if(phoneNumber !== null && phoneNumber !== undefined && phoneNumber !== "") {
              phoneNumber = phoneNumber.replace(/\D/g,'');
            }          
            detail = {
              "phoneTypCD": phoneDetail.phoneTypCD,
              "phoneNumber": phoneNumber,
              "ext": phoneDetail.ext,
              "primaryInd": phoneDetail.primaryInd,
              "phoneXrefId": phoneDetail.phoneXrefId
            };         
            details.push(detail);
            if(details.length == 2) {
              break;
            }
          }
        }
      }
      //up to two phone numbers are allowed in Add State Hearing request
      if(details.length == 2) {
        break;
      }
    }
    return details;
  },
  getDocuments:function(documentList) {
    var documents = [];

    for(var i = 0; i < 10; i++) {
      if (i < documentList.length) {
        documents.push(documentList[i].fileContent);
      }
      else {
        documents.push("");
      }
    }

    return documents;
  },
  sendHearingRequestSuccess:function(response) {
    dismissLoadingIndicator();
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errSubmitHearingRequest;
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
        resetFlow();

        try{
          var ntf = new kony.mvc.Navigation('frmHearingRequestThanks');
          ntf.navigate();
        }catch(err){
          kony.print(apiErrors.exceptionNavigation);
        }
      }
    }
  },

  sendHearingRequestFailure:function(error) {
    dismissLoadingIndicator();
    if(error.errorStatus !== null && error.errorStatus !== undefined && error.errorStatus.length > 0) {
      this.displayErrorMessages(error.errorStatus); 
    }
    else {
      var callSpecificMsg = "Unable to submit the Hearing Request.";
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
      currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
      currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
      currentFrm.view.puInformationDialog.isVisible = true; 
      currentFrm.view.forceLayout();
    }    
  },

  displayErrorMessages:function(errorStatus) {
    var alertMessage = "";
    for(var i = 0; i < errorStatus.length; i++) {
      alertMessage = alertMessage += errorStatus[i].errorMessage;
      if(i !== errorStatus.length) {
        alertMessage += "\n";
      }
    }
    var alertBasic = {alertTitle:"Input Error", message:alertMessage,alertType:constants.ALERT_TYPE_ERROR};
    var alertPSP = {};
    var alert = kony.ui.Alert(alertBasic, alertPSP);      
  },  

  setFinalSummaryValues:function() {
    var data = [];
    var caseNumber = hearingRequest.caseNumber === "" ? "None" : hearingRequest.caseNumber; 
    var preHearingResolution = hearingRequest.preHearingResolustionInd === "Y" ? "Yes" : "No";
    var countyConference = hearingRequest.countyConferanceInd === "Y" ? "Yes" : "No";
    var eventList = hearingRequest.eventDetails;
    var events = "";
    for(i = 0; i < eventList.length; i++) {
      if(eventList[i].eventName !== "" && eventList[i].eventDate !== "") {
        events += eventList[i].eventName + " - " + eventList[i].eventDate;
        if(i !== eventList.length -1) {
          events += ", ";
        }
      }
    }
    if(events === "") {
      events = "None";
    }
    
    var uploadedFile = gblUploadedFileName;
    if(uploadedFile === "") {
      uploadedFile = "None";
    } 

    var noticeDate = gblReceivedNoticeDate === "" ? "None" : gblReceivedNoticeDate; 
    var interpreter = hearingRequest.languageDesc === "English" ? "Interpreter Not Required" : hearingRequest.languageDesc;  

    var row = {"lblTextTitleSec":"Case Number:","lblTextDesc":caseNumber,"imgBtnEdit":"edit.png", "editPage":"frmHearingRequestStep2"};
    data.push(row);
    var issueNumber = -1;
    if(!Object.entries) {
      programsAndIssues.forEach(function(entry) {
        issueNumber++;
        var program = entry[0];
        var issue = entry[1];
        var issueCode = entry[2];
        var issueComments = entry[3];
        row = {"lblTextTitleSec":"Benefits Program(s):","lblTextDesc":program,"imgBtnEdit":"edit.png","editPage":"frmHearingRequestStep3","Program":program, "issueNumber": issueNumber, "issueCode": issueCode};
        data.push(row);	
        row = {"lblTextTitleSec":"Issue(s):","lblTextDesc":issue,"imgBtnEdit":"", "editPage":"frmHearingRequestStep3","Program":program, "issueNumber": issueNumber, "issueCode": issueCode};
        data.push(row);	
        row = {"lblTextTitleSec":"Issue Comments:","lblTextDesc":issueComments,"imgBtnEdit":"", "editPage":"frmHearingRequestStep3","Program":program, "issueNumber": issueNumber, "issueCode": issueCode};
        data.push(row);

      });  
    }
    else {
      var entries = programsAndIssues.entries();
      var element = entries.next();
      while(!element.done) {
        issueNumber++;
        entry = element.value[1];
        var program = entry[0];
        var issue = entry[1];
        var issueCode = entry[2];
        var issueComments = entry[3];
        row = {"lblTextTitleSec":"Benefits Program(s):","lblTextDesc":program,"imgBtnEdit":"edit.png","editPage":"frmHearingRequestStep3","Program":program, "issueNumber": issueNumber, "issueCode": issueCode};
        data.push(row);	
        row = {"lblTextTitleSec":"Issue(s):","lblTextDesc":issue,"imgBtnEdit":"", "editPage":"frmHearingRequestStep3","Program":program, "issueNumber": issueNumber, "issueCode": issueCode};
        data.push(row);
        row = {"lblTextTitleSec":"Issue Comments:","lblTextDesc":issueComments,"imgBtnEdit":"", "editPage":"frmHearingRequestStep3","Program":program, "issueNumber": issueNumber, "issueCode": issueCode};
        data.push(row);

        element = entries.next();
      }    
    }

    row = {"lblTextTitleSec":"Notice Received:","lblTextDesc":noticeDate,"imgBtnEdit":"edit.png","editPage":"frmHearingRequestStep5"};
    data.push(row);
    
    var documentsUploaded = "";
    lstFiles = hearingRequest.uploadDocuments;
    for(var i = 0; i < lstFiles.length; i++) {
      var fileDetail = lstFiles[i].fileName;
      documentsUploaded = documentsUploaded === "" ? fileDetail : documentsUploaded + '\n'+ fileDetail;
    }

    row = {"lblTextTitleSec":"Documents Uploaded:","lblTextDesc":documentsUploaded,"imgBtnEdit":"edit.png","editPage":"frmHearingRequestStep6"};
    data.push(row);

    row = {"lblTextTitleSec":"Interpreter:","lblTextDesc":interpreter,"imgBtnEdit":"edit.png","editPage":"frmHearingRequestStep7"};
    data.push(row);

    var avoidDays = "";
    
    if (hearingRequest.avoidDays[0].monAMInd == "Y") 
      	avoidDays = "Monday AM";
    if (hearingRequest.avoidDays[0].monPMInd == "Y") 
      	avoidDays = avoidDays === "" ? "Monday PM":avoidDays + "; Monday PM";
    if (hearingRequest.avoidDays[0].tueAMInd == "Y") 
      	avoidDays = avoidDays === "" ? "Tuesday AM":avoidDays + "; Tuesday AM";
    if (hearingRequest.avoidDays[0].tuePMInd == "Y") 
      	avoidDays = avoidDays === "" ? "Tuesday PM":avoidDays + "; Tuesday PM";
    if (hearingRequest.avoidDays[0].wedAMInd == "Y") 
      	avoidDays = avoidDays === "" ? "Wednesday AM":avoidDays + "; Wednesday AM";
    if (hearingRequest.avoidDays[0].wedPMInd == "Y") 
      	avoidDays = avoidDays === "" ? "Wednesday PM":avoidDays + "; Wednesday PM";    
    if (hearingRequest.avoidDays[0].thurAMInd == "Y") 
      	avoidDays = avoidDays === "" ? "Thursday AM":avoidDays + "; Thursday AM";
    if (hearingRequest.avoidDays[0].thurPMInd == "Y") 
      	avoidDays = avoidDays === "" ? "Thursday PM":avoidDays + "; Thursday PM";
    

    var schedulingConflicts = "None";

    if (events !== "None")
      schedulingConflicts = events;
    
    if (avoidDays !== "")
      schedulingConflicts = schedulingConflicts !== "None" ? schedulingConflicts = schedulingConflicts + "\n" + "Avoid Days: "+ avoidDays: "Avoid Days: "+ avoidDays;
    
    row = {"lblTextTitleSec":"Schedule Conflicts:","lblTextDesc":schedulingConflicts,"imgBtnEdit":"edit.png","editPage":"frmHearingRequestStep7"};
    data.push(row);
    
    //row = {"lblTextTitleSec":"Avoid Days:","lblTextDesc":avoidDays,"imgBtnEdit":"edit.png","editPage":"frmHearingRequestStep7"};
    //data.push(row);


    row = {"lblTextTitleSec":"Pre-hearing Resolution:","lblTextDesc":preHearingResolution,"imgBtnEdit":"edit.png","editPage":"frmHearingRequestStep7"};
    data.push(row);

    row = {"lblTextTitleSec":"County Conference:","lblTextDesc":countyConference,"imgBtnEdit":"edit.png","editPage":"frmHearingRequestStep7"};
    data.push(row);

    this.view.snSumaryItems.sgmDataOptionsSummarySetData(data);
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