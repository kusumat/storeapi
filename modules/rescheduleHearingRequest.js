var rescheduleHearingRequest = {
  "appealIds": [],
  "hatsUserId": "",
  "rescheduleReasonCode": "",
  "htsDenialReasonTxt": "",
  "noticeOfActionDate":"",
  "rescheduleReasonText":"",
  "languageDesc":"",
  "intprLangId":0,
  "interpreterReqInd":"",
  "appellantPbpInd": "",
  "phoneDetails": {
    "phoneTypCD": "",
    "phoneNumber": "",
    "ext": "",
    "primaryInd": ""
  },
  "eventDetails": [],  
  "goodCauseDocument": ""
};

function resetRescheduleHearingRequest() {
  rescheduleHearingRequest.appealIds = [];
  rescheduleHearingRequest.hatsUserId = "";
  rescheduleHearingRequest.rescheduleReasonCode = "";
  rescheduleHearingRequest.htsDenialReasonTxt = "";
  rescheduleHearingRequest.noticeOfActionDate = "";
  rescheduleHearingRequest.rescheduleReasonText = "";
  rescheduleHearingRequest.languageDesc = "";
  rescheduleHearingRequest.intprLangId  = 0;
  rescheduleHearingRequest.interpreterReqInd = "";
  rescheduleHearingRequest.appellantPbpInd = "";
  rescheduleHearingRequest.phoneDetails = [];
  rescheduleHearingRequest.eventDetails = [];  
  rescheduleHearingRequest.goodCauseDocument = "";
}