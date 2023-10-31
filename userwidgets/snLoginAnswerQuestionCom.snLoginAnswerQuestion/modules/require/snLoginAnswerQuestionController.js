var tempAnsForQstn1 = "";
var tempAnsForQstn2 = "";
var tempAnsForQstn3 = "";
var tempAnsForQstn4 = "";
define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.view.preShow = this.onPreshow;
          this.view.btnContinue.onClick = this.validateUserSelection;
          dismissLoadingIndicator();
          this.view.btnBack.onClick = this.goBack;
          amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
        },
      
    onPreshow: function() {
      this.showQuestionnaire(gblQuestion1Data.QuestionSelect, "1");
      this.showQuestionnaire(gblQuestion2Data.QuestionSelect, "2");
      this.showQuestionnaire(gblQuestion3Data.QuestionSelect, "3");
      this.showQuestionnaire(gblQuestion4Data.QuestionSelect, "4");
    },
      
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.lblTextLogIn.skin = 'sknLblBlackBold125Mobile';
        this.view.lblTextLogIn.width = '75%';
        this.view.lblStatusStepNumber.width = '25%';
        this.view.lblStatusStepNumber.skin = 'sknLblBlackReg100Mobile';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
        
        this.view.lblQuestion1.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblQuestion2.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblQuestion3.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblQuestion4.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        
        this.view.radioQuestion1.skin = 'slRadioButtonGroupMobile';
        this.view.radioQuestion2.skin = 'slRadioButtonGroupMobile';
        this.view.radioQuestion3.skin = 'slRadioButtonGroupMobile';
        this.view.radioQuestion4.skin = 'slRadioButtonGroupMobile';
        
      }
      else {
        this.view.lblTextLogIn.skin = 'sknLblBlackBold125';        
        this.view.lblTextLogIn.width = '80%';
        this.view.lblStatusStepNumber.width = '19.25%';
        this.view.lblStatusStepNumber.skin = 'sknLblBlackReg100';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        
        this.view.lblQuestion1.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblQuestion2.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblQuestion3.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblQuestion4.skin = 'sknLblSubtitleDarkGrayRegMedium';        
        
        this.view.radioQuestion1.skin = 'slRadioButtonGroup';
        this.view.radioQuestion2.skin = 'slRadioButtonGroup';
        this.view.radioQuestion3.skin = 'slRadioButtonGroup';
        this.view.radioQuestion4.skin = 'slRadioButtonGroup';       
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },        
      
      	goBack:function() {
        	var ntf = new kony.mvc.Navigation("frmLoginIdentityVerification");
        	ntf.navigate();
      	},
        showQuestionnaire:function(questionsData, question) {
          var answersList = [];
          var tempData = questionsData;
//           if(question == "1") {
//             tempData = gblQuestion1Data.QuestionSelect;
//           } else if(question == "2") {
//             tempData = gblQuestion2Data.QuestionSelect;
//           } else if(question == "3") {
//             tempData = gblQuestion3Data.QuestionSelect;
//           } else if(question == "4") {
//             tempData = gblQuestion4Data.QuestionSelect;
//           }
          for(var i = 0; i < tempData.length; i++) {
            var tempAnswer = [];
            var temp = tempData[i].QuestionChoice;
            tempAnswer.push(i+1);
            tempAnswer.push(temp);
            kony.print("inside tempAnswer: "+tempAnswer);
            answersList.push(tempAnswer);
          }
          
          if(question == "1") {
          	this.view.lblQuestion1.text = gblQuestion1Data.QuestionText;
            this.view.radioQuestion1.masterData = answersList;
          } else if(question == "2") {
            this.view.lblQuestion2.text = gblQuestion2Data.QuestionText;
            this.view.radioQuestion2.masterData = answersList;
          } else if(question == "3") {
            this.view.lblQuestion3.text = gblQuestion3Data.QuestionText;
            this.view.radioQuestion3.masterData = answersList;
          } else if(question == "4") {
            this.view.lblQuestion4.text = gblQuestion4Data.QuestionText;
            this.view.radioQuestion4.masterData = answersList;
          }
          this.view.radioQuestion1.selectedKey = null;
          this.view.radioQuestion1.onSelection = this.fetchSelectedAnswerForQstn1;
          this.view.radioQuestion2.selectedKey = null;
          this.view.radioQuestion2.onSelection = this.fetchSelectedAnswerForQstn2;
          this.view.radioQuestion3.selectedKey = null;
          this.view.radioQuestion3.onSelection = this.fetchSelectedAnswerForQstn3;
          this.view.radioQuestion4.selectedKey = null;
          this.view.radioQuestion4.onSelection = this.fetchSelectedAnswerForQstn4;
        },
        fetchSelectedAnswerForQstn1:function() {
          tempAnsForQstn1 = this.view.radioQuestion1.selectedKeyValue[0];
          kony.print("inside fetchSelectedAnswerForQstn1: "+tempAnsForQstn1);
        },
      	fetchSelectedAnswerForQstn2:function() {
          tempAnsForQstn2 = this.view.radioQuestion2.selectedKeyValue[0];
          kony.print("inside fetchSelectedAnswerForQstn2: "+tempAnsForQstn2);
        },
      	fetchSelectedAnswerForQstn3:function() {
          tempAnsForQstn3 = this.view.radioQuestion3.selectedKeyValue[0];
          kony.print("inside fetchSelectedAnswerForQstn3: "+tempAnsForQstn3);
        },
      	fetchSelectedAnswerForQstn4:function() {
          tempAnsForQstn4 = this.view.radioQuestion4.selectedKeyValue[0];
          kony.print("inside fetchSelectedAnswerForQstn4: "+tempAnsForQstn4);
        },
        validateUserSelection:function() {
          if(tempAnsForQstn1 === "" ||
             tempAnsForQstn2 === "" ||
             tempAnsForQstn3 === "" ||
             tempAnsForQstn4 === "") {
            alert("Please answer all the questions");
            return false;
          } else {
            showLoadingIndicator();
            this.sendAnswersAndFetchUserScore();
          }
        },
        sendAnswersAndFetchUserScore:function() {
          kony.print("inside sendAnswersAndFetchUserScore");
          operationName = "postAnswersAndFetchUserScore";
          var headers= {};
          headers["Content-Type"] = "";
          headers.Authorization = "";
          headers["Serviceaddressname"] = "";
          headers["ServiceAddressVersion"] = "";
          headers["ServiceAddressNS"] = "";
          var serviceName = "experianWebService";
          var inputParams = {};
          inputParams.experianSessionID = gblExperianSessionID;
          inputParams.ansForQstn1 = tempAnsForQstn1;
          inputParams.ansForQstn2 = tempAnsForQstn2;
          inputParams.ansForQstn3 = tempAnsForQstn3;
          inputParams.ansForQstn4 = tempAnsForQstn4;
          kony.print("inside sendAnswersAndFetchUserScore inputparams: "+JSON.stringify(inputParams));
          var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
          integrationObj.invokeOperation(operationName, headers, inputParams, this.postAnswersAndFetchUserScoreSuccessCallback, this.postAnswersAndFetchUserScoreErrorCallback);
        },
        postAnswersAndFetchUserScoreSuccessCallback:function(response) {
          kony.print("inside postAnswersAndFetchUserScoreSuccessCallback: "+JSON.stringify(response));
          if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
            response.errorStatus = response.errorStatus;
            response.userAction = apiActions.actionWait;
            navigateToErrorPage(response);  
          }  
          else
          {
            if(response.TransactionID !== "" && response.PreciseIDScore !== "" && response.OutWalletScore !== "" && response.OutWalletScore !== "") {
              gblUserInfo.transactionId = response.TransactionID;
              gblUserInfo.preciseIdScore = response.PreciseIDScore;
              gblUserInfo.outwalletScore = response.OutWalletScore;
              gblUserInfo.acceptReferCode = response.AcceptReferCode;   
            } else {
              gblUserInfo.transactionId = "OTH";
              gblUserInfo.preciseIdScore = "";
              gblUserInfo.outwalletScore = "";
              gblUserInfo.acceptReferCode = "";
            }
            gblIsARUser = false;
            gblIsTPMUser = false;
            if(gblRepresentingOption.startsWith('APP')) {
              this.matchOrCreateAppellant();
            } else {
              this.matchOrCreateAuthorizedRep();
            }
          }
        },
        postAnswersAndFetchUserScoreErrorCallback:function(response) {
          kony.print("inside postAnswersAndFetchUserScoreErrorCallback: "+JSON.stringify(response));
          dismissLoadingIndicator();
          
          
          try{
            operationName = "logError";
            var headers = {};
            var serviceName = "appellantServices";
            var inputParams = {};          
            
            if ( response.errcode !== undefined)
            {
              inputParams.errorLogText = response.errcode + ": " + response.errmsg;
            }
            else
            {
              if (response.details.errcode !== undefined)
              {
                inputParams.errorLogText = response.details.errcode + ": " + response.details.errmsg;
              }
            }
            inputParams.flowName = currentFlow;
            inputParams.formName = "frmLoginAnswerQuestions";
            inputParams.operationName = "postAnswersAndFetchUserScore";
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

//           gblUserInfo.transactionId = "OTH";
//           gblUserInfo.preciseIdScore = "";
//           gblUserInfo.outwalletScore = "";
//           gblUserInfo.acceptReferCode = "";
          
//           if(gblRepresentingOption == "Yes") {
//             this.matchOrCreateAppellant();
//           } else {
//             this.matchOrCreateAuthorizedRep();
//           }
        },
        matchOrCreateAppellant:function() {
          kony.print("inside matchOrCreateAppellant");
          operationName = "matchOrCreateAppellant";
          var headers= {};
          var serviceName = "hatsLogin";
          var inputParams = {};
          inputParams.hatsUserId = testHatsUserId;
          inputParams.caseNumber = gblUserInfo.caseNumber;
          inputParams.appellantFirstName = gblUserInfo.firstName;
          inputParams.appellantLastName = gblUserInfo.lastName;
          inputParams.addrLine1 = gblUserInfo.Address;
          inputParams.addrLine2 = gblUserInfo.Address2;
          inputParams.city = gblUserInfo.city;
          inputParams.county = gblUserInfo.county;
          inputParams.state = gblUserInfo.state;
          inputParams.zipCd = gblUserInfo.zipCode;
          inputParams.phoneNumber = gblUserInfo.PhoneNumber;
          inputParams.appellantEmail = gblUserInfo.Email;
          inputParams.preciseIdScore = gblUserInfo.preciseIdScore;
          inputParams.transactionId = gblUserInfo.transactionId;
          inputParams.acceptReferCd = gblUserInfo.acceptReferCode;
          inputParams.kbaScore = gblUserInfo.outwalletScore;
		  if(navigator && window.screen)
			inputParams.deviceType = navigator.userAgent + " maxTouchPoints " +navigator.maxTouchPoints + " screenWidth "+ window.screen.width+ " screenHeight "+ window.screen.height;
          kony.print("inside matchOrCreateAppellant inputparams: "+JSON.stringify(inputParams));
          var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
          integrationObj.invokeOperation(operationName, headers, inputParams, this.matchOrCreateAppellantSuccessCallback, this.matchOrCreateAppellantErrorCallback);
        },
        matchOrCreateAppellantSuccessCallback:function(response) {
          dismissLoadingIndicator();
          kony.print("inside matchOrCreateAppellantSuccessCallback: "+JSON.stringify(response));
          //if(response.portalUserType !== "" && !response.hasOwnProperty('errorStatus')) {
          if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
            response.errorStatus = response.errorStatus;
            response.userAction = apiActions.actionWait;
            navigateToErrorPage(response);  
          }  
          else
          {
            if(!response.hasOwnProperty('errorStatus')) {
              //SO-179: New user Login- Successfully added the "the User" message should be suppressed
              //alert(response.status);
              gblAppellantId = response.appellantId;
              resetFlow();
              navigateToLandingPage("frmAppellantDash");
              destroyLoginForm();
            }
            else {
              alert("Experian ID proofing has experienced a technical difficulty.\n\nPlease close your browser and try again.\n\nIf problem persists, contact the Bureau of State Hearings Help Desk at HATSX_INQUIRIES@jfs.ohio.gov for further assistance.");
            }
          }
        },
        matchOrCreateAppellantErrorCallback:function(response) {
          dismissLoadingIndicator();
          kony.print("inside matchOrCreateAppellantErrorCallback: "+JSON.stringify(response));
          alert("Something went wrong, please try again later");
        },
        matchOrCreateAuthorizedRep:function() {
          kony.print("inside matchOrCreateAuthorizedRep");
          operationName = "matchOrCreateAuthorizedRepByHatsUserId";
          var headers= {};
          var serviceName = "hatsLogin";
          var inputParams = {};
          inputParams.companyName = gblUserInfo.companyName;
          inputParams.contactFirstName = gblUserInfo.firstName;
          inputParams.contactLastName = gblUserInfo.lastName;
          inputParams.contactEmail = gblUserInfo.Email;
          inputParams.addressLine1 = gblUserInfo.companyAddress;
          inputParams.addressLine2 = gblUserInfo.companyAddress2;
          inputParams.city = gblUserInfo.companyCity;
          inputParams.state = gblUserInfo.companyState;
          inputParams.zipCode = gblUserInfo.companyZipcode;
          inputParams.phoneNumber = gblUserInfo.PhoneNumber;
          inputParams.hatsUserId = testHatsUserId;
          if(navigator && window.screen)
    		inputParams.deviceType = navigator.userAgent + " maxTouchPoints " +navigator.maxTouchPoints + " screenWidth "+ window.screen.width+ " screenHeight "+ window.screen.height;
          if(gblRepresentingOption.startsWith('AR'))
          {
            gblIsARUser = true;
            inputParams.portalUserType = "AR";
          }
          else
          {
            gblIsARUser = true;
            gblIsTPMUser = true;
            inputParams.portalUserType = "TPM";
          }
          inputParams.phoneTypCD = "Home";
          inputParams.ext = "";
          inputParams.preciseIdScore = gblUserInfo.preciseIdScore;
          inputParams.transactionId = gblUserInfo.transactionId;
          inputParams.acceptReferCd = gblUserInfo.acceptReferCode;
          inputParams.kbaScore = gblUserInfo.outwalletScore;
          kony.print("inside matchOrCreateAuthorizedRep inputparams: "+JSON.stringify(inputParams));
          var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
          integrationObj.invokeOperation(operationName, headers, inputParams, this.matchOrCreateAuthorizedRepSuccessCallback, this.matchOrCreateAuthorizedRepErrorCallback);
        },
      	matchOrCreateAuthorizedRepSuccessCallback:function(response) {
          kony.print("inside matchOrCreateAuthorizedRepSuccessCallback: "+JSON.stringify(response));
          dismissLoadingIndicator();
                
          if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
            response.errorStatus = response.errorStatus;
            response.userAction = apiActions.actionWait;
            navigateToErrorPage(response);  
          }  
          else
          {
            if(!response.hasOwnProperty('errorStatus')) {
              //SO-179: New user Login- Successfully added the "the User" message should be suppressed
              //alert(response.status);
              gblIsARUser = true;
              resetFlow();
              initializeAppellant();
              destroyLoginForm();
            }
            else {
              alert("Experian ID proofing has experienced a technical difficulty.\n\nPlease close your browser and try again.\n\nIf problem persists, contact the Bureau of State Hearings Help Desk at HATSX_INQUIRIES@jfs.ohio.gov for further assistance.");
            }
          }
        },
        matchOrCreateAuthorizedRepErrorCallback:function(response) {
          kony.print("inside matchOrCreateAuthorizedRepErrorCallback: "+JSON.stringify(response));
          dismissLoadingIndicator();
          alert("Something went wrong, please try again later");
        },
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});