define(function () {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.view.btnLogin.onClick = this.navigateTo;
      this.view.preshow = this.preShow;
      this.view.btnForgotUsername.onClick = this.openLink;
      this.view.btnForgotPassword.onClick = this.openLink;
      this.view.btnHaveAnAccount.onClick = this.openLink;
      this.view.txtBoxUsername.onDone = this.onDone.bind(this);
      this.view.txtBoxPassword.onDone = this.onDone.bind(this);
      this.view.txtBoxUsername.accessibilityConfig = { 
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxUsername.text.length > 0 ? this.view.txtBoxUsername.placeholder : "",  
        "a11yHint": "Enter username", 
        "a11yIndex": 0 ,
      }; 
      this.view.txtBoxPassword.accessibilityConfig = { 
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxPassword.text.length > 0 ? this.view.txtBoxPassword.placeholder : "", 
        "a11yHint": "Enter Password", 
        "a11yIndex": 0,
      };
      this.view.flxLoginHeadingContainer.accessibilityConfig = {
        "a11yLabel": this.view.lblAccessShare.text,
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
    },
   
    onDone: function (txtBox) {
      let txtBoxId = txtBox.id;
      switch (txtBoxId) {
        case "txtBoxUsername":
          this.view.txtBoxPassword.setFocus(true);
          break;
        case "txtBoxPassword":
          this.navigateTo();
          break;
      }
    },
    preShow: function() {
      // TODO: populate from the browser -saved prompt- dialog storage
      this.view.txtBoxUsername.text = "";
      this.view.txtBoxPassword.text = "";
    },

    openLink: function () {
      kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/index.jsp");
    },
    navigateTo: function () {
      //alert("Inside fetchLoginCredentials");
      showLoadingIndicator();
      var userName = this.view.txtBoxUsername.text.trim();
      var password = this.view.txtBoxPassword.text.trim();

      //alert("Username: "+userName);
      //alert("Password: "+password);
      if (userName.length !== 0 && password.length !== 0) {
        gblNetworkId = userName;
        this.authnticateUserwithLDAP(userName, password);
      } else {
        dismissLoadingIndicator();
        currentFrm.view.puInformationDialog.lblTitleText = "";
        currentFrm.view.puInformationDialog.flxContainerInfoHeight = "100px";
        currentFrm.view.puInformationDialog.lblDescText = "Please check your username and password.";
        currentFrm.view.puInformationDialog.isVisible = true; 
        addEventListener('keydown',this.preventTabLogin);
        currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
        currentFrm.view.forceLayout(); 
      }
    },
    preventTabLogin: function(e){ 
      e = e || window.event; 
      if (currentFrm.view.puInformationDialog.isVisible === true){
        if (e.keyCode === 9)  // If tab key is pressed
        { 
          e.preventDefault(); // stop event from its action 
          currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
        } 
      }else{
        removeEventListener('keydown',this.preventTabLogin);
      }
    },    
    authnticateUserwithLDAP: function (userName, password) {
      try {
        identityClient = KNYMobileFabric.getIdentityService("OBLDAPSSL");
        //alert("KNYMobileFabric: "+KNYMobileFabric);
        var inputParams = {};
        inputParams.userid = userName;
        inputParams.password = password;
        identityClient.login(inputParams, this.authnticateUserwithLDAPSuccessCallback.bind(this), this.authnticateUserwithLDAPErrorCallback, {});

      } catch (exApi) {
        dismissLoadingIndicator();
        var callSpecificMsg = "An unexpected error occurred while connecting to the network.\n\n" + 
          "Check your network, close this browser session and try again.\n" + 
          "If the issue persists, then call the Support Line.";
        currentFrm.view.puInformationDialog.flxContainerInfoHeight = '175px';
        currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
        currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
	    currentFrm.view.puInformationDialog.isVisible = true; 
        addEventListener('keydown',this.preventTabLogin);
        currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
        currentFrm.view.forceLayout(); 
      }
    },
    authnticateUserwithLDAPSuccessCallback: function (result) {
      kony.print("inside authnticateUserwithLDAPSuccessCallback");
      var self = this;
      identityClient.getProfile(true, function (result) {
        kony.print("Inside GetProfile - Server - Success: " + JSON.stringify(result));
        kony.print("Inside GetProfile - Server - OpStatus: " + result.opstatus);
        if ((result.opstatus === 0) &&
          (result.firstname !== undefined && result.firstname !== null) &&
          (result.lastname !== undefined && result.lastname !== null)) {
          kony.print("inside got profile info");
          obUserFirstName = result.firstname;
          obUserLastName = result.lastname;
          self.verifyLogin();
        } else {
          kony.print("Something went wrong Inside GetProfile - Server - OpStatus: " + result.opstatus);
          alert("Something went wrong, please try again later.");
          dismissLoadingIndicator();
        }
      }, function (result) {
        kony.print("Something went wrong Inside GetProfile - Server - OpStatus: " + result.opstatus);
        kony.print("Inside GetProfile - Server - Failure: " + JSON.stringify(result));
        alert("Something went wrong, please try again later.");
        dismissLoadingIndicator();
      });
    },
    authnticateUserwithLDAPErrorCallback: function (response) {
      // TODO: Move to a strings file.
      let alertMsgCheckUidPwd = "Please check your username and password.";
      let alertMsgNetworkConnectivity = "An unexpected error occurred while connecting to the network.\n\n" + 
              "Check your network and try again.\n" + 
              "If the issue persists, then call the Support Line.";
      
      dismissLoadingIndicator();
      kony.print("inside authnticateUserwithLDAPErrorCallback (loginFieldsController): " + JSON.stringify(response));
      /* For example; error with network offline.
      inside authnticateUserwithLDAPErrorCallback (loginFieldsController): 
      {"opstatus":1011,
      "errcode":1011,
      "httpStatusCode":0,
      "message":"An error occurred while making the request. Please check device connectivity, server url and request parameters"}

      */
      var alertAuthErrorMsg = alertMsgCheckUidPwd;
	  if ((typeof(response) !== undefined) && (typeof(response.opstatus) !== undefined)) {
        switch (response.opstatus) {
          case 1011:
            alertAuthErrorMsg = ((typeof(response.message) !== undefined) ? response.message : alertMsgNetworkConnectivity);
            break;
          default:
            break;
        }
      }      
      currentFrm.view.puInformationDialog.lblTitleText = "";
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = "100px";
      currentFrm.view.puInformationDialog.lblDescText = alertAuthErrorMsg;
      currentFrm.view.puInformationDialog.isVisible = true; 
      addEventListener('keydown',this.preventTabLogin);
      currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
      currentFrm.view.forceLayout();
      //var ntf = new kony.mvc.Navigation("frmLogin");
      //ntf.navigate();
    },
    verifyLogin: function () {
      kony.print("inside verifyLogin (loginFieldsController)");
      operationName = "verifyLogon";
      var headers = {};
      var serviceName = "hatsLogin";
      var inputParams = {};
      inputParams.networkId = gblNetworkId;
      inputParams.firstName = obUserFirstName;
      inputParams.lastName = obUserLastName;
	  if(navigator && window.screen)
    	inputParams.deviceType = navigator.userAgent + " maxTouchPoints " +navigator.maxTouchPoints + " screenWidth "+ window.screen.width+ " screenHeight "+ window.screen.height;

      inputParams.middleName = ""; //do not send $middleName to the backend
      
      kony.print("inside inputParams verifyLogon (loginFieldsController): " + JSON.stringify(inputParams));
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, inputParams, this.verifyLoginSuccessCallback, this.verifyLoginErrorCallback);
    },
    verifyLoginSuccessCallback: function (response) {
      if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
        response.errorStatus = response.errorStatus;
        response.userAction = apiActions.actionWait;
        navigateToErrorPage(response);  
      }  
      else        
      {
        if (response.errorStatus) {
          var errorStatus = response.errorStatus[0];
          dismissLoadingIndicator();
          alert(errorStatus.errorMessage);
        }
        else {
          setUserLoggedIn(true);
          gblIsTPMUser = false;
          gblIsARUser = false;
          kony.print("inside verifyLoginSuccessCallback: " + JSON.stringify(response));
          gblPortalUserTypeCodes = response.portalUserTypeCodes;

          gblPortalUserTypeCodes = [];

          for(var i = 0; i < response.portalUserTypeCodes.length; i++) {
            roleItem = [];
            roleItem[0] = response.portalUserTypeCodes[i];
            if (response.portalUserTypeCodes[i] === 'APP')
            {
              roleItem[1] = "Appellant";
            }
            if (response.portalUserTypeCodes[i] === 'AR')
            {
              roleItem[1] = "Authorized Representative";
            }
            if (response.portalUserTypeCodes[i] === 'TPM')
            {
              roleItem[1] = "Third Party Medical";
            }

            gblPortalUserTypeCodes.push(roleItem);
          } 

          testHatsUserId = response.hatsUserId;
          if (testHatsUserId !== "" && gblPortalUserTypeCodes.length === 0) {
            dismissLoadingIndicator();
            kony.print("its new user, going to show representing behalf screen");
            var ntf = new kony.mvc.Navigation("frmLoginBeforeStart");
            ntf.navigate();
          } else {
            gblPortalUserRole = gblPortalUserTypeCodes[0][0];
            if (gblPortalUserTypeCodes[0][0] === "APP") {
              kony.print("inside user is appellant: " + testHatsUserId);
              initializeAppellant();
            } else if (gblPortalUserTypeCodes[0][0] === "AR" || gblPortalUserTypeCodes[0][0] === "TPM") {
              kony.print("inside user is AR/TPM: " + testHatsUserId);
              gblIsARUser = true;
              if (gblPortalUserTypeCodes[0][0] === "TPM")
                gblIsTPMUser = true;
              initializeAppellant();
            }
          }
        }
      }
    },
    verifyLoginErrorCallback: function (result) {
      dismissLoadingIndicator();
      try {
        kony.print("inside verifyLoginErrorCallback: " + JSON.stringify(result));
        var alertMsg = "An error has occurred.  Please login again later.";
        switch (result.opstatus) {
          case 1011: 
            alertMsg = "An error occurred in the network.  Try logging-on again when the connection is restored.";
            break;
          default:
            alertMsg = "An unknown error has occurred.  Check the network connectivity and try logging on again later.";
            break;
        }
        alert(alertMsg);
      } catch (exApi) {
        var callSpecificMsg = "An unexpected error occurred while connecting to the network.\n\n" + 
            "Check your network and try again.\n" + 
            "If the issue persists, then call the Support Line.";
        currentFrm.view.puInformationDialog.flxContainerInfoHeight = '175px';
        currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
        currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
        currentFrm.view.puInformationDialog.isVisible = true; 
        addEventListener('keydown',this.preventTabLogin);
        currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
        currentFrm.view.forceLayout();
      }
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
    },
    changingTheme: function (theme) {
      var skinShare = '';
      var skinTitle = '';
      var skinDesc = '';
      var skinFieldName = '';
      var skinField = '';
      var skinBtn = '';
      if (theme == 'black') {
        skinShare = 'lblFont000000RobotoSlab18px';
        skinTitle = 'lblFont000000OpenSansSemiBold36px';
        skinDesc = 'lblFont000000OpenSansRegular18px';
        skinFieldName = 'lblFont000000OpenSansRegular14px';
        skinField = 'sknTxtBoxFont000000OpenSansRegular18pxBorder1px';
        skinBtn = 'sknBtnBgTransparentFont000000SansProRegular14pxUnderLine';
      } else if (theme == 'white') {
        skinShare = 'lblFontFFFFFFRobotoSlab18px';
        skinTitle = 'lblFontFFFFFFOpenSansSemiBold36px';
        skinDesc = 'lblFontFFFFFFOpenSansRegular18px';
        skinFieldName = 'lblFontFFFFFFOpenSansRegular14px';
        skinField = 'sknTxtBoxFont000000OpenSansRegular18pxBorderFFFFFF1px';
        skinBtn = 'sknBtnBgTransparentFontFFFFFFSansProRegular14pxUnderline';
        this.view.btnHaveAnAccount.skin = 'sknBtnBgTransparentFontFFFFFFSansProRegular14pxNoUnderline';
      }
      this.view.lblAccessShare.skin = skinShare;
      this.view.lblTitleForm.skin = skinTitle;
      this.view.lblLoginDisclaimForm.skin = skinDesc;
      this.view.txtUsername.skin = skinFieldName;
      this.view.txtBoxUsername.skin = skinField;
      this.view.txtBoxUsername.focusSkin = skinField;
      this.view.txtBoxUsername.placeholderSkin = skinField;
      this.view.txtPassword.skin = skinFieldName;
      this.view.txtBoxPassword.skin = skinField;
      this.view.txtBoxPassword.focusSkin = skinField;
      this.view.txtBoxPassword.placeholderSkin = skinField;
      this.view.btnForgotPassword.focusSkin = skinBtn;
      this.view.btnForgotPassword.skin = skinBtn;
      this.view.btnForgotUsername.focusSkin = skinBtn;
      this.view.btnForgotUsername.skin = skinBtn;
      this.view.btnHaveAnAccount.focusSkin = skinBtn;
    },
    breakPointChange: function (widthVal) {
      if (widthVal >= 1100 && widthVal <= 1200) {
        this.view.btnForgotUsername.left = 'default';
        this.view.btnForgotUsername.right = '0%';
        
        this.view.btnForgotPassword.left = 'default';
        this.view.btnForgotPassword.right = '29%';
        this.view.btnForgotPassword.width = 'preferred';
        this.view.btnForgotUsername.width = 'preferred';
        this.view.flxForgotOptions.top = '-45px';
 //       this.view.flxForgotOptions.reverseLayoutDirection = true;

      } if (widthVal >= 768 && widthVal <= 1100) {
        
        this.view.btnForgotUsername.left = '0%';
        this.view.btnForgotUsername.right = 'default';
        
        this.view.btnForgotPassword.left = '45%';
        this.view.btnForgotPassword.right = 'default';
        this.view.btnForgotPassword.width = 'preferred';
        this.view.btnForgotUsername.width = 'preferred';
        this.view.flxForgotOptions.top = '10px';
 //       this.view.flxForgotOptions.reverseLayoutDirection = true;

      } if (widthVal >= 720 && widthVal <= 768) {
        
        this.view.btnForgotUsername.left = '0%';
        this.view.btnForgotUsername.right = 'default';
        
        this.view.btnForgotPassword.left = '40%';
        this.view.btnForgotPassword.right = 'default';
        this.view.btnForgotPassword.width = 'preferred';
        this.view.btnForgotUsername.width = 'preferred';
        this.view.flxForgotOptions.top = '10px';
 //       this.view.flxForgotOptions.reverseLayoutDirection = true;

      }if (widthVal <= 720) {
        
        this.view.btnForgotUsername.left = '0%';
        this.view.btnForgotUsername.right = 'default';
        
        this.view.btnForgotPassword.left = '150px';
        this.view.btnForgotPassword.right = 'default';
        this.view.btnForgotPassword.width = 'preferred';
        this.view.btnForgotUsername.width = 'preferred';
        
        this.view.flxForgotOptions.top = '10px';
//        this.view.flxForgotOptions.reverseLayoutDirection = false;

      } if (widthVal > 1200) {
        
        //this.view.btnForgotUsername.left = 'Default';
        
        this.view.btnForgotPassword.width = 'preferred';
        this.view.btnForgotUsername.width = 'preferred';
        this.view.flxForgotOptions.top = '-45px';
       // this.view.flxForgotOptions.reverseLayoutDirection = true;

      }
      this.view.forceLayout();
    }
  };
});