function saveSessionData() {
  var identityService = kony.sdk.getCurrentInstance();
  var sessionData = {
    claimTokenExpiry: identityService.claimTokenExpiry,
    currentClaimToken: identityService.currentClaimToken,
    currentRefreshToken: identityService.currentRefreshToken,
    sessionId: identityService.getSessionId(),
    userstoreToken: identityService.tokens.userstore,
  };
  sessionStorage.setItem('userSession', JSON.stringify(sessionData));
}

function applySessionData() {
  if (!sessionStorage.getItem(ROUTING_SESSION_KEYS.userSession)) {
    return;
  }
  var sessionData = JSON.parse(sessionStorage.getItem('userSession'));
  var identityService = kony.sdk.getCurrentInstance();
  identityService.claimTokenExpiry = sessionData.claimTokenExpiry;
  identityService.currentClaimToken = sessionData.currentClaimToken;
  identityService.currentRefreshToken = sessionData.currentRefreshToken;
  identityService.setSessionId(sessionData.sessionId);
  identityService.tokens.userstore = sessionData.userstoreToken;
}
