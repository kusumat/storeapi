define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnContinue.onClick = this.validateUserIdentityInfo;
      this.view.btnBack.onClick = this.goBack;
      this.view.lblTosLink.onTouchEnd = this.displayToS;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1); 
      this.view.calendarDOB.onTouchEnd = this.alignCalendar.bind(this);  
      this.view.txtBoxSocialSecurityNumber.accessibilityConfig = { 
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      }; 
      this.view.calendarDOB.accessibilityConfig = { 
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      }; 
      this.resetDateOfBirth();
      this.initCalendar();
      dismissLoadingIndicator();
    },
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
		this.view.lblTextLogIn.skin = 'sknLblBlackBold125Mobile';
        this.view.lblStatusStepNumber.skin = 'sknLblBlackReg100Mobile';
        this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
      }
      else {
        this.view.lblTextLogIn.skin = 'sknLblBlackBold125';
        this.view.lblStatusStepNumber.skin = 'sknLblBlackReg100';
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
      }
     }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     
    goBack:function() {
      var ntf = new kony.mvc.Navigation("frmLoginProvideInfo");
      ntf.navigate();
    },
    displayToS:function() {
      displayPDF(termsOfService.document, "Terms of Service");  
    },
    alignCalendar: function() {
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.calendarDOB.setContext({
          "widget": this.view.calendarDOB,
          "anchor": "bottom"
        });
      } catch (ex) {
        kony.print("Exception found in alignCalendar: " + ex);
      }
    },
    getDOB:function() {
      var date = "";
      var month = this.view.calendarDOB.month < 10 ? "0"+this.view.calendarDOB.month : this.view.calendarDOB.month.toString();
      var day   = this.view.calendarDOB.day < 10 ? "0"+this.view.calendarDOB.day : this.view.calendarDOB.day.toString();
      var year  = this.view.calendarDOB.year;
      if(month !== null && day !== null && year !== null) {
      	date = month + "" + day + "" + year;  
      }
	  return date;      
    },
    validateUserIdentityInfo:function() {
      gblUserInfoValidated = false;
      kony.print("Insid validateUserIdentityInfo");
      if(this.view.calendarDOB === null) {
        alert("Please specify Date of Birth");
        return false;
      }  
      if (this.isFutureDate(this.getDOB())) {
        alert("Date of Birth must be prior to today");
        return false;
      } 
      if(this.view.txtBoxSocialSecurityNumber.text === "") {
        alert("Social Security Number cannot be empty");
        this.view.txtBoxSocialSecurityNumber.setFocus(true);
        return false;
      } else {
        if (isSSNValid(this.view.txtBoxSocialSecurityNumber.text)) {
          gblUserInfo.SSN = this.view.txtBoxSocialSecurityNumber.text.replace(/\D/g,'');
        }
        else
        {
          alert("Social Security Number is invalid");
          this.view.txtBoxSocialSecurityNumber.setFocus(true);
          return false;
        }
      }      
      gblUserInfo.dateOfBirth = this.getDOB();
      kony.print("Inside gblUserInfo in Identity Info: "+JSON.stringify(gblUserInfo));
      gblUserInfoValidated = true;
      showLoadingIndicator();
      this.getQustionsFromExperian();     
    },
    getQustionsFromExperian:function() {
    kony.print("inside getQustionsFromExperian");
      operationName = "fetchQuestionsFromExperian";
      var headers= {};
      headers["Content-Type"] = "";
      headers.Authorization = "";
      headers["Serviceaddressname"] = "";
      headers["ServiceAddressVersion"] = "";
      headers["ServiceAddressNS"] = "";
      var serviceName = "experianWebService";
      var inputParams = {};
      inputParams.firstName = gblUserInfo.firstName;
      inputParams.lastName = gblUserInfo.lastName;
      inputParams.PhoneNumber = gblUserInfo.PhoneNumber;
      inputParams.Address = gblUserInfo.Address;
      inputParams.city = gblUserInfo.city;
      inputParams.zipCode = gblUserInfo.zipCode;
      inputParams.state = gblUserInfo.state;
      inputParams.SSN = gblUserInfo.SSN;
      inputParams.dateOfBirth = gblUserInfo.dateOfBirth;
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, inputParams, this.fetchQuestionsFromExperianSuccessCallback, this.fetchQuestionsFromExperianErrorCallback);
  	},
    fetchQuestionsFromExperianSuccessCallback:function(response) {
      kony.print("inside fetchQuestionsFromExperianSuccessCallback: "+JSON.stringify(response));
      if(response.hasOwnProperty("QuestionsSet") && response.experianSessionID !== "") {
        gblExperianSessionID = response.experianSessionID;
        this.frameQuestionnaire(response.QuestionsSet);
      }
      else
      {
        var inputParams = {}; 
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.errorStatus = response.errorStatus;
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }  
        else {
          dismissLoadingIndicator();
          var alertMsg = "";
          if(response.hasOwnProperty("Messages") && response.experianSessionID !== "") {            
            inputParams.errorLogText = "Number:" + response.Messages[0].Message.Number + " Message:"+ response.Messages[0].Message.Text;
            alertMsg = "Unable to verify your identity, please check your identity and try again";   
          }
          else
          {
            if (response.Error.ErrorCode == '709')  {
              inputParams.errorLogText = "ErrorCode:" + response.Error.ErrorCode + " - Message: " + response.Error.ErrorDescription;
            }
            else {
              inputParams.errorLogText = "ErrorCode:" + response.Error.ErrorCode + " - Message: Experian ID proofing has experienced a technical difficulty.";
            }
            alertMsg = "Experian ID proofing has experienced a technical difficulty.\n\nPlease close your browser and try again.\n\nIf problem persists, contact the Bureau of State Hearings Help Desk at HATSX_INQUIRIES@jfs.ohio.gov for further assistance.";
          }
          operationName = "logError";
          var headers = {};
          var serviceName = "appellantServices";
          inputParams.flowName = currentFlow;
          inputParams.formName = kony.application.getCurrentForm();
          inputParams.formName = "frmLoginIdentityVerification";
          inputParams.operationName = "fetchQuestionsFromExperian";
          inputParams.portalUserType = gblPortalUserRole;
          inputParams.userAction = "Please check your identity and try again";
          inputParams.userId = testHatsUserId;
          inputParams.sessionId = '';
          if(navigator && window.screen)
            inputParams.deviceType = navigator.userAgent + " maxTouchPoints " +navigator.maxTouchPoints + " screenWidth "+ window.screen.width+ " screenHeight "+ window.screen.height;

          kony.print("inside inputParams verifyLogon (frmLoginIdentityVerification): " + JSON.stringify(inputParams));
          var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
          integrationObj.invokeOperation(operationName, headers, inputParams);
          alert(alertMsg);
        } 
      }
    },
    fetchQuestionsFromExperianErrorCallback:function(result) {
      kony.print("inside fetchQuestionsFromExperianErrorCallback: "+JSON.stringify(result));
      dismissLoadingIndicator();
      try{
        operationName = "logError";
        var headers = {};
        var serviceName = "appellantServices";
        var inputParams = {};
        if ( result.errcode !== undefined)
        {
          inputParams.errorLogText = result.errcode + ": " + result.errmsg;
        }
        else
        {
          if (result.details.errcode !== undefined)
          {
            inputParams.errorLogText = result.details.errcode + ": " + result.details.errmsg;
          }
        }
        inputParams.flowName = currentFlow;
        inputParams.formName = "frmLoginIdentityVerification";
        inputParams.operationName = "fetchQuestionsFromExperian";
        inputParams.portalUserType = gblPortalUserRole;
        inputParams.userAction = "Close browser and try again";
        inputParams.userId = testHatsUserId;
        inputParams.sessionId = '';
        if(navigator && window.screen)
          inputParams.deviceType = navigator.userAgent + " maxTouchPoints " +navigator.maxTouchPoints + " screenWidth "+ window.screen.width+ " screenHeight "+ window.screen.height;

        kony.print("inside inputParams verifyLogon (loginFieldsController): " + JSON.stringify(inputParams));
        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        integrationObj.invokeOperation(operationName, headers, inputParams);
      }
      catch(err){}
      alert("Experian ID proofing has experienced a technical difficulty.\n\nPlease close your browser and try again.\n\nIf problem persists, contact the Bureau of State Hearings Help Desk at HATSX_INQUIRIES@jfs.ohio.gov for further assistance.");      
    },
    frameQuestionnaire:function(questionData) {
      kony.print("inside questionData: "+JSON.stringify(questionData));
      var data = {};
      data = questionData;
      var totalQstns = data.length;
      for(var i = 0; i <= totalQstns; i++) {
        if(i === 0) {
          gblQuestion1Data = data[0];
          kony.print("inside gblQuestion1Data: "+JSON.stringify(gblQuestion1Data));
          continue;
        }
        if(i === 1) {
          gblQuestion2Data = data[1];
          kony.print("inside gblQuestion2Data: "+JSON.stringify(gblQuestion2Data));
          continue;
        }
        if(i === 2) {
          gblQuestion3Data = data[2];
          kony.print("inside gblQuestion3Data: "+JSON.stringify(gblQuestion3Data));
          continue;
        }
        if(i === 3) {
          gblQuestion4Data = data[3];
          kony.print("inside gblQuestion4Data: "+JSON.stringify(gblQuestion4Data));
          continue;
        }
      }
      var ntf = new kony.mvc.Navigation("frmLoginAnswerQuestions");
      ntf.navigate();
    },
    resetDateOfBirth:function() {
      kony.print("inside resetDateOfBirth");
      this.view.calendarDOB.clear();     
      this.view.forceLayout();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    isFutureDate:function(date) {
      var rightNow = new Date();
      rightNow.setDate(rightNow.getDate() + -1);
      var d = date.substr(4,4)+"-"+date.substr(0, 2)+"-"+date.substr(2, 2);
      var dateEntered = new Date(d);
      if (rightNow < dateEntered) {
        return true;
      } else {
        return false;
      }
    },
    initCalendar:function() {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + -1);
      var currentDay = currentDate.getUTCDate();
      var currentMonth = currentDate.getMonth()+1;
      var currentYear = currentDate.getFullYear();
      this.view.calendarDOB.enableRangeOfDates([currentDay,currentMonth,currentYear-120], 
                                               [currentDay,currentMonth,currentYear], "sknCalendarNormal", true);
    }
  };
});