var dashboardPage = "";
var currentView = null;
var httpclient = null;
var hostName;
var protocol;
var port;
// TODO: This is true at the beginning of time and its preShow will nav back to "previousFrm" which 
// was "currentFrm" when the onNavigate is invoked during frmHomeScreen start.
var previousFrm = "frmHomeScreen";
var currentFrm = null;
var mainHeaderScreen = null;
let actionCallSupport = "Please Call the Support line.";
let actionTryThis = "Try closing your browser and if the problem persists, please call the Support line.";
var maintenanceMessageList = null;

var gblcheckforMaintMsg=true;
/* DEV
App Key 13281a8f614bd754e20252c51a785252
App Secret 35714bf3491d1cdf204176859d12f567
Service URL https://mobile-dev.jfs.ohio.gov/authService/100000002/appconfig
*/

let constantCHAT_EXPIRE_TIMERID = "tokentimer"; 		// append with Date.now() to create a unique timer-id
let constantCHAT_EXPIRE_DEFAULT = 3600 /* seconds */; 	// Observed in Azure directline
let constantCHAT_EXPIRE_EARLY = 1 * 60 /*seconds*/; 	// MINUTES BEFORE EXPIRY; e.g., expires_in === '3600 seconds => 60 minutes'
let constantCHAT_IDLE_TIMERID = "chatidle";
let constantCHAT_IDLE_EXPIRE = 16 * 60 /*seconds*/;		// MINUTES. IDLE LONGER THAN LOGOUT, of 15 mins.
var globalChatConfig = {
  isSkipToken_forTesting: false,		// TODO: DO **NOT** COMMIT WITH THIS SETTING SET to true.
  secureToken: null,
  conversationId: null,
  isTimerTest: false,
  expiresIn: null,
  expirationTimer: "",
  expiresIdleIn: constantCHAT_IDLE_EXPIRE,
  expireIdleTimer: "",
  src: "",
  env: "",
  cbStartChatConversation: null,
  cbCloseIdleChat: null,
  flagPOC: false
};

var gblWidgets ={};
// TODO: Currently not used, but available for pre-appInit
function gblInitChatFramework(event) {
  console.log(">> HTML-CHAT >> " + "Chat iFrame HTML gblInitChatFramework! " + JSON.stringify(event));
}

//#undef EVENTSTACK_HANDLER

// TODO: This mimics an event message triggered by the life-cycle constructing the widget.  Ideally, it should be the HTML "onload"
function gblEventStackHandler(event) {
//#ifdef EVENTSTACK_HANDLER
  console.log(">> HTML-CHAT >> " + "Chat iFrame HTML gblEventStackHandler! " + JSON.stringify(event));
//#else
//#endif
  if (typeof(event) !== undefined) {
    switch (event.state) {
      case "preappinit":
        break;
      case "construct":
        //mehmet amplify.publish("disableChatbutton");
        break;
      case "onload":
        
        amplify.publish("enableChatbutton");
        break;
      case "onreadystatechange":
        if (event.readyState === "loading") {
          //mehmet amplify.publish("disableChatbutton");
        } else if (event.readyState === "interactive") {
          // Ignore ... continue waiting
        } else if (event.readyState === "complete") {
          amplify.publish("enableChatbutton");
        }
        break;
      case "kvrepairiframe":
        amplify.publish("repairChatIframe");
        break;
      case "videoplayer":
        if ((typeof(event.videoState) !== "undefined") && (event.videoState !== null)) {
          amplify.publish(event.videoState);
        }
        break;
      case "navQnALink":
        navigateToPage(event);
        break;
      default:
        break;
    }
  }
}

function gblSetEnableChat(scope, flagEnable) {
  if (typeof(kony.application.getCurrentForm()) !== "undefined") {
//     var currentFormId = kony.application.getCurrentForm()+"";
//     kony.print(">>>># gblSetEnableChat [" + (flagEnable ? "enable" : "disable") + "] (" + currentFormId + ")");
    let myCurrentView = scope.view;
    if ((typeof(myCurrentView) !== "undefined") && (myCurrentView !== null)) {
      var myChatbotButton = null;
      
      if ((typeof(myCurrentView.chatbotButton) !== "undefined") && (myCurrentView.chatbotButton !== null)) {
        myChatbotButton = myCurrentView.chatbotButton;
      } else if ((typeof(myCurrentView.flxOverlayOnPopup) !== "undefined") && (typeof(myCurrentView.flxOverlayOnPopup.puchatbotButton) !== "undefined") && (myCurrentView.flxOverlayOnPopup.puchatbotButton !== null)) {
        myChatbotButton = myCurrentView.flxOverlayOnPopup.puchatbotButton;
      }
      
      
//       if ((typeof(myCurrentView.flxOverlayOnPopup) !== "undefined") && (typeof(myCurrentView.puchatbotButton) !== "undefined")) {
//         myChatbotButton = myCurrentView.flxOverlayOnPopup.puchatbotButton;
//       } else if (typeof(myCurrentView.chatbotButton) !== "undefined") {
//         myChatbotButton = myCurrentView.chatbotButton;
//       } 
      
      if ((typeof(myChatbotButton) !== "undefined") && (myChatbotButton !== null)) {
        myChatbotButton.onClick = (flagEnable ? scope.onClickChat : function(){});
      }
    }
  }
}
  
function invalidateGlobalSecureToken() {
  	stopChatIdle();
    if (typeof(globalChatConfig.expirationTimer) !== "undefined") { // && globalChatConfig.expirationTimer !== "") {
      kony.print(">>>> TIMER-CANCEL - id: [" + globalChatConfig.expirationTimer + "]");
      if (globalChatConfig.expirationTimer !== "") {
        kony.timer.cancel(globalChatConfig.expirationTimer); //(constantCHAT_EXPIRE_TIMERID);
      }
      globalChatConfig.expirationTimer = "";
    }
  	setGlobalSecureToken(null);
  	setGlobalConversationId(null);
}

// setter/getter for secureToken
function setGlobalSecureToken(token) {
  globalChatConfig.secureToken = token;
}

function getGlobalSecureToken() {
  if (typeof(globalChatConfig) !== "undefined" && globalChatConfig.secureToken  !== null) {
    return globalChatConfig.secureToken;
  } else {
    return "";
  }
}

function setGlobalConversationId(conversationid) {
	globalChatConfig.conversationId = conversationid;  
}

function getGlobalConversationId() {
  if (typeof(globalChatConfig) !== "undefined" && globalChatConfig.conversationId  !== null) {
    return globalChatConfig.conversationId;
  } else {
    return "";
  }
}

function setGlobalExpiresIn(expires_in) {

  //TODO: TAKE THIS OUT
  // expires_in = 120; // force it to 3.5 seconds

  kony.print(">>>> TIMER-SET RQ EXPIRES_IN: (" + expires_in + ") :: " + JSON.stringify(globalChatConfig));
  globalChatConfig.expiresIn = expires_in;
  setGlobalExpirationTimer();

  function setGlobalExpirationTimer() {
    if (typeof(globalChatConfig.expirationTimer) !== "undefined") { // && globalChatConfig.expirationTimer !== "") {
//       kony.timer.cancel(constantCHAT_EXPIRE_TIMERID);
    }
    globalChatConfig.expirationTimer = constantCHAT_EXPIRE_TIMERID + Date.now().toString();
    // Using the exires_in (seconds) - some resonable time before exipiry.
    let isTest = globalChatConfig.isTimerTest;
    let timerPopSeconds = (isTest ? constantCHAT_EXPIRE_EARLY : getGlobalExpiresIn() - constantCHAT_EXPIRE_EARLY);
    let dtTimeToPop = new Date(Date.now() + timerPopSeconds);
    kony.print(">>>> " + globalChatConfig.expirationTimer + " TIMER-SET POP: " + timerPopSeconds + " seconds at [" + dtTimeToPop.toString() + "]");
    kony.timer.schedule(globalChatConfig.expirationTimer, timePopRefreshToken, timerPopSeconds, false);
  }
}

function getGlobalExpiresIn() {
  if (typeof(globalChatConfig) !== "undefined" && globalChatConfig.expiresIn  !== null) {
    return globalChatConfig.expiresIn;
  } else {
    return "";
  }
}

function setChatIdle(cbCloseIdleChat) {
  globalChatConfig.cbCloseIdleChat = cbCloseIdleChat;
  resetChatIdle();
}

function getChatIdle() {
  if (typeof(globalChatConfig) !== "undefined" && globalChatConfig.expiresIdleIn  !== null) {
    return globalChatConfig.expiresIdleIn;
  } else {
    return "";
  }
}

function resetChatIdle() {
  if (globalChatConfig.expireIdleTimer !== "") {
    kony.timer.cancel(globalChatConfig.expireIdleTimer);
  }
  // Create new timer-id
  globalChatConfig.expireIdleTimer = constantCHAT_IDLE_EXPIRE + Date.now().toString();
  let timerPopSeconds = getChatIdle();
  let dtTimeToPop = new Date(Date.now() + timerPopSeconds);
  kony.print(">>>> " + globalChatConfig.expireIdleTimer + " IDLE-CHAT TIMER-SET POP: " + timerPopSeconds + " seconds at [" + dtTimeToPop.toString() + "]");
  kony.timer.schedule(globalChatConfig.expireIdleTimer, timePopCloseIdleChat, timerPopSeconds, false);
}

function stopChatIdle() {
  if (globalChatConfig.expireIdleTimer !== "") {
    kony.timer.cancel(globalChatConfig.expireIdleTimer);
    globalChatConfig.expireIdleTimer = "";
  }
  globalChatConfig.cbCloseIdleChat = null;
}

function timePopCloseIdleChat() {
  kony.print(">>> IDLE-CHAT TIMER-POP: " + globalChatConfig.expireIdleTimer);
  if ((typeof(globalChatConfig.cbCloseIdleChat) !== "undefined") && (typeof(globalChatConfig.cbCloseIdleChat) === "function")){
    globalChatConfig.cbCloseIdleChat();
    globalChatConfig.cbCloseIdleChat = null;
  }
}

// Invoke when recostructing the "webchat" iFrame -- part of POC and not used in non-POC.
function conversationBuilder(env) {
  globalChatConfig.env = env + "";
  let root = "https://webchat.botframework.com/embed/";
  let hatsTemplate = "HATS-QNA-%env-BOT";
  var src = root + hatsTemplate.replace("%env", env) + "/?t=" + globalChatConfig.secureToken;
  globalChatConfig.src = src;
  console.log(">>> CHATBOT BUILDER: " + JSON.stringify(globalChatConfig));
  return globalChatConfig.src;
}

// Invoke during the initialization, but *after* Kony Fabric is reachable
function generateSecureToken(callbackStartChatConversation) {

  // TODO: Make this a build option.
  if (typeof(globalChatConfig) !== "undefined" && globalChatConfig.isSkipToken_forTesting) {
    kony.print(">>>> SKIPPING THE SECURE TOKEN - FOR STYLING.");
    setGlobalSecureToken("SKIP-TOKEN");
    setGlobalConversationId("skip1234");
    setGlobalExpiresIn(constantCHAT_EXPIRE_DEFAULT);
  } else {
    if (typeof(callbackStartChatConversation) !== "undefined" && callbackStartChatConversation !== null) {
        globalChatConfig.cbStartChatConversation = callbackStartChatConversation;
        }
    operationName =  "secureConversationToken";
    var data= {};
    var headers= {};
    var serviceName = "chatbotFramework";
    kony.print(">>>> generateSecureToken - preparing to invoke " + serviceName + "(" + operationName + ")");
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
    integrationObj.invokeOperation(operationName, headers, data, 
                                   this.generateSecureTokenSuccess, this.generateSecureTokenFailure);
  }
  
}

function timePopRefreshToken() {
  kony.print(">>> TIMER-POP: " + globalChatConfig.expirationTimer);
// TODO: Don't cancel a popped-timer, but clear the ID so the timer logic also, does not cancel the timer.
//  kony.timer.cancel(globalChatConfig.expirationTimer);
//   globalChatConfig.expirationTimer = "";
  setGlobalExpiresIn(getGlobalExpiresIn());
  if (!globalChatConfig.isTimerTest) {
    refreshSecureToken();
  }
}

function refreshSecureToken() {
  if (typeof(globalChatConfig) !== "undefined" && globalChatConfig.isSkipToken_forTesting) {
    kony.print(">>>> SKIPPING THE SECURE TOKEN - FOR STYLING.");
    setGlobalSecureToken("SKIP-TOKEN");
    setGlobalConversationId("skip1234");
    setGlobalExpiresIn(constantCHAT_EXPIRE_DEFAULT);
  } else {
    operationName =  "refreshConversationToken";
    var data= { token: getGlobalSecureToken()+"" };
    var headers= { Authorization: "Bearer " + getGlobalSecureToken()+"" };
    var serviceName = "chatbotFramework";
    kony.print(">>>> generateSecureToken - preparing to invoke " + serviceName + "(" + operationName + ")");
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
    integrationObj.invokeOperation(operationName, headers, data, 
                                   this.generateSecureTokenSuccess, this.generateSecureTokenFailure);
  }
}



function generateSecureTokenSuccess(response) {
  console.log(">>>> CHATBOT SUCCESSFUL CONNECT: " + JSON.stringify(response));
  let httpResponse = response.httpresponse;
  console.log(">>>> CHATBOT SUCCESSFUL HEADER: " + JSON.stringify(httpResponse.headers));
	  
  /*
  {
    "conversationid": "Hxg5YCuLSmf73Lgy2S0oDR-j",
    "opstatus": 0,
    "expires_in": 3600,
    "token": "a-really-long-string",
    "httpStatusCode": 200
	}
  */
  // var parsedResponse = JSON.parse(response.responseText);
  let httpStatus = response.httpStatusCode;
  let opStatus = response.opstatus;
  let token = response.token;
  let conversationid = response.conversationid;
  let expires_in = response.expires_in;
  setGlobalSecureToken(token);  // THIS IS THE KEY --
  setGlobalConversationId(conversationid);
  setGlobalExpiresIn(expires_in);
  // Notify the webchat
  if (globalChatConfig.cbStartChatConversation !== null) {
    globalChatConfig.cbStartChatConversation(httpResponse.responsecode, true);
  }
}

function generateSecureTokenFailure(response) {

  let nameOfBot = "Shari";
  let actionTryAgain = "Try again at a later time.";

  // Clear the token right away.
  globalChatConfig.secureToken = null;
  let httpResponse = response.httpresponse;
  if (response.httpStatusCode) {
    switch (response.opstatus) {
      case 9001:
        // 9001 - IOException for service
        // Fall through.  For now, there isn't a separate cause and action.
        alert("I am having technical difficulties trying to connect with " + nameOfBot + "\n\n" + actionCallSupport);
        break;
      default:
        alert("I am having technical difficulties trying to connect with " + nameOfBot + "\n\n" + actionCallSupport);
    }
  } else {
    // TODO: Special condition of non-communications.  Occurs with idle-logout and other
    // attempts to use the KF webservices after the admin-session has timed-out.
    if ((typeof(httpResponse) === "undefined") || (typeof(httpResponse.responsecode) === "undefined")) {
      console.log(">>>> CHATBOT FAILED TOKEN REQ " + "safely ignore if following idle-logout.");
      console.log(">>>> CHATBOT FAILED TOKEN REQ " + JSON.stringify(httpResponse));
    } else {
      switch (httpResponse.responsecode) {
        case 200:
          break;
        case 403:
        case 443:
          // token has to be regenerated.  Refresh did not work.
          console.log(">>>> CHATBOT FAILED TOKEN-INVALID " + httpResponse.responsecode);
          alert("I am having problems connecting to " + nameOfBot + "\n\n" + actionTryAgain);
          break;
        case -1:
          alert("Failed to start the chat conversation." + "\n\n" + "Error status " + response.opstatus);
          break;
        default:
          alert("Failed to start the chat conversation." + "\n\n" + "Error status " + response.opstatus);
      }
    }
  }
  /*
  opstatus":9001,"httpStatusCode":-1
  */
  console.log(">>>> CHATBOT FAILED TO CONNECT: " + JSON.stringify(response));
  if (globalChatConfig.cbStartChatConversation !== null) {
    globalChatConfig.cbStartChatConversation(httpResponse.responsecode);
  }
}

function stopChatConversation() {
  // Cancel any refresh timer ...
  // Invalidate the token ... 
  setGlobalSecureToken(null);
  // Reset other chat state variables ...
}

function loadFabricURL(){
  // TODO: move this to PreAppInit -- fn patchIosDisableForceRepaint
  // kony.application.setApplicationBehaviors({disableForceRepaint: true}); 
  loadPolyfills();
  
  //if running locally in visualizer, just specify the environment

  var localTestEnv = "dev";//"sys";

  //kony.application.showLoadingScreen("sknLoading", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);

  hostName = window.location.hostname;
  protocol = window.location.protocol;
  port = ':' + window.location.port;
  pathName = window.location.pathname;

  if(("127.0.0.1" === hostName) || ("localhost" === hostName) || //Local     
     ("192.168.1.6" === hostName)) {
   // initializeMobileFabricService('https://mobile-' + localTestEnv + '.jfs.ohio.gov/authService/100000002/appconfig','13281a8f614bd754e20252c51a785252','35714bf3491d1cdf204176859d12f567');
   // Deeplink_Path = 'http://'+hostName+':8888/SHARE/kdw?key=';
    Deeplink_Path = 'http://'+hostName+':9989/SHARE/kdw?key=';
    globalChatConfig.env = localTestEnv;
  }
  else {
    // Parsing the host name to get the mobile-ENV.jfs.ohio.gov will return "undefined" for PROD and the env for all others.
    parseHostEnv = hostName.split(/\./)[0].split(/-/)[1];
    if (typeof(parseHostEnv) === "undefined") {
      globalChatConfig.env = "prod";
      parseHostEnv = "prod";
    } else {
      globalChatConfig.env = parseHostEnv;
    }
    if (parseHostEnv  === "prod")
    {
      //Deeplink_Path = 'https://hearings.jfs.ohio.gov/SHARE/?key=';
      Deeplink_Path= 'https://'+hostName+pathName+'?key=';
    }
    else
    {
      //Deeplink_Path = 'https://hearings-' + parseHostEnv + '.jfs.ohio.gov/SHARE/?key=';
      Deeplink_Path= 'https://'+hostName+pathName+'?key=';

    }
    if(isNetworkAvailable()) {
//       httpclient = new kony.net.HttpRequest();
//       httpclient.open(constants.HTTP_METHOD_GET, protocol + '//' + hostName + port + '/SHARE-CONF/'); // http://localhost:8080/ url for json file
//       httpclient.onReadyStateChange = loadFabricURLCallback;
//       httpclient.send();
    }
    else {
      kony.print("inside no internet connecion");
      kony.application.dismissLoadingScreen();
      alert("Please check your internet connectivity");
    }    
  }

}

function loadFabricURLCallback(){
  try {
       if(httpclient.readyState == 4)
       {
       	var responseContent = JSON.parse(httpclient.response);
       	kony.print('urlContent: '+responseContent.serviceURL + " : "+ responseContent.appkey + " : "+  responseContent.appsecret);
  		initializeMobileFabricService(responseContent.serviceURL, responseContent.appkey , responseContent.appsecret);
       }
   }
  catch(err)
   { 	 
     kony.print("Config Error "+err );	
     kony.application.dismissLoadingScreen();
     alert(err);
   }
}

function initializeMobileFabricService(service_url, appkey, appsecret) {
  kony.print('Inside service_url : '+service_url);
  kony.print('Inside appkey : '+appkey);
  kony.print('Inside appsecret : '+appsecret);
  kony.print("Inside initializeMobileFabricService");

  client = new kony.sdk();
  kony.print("Inside client initiated...");
  
  client.init(appkey, appsecret, service_url, this.initializeMobileFabricServiceSuccess, this.initializeMobileFabricServiceFailure);
  
} 


function initializeMobileFabricServiceSuccess(response) {
  kony.print("Inside Mobile Fabric successResponse: " + JSON.stringify(response)); 
  currentFrm.view.noticeMessage.checkforMaintMsg(currentFrm);
  kony.application.dismissLoadingScreen();
  //this.initializeAppellant();
}

function lookupFormName(page) {
  let mapFormName =  new Map();
  mapFormName.set("frmHomeScreen", "HOME PAGE");
  mapFormName.set("frmRegistration", "REGISTRATION");
  mapFormName.set("frmBeforeHearing", "BEFORE A HEARING");
  mapFormName.set("frmConnectToHearing", "CONNECT TO A HEARING");
  mapFormName.set("frmDuringHearing", "DURING A HEARING");
  mapFormName.set("frmAfterHearing", "AFTER A HEARING");
  mapFormName.set("frmFAQ", "FAQ");
  mapFormName.set("frmLogin", "LOGIN");
  mapFormName.set("frmContact", "CONTACT");
  
  let formName = mapFormName.get(page);

  return (typeof(formName) !== "undefined") ? formName : "?";
}

function navigateToPage(event) {
  // NOTE: Parse the name out of the URI event
  let page = ((typeof(event.uri) !== "undefined") && (event.uri !== null) && (event.uri !== "")) ? event.uri : "";
  let pageName = (typeof(event.uriPageName) !== "undefined") ? event.uriPageName : lookupFormName(page);
  
  // TODO: Navigating to the page you are already on hangs the navigator.
  if (page === currentFrm.viewId) {
    return;
  }
    
  if (isUserLoggedIn()) {
    //Creating the basicConfig object 
    var basicConf = {
      alertType: constants.ALERT_TYPE_CONFIRMATION,
      alertTitle: "Confirm",
      alertYesLabel: "Yes",
      alertNoLabel: "No",
      message: "Are you sure you want to navigate to " + ((typeof(pageName) !== "undefined") ? pageName : page) + " right now?\n\n" + "You will be logged-out.",
      alertHandler: function (label) {
        if (label) {
          logout(page);
        }
      }
    };
    var pspConfig = {
      "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
    };
  
    kony.ui.Alert(basicConf, pspConfig);
  } else {
    try {
      kony.application.showLoadingScreen();
      var ntf = new kony.mvc.Navigation(page);
      ntf.navigate();
    } catch (ex) {
      dismissLoadingIndicator();
      console.log("EXCEPTION: navigating to " + page + ". " + ex);
    }
  }
}

function initializeMobileFabricServiceFailure(response) {
  //alert("Mobile Fabric has failed to initialize");
  kony.application.dismissLoadingScreen();
  console.log("Inside Mobile Fabric errorResponse: " + JSON.stringify(response));
  let alertMsg = "I am experiencing technical difficulties trying to access the web services.";
  console.log("#### Alert " + alertMsg + " " + actionTryThis);
  alert(alertMsg + "\n\n" + actionTryThis);
  globalChatConfig.secureToken = "";
  kony.application.dismissLoadingScreen();
}

function initializeAppellant() {
  this.destroyLoginForm();
  this.registertForIdleTimeout();
  this.getCountiesList();
  this.getStatesList();  
  this.getPhoneTypesList(); 
  this.getLanguageList();
  this.retrievePhoneTypeList();
  if (!gblIsARUser && !gblIsTPMUser){
    this.getDistinctAppellants();
  }
  else
    {
      dashboardPage = "frmAuthorizedRepDashSearch";
      navigateToLandingPage("frmAuthorizedRepDashSearch");
    }
  this.getMaxFileUploadSize();
}

function destroyLoginForm() {
  kony.application.destroyForm("frmLoginMainScreen");  
}

function getLanguageList() {
  var serviceName = "appellantServices";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
  operationName =  "getLanguagesList";
  var data= {};
  var headers= {};
  integrationObj.invokeOperation(operationName, headers, data, 
                                 this.getLanguageListSuccess, this.getLanguageListFailure);
} 

function getLanguageListSuccess(response) {
  if(response !== null && response !== undefined) {
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errLanguages;
      response.userAction = apiActions.actionNull;
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

        if(response.availableLanguages !== null && response.availableLanguages !== undefined) {
          gblLanguageList = response.availableLanguages; 
        }
      }
    }
  }
}

function getLanguageListFailure(error) {
  alert('Unable to access Language data');  
}
function getRecaptchaKeys(){
  var config = KNYMobileFabric.getConfigurationService();
  config.getAllClientAppProperties(
    function(res){
      kony.print("client key value pairs retrieved : " + JSON.stringify(res)); 
      gblGoogleRecaptchaSitekey = res["RECAPTCHA_SITEKEY"]; 
      gblGoogleRecaptchaApikey = res["RECAPTCHA_APIKEY"];      
      gblGoogleRecaptchaScore = res["RECAPTCHA_SCORE"];      
    },
    function(err){
      kony.print(" Failed to retrieve client key value pairs : " + JSON.stringify(err)); 
    }
  );
}
function getDistinctAppellants() {
  operationName =  "getDistinctAppellantsByHatsUserId";

  var data= {"hatsUserId": testHatsUserId};
  var headers= {};
  var serviceName = "appellantServices";
  try {
    showLoadingIndicator();
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
    integrationObj.invokeOperation(operationName, headers, data, 
                                   this.getDistinctAppellantsSuccess, this.getDistinctAppellantsFailure);
  } catch (exApi) {
    dismissLoadingIndicator();
    var callSpecificMsg = "An unexpected error occurred while connecting to the network.\n\n" + 
          "Check your network, close this browser session and try again.\n" + 
          "If the issue persists, then call the Support Line.";
    currentFrm.view.puInformationDialog.flxContainerInfoHeight = '175px';
    currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
    currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
    currentFrm.view.puInformationDialog.isVisible = true; 
    currentFrm.view.forceLayout();    
    logout();
  }
}

function getDistinctAppellantsSuccess(response) {
  if(response !== null && response !== undefined) {
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errInfoAccessAppellant;
      response.userAction = apiActions.actionCheckNetwork;
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
        if(response.distinctAppellantsByHatsUserId !== null && response.distinctAppellantsByHatsUserId !== undefined) {
          //do we have an appellant or an authorized representative?
          var appellant = response.distinctAppellantsByHatsUserId[0];
          //if(appellant.addressTypeCd !== undefined && (appellant.addressTypeCd === null || appellant.addressTypeCd === "null")) {
          if( (gblIsARUser === false && appellant.addressTypeCd === undefined) || (appellant.addressTypeCd === null || appellant.addressTypeCd === "null")) {
            //appellant
            gblAppellantId = appellant.appellantId;
            navigateToLandingPage("frmAppellantDash");
          }
          else {
            //authorized rep 
            gblIsARUser = true;
//             gblAppellantList = response.distinctAppellantsByHatsUserId;
            dashboardPage = "frmAuthorizedRepDashSearch";
            navigateToLandingPage("frmAuthorizedRepDashSearch");
          }
        }
        else {
          if (gblPortalUserRole.startsWith('AR')){
            gblIsARUser = true;
            dashboardPage = "frmAuthorizedRepDashSearch";
            navigateToLandingPage("frmAuthorizedRepDashSearch");
          }
          if (gblPortalUserRole.startsWith('APP')){
            gblIsARUser = false;
            gblIsTPMUser = false;
            dashboardPage = "frmAppellantDash";
            navigateToLandingPage("frmAppellantDash");
          }
          if (gblPortalUserRole.startsWith('TPM')){
            gblIsARUser = true;
            gblIsTPMUser = true;
            dashboardPage = "frmAuthorizedRepDashSearch";
            navigateToLandingPage("frmAuthorizedRepDashSearch");
          }      
        }
        dismissLoadingIndicator();
      }
    }
  }
}
 function bytesToSize(bytes, showBytes) {
   var bytesout;
   if      (bytes >= 1073741824) { bytesout = (bytes / 1073741824).toFixed(2) + " GB"; }
   else if (bytes >= 1048576)    { bytesout = (bytes / 1048576).toFixed(2) + " MB"; }
   else if (bytes >= 1024)       { bytesout = (bytes / 1024).toFixed(2) + " KB"; }
   else if (bytes > 1)           { bytesout = bytes + " bytes"; }
   else if (bytes === 1)          { bytesout = bytes + " byte"; }
   else                          { bytesout = "0 bytes"; }
   if (showBytes)
     {
       bytesout = bytesout + " (" + bytes.toLocaleString("en-US") + " bytes)";
     }
   return bytesout;
}
function getDistinctAppellantsFailure(error) {
  dismissLoadingIndicator();
  alert("Unable to access Appellant Info");  
}

function getCountiesList() {
  operationName =  "getCountiesDropdownList";
  var data= {};
  var headers= {};
  var serviceName = "appellantServices";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
  integrationObj.invokeOperation(operationName, headers, data, this.getCountiesListSuccess, this.getCountiesListFailure);
}

function getCountiesListSuccess(response) {
  if(response !== null && response !== undefined) {
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errCounties;
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

        if(response.availableCounties !== null && response.availableCounties !== undefined) {
          gblCountiesList = response.availableCounties; 	  
        }
      }
    }
  }
}

function getCountiesListFailure(error) {
  alert("Unable to access Counties list");
}

function getStatesList() {
  operationName =  "getStatesList";
  var data= {};
  var headers= {};
  var serviceName = "appellantServices";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
  integrationObj.invokeOperation(operationName, headers, data, this.getStatesListSuccess, this.getStatesListFailure);
}

function getStatesListSuccess(response) {
  if(response !== null && response !== undefined) {
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errStates;
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

        if(response.availableStates !== null && response.availableStates !== undefined) {
          gblStatesList = response.availableStates; 	  
        }
      }
    }
  }
} 

function getStatesListFailure(error) {
  alert("Unable to access States list");  
}
function retrievePhoneTypeList() {  
  operationName = "retrievePhoneTypeList";
  var data = {};
  var headers = {};
  var serviceName = "appellantServices";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
  integrationObj.invokeOperation(operationName, headers, data, this.retrievePhoneTypeListSuccess, this.retrievePhoneTypeListFailure);
}
function retrievePhoneTypeListSuccess(response) {
  if(response !== null && response !== undefined) {
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errPhones;
      response.userAction = apiActions.actionNull;
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
        if(response.phoneTypes !== null && response.phoneTypes !== undefined) {
          gblPhoneTypeList = response.phoneTypes.sort(function(a, b) {return a.phoneTypId - b.phoneTypId;}); 
        }
      }
    }
  }
} 
function retrievePhoneTypeListFailure(error) {
  gblPhoneTypeList = defaultPhoneTypeList.sort(function(a, b) {return a.phoneTypId - b.phoneTypId;});
}

function getPhoneTypesList() {
  operationName = "getPhoneTypesList";
  var data = {};
  var headers = {};
  var serviceName = "appellantServices";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
  integrationObj.invokeOperation(operationName, headers, data, this.getPhoneTypesListSuccess, this.getPhoneTypesListFailure);
}
function getPhoneTypesListSuccess(response) {
  if(response !== null && response !== undefined) {
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errPhones;
      response.userAction = apiActions.actionNull;
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
        if(response.availablePhoneTypes !== null && response.availablePhoneTypes !== undefined) {
          gblPhoneTypesList = response.availablePhoneTypes.sort(function(a, b) {return a.phoneTypeId - b.phoneTypeId;}); 	  
        }
      }
    }
  }
} 

function getPhoneTypesListFailure(error) {
  gblPhoneTypesList = defaultPhoneTypeList.sort(function(a, b) {return a.phoneTypeId - b.phoneTypeId;});
}

function getMaxFileUploadSize(){
  operationName =  "retrieveConfigurationOption";
  var data= {};
  data.option = "SHARE_UPLOAD_SIZE_LIMIT";
  var headers= {};
  var serviceName = "appellantServices";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
  integrationObj.invokeOperation(operationName, headers, data, this.getOptionValueSuccess, this.getOptionValueFailure);
}

function getOptionValueSuccess(response) {
  if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
    response.errorMessage = apiErrors.errStates;
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
      if(response.configurationOptionDetails.length === 1) {
        if (response.configurationOptionDetails[0].optionDescription === "SHARE File Upload Size Limit in MBs")
          gblFileMaxUploadSize = response.configurationOptionDetails[0].optionValue * 1048576; 	  
      }
    }
  }
}
function getOptionValueFailure(error) {
  alert("Unable to access SHARE Option");
}
function navigateToLandingPage(landingPage) {
  var ntf = new kony.mvc.Navigation(landingPage);
  ntf.navigate();
  kony.application.dismissLoadingScreen();
}

function navigateToErrorPage(response) {
  // TODO: Moved to the errorHandling.js to centalize the function and remove this clutter.
  handleNavigateToErrorPage(response);
}

function isNetworkAvailable() {
  kony.print("network type - all:"+kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY));
  return kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
}

//update personal info functions
function displayProfileMenu(view) {
  if (view.puProfileMenu.isVisible === true){
    view.puProfileMenu.isVisible = false;
  }
  else {
    view.puProfileMenu.isVisible = true;
    view.puProfileMenu.flxProfileMenuOptions.setFocus(true);
  }
  
  view.forceLayout();
}

function selectProfileMenuItem(view) {
  view.puProfileMenu.isVisible = false;
  var selectedRow = view.puProfileMenu.sgmProfileMenu.selectedRowItems[0];
  if(selectedRow.lblTypeTitle === "Update Personal Information") {
    try
    {
      if (currentFrm.view.chatbotFAQiframe.isConversationOpen()){
        currentFrm.onClickChat();
      }
    }
    catch(e)
    {}
    
    if(gblIsARUser){
       displayARUpdateInfoForm(view);
    }
    else{
      displayUpdateInfoForm(view);
    }
      
    
  }
  
  if(selectedRow.lblTypeTitle === "Log Out") {
    logout();
  }
}  

function displayChangeRole(view) {
  //view.puSelectRole.setReturnPage(view.id);
  currentView = view;
  currentView.puSelectRole.initInfo();
  currentView.puSelectRole.isVisible = true;
  currentView.forceLayout();        
}


function displayARUpdateInfoForm(view) {

  view.puARUpdateInfo.setReturnPage(view.id);
  currentView = view;
  getARPersonalInfoData();

}

function getARPersonalInfoData() {
 // alert(testHatsUserId);
  operationName =  "retrieveContactDemographicsByUserIdAndPortalUserType";
  var data= {"hatsUserId": testHatsUserId, "portalUserType":"AR" };
  var headers= {};
  var serviceName = "appellantServices";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
  integrationObj.invokeOperation(operationName, headers, data, 
                                     this.getARPersonalInfoDataSuccess, 
                                     this.getARPersonalInfoDataFailure);
}
function getARPersonalInfoDataSuccess(result) {
  if(result !== null && result !== undefined && result.ContactDemographicsDTO !== null && result.ContactDemographicsDTO !== undefined) {
    gblARDemographicInfo = result.ContactDemographicsDTO[0]; 
//    alert(JSON.stringify(gblARDemographicInfo));
    currentView.puARUpdateInfo.initInfo();
    currentView.puARUpdateInfo.isVisible = true;
    currentView.forceLayout();
  }
}
function getARPersonalInfoDataFailure(error) {
  var callSpecificMsg = "Unable to access demographic info.";
  currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
  currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
  currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
  currentFrm.view.puInformationDialog.isVisible = true; 
  currentFrm.view.forceLayout();
} 


function displayUpdateInfoForm(view) {
  view.puUpdateInformation.setReturnPage(view.id);
  currentView = view;
  getUpdatePersonalInfoData();
}

function getUpdatePersonalInfoData() {
  operationName =  "getAppellantDemographicsByAppellantId";
  var data= {"appellantId": gblAppellantId};
  var headers= {};
  var serviceName = "appellantServices";
  var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
  integrationObj.invokeOperation(operationName, headers, data, 
                                 this.getUpdatePersonalInfoDataSuccess, 
                                 this.getUpdatePersonalInfoDataFailure);
}

function getUpdatePersonalInfoDataSuccess(result) {
  if(result !== null && result !== undefined && result.AppellantDemographicDetails !== null && result.AppellantDemographicDetails !== undefined) {
    gblDemographicInfo = result.AppellantDemographicDetails[0];
    currentView.puUpdateInformation.initInfo();
    currentView.puUpdateInformation.isVisible = true;
    currentView.forceLayout();        
  }
}

function getUpdatePersonalInfoDataFailure(error) {
  var callSpecificMsg = "Unable to access demographic info.";
  currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
  currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
  currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
  currentFrm.view.puInformationDialog.isVisible = true; 
  currentFrm.view.forceLayout();
}  

// TODO: Added a landingPage for the QnA navigation so everything gets cleaned-up consistently.
function logout(landingPage){
  setUserLoggedIn(false);
  // TODO: Bye default, this function is called without a parameter,so far, only the QnA Bot is calling with a target.
  var altLandingPage = "frmHomeScreen";
  if ((typeof(landingPage) !== "undefined") && (landingPage !== null)) {
    altLandingPage = landingPage;
  }
  console.log("INFO: " + "Logging out and navigating to [" + altLandingPage + "]");

  try{
    resetFlow();
	resetAllGlobals();
    kony.application.destroyForm("frmAppellantDash");
    kony.application.destroyForm("frmAuthorizedRepDashSearch");
    logoutIdentityService(navigateAfterLogout,altLandingPage);
    kony.application.invalidateSession();
    showSessionExpiredMessage();    
    invalidateGlobalSecureToken();
  }catch(err){
    kony.print(JSON.stringify(err));
  }finally{
       
  }
}

function hatsLogout(){
  
    try{
    operationName = "logout";
    var headers = {};
    var serviceName = "hatsLogin";
    var inputParams = {};
    inputParams.hatsUserId = testHatsUserId;

    kony.print("inside inputParams logout (loginFieldsController): " + JSON.stringify(inputParams));
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, inputParams);
  }catch(err){
    kony.print(err);
  }
}

function navigateAfterLogout(altLandingPage){
  
   try {
      gblPortalUserRole = "";
      kony.application.showLoadingScreen();
      var ntf = new kony.mvc.Navigation(altLandingPage); // FIX: ("frmHomeScreen");
      ntf.navigate();
    } catch (ex) {
      dismissLoadingIndicator();
      console.log("EXCEPTION: navigating to " + altLandingPage + ".  " + ex);
    }
}

function closePopupWindow(){
  try{
    var ntf = new kony.mvc.Navigation(dashboardPage);
    ntf.navigate();
  }catch(err){
    kony.print(JSON.stringify(err));
    kony.print("Unable to navigate to any dashboard.  Logging out ...");
    logout("frmHomeScreen");
  }
}

function logoutIdentityService(navigateAfterLogout,altLandingPage) {  
  var options={};
  var authClient = KNYMobileFabric.getIdentityService("OBLDAPSSL");
  authClient.logout(function(response) {
    kony.print("Logout success" + JSON.stringify(response));
    hatsLogout();
    navigateAfterLogout(altLandingPage);
    
  }, function(error) {
    kony.print("Logout failure" + JSON.stringify(error));
    hatsLogout();
    navigateAfterLogout(altLandingPage);
  }, options);
}
function refreshAnonymousToken() {
  var options={};
  var authClient = KNYMobileFabric.getIdentityService("$anonymousProvider");
  authClient.login({}, function(response) {
    kony.print("refreshAnonymousToken Success: " + JSON.stringify(response));
}, function(error) {
    kony.print("refreshAnonymousToken Failure: " + JSON.stringify(error));
});
  
}

function normalizePhone(phone) {
    //normalize string and remove all unnecessary characters
    phone = removeNonNumerics(phone);

    //check if number length equals to 10
    if (phone.length == 10) {
        //reformat and return phone number
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }

    return phone;
}

function isPhoneNumberValid(phone) {
  var isValid = false;
  var numOnly = /^[0-9]+$/;

  if(numOnly.test(phone)) {
     phone = removeNonNumerics(phone);
     if(phone.length == 10) {
       isValid = true;
     }
  }
  
  return isValid;
}

function isZipCodeValid(zipcode) {
  var isValid = false;
  zipcode = removeNonNumerics(zipcode);
  //check if number length equals to 5 or 9
  if (zipcode.length == 5 || zipcode.length == 9) {
    isValid = true;
  }
  return isValid;
}

function isSSNValid(ssn) {
  var isValid = false;
  ssn = removeNonNumerics(ssn);
  //check if number length equals to 9
  if (ssn.length == 9) {
    isValid = true;
  }
  return isValid;
}

function prepareZipCodes(addressDetails) {
  for(var i = 0; i < addressDetails.length; i++) {
    var addressDetail = addressDetails[i];
    var zipCode = addressDetail.zipCd;
    if(zipCode !== null && zipCode !== undefined && zipCode !== "") {
      zipCode = removeNonNumerics(zipCode);
    }
    addressDetail.zipCd = zipCode;
  }
  return addressDetails;
}

function decodeString(encodedString) {
	var textArea = document.createElement('textarea');
	textArea.innerHTML = encodedString;
	return textArea.value;
}

function removeSpecialCharacters(testValues) {
  var SpCharacter = this.decodeString('&#8221;');
  while(testValues.includes(SpCharacter, 0)) {
    testValues = testValues.replace(SpCharacter,'"');
  }
  while(testValues.includes('“', 0)) {
    testValues = testValues.replace('“','"');
  }  
  while(testValues.includes("’", 0)) {
    testValues = testValues.replace("’", "'");
  } 
  while(testValues.includes("‘", 0)) {
    testValues = testValues.replace("‘","'");
  }
  SpCharacter = this.decodeString('–');
  while(testValues.includes(SpCharacter, 0)) {
    testValues = testValues.replace(SpCharacter, "-");
  }
  return testValues;
}

function removeNonNumerics(phone) {
  return phone.replace(/[^\d]/g, "");
}

function registertForIdleTimeout() {
  kony.application.registerForIdleTimeout(SESSION_TIMEOUT_MINS, expireSession);
  gblSessionExpired = false;
}

function expireSession(){
  gblSessionExpired = true;
    gblPortalUserRole = "";
    refreshAnonymousToken();
  	logout();
}

function showSessionExpiredMessage() {
  if(gblSessionExpired) {
    alert("Your session has expired due to inactivity.  Please login again to continue.");
  }
}

function showLoadingIndicator() {
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
}
function dismissLoadingIndicator() {
  kony.application.dismissLoadingScreen();
}
function dismissLoadingIndicator() {
  kony.application.dismissLoadingScreen();
}

function gblSettings(frm){
  kony.application.destroyForm("frmAuthorizedRepDashSearch");
  if(isUserLoggedIn()) {
    frm.view.onDeviceBack = gblOnDeviceBack;
  }
  
  window.onbeforeunload = function () {return true;};
  // TODO: Moving the common function of eventlistener-stack for CHAT during construction
  if (typeof(frm.onEnableChat) == "function") {
    amplify.subscribe("enableChatbutton", frm, frm.onEnableChat);
  }
  if (typeof(frm.onDisableChat) == "function") {
    //mehmet frm.onDisableChat();
  }
  frm.view.onDestroy = function() {
    kony.print(">>>># onDestroy page");
    if (typeof(frm.onDisableChat) == "function") {
      //mehmet frm.onDisableChat();
    }
    showLoadingIndicator();
  };
  let flagAllChannels_HandleBackButton = true;
  frm.view.onBreakpointChange = onBreakpointChange;
  if(frm.view.mainHeaderScreens !== undefined){
  	frm.view.mainHeaderScreens.buttonHamBurgerOnClick = displayHamburgerScreen;
    mainHeaderScreen = frm.view.mainHeaderScreens;
  }  
  else if(frm.view.mainHeaderScreensCopy !== undefined){
    frm.view.mainHeaderScreensCopy.buttonHamBurgerOnClick = displayHamburgerScreen;
    mainHeaderScreen = frm.view.mainHeaderScreensCopy;
  }
  currentFrm = frm;
}

function onBreakpointChange(form, width){
  amplify.publish("authorizedDash", form, width);
  try{ 
    currentFrm.onBreakpointChange(form, width);
  } catch(e){}  
}

function gblOnDeviceBack(){
  alert('Browser back and forward navigation is not allowed.\n\nPlease use application back and forward navigation.');
}

function displayHamburgerScreen(){

  if(mainHeaderScreen.buttonHamBurgerSkin ==='CopydefBtnNormalHam'){
    mainHeaderScreen.height = "100%";
    mainHeaderScreen.buttonHamBurgerSkin ='CopydefBtnNormalHamCancel';
    mainHeaderScreen.flxContainerHamisVisible = true;
    currentFrm.view.flxContainerForm.isVisible=false;

    if (currentFrm.view.headerCancelRHearing === undefined){
      currentFrm.view.subNavigationHeaders.isVisible = false;
    }
    else {
      currentFrm.view.headerCancelRHearing.isVisible = false;
    }

    try
    {
      if (currentFrm.view.chatbotFAQiframe.isConversationOpen()){
        currentFrm.onClickChat();
      }
    }
    catch(e)
    {}
  }    
  else {
    mainHeaderScreen.height = "130px";
    mainHeaderScreen.buttonHamBurgerSkin ='CopydefBtnNormalHam';
    mainHeaderScreen.flxContainerHamisVisible = false;
    currentFrm.view.flxContainerForm.isVisible=true;
    if (currentFrm.view.headerCancelRHearing === undefined){
      currentFrm.view.subNavigationHeaders.isVisible = true;
    }
    else {
      currentFrm.view.headerCancelRHearing.isVisible = true;
    }

  }
  currentFrm.view.forceLayout();   
}

function forceLayoutCurrentForm() {
  currentFrm.view.forceLayout();
}

function adjustSummarySection(view, width) {
    //we need to use the same miniBox card in desktop and moble. to achive this, you add and remove as needed
    //according to documentation:  "You have to explicitly remove the widget from one hierarchy before adding it to another Form or Box."
    //https://docs.kony.com/konylibrary/visualizer/viz_widget_prog_guide/Content/Form_Methods.htm#add(widg
    
    var desktopWidgets = view.flxContainerContentStep.widgets();
    var mobileWidgets = view.flxContainerSummary.widgets();
	 gblWidgets.summaryflx=(view.flxContainerCol2)?view.flxContainerCol2:gblWidgets.summaryflx;
    if(width <= gblBreakPoint) {
      if(desktopWidgets.length === 3)  {
        //flx = view.flxContainerCol2;//.children[2];
        view.flxContainerContentStep.removeAt(2); 
      }
      if(mobileWidgets.length === 0) {
        view.flxContainerSummary.addAt(gblWidgets.summaryflx, 0);//view.flxContainerCol2
        view.flxContainerSummary.top = '16px';
        view.flxContainerSummary.width = '90%';
        view.flxContainerCol2.width = '100%';
        view.flxContainerCol2.centerX = '50%';
        view.miniBoxSummaryHearing.width = '90%';
        view.miniBoxARAppealInfo.width = '95%';
      }
      view.flxContainerCol2.isVisible = true;
      view.flxContainerSummary.isVisible = true;
    }
  else {
    if(mobileWidgets.length === 1) {
      view.flxContainerSummary.removeAt(0);  
      view.flxContainerSummary.top = '0dp';
    }
    if(desktopWidgets.length === 2)  {
      view.flxContainerContentStep.addAt(gblWidgets.summaryflx, 2); 
      view.flxContainerCol2.width = '30%';
      view.flxContainerCol2.centerX = 'Default';
      view.miniBoxSummaryHearing.width = '90%';
      view.miniBoxARAppealInfo.width = '90%';
    }
    view.flxContainerSummary.isVisible = false;
  }  
}

function adjustAppealsSummarySection(view, width) {
    //we need to use the same miniBox card in desktop and moble. to achive this, you add and remove as needed
    //according to documentation:  "You have to explicitly remove the widget from one hierarchy before adding it to another Form or Box."
    //https://docs.kony.com/konylibrary/visualizer/viz_widget_prog_guide/Content/Form_Methods.htm#add(widg
    
    var desktopWidgets = view.flxContainerContentStep.widgets();
    var mobileWidgets = view.flxContainerSummary.widgets();
	 gblWidgets.summaryflxadjustappeals=(view.flxContainerCol2)?view.flxContainerCol2:gblWidgets.summaryflxadjustappeals;
    if(width <= gblBreakPoint) {
      if(desktopWidgets.length === 3)  {
        view.flxContainerContentStep.removeAt(2); 
      }
      if(mobileWidgets.length === 0) {
        view.flxContainerSummary.addAt(gblWidgets.summaryflxadjustappeals, 0);
        view.flxContainerCol2.left = '0%';
        view.flxContainerCol2.width = '100%';
        view.flxContainerCol2.top = '10dp';
        view.flxContainerCol2.centerX = '50%';
      }
      view.flxContainerCol2.isVisible = true;
      view.flxContainerSummary.isVisible = true;
    }
    else {
      if(mobileWidgets.length === 1) {
      	view.flxContainerSummary.removeAt(0);  
      }
      if(desktopWidgets.length === 2)  {
        view.flxContainerContentStep.addAt(gblWidgets.summaryflxadjustappeals, 2); 
        view.flxContainerCol2.left = '-2%';
        view.flxContainerCol2.width = '30%';
        view.flxContainerCol2.top = '63dp';
        view.flxContainerCol2.centerX = 'Default';
      }
      view.flxContainerSummary.isVisible = false;
    }  
}

function appealsSummaryLayoutDirection(view, width) {
    if(width <= gblBreakPoint) 
      view.flxContainerContentStep.reverseLayoutDirection =true;    
    else 
      view.flxContainerContentStep.reverseLayoutDirection =false; 
    view.flxContainerContentStep.forceLayout();
    view.forceLayout();
}

function adjustRequestAssistanceSummary(view, width) {
    
    var desktopWidgets = view.flxContainerContentStep.widgets();
    var mobileWidgets = view.flxContainerSummary.widgets();
	 gblWidgets.summaryflxrequestassistance=(view.flxContainerCol2)?view.flxContainerCol2:gblWidgets.summaryflxrequestassistance;
    if(width <= gblBreakPoint) {
      if(desktopWidgets.length === 3)  {
        view.flxContainerContentStep.removeAt(2); 
      }
      if(mobileWidgets.length === 0) {
        view.flxContainerSummary.addAt(gblWidgets.summaryflxrequestassistance, 0);
        view.flxContainerSummary.top = '16px';
        view.flxContainerSummary.width = '90%';
        view.flxContainerCol2.width = '100%';
        view.flxContainerCol2.centerX = '50%';
      }
      view.flxContainerCol2.isVisible = true;
      view.flxContainerSummary.isVisible = true;
    }
  else {
    if(mobileWidgets.length === 1) {
      view.flxContainerSummary.removeAt(0);  
      view.flxContainerSummary.top = '0dp';
    }
    if(desktopWidgets.length === 2)  {
      view.flxContainerContentStep.addAt(gblWidgets.summaryflxrequestassistance, 2); 
      view.flxContainerCol2.width = '30%';
      view.flxContainerCol2.centerX = 'Default';
    }
    view.flxContainerSummary.isVisible = false;
  }  
}

function setLocaleSuccess(){
  	currentFrm.view.puInformationDialog.flxContainerInfoHeight = '220px';
    currentFrm.view.puInformationDialog.lblTitleText = "Bureau of State Hearings";
   	currentFrm.view.puInformationDialog.lblDescText = kony.i18n.getLocalizedString('i18N.puInformationDialog.lblDesc1'); 
    currentFrm.view.puInformationDialog.isVisible = true; 
    currentFrm.view.forceLayout();
}
function showTeamsMeetHelp(){
    kony.application.openURL("https://support.microsoft.com/en-us/office/join-a-meeting-in-teams-1613bb53-f3fa-431e-85a9-d6a91e3468c9?ui=en-us&rs=en-us&ad=us");
}
function showHearMeetHelp(){
    var ntf = new kony.mvc.Navigation('frmConnectToHearing');
  	ntf.navigate();
    //kony.application.openURL(Deeplink_Path + "frmConnectToHearing");
}
function showMaintMsg(msgIndex){
    //alert(msg);
  	let msgText = maintenanceMessageList[msgIndex].messageText; 
  	
  	if(msgText.length > 500)
  		currentFrm.view.puInformationDialog.flxContainerInfoHeight = '320px';
  	else 
      	currentFrm.view.puInformationDialog.flxContainerInfoHeight = '220px';
  	currentFrm.view.puInformationDialog.lblTitleText = "\n";
   	currentFrm.view.puInformationDialog.lblDescText = msgText;
    currentFrm.view.puInformationDialog.isVisible = true; 
    addEventListener('keydown',this.preventTabMsg);
    currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
    currentFrm.view.forceLayout();
}
function preventTabMsg(e){
  e = e || window.event; 
  if (currentFrm.view.puInformationDialog.isVisible === true){
    if (e.keyCode === 9)  // If tab key is pressed
    { 
      e.preventDefault(); // stop event from its action 
      currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
    } 
  }else{
    removeEventListener('keydown',this.preventTabMsg);
  }
}

function navTOLogin(){
  
      var ntf = new kony.mvc.Navigation('frmLogin');
  	  ntf.navigate();
}
function navToFAQ(){
  var ntf = new kony.mvc.Navigation('frmFAQ');
  var SMSOBJ = 'SMS';
  ntf.navigate(SMSOBJ);
}

  
function navWaysToConnect(){  
  var params = {
    "ScrollToWaysToConnect": "true"
  };
  var ntf = new kony.mvc.Navigation('frmConnectToHearing');
  ntf.navigate(params);
}

function appServiceCallBack(params){
  kony.print("*************** launch mode is: " +JSON.stringify(params.launchmode));

  if (params.launchmode === 3)
  {
    var launchparams = params.launchparams;

    var parameter_Required = launchparams.key;
    return parameter_Required;
  }
}
function appServiceCallBackOLD(params){
  console.log("INFO: appServiceCallBack. " + params);
  if (params.launchparams) {
    var deepLinkPath = params.launchparams.deepLinkPath;
    if(deepLinkPath) {
      if(deepLinkPath.includes('frmHomeScreen')) {
        return 'frmHomeScreen';
      }
      if(deepLinkPath.includes('frmRegistration')) {
        return 'frmRegistration';
      }
      if(deepLinkPath.includes('frmBeforeHearing')) {
        return 'frmBeforeHearing';
      }
      if(deepLinkPath.includes('frmConnectToHearing')) {
        return 'frmConnectToHearing';
      }
      if(deepLinkPath.includes('frmDuringHearing')) {
        return 'frmDuringHearing';
      }
      if(deepLinkPath.includes('frmAfterHearing')) {
        return 'frmAfterHearing';
      }
      if(deepLinkPath.includes('frmFAQ')) {
        return 'frmFAQ';
      } 
      if(deepLinkPath.includes('frmContact')) {
        return 'frmContact';
      } 
      if(deepLinkPath.includes('frmLogin')) {
        return 'frmLogin';
      }      
    }
  }
}


