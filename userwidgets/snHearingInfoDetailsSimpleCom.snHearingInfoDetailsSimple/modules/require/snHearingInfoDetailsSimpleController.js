define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnReschedule.onClick = this.navigateToRescheduleHearing;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    getHearingInformationByAppealIdAndDispositionIdAndHatsUserId:function() {
      operationName =  "getHearingInformationByAppealIdAndDispositionIdAndHatsUserId";
      data= {"appealId": gblSelectedAppealId,"dispositionId": gblSelectedDispositionId,"hatsUserId":testHatsUserId};
      headers= {};
      var serviceName = "appealDetails";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdSuccess, this.getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdFailure);
    },
    getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdSuccess:function(response){
      if(response !== null && response !== undefined) {
        if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
          response.errorMessage = apiErrors.errInfoHearing;
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
            if(response.HearingInformation !== null && response.HearingInformation !== undefined) {
              var details = response.HearingInformation[0];
              var addressLine1 = details.AddressLine1;
              var addressLine2 = details.AddressLine2;
              var city = details.City;
              var state = details.State;
              var zipCode = details.ZipCode;
              var hearingDate = details.HearingDate;
              var hearingTime = details.HearingTime;
              var address = addressLine1+' '+addressLine2+'\n'+city+ ', '+state+' '+zipCode;
              this.setComponentData(address, hearingDate, hearingTime, true);
            }
            else {
              this.setComponentData("", "", "");          
            }
          }
        }
      }
    },
    getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdFailure:function(error){
      alert("Unable to access Hearing info");    
    },

    setComponentData:function(address, hearingDate, hearingTime, isVisible, interestedPartyCompanyName) {
      this.view.setVisibility(isVisible);
      this.view.lblTextDirections.text = address;
      this.view.lblTextDate.text = hearingDate;
      this.view.lblTextHour.text = hearingTime;
      this.view.lblPhoneNumber.text = "";
      this.view.lblTitleDirection.text = interestedPartyCompanyName;
      this.view.flxMainContainer.forceLayout();
    },

    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType:function(){
      if(gblDocumentTypes !== null && gblDocumentTypes !== undefined){
        for (var i = 0; i < gblDocumentTypes.length; i++) {
          var obj = gblDocumentTypes[i];
          if(obj.documentTypeCd == "Reschedule Request"){
            gblDocumentTypeId = obj.documentTypeId; 
          }
        }
      }      
      operationName ="getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType";
      var data={"appealId":gblSelectedAppealId,"hatsUserId":testHatsUserId,"docType":gblDocumentTypeId};
      var headers={};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure);
    },
    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess:function(response){
      if(response !== null && response !== undefined) {
        if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
          response.errorMessage = apiErrors.errServerAppealsAndDispositions;
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
            if(response.associatedAppealsWithDispositions !== null && response.associatedAppealsWithDispositions !== undefined) {
              gblRescheduleHearingAppealsList = response.associatedAppealsWithDispositions;
            }
          }
        }
      }
    },
    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure:function(error){
      alert("No appeals and dispositions found for the input document type.");
      var ntf = new kony.mvc.Navigation("frmAppealDetails");
      ntf.navigate();
    },
    navigateToRescheduleHearing:function(){
      var ntf = new kony.mvc.Navigation("frmRescheduleHearing01");
      ntf.navigate();
    }
  };
});
