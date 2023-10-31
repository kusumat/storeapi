//Type your code here
/* Centralizing the API error handling to better maintain updates for UI/UX
   by providing user actionable error responses.

	Design Objective:
    	Capture error response from API invocations and provide meaningful responses
        that either allow the user to take the corrective action or report sufficent details
        to the Support Line to enable a quick triage and resolution.
        
	Design points:
    
    	1. Prepare the Kony Fabric client in one location and share for all "invokeOperation" calls.
        
        2. KF client errors are thrown exceptions and must be caught to prevent crashing the App.  Since the KF client
        	is essentially a Singleton pattern, catching the exception is only required during the App initialization.
            
            Typical causes
            	* Coding error caught during development.
                * Pre/Post App init code got reverted in build, caught during sanity testing.
                * Unable to reach the network, must close App and start new when network is available.
                * Blocked by CORS check the environment.  The production user should never see this unless there is a
                change in the infrastructure (security policy, new API management rules, etc.).
                
		3. invokeOperation: onFailure
        
        	Typical causes
            	* Timeout due to latency or large data transfer (e.g., uploading PDF documents)
                * API authorization (idle timeout or max session time)
                * API data validation
                * API version compatibility
        
        4. invokeOperation: onSuccess and payload error status
        
        	This error implies that Kony Fabric is online and reachable.  The service request was successful through the
            network reaching Kony Fabric.  Kony Fabric communicated with the [HATS] webservices layer, however, the service
            is returning a failure status.
            
            	NOTE: the original code explicitly tests fo 
        
        	Typical causes
            	* Infrastructure is down due to network, gateway, proxy servers are down beyond the Kony Fabric server.
                * HATS webservices server is down
                * Downstream [upstream if you prefer] server or service is failing (e.g., Filenet is offline for maintenance), crashed, etc.
                * Data validation from the API failed.
        
        5. invokeOperation: success API and payload both return non-error status codes
        
        	After the API returns successfully, there are still possible errors that the user might experience.
            
        	Typical causes
        
        		* App will unpack the payload and data conversion could occur.
                * App proceeds to another API which may be dependent on results from the previous APIs.
                * App finalizes its navigation to the next screen.

*/

/* Payload errors

ref: https://docs.kony.com/konylibrary/sync/kmf_sync_orm_api_guide/Content/Error%20Handling.htm

DISCLAIMER ... all the possible "opstatus" from the service provider are not known.  This list may
be incomplete, outdated, etc.  It is not clear where this list was defined and how it is used
by the service provider.  [Ed note: to-date, I have only experienced '1011' and '1013'].

1000	 	Unknown Error while connecting (If the platform cannot differentiate between the various kinds of network errors, the platform reports this error code by default)
1011	 	Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity.
1012	 	Request Failed
1013	 	Middleware returned invalid JSON string
1014	 	Request Timed out
1015	 	Cannot find host
1016	 	Cannot connect to host
1022	 	Service call is canceled. You can customize the behavior of the application if a service call is canceled.
1200	 	SSL - Certificate related error codes.

*/

/*
	Some good SPLUNK searches (pick your time duration as you see fit):
    
    "... any appellantServices operations where the payload returns an HTTP error other than 200."
    	(index=ent_kony OR index=kony-*) tag=sys   appID=appellantServices | regex "httpStatusCode.(:[3456][0-9][0-9])" 
    "... '204' OK, but not found"
        (index=ent_kony OR index=kony-*) tag=sys   appID=appellantServices | regex "httpStatusCode.(:[2][0][4])"
 	"... all 'appID' any 200 errors -- this is useful to find all the APIs that get invoked durign the App lifecycle (use a long time range)
        (index=ent_kony OR index=kony-*) tag=sys  | regex "httpStatusCode.(:[2][0][0])"
*/

/* Capturing all the "onsuccess" responses throughout the code.

    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      navigateToErrorPage(response);  
    } else {
      .
      .
      .
    }

*/
function _TEMPLATE_OPTIONAL_PARAMS()  {
  // Cut'n paste these two lines into the code.  Also, take not if the var is 'response' or 'result'
  // When in-place, then use the ctrl-tab to autocomplete from the list.
      response.errorMessage = apiErrors.err;
      response.userAction = apiActions.action;
  // ... or ...
      result.errorMessage = apiErrors.err;
      result.userAction = apiActions.action;
}

let apiErrors = {
  // Caught exception
  exceptionNavigation: "Something went wrong while navigating.",
  // GET errors
  errServerUnreachable: "Unable to reach the server on the network.",
  errNetworkUnreachable: "Unable to connect to the internet.",
  errInfoAccessAppellant: "Unable to access Appellant Info at this time.",
  errInfoUpdates: "Unable to access the appeals updates.",
  errServerDemographics: "Unable reach the server for Appellant demographics info.",
  errServerAppeals: "Unable to reach the server for Appeals info.",
  errCounties: "Unable to access the list of Counties.",
  errStates: "Unable to access the list of States.",
  errPhones: "Unable to access the list of Phone Type.",
  errLanguages: "Unable to access the list of supported Languages.",
  errServerAppealsAndDispositions: "Unable to reach the server for Appeals and Dispositions.",
  errInterestedParties: "Unable to reach the server to get the list of Interested Parties.",
  errDocumentTypeList: "Unable to access the list of Document Types.",
  errDocumentList: "Unable to access the list of Documents.",
  errReasonsRescheduleList: "Unable to access the list of Reschedule Reasons.",
  errReasonsList: "Unable to access the list of Reasons for the this step.",
  errQuestionsList: "Unable to access the list of Questions at this time.",
  errIssuesList: "Unable to access the list of Issues at this time.",
  errInfoCompliance: "Unable to access the Compliance info at this time.",
  errInfoHearing: "Unable to access the Hearing info at this time.",
  errInfoBenefitsPrograms: "Unable to access the list of Benefits Programs.",
  errDocument: "Unable to access the document at this time.",
  // PUT errors  
  errSubmitHearingRequest: "Unable reach the server to submit the Hearing Request.",
  errSubmitAuthRep: "Unable to reach the server to add the Authorized Representative.",
  errSubmitRescheduleRequest: "Unable to reach the server to submit the Rescheduled Hearing.",
  errSubmitDocument: "Unable to reach the server to add a Document.",
  errSavePIupdates: "Unable to save the Personal Information at this time.",
};

let apiActions = {
  actionNull: null, // This will suppress the messaging.
  actionCheckNetwork: "Check your network connection and try again.", 
  actionWait: "Please wait and try at a later time.",  
  actionCallSupport: "If the problem persists, contact support by e-mail at: " + gblBHSEmail + " or by phone at: " + gblBHSPhone,                        
};


function handleNavigateToErrorPage(response) {
  var params = {};
  
  // Load up the optional parameters.  If not provided, generic message will be displayed and no userAction.
  if ((typeof(response.errorStatus) !== "undefined") && response.errorStatus !== null) {
    params.errorStatus = response.errorStatus;
    params.errorMessage = response.errorMessage;
    params.currentForm = currentFrm.viewId;
    params.currentFlow = currentFlow;
    params.operationName = operationName;
  }
  else
  {
    if ((typeof(response.errorMessage) !== "undefined") && response.errorMessage !== null) {
      params.errorMessage = response.errorMessage;
    }
  }
  if ((typeof(response.userAction) !== "undefined") && response.userAction !== null) {
    params.userAction = response.userAction;
  }

  // Navigate to the internal-error form with the optional parameters.
  
  var ntf = new kony.mvc.Navigation("frmInternalError");
  ntf.navigate(params);
  kony.application.dismissLoadingScreen();
}


function errorProcessor(kfResponse) {
  var flagHandled = false;
  
  switch (kfResponse.opstatus) {
    case "1011":
      break;
    default:
      break;
  }
  
  return flagHandled;
}