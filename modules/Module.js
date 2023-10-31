var Deeplink_Path = "";
var gblARHearingFrom = "";
var gblARSearchTab = "Appellants";
var gblARReceivedStatus = '';
var gblHearingStartDate = "";
var gblHearingEndDate = "";
var gblARComplianceDate = "";
var gblFrmCurrentName="";
var gblBenefitsProgram = "";
var gblWhatHappenedCode = "";
var gblWhatHappenedText = "";
var gblWhatHappenedComments = "";
var whatHappenedQuestions = [];
var gblWhatHappenedQuestionsFiltered = [];
var gblPortalUserRole = "";
var gblPortalUserTypeCodes = [];
var gblBenefitsPrograms = [];
var gblCaseNumber = "";
var gblReceivedNotice = "";
var gblReceivedNoticeDate = "";
var gblNeedInterpreter = "";
var gblPreHearingHelp = "";
var gblCountyConference = "";
var gblLanguageList = [];
var gblARDemographicInfo = {};
//var gblNeedInterpreter = "";
var gblDemographicInfo = {};
var gblSelectedAppealId = "";
var gblMaintenanceMsgClosed = false;
var gblSelectedDispositionId = "";
var gblAppealList = [];
// The name is only displayed when the logged in user is an Appellant. 
// So, it is blank when the logged in user is a TPM or AR.
var gblAppellantId = "";
var gblNotificationsList = [];
var gblUploadedFileName = "";
var gblARFormAttached = false;
var gblCountiesList = [];
var gblStatesList = [];
var gblAppealNumber = "";
var gblPortalProgramDesc = "";
var gblPortalIssueCode = "";
var gblPhoneTypesList = [];
var gblPhoneTypeList = [];
var gblDocumentTypeId = "";
var gblRescheduleHearingAppealsList = [];
var gblAppellantList = [];
var gblSelectedAppealIds = [];
var gblHatsDenialReasonText = "";
var gblLanguageDesc = "";
var gblEventDetails = [];
var gblRescheduleHearingRequest = [];
var gblPortalReasons =[];
var gblPortalReasons_key = "";
var withdraw_reasons_key = "";
var gblPortalReasons_value="";
var gblObPersonName = "";
var gblSubmitAnotherIssue = false;
var gblRequestDate ="";
var gblProgram="";
var gblReceivedDate="";
var fromWithdraw=false; 
var gblRescheduleReason = "";
var gblWithdrawAgree = false;
var gblWithdrawDate = false;
var gblWithdrawDateValue = "";
var gblWithdrawText= false;
var programsAndIssues = new Map();
var gblSelectedBenefitsProgram = "";
var gblEditIssue = false;
var gblUserInfoValidated = false;
var gblUserInfo = {};
var gblQuestion1Data = "";
var gblQuestion2Data = "";
var gblQuestion3Data = "";
var gblQuestion4Data = "";
var gblExperianSessionID = "";
var gblLoginHATSUserId = "";
var gblIsARUser=false;
var gblIsTPMUser=false;
var gblVrtHearingIndArSection = "";
// TODO: This can be a combination of state variables.
var gblUserLoginState=false;
var gblAppellantDocuments = [];
var gblAssociatedAppeals = [];
var gblComplianceDocuments = [];
var gblDocuments = [];
var gblComplianceAgencies = [];
var gblDocumentTypes = [];
var gblAppealTypeDescription = "";
var gblSessionExpired = false;
var gblPortalIssueQuestions = [];
var gblComplianceDocumentTypes = [];
var gblInterestedParties = [];
var gblRepresentingOption = null;
var gblAttestationAgree = false;
var flow = new Map();
var flowName = "";
var operationName = "";
var currentFlow = "";
var gblCancelClckd = false;
var gblFileMaxUploadSize = 40; //default 40 mb

const SESSION_TIMEOUT_MINS = 20;

var selectedAppeals = new Map();
var selectedAppeals2 = new Map();
var ComplianceStatusPendReject = false;
var ComplianceAppealIds = "";
var gblHasAppealIds = false;
var gblRescheduleAgree = false;
var gblSnHearingInfoVisible = true;
var gblBHSPhone = "866-635-3748";
var gblBHSEmail = "HATSX_INQUIRIES@jfs.ohio.gov";
var gblBHSNote ="When emailing the HATSX Inquiries mailbox, please include your Name, Address, Case Number, Appeal Number, and SHARE Portal username along with a brief description of the issue/question.";

var activeAppellantList=[];
let mobileFlag=false;
var loadAppellants = true;

var gblBreakPoint = 853;
let GLOBAL_BREAKPOINTS = {
    largeDesktop: 853,
    desktop: 853,
    tabletLandscape: 853,
    tabletPortrait: 480,
    mobile: 479
};

// TODO: Login is complicated by authentication, authorization and first-time user.
// This state variable is necessary to help manage the CHATBOT's QnA from unintentionally logging the user out.
function isUserLoggedIn() {
  return gblUserLoginState;
}

// TODO: see above.
function setUserLoggedIn(flagLoginState) {
  gblUserLoginState = flagLoginState;
}

var gblHearingInfo = {
  isVisible:true,
  address:"",
  hearingDate:"",
  hearingTime:"",
  phoneNumber:"",
  interestedPartyCompanyName:"",
  showQuickAction:true,
  virtualHearingMeetingLink:"", 
  virtualHearingDialInNumber:"", 
  virtualHearingInd:"", 
  virtualHearingConferenceId:"", 
  pbpPhoneAtHomeInd:"",
  pbpMessageText: ""
};

var gblWithdrawHearingInfo = {
  isVisible:true,
  address:"",
  hearingDate:"",
  hearingTime:"",
  phoneNumber:"",
  interestedPartyCompanyName:"",
  showQuickAction:true
};

var gblRescheduleHearingInfo = {
  isVisible:true,
  address:"",
  hearingDate:"",
  hearingTime:"",
  phoneNumber:"",
  interestedPartyCompanyName:"",
  showQuickAction:true
};
var gblAppealDetailInfo = {
  person:"",
  program:"",
  receivedDate:"",
  noticeDate:"",
  fairHearingBenefitStatus:"",
  caseNumber:"",
  requestDate:"",
  appealNumber:"",
  portalIssueCode:"",
  appellantPBPInd:"",
  hearingDate:""
};

// BreakpointChange HELPER functions.
function isBreakpointLargeDesktop(width) {
    return (GLOBAL_BREAKPOINTS.largeDesktop < width);
}

function isBreakpointDesktop(width) {
    return (GLOBAL_BREAKPOINTS.desktop < width) && (width <= GLOBAL_BREAKPOINTS.largeDesktop);
}

function isBreakpointTabletLandscape(width) {
    return (GLOBAL_BREAKPOINTS.tabletLandscape < width) && (width <= GLOBAL_BREAKPOINTS.desktop);
}

function isBreakpointTabletPortrait(width) {
    return (GLOBAL_BREAKPOINTS.tabletPortrait < width) && (width <= GLOBAL_BREAKPOINTS.tabletLandscape);
}

function isBreakpointMobileLandscape(width) {
  return false;  // TODO: Defeat this breakpoint as tablet.  Consider it as mobile.
//     return (GLOBAL_BREAKPOINTS.mobile < width) && (width <= GLOBAL_BREAKPOINTS.tabletPortrait);
}

function isBreakpointMobile(width) {
    return width <= GLOBAL_BREAKPOINTS.mobile;
}

function resetAllGlobals() {
	// TODO: I think this is the root cause of the logout-login issue
    previousFrm = "frmHomeScreen";
    currentFrm = "frmHomeScreen";
    gblFrmCurrentName="";
    gblARHearingFrom = "";
  	// TODO: -- end
  	gblARSearchTab = "Appellants";
  	gblARReceivedStatus = '';
    testHatsUserId = "";
	gblBenefitsProgram = "";
	gblWhatHappenedCode = "";
	gblWhatHappenedText = "";
    gblWhatHappenedComments = "";
	whatHappenedQuestions = [];
	gblWhatHappenedQuestionsFiltered = [];
	gblBenefitsPrograms = [];
	gblCaseNumber = "";
	gblReceivedNotice = "";
	gblReceivedNoticeDate = "";
	gblNeedInterpreter = "";
	gblPreHearingHelp = "";
	gblCountyConference = "";
	gblLanguageList = [];
    gblARDemographicInfo = {};
	gblDemographicInfo = {};
	gblSelectedAppealId = "";
	gblSelectedDispositionId = "";
	gblAppealList = [];
	gblAppellantId = "";
	gblNotificationsList = [];
  	gblMaintenanceMsgClosed = false;
	gblUploadedFileName = "";
  	gblARFormAttached = false;
	gblCountiesList = [];
	gblStatesList = [];
	gblAppealNumber = "";
	gblPortalProgramDesc = "";
	gblPortalIssueCode = "";
    gblDocumentTypes = [];
	gblPhoneTypesList = [];
	gblDocumentTypeId = "";
	gblRescheduleHearingAppealsList = [];
	gblAppellantList = [];
	gblSelectedAppealIds = [];
	gblHatsDenialReasonText = "";
	gblLanguageDesc = "";
	gblEventDetails = [];
	gblRescheduleHearingRequest = [];
	gblPortalReasons =[];
	gblPortalReasons_key = "";
	gblPortalReasons_value="";
	gblObPersonName = "";
	gblSubmitAnotherIssue = false;
	gblRequestDate ="";
	gblProgram="";
	gblReceivedDate="";
	fromWithdraw=false; 
	gblRescheduleReason = "";
	gblWithdrawAgree = false;
	gblWithdrawDate = false;
	gblWithdrawDateValue = "";
	gblWithdrawText= false;
	programsAndIssues = new Map();
	gblSelectedBenefitsProgram = "";
	gblEditIssue = false;
	gblIsARUser=false;
	flow = new Map();
	flowName = "";
	selectedAppeals = new Map();
    selectedAppeals2 = new Map();
    ComplianceStatusPendReject = false;
    ComplianceAppealIds = "";
	gblHasAppealIds = false;
	gblRescheduleAgree = false;
  	gblPortalStatus = "";
    gblUserInfoValidated = false;
    gblUserInfo = {};
    gblQuestion1Data = "";
    gblQuestion2Data = "";
    gblQuestion3Data = "";
    gblQuestion4Data = "";
    gblExperianSessionID = "";
    gblLoginHATSUserId = "";
  	gblDocumentTypes = [];
    gblComplianceDocumentTypes = [];
  	gblAttestationAgree = false;
    gblVrtHearingIndArSection = "";  
}

function resetHearingRequestGlobals() {
  gblBenefitsProgram = "";
  gblWhatHappenedCode = "";
  gblWhatHappenedText = "";
  gblWhatHappenedComments = "";
  gblWhatHappenedQuestionsFiltered = [];
  gblReceivedNotice = "";
  gblReceivedNoticeDate = "";
  programsAndIssues = new Map();
  gblEditIssue = false; 
  gblNeedInterpreter = "";
  gblPreHearingHelp = "";
  gblCountyConference = "";
  //gblHearingInfo = "";
  gblPortalIssueQuestions = [];
  gblUploadedFileName = "";
  gblARFormAttached = false;
}

function resetRescheduleHearingRequestGlobals() {
  gblPortalReasons_key = "";
  gblPortalReasons_value="";
  gblWithdrawDateValue = "";
  gblWithdrawDate = false;
  gblWithdrawDateValue = "";
  gblWithdrawText= false; 
  gblRescheduleAgree = false;
  gblFrmCurrentName="";
}

var testHatsUserId = "";
var gblNotAvailableDataLabel = "Not Available";

function addToFlow(id, formToAdd) { 
  if (!flow.has(id)) {
	flow.set(id, formToAdd);
  }
}

function resetFlow() {
  kony.application.destroyForm("frmAuthorizedRepDashSearch");
  showLoadingIndicator();
  flow.forEach(function(value, key, map) {
      kony.application.destroyForm(key);  
  });    
  flow.clear();
  flowName = "";

  //additionally reset flow variables
  ComplianceStatusPendReject = false;
  ComplianceAppealIds = "";
  resetHearingRequest();
  resetHearingRequestGlobals();
  resetRescheduleHearingRequest();
  resetRescheduleHearingRequestGlobals();
}

function resetHearingRequest() {
  resetHearingRequestGlobals();
  hearingRequest.hatsUserId = "";
  hearingRequest.appellantFirstName = "";
  hearingRequest.appellantLastName = "";
  hearingRequest.appellantMiddleName = "";
  hearingRequest.appellantId = 0;
  hearingRequest.caseNumber = "";
  hearingRequest.inCareOf = "";
  hearingRequest.noticeDateInd = "";
  hearingRequest.noticeDate = "";
  hearingRequest.preHearingResolustionInd = "";
  hearingRequest.countyConferanceInd = "";
  hearingRequest.interptrReqInd = "";
  hearingRequest.languageDesc = "";
  hearingRequest.intprLangId = 0;
  hearingRequest.appeallantHomelessIndMsgTxt = "";
  hearingRequest.email = "";
  hearingRequest.briefExplanation = "";
  hearingRequest.homelessInd = "";
  hearingRequest.addressDetails = [];
  hearingRequest.phoneDetails = [];
  hearingRequest.eventDetails = [];
  hearingRequest.avoidDays = [];
  hearingRequest.stateHearingRequests = [];
  hearingRequest.uploadDocument = "";
  hearingRequest.uploadDocuments = [];
}
/* 

    Test Change for Checkin

	Appellant Hats User ID/Appellant ID: 
	
    20486/391870 UNEXPECTED_ERROR
    60023/312607 UNEXPECTED_ERROR 
    60031/391899 UNEXPECTED_ERROR Note: has many appeal types and groups 
    60030/391942 (homeless) get demographics by appellant id works fine
    
    AR ID
    60043/391556
    
    TPM ID
    60032/387159
    
*/

