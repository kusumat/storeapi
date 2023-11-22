var identityClient = "";
var obUserFirstName = "";
var obUserLastName = "";

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

  //Type your controller code here
  //Test Check-in comments
  onNavigate:function() {


    console.log("######## THIS FORM (frmLoginMainScreen) IS DEAD CODE AND SHOULD NOT BE NAVIGATED-TO. ########");

    
    gblSettings(this);
    this.view.snLoginBox.loginButtonOnClick = this.fetchLoginCredentials;
    this.view.snLoginBox.txtBoxUsernameText = "";
    this.view.snLoginBox.txtBoxPasswordText = "";
    this.view.snLoginBox.passwordOnDone = this.fetchLoginCredentials;
    this.view.onDeviceBack = this.verifyUser;
    this.view.preShow = this.preShow;
	this.view.postShow = this.postShowOps;
    this.view.resourcesListCopy.setParentView(this.view);
    this.view.onBreakpointChange = this.onBreakpointChange;   
    this.view.listBoxLanguage.onSelection = this.setLocale;
  },
  preShow: function(eventobject){
	voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },
  
  onBreakpointChange: function(form, width){
    try{
    var containerWidgets = this.view.flxContainerContent.widgets();
    
    if(width <= gblBreakPoint) {
      this.view.snLoginBox.width = '97%';
      this.view.snNoLoggedInfo.width = '98%';
      this.view.snLoginBox.height = '345px';
      
      this.view.fFooterLoginSecMobile.isVisible = true;
      this.view.fFooterLoginSec.isVisible = false;      
    }
    else {
      this.view.snLoginBox.width = '48.5%';
      this.view.snNoLoggedInfo.width = '95%';
      this.view.snLoginBox.height = '325px';
      this.view.fFooterLoginSecMobile.isVisible = false;
      this.view.fFooterLoginSec.isVisible = true;
    }
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);  
    amplify.publish("authorizedDash", form, width);
    amplify.publish("loginMain", form, width);
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },  
  
  postShowOps:function() {
    try{
		window.document.getElementById("frmLoginMainScreen_snLoginBox_txtBoxUsername_txtBoxField").tabIndex = "1";
    	window.document.getElementById("frmLoginMainScreen_snLoginBox_txtBoxPassword_txtBoxField").tabIndex = "2";
    	window.document.getElementById("frmLoginMainScreen_snLoginBox_btnLoginBotton").tabIndex = "3";
    } catch(err) {
    }
    //SO-180
    this.view.forceLayout();
  },
  
  verifyUser:function() {
    
    //if previous form exists and hats user id does too, then go to the form
    //if previous form exists and hats user id does not exist, then stay on login form
    //if previous form does not exist then continue to the page
    
    var previousForm = kony.application.getPreviousForm();
    if(previousForm) {
      if(testHatsUserId) {
	    var ntf = new kony.mvc.Navigation(previousForm.id);
        ntf.navigate();        
      }
    }
  },
  
  fetchLoginCredentials:function() {
    //alert("Inside fetchLoginCredentials");
    showLoadingIndicator();
    var userName = this.view.snLoginBox.txtBoxUsernameText.trim();
    var password = this.view.snLoginBox.txtBoxPasswordText;
    
    //alert("Username: "+userName);
    //alert("Password: "+password);
    if(userName.length !== 0 && password.length !== 0) {
      gblNetworkId = userName;
      this.authnticateUserwithLDAP(userName,password);
    } else {
      dismissLoadingIndicator();
      alert("Please check your username and password.");
      
    }
  },
  authnticateUserwithLDAP:function(userName,password) {
    identityClient = KNYMobileFabric.getIdentityService("OBLDAPSSL");
    //alert("KNYMobileFabric: "+KNYMobileFabric);
    var inputParams = {};
    inputParams.userid = userName;
    inputParams.password = password;
    identityClient.login(inputParams, this.authnticateUserwithLDAPSuccessCallback.bind(this), this.authnticateUserwithLDAPErrorCallback, {});
  },
  authnticateUserwithLDAPSuccessCallback:function(response) {
    kony.print("inside authnticateUserwithLDAPSuccessCallback (frmLoginMainScreenController)");
    var self = this;
    identityClient.getProfile(true, function(result) {
      kony.print("Inside GetProfile - Server - Success");
      if(result.firstname !== undefined && result.firstname !== null && 
         result.lastname !== undefined && result.lastname !== null) {
        kony.print("inside got profile info");
        obUserFirstName = result.firstname;
        obUserLastName = result.lastname;
        self.verifyLogin();
      } else {
        alert("Something went wrong, please try again later.");
        dismissLoadingIndicator();
      }
    }, function(result) {
      kony.print("Inside GetProfile - Server - Failure: "+ JSON.stringify(result));
      alert("Something went wrong, please try again later.");
      dismissLoadingIndicator();
    });
  },
  authnticateUserwithLDAPErrorCallback:function(response) {
    dismissLoadingIndicator();  
    currentFrm.view.puInformationDialog.lblTitleText = "";
    currentFrm.view.puInformationDialog.flxContainerInfoHeight = "100px";
    currentFrm.view.puInformationDialog.lblDescText = "Please check your username and password.";
    currentFrm.view.puInformationDialog.isVisible = true; 
    currentFrm.view.forceLayout();
    kony.print("inside authnticateUserwithLDAPErrorCallback (frmLoginMainScreenController): "+JSON.stringify(response));
  },
  verifyLogin:function() {
    kony.print("inside verifyLogin (frmLoginMainScreenController)");
    operationName =  "verifyLogon";
    var headers= {};
    var serviceName = "hatsLogin";
    var inputParams = {};
    inputParams.networkId = gblNetworkId;
    inputParams.firstName = obUserFirstName;
    inputParams.lastName = obUserLastName;
    inputParams.middleName = ""; //do not send $middleName to the backend
	if(navigator && window.screen)
    	inputParams.deviceType = navigator.userAgent + " maxTouchPoints " +navigator.maxTouchPoints + " screenWidth "+ window.screen.width+ " screenHeight "+ window.screen.height;

    kony.print("inside inputParams verifyLogon (frmLoginMainScreen): "+JSON.stringify(inputParams));
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, inputParams, this.verifyLoginSuccessCallback, this.verifyLoginErrorCallback);
  },
  verifyLoginSuccessCallback:function(result) {
    if(result.errorStatus) {
      var errorStatus = result.errorStatus[0];
      dismissLoadingIndicator();
      alert(errorStatus.errorMessage);
    }
    else {
      setUserLoggedIn(true);
      gblIsTPMUser = false;
      kony.print("inside verifyLoginSuccessCallback: "+JSON.stringify(result));
      gblPortalUserTypeCodes = result.portalUserTypeCodes;
      
      gblPortalUserTypeCodes = [];
      
      for(var i = 0; i < result.portalUserTypeCodes.length; i++) {
        roleItem = [];
        roleItem[0] = result.portalUserTypeCodes[i];
        if (result.portalUserTypeCodes[i] === 'APP')
        {
          roleItem[1] = "Appellant";
        }
        if (result.portalUserTypeCodes[i] === 'AR')
        {
          roleItem[1] = "Authorized Representative";
        }
        if (result.portalUserTypeCodes[i] === 'TPM')
        {
          roleItem[1] = "Third Party Medical";
        }
        
        gblPortalUserTypeCodes.push(roleItem);
      } 

      
      testHatsUserId = result.hatsUserId;
      if(testHatsUserId !== "" && gblPortalUserTypeCodes.length === 0) {
        dismissLoadingIndicator();
        kony.print("its new user, going to show representing behalf screen");
        var ntf = new kony.mvc.Navigation("frmLoginBeforeStart");
        ntf.navigate();
      } else  {
        gblPortalUserRole = gblPortalUserTypeCodes[0][0];
        if(gblPortalUserTypeCodes[0][0] === "APP") {
          kony.print("inside user is appellant: "+testHatsUserId);
          dashboardPage = "";
          initializeAppellant();
        } else if(gblPortalUserTypeCodes[0][0] === "AR" || gblPortalUserTypeCodes[0][0] === "TPM") {
          kony.print("inside user is AR/TPM: "+testHatsUserId);
          gblIsARUser = true;
          if(gblPortalUserTypeCodes[0][0] === "TPM") 
            gblIsTPMUser = true;
          dashboardPage = "";
          //initializeAppellant();      
        }
      }
    } 
  },
  verifyLoginErrorCallback:function(result) {
    kony.print("inside verifyLoginErrorCallback: "+JSON.stringify(result));
    dismissLoadingIndicator();
    alert("Error occurred, please login again.");
  }, 
  
  setLocale:function() {
     kony.i18n.setCurrentLocaleAsync(this.view.listBoxLanguage.selectedKey, this.setLocaleSuccess, this.setLocaleFailure);
  },

  setLocaleSuccess:function() {
    this.view.puInformationDialog.lblTitleText = "Bureau of State Hearings";
    this.view.puInformationDialog.lblDescText = kony.i18n.getLocalizedString('i18N.puInformationDialog.lblDesc1'); 
    this.view.puInformationDialog.isVisible = true; 
    this.view.forceLayout();
  },

  setLocaleFailure:function() {
    this.view.setVisibility(false);
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