define(function() {
var frm;
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
              var interestedPartyCompanyName = details.interestedPartyCompanyName;
              this.setComponentData(address, hearingDate, hearingTime, true, interestedPartyCompanyName, false);
            }
            else {
              this.setComponentData("", "", "", false, "", false);   
            }
          }
        }
      }
    },
    
    getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdFailure:function(error){
      alert("Unable to access Hearing info");    
    },

    setComponentData:function(address, hearingDate, hearingTime, isVisible, interestedPartyCompanyName, showQuickAction) {
      this.view.setVisibility(isVisible);
      this.view.lblTextDirections.text = address;
      this.view.lblTextDate.text = hearingDate;
      this.view.lblTextHour.text = hearingTime;
      this.view.lblPhoneNumber.text = "";
      this.view.lblTitleDirection.text = interestedPartyCompanyName;
      this.view.btnReschedule.isVisible = showQuickAction;
      this.view.forceLayout();
    },
    
    setHearingData:function(hearingData) {
      //if(hearingData.virtualHearingInd === 'Y' && gblVrtHearingIndArSection === 'Y') {
      if(hearingData.virtualHearingInd === 'Y' && hearingData.virtualHearingDialInNumber !== "" && hearingData.virtualHearingConferenceId !== "" && hearingData.virtualHearingMeetingLink !== "") {
        
        var hearingDate = new Date(hearingData.hearingDate);
        var todayDate = new Date();
        
        if(hearingDate.getFullYear() === todayDate.getFullYear() && hearingDate.getMonth() === todayDate.getMonth() && hearingDate.getDate() === todayDate.getDate()){
          if (hearingData.virtualHearingMeetingEndTs !== ""){
                      this.view.lblVirtualHearingDialInNumberAudio.isVisible = false;
          this.view.flxContainerDialin.isVisible = false;
          this.view.flxContainerConferenceID.isVisible = false; 
          this.view.btnConnectToHearing.isVisible = false;
          this.view.imgCopy.isVisible = false;
          this.view.flxLocationDetails.isVisible = false;
              this.view.flxVirtualHearing.isVisible = true;
              this.view.lblVirtuaklHearingMsg.text = 'The virtual hearing has ended.';
              this.view.lblVirtuaklHearingMsg.isVisible = true;
              this.view.flxCntnrPBPHearing.isVisible = false;              
            }
          else {
            this.view.btnConnectToHearing.onClick = function() {window.open(hearingData.virtualHearingMeetingLink, "_blank");};
            this.view.imgCopy.onTouchEnd = function() {navigator.clipboard.writeText(hearingData.virtualHearingMeetingLink);};
            let teams_phone_num= hearingData.virtualHearingDialInNumber+',,'+hearingData.virtualHearingConferenceId+'#';
            this.view.lblVirtualHearingDialInNumber.onClick = function() {window.open("tel:"+teams_phone_num, "_blank");};
            this.view.flxContainerTeamsDownloadMessage.isVisible = true;
            this.view.lblVirtualHearingDialInNumber.text = hearingData.virtualHearingDialInNumber;
            this.view.lblVirtualHearingConferenceIDNumber.text = hearingData.virtualHearingConferenceId+"#";
            this.view.flxLocationDetails.isVisible = false;
            this.view.lblVirtualHearingDialInNumberAudio.isVisible = true;
            this.view.flxContainerDialin.isVisible = true;
            this.view.flxContainerConferenceID.isVisible = true;          
            this.view.btnConnectToHearing.isVisible = true;

            this.view.imgCopy.isVisible = true;
            this.view.lblVirtuaklHearingMsg.isVisible = false;
            this.view.flxCntnrPBPHearing.isVisible = false;
            this.view.flxVirtualHearing.isVisible = true;
          }
        } else {
          this.view.lblVirtualHearingDialInNumberAudio.isVisible = false;
          this.view.flxContainerDialin.isVisible = false;
          this.view.flxContainerConferenceID.isVisible = false; 
          this.view.btnConnectToHearing.isVisible = false;
          this.view.imgCopy.isVisible = false;
          this.view.flxLocationDetails.isVisible = false;
          if(hearingDate.getTime() > todayDate.getTime()){
            this.view.flxVirtualHearing.isVisible = true;
            this.view.lblVirtuaklHearingMsg.text = 'The virtual hearing is scheduled for the below date and time.';
            this.view.lblVirtuaklHearingMsg.isVisible = true;
            this.view.flxCntnrPBPHearing.isVisible = false;                  
          }
          else {	
            if (hearingData.virtualHearingMeetingEndTs !== ""){
              this.view.flxVirtualHearing.isVisible = true;
              this.view.lblVirtuaklHearingMsg.text = 'The virtual hearing has ended.';
              this.view.lblVirtuaklHearingMsg.isVisible = true;
              this.view.flxCntnrPBPHearing.isVisible = false;              
            }
            else {
              this.view.flxVirtualHearing.isVisible = false;
              this.view.lblTextDirections.text = hearingData.address;
              this.view.lblTitleDirection.text = hearingData.interestedPartyCompanyName;      
              this.view.flxLocationDetails.isVisible = true;
              this.view.flxCntnrPBPHearing.isVisible = false;
            }
          }
        }                        
      }else { 
        if (hearingData.pbpPhoneAtHomeInd === "Y" && gblVrtHearingIndArSection === "N"){
          this.view.flxLocationDetails.isVisible = false;
          this.view.flxCntnrPBPHearing.isVisible = true;
        }else{
          this.view.flxLocationDetails.isVisible = true;
          this.view.flxCntnrPBPHearing.isVisible = false;
        }
        this.view.flxVirtualHearing.isVisible = false;
        this.view.lblTextDirections.text = hearingData.address;
        this.view.lblTitleDirection.text = hearingData.interestedPartyCompanyName;      
        this.view.lblPbpMsgText.text = hearingData.pbpMessageText;  
      }
      this.view.flxContainerTeamsDownloadMessage.isVisible = this.view.flxVirtualHearing.isVisible === true;    
      this.view.setVisibility(hearingData.isVisible);
      gblSnHearingInfoVisible = hearingData.isVisible;
      this.view.lblTextDate.text = hearingData.hearingDate;
      this.view.lblTextHour.text = hearingData.hearingTime;
      this.view.lblPhoneNumber.text = "";
      this.view.btnReschedule.isVisible = hearingData.showQuickAction;
      this.view.forceLayout();
    },    

    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType:function(form){
      this.frm = form;
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
    
    
    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeWithdraw:function(form){
      if(form){
      	this.frm = form;
        if(this.frm.appealId !== "") {
            this.getDocumentTypes();
            return;
          } 
      }
      if(gblDocumentTypes !== null && gblDocumentTypes !== undefined){

        for (var i = 0; i < gblDocumentTypes.length; i++) {
          var obj = gblDocumentTypes[i];
          if(this.frm.withdrawType !== undefined && this.frm.withdrawType == "AA"){
            if (obj.documentTypeCd == "AA Withdraw Req")
            	gblDocumentTypeId = obj.documentTypeId; 
          }
          else {
          	if(obj.documentTypeCd == "Withdraw Req W")
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
    
    getDocumentTypes:function() {
      gblDocumentTypes = [];
      operationName =  "getDocumentTypesByAppealIdAndHatsUserId";
      var data= {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getDocumentTypesSuccess, this.getDocumentTypesFailure);
    },

    getDocumentTypesSuccess:function(response) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errDocumentTypeList;
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
          if(response !== null && response !== undefined) {
            if(response.validDocumentTypes !== null && response.validDocumentTypes !== undefined) {
              gblDocumentTypes = response.validDocumentTypes;
            }
          }
          this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeWithdraw();
        }
      }
    },

    getDocumentTypesFailure:function(error) {
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

              for(var i = 0; i < gblRescheduleHearingAppealsList.length; i++) {
                var detail = gblRescheduleHearingAppealsList[0].associatedAppealsAndDispositions;

                for(var j = 0; j < detail.length; j++){     

                  selectedAppeals.set(detail[j].appealNbr, {"lblProgram":detail[j].portalProgramDesc,
                                                            "lblIssue":detail[j].portalIssueCd,
                                                            "lblOBName": (detail[j].obPersonName !== null && 
                                                                          detail[j].obPersonName !== undefined &&
                                                                          detail[j].obPersonName !== "null") ? detail[j].obPersonName : "",
                                                            "lblAppealId":detail[j].appealNbr,
                                                            "appealId": detail[j].appealId
                                                           });
                }
              }
              this.frm.setSummaryValues();
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
