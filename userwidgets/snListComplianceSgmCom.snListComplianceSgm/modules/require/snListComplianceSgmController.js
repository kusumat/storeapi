define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnShowDetails.onClick = this.showDetails;
      this.view.sgmDataDouble.onRowClick = this.displayAuthorizedRepAppealDetail;     
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    setComponentData:function(appellant) {
      var firstName = appellant.appellantFirstName;
      var lastName = appellant.appellantLastName;
      this.view.lblAppealId.text = appellant.appealId;
      this.view.lblDispositionId.text = appellant.dispositionId;
      this.view.lblAppellantId.text = appellant.appellantId;
      this.view.lblTitleSectionCard.text = firstName + " " + lastName;
      this.view.lblTextAppealNumber.text = appellant.appealNumber;
      this.view.lblTextComplianceDueDate.text = appellant.complianceDueDate;
      this.view.lblComplianceStatus.text = appellant.complianceStatus;
      this.view.lblAppealTypeDesc.text = appellant.appealType;
    },

    showDetails:function() {
      gblAppellantId = this.view.lblAppellantId.text;
      gblPortalStatus = this.view.lblComplianceStatus.text;
      gblSelectedDispositionId = this.view.lblDispositionId.text;
      gblSelectedAppealId = this.view.lblAppealId.text;      
      this.getAppellantDemographicInfo();
      gblAppealTypeDescription = this.view.lblAppealTypeDesc.text;
      this.viewDocumentListByAppealIdAndHatsUserId();
    },
    getAppellantDemographicInfo:function() {
      operationName =  "getAppellantDemographicsByAppellantId";
      var data= {"appellantId": gblAppellantId};
      var headers= {};
      var serviceName = "appellantServices";
      try {

        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        integrationObj.invokeOperation(operationName, headers, data, 
                                       this.getAppellantDemographicInfoSuccess, 
                                       this.getAppellantDemographicInfoFailure);
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
      }
    },

    getAppellantDemographicInfoSuccess:function(response) {
      kony.print("inside getAppellantDemographicInfoSuccess: "+JSON.stringify(response));
      if(response !== null && response !== undefined) {
        if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
          response.errorMessage = apiErrors.errServerDemographics;
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
            if(response.errmsg !== null && response.errmsg !== undefined && response.errmsg !== "") {
              gblDemographicInfo.AppellantFirstName = undefined;
              this.view.mainHeaderScreens.setComponentData(undefined);
              alert("There was a problem getting demographic information: " + response.errmsg);
            }
            else if(response.AppellantDemographicDetails !== null && response.AppellantDemographicDetails !== undefined) {
              var details = response.AppellantDemographicDetails[0]; 
              var firstName = details.AppellantFirstName; 
              gblDemographicInfo = details;             
            }
          }
        }
      }
    },
    
    viewDocumentListByAppealIdAndHatsUserId:function() {
      showLoadingIndicator();
      gblAppellantDocuments = [];
      gblComplianceDocuments = [];
      operationName =  "viewDocumentListByAppealIdAndHatsUserId";
      var data= {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, 
                                     this.viewDocumentListByAppealIdAndHatsUserIdSuccess, 
                                     this.viewDocumentListByAppealIdAndHatsUserIdFailure);
    },

    viewDocumentListByAppealIdAndHatsUserIdSuccess:function(response) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errDocumentList;
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
          var complianceKeyword = "compliance";
          if(response.docList !== undefined && response.docList !== null) {
            var docListAll = response.docList;
            for(var i = 0; i < docListAll.length; i++) {
              var documentTitle = docListAll[i].documentTitle;
              var documentType = docListAll[i].documentType;
              if(documentTitle.toLowerCase().includes(complianceKeyword) || 
                 documentType.toLowerCase().includes(complianceKeyword)) {
                gblComplianceDocuments.push(docListAll[i]);  
              }
              else {
                gblAppellantDocuments.push(docListAll[i]);
              }
            }
          }
          this.getListOfAssociatedAppealsByAppealIdAndHatsUserId(); 
        }
      }
    },

    viewDocumentListByAppealIdAndHatsUserIdFailure:function(error) {
      kony.application.dismissLoadingScreen();
      var callSpecificMsg = "Unable to get Document list.";
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
      currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
      currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
      currentFrm.view.puInformationDialog.isVisible = true; 
      currentFrm.view.forceLayout();
    },
    
    getListOfAssociatedAppealsByAppealIdAndHatsUserId:function() {
      gblAssociatedAppeals = [];
      operationName =  "getListOfAssociatedAppealsByAppealIdAndHatsUserId";
      var data= {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);

      integrationObj.invokeOperation(operationName, headers, data, 
                                     this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdSuccess, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdFailure);
    },

    getListOfAssociatedAppealsByAppealIdAndHatsUserIdSuccess:function(response) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errServerAppeals;
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
          if(response.associatedAppeals !== undefined && response.associatedAppeals !== null) {
            gblAssociatedAppeals = response.associatedAppeals;
          }
          this.getComplianceByAppealIdAndDispositionId();
        }
      }
    },

    getListOfAssociatedAppealsByAppealIdAndHatsUserIdFailure:function(error) {
      alert("Unable to get Associated Appeals");    
    }, 
    
    getComplianceByAppealIdAndDispositionId:function() {
      gblComplianceAgencies = [];
      operationName =  "getComplianceByAppealId";
      data= {"appealId": gblSelectedAppealId};
      headers= {};
      var serviceName = "appealDetails";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getComplianceByAppealIdAndDispositionIdSuccess, this.getComplianceByAppealIdAndDispositionIdFailure);
    },
    
    getComplianceByAppealIdAndDispositionIdSuccess:function(response) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errInfoCompliance;
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
          if(response !== undefined && response.ComplianceList !== undefined) {
            gblComplianceAgencies = response.ComplianceList;
          }
          this.getHearingInformationByAppealIdAndDispositionIdAndHatsUserId();
        }
      }
    },
    
    getComplianceByAppealIdAndDispositionIdFailure:function(error){
      alert("Unable to access Compliance info");    
    },    
    
    getHearingInformationByAppealIdAndDispositionIdAndHatsUserId:function() {
      gblHearingInfo = {};
      operationName =  "getHearingInformationByAppealIdAndDispositionIdAndHatsUserId";
      data= {"appealId": gblSelectedAppealId,"dispositionId": gblSelectedDispositionId,"hatsUserId":testHatsUserId};
      headers= {};
      var serviceName = "appealDetails";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdSuccess, this.getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdFailure);
    },

    getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdSuccess:function(response){
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errInfoH;
        response.userAction = apiActions.action;
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
          hearingDate = "";
          if(response !== null && response !== undefined) {
            if(response.HearingInformation !== null && response.HearingInformation !== undefined) {

              var details = response.HearingInformation[0];
             
              gblVrtHearingIndArSection = details.virtualHearingInd;
              if (details.virtualHearingMeetingLink === "" || details.virtualHearingDialInNumber === "" || details.virtualHearingConferenceId === "" || details.virtualHearingInd !== 'Y') {
                gblVrtHearingIndArSection = 'N';
              }
              gblHearingInfo = {
                isVisible:true,
                address:details.AddressLine1+' '+details.AddressLine2+'\n'+details.City+ ', '+details.State+' '+details.ZipCode,
                hearingDate:details.HearingDate,
                hearingTime:details.HearingTime,
                phoneNumber:"",
                interestedPartyCompanyName: details.interestedPartyCompanyName,
                pbpPhoneAtHomeInd: details.PhoneAtHomeIndicator,
                pbpMessageText: details.PbpMessageText,
                virtualHearingInd: details.virtualHearingInd,
                virtualHearingMeetingLink: details.virtualHearingMeetingLink,
                virtualHearingDialInNumber: details.virtualHearingDialInNumber,
                virtualHearingConferenceId: details.virtualHearingConferenceId,
                virtualHearingMeetingEndTs: details.virtualHearingMeetingEndTs
              };                 
            }else {
              gblVrtHearingIndArSection = 'N';
              gblHearingInfo = {
                isVisible:false,
                address:"",
                hearingDate:"",
                hearingTime:"",
                phoneNumber:"",
                interestedPartyCompanyName:"",
                showQuickAction:false,
                virtualHearingMeetingLink:"",
                virtualHearingDialInNumber:"",
                virtualHearingInd:"",
                virtualHearingConferenceId:"",
                pbpMessageText: "",
                virtualHearingMeetingEndTs: ""
              }; 
            }
          }
          this.getAppealDetailByAppealId();
        }
      }
    },

    getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdFailure:function(error){
      alert("Unable to access Hearing info");    
    },    
    
    getAppealDetailByAppealId:function() {
      gblAppeaDetailInfo = {};
      operationName =  "getAppealDetailByAppealId";
      var data= {"appealId": gblSelectedAppealId};
      var headers= {};
      var serviceName = "appealDetails";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getAppealDetailByAppealIdSuccess, this.getAppealDetailByAppealIdFailure);
    },

    getAppealDetailByAppealIdSuccess:function(response){
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errServerAppeals;
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
            if(response.AppealDetails !== null && response.AppealDetails !== undefined) {
              var details = response.AppealDetails[0];
              gblAppealDetailInfo.person = details.OhioBenefitsPersonName;
              gblAppealDetailInfo.program = details.PortalProgramDesc;
              gblAppealDetailInfo.receivedDate = details.bshReceiveDate !== "null" ? details.bshReceiveDate : gblNotAvailableDataLabel;
              gblAppealDetailInfo.noticeDate = details.NoticeDate !== "null" ? details.NoticeDate : "None";
              gblAppealDetailInfo.fairHearingBenefitStatus = details.fhbPortalStatusDesc;
              gblAppealDetailInfo.caseNumber = details.CaseNumber;
              gblAppealDetailInfo.requestDate = details.RequestDate !== "null" ? details.RequestDate : gblNotAvailableDataLabel;
              gblAppealDetailInfo.appealNumber = details.AppealNumber; 
              gblAppealDetailInfo.portalIssueCode = details.PortalIssueCode;
              gblAppealDetailInfo.appellantPBPInd = details.appellantPBPInd;
              gblAppealDetailInfo.hearingDate = details.hearingDate;
            }
          }
          this.getDocumentTypes();
        }
      }
    },

    getAppealDetailByAppealIdFailure:function(error){
      alert("Unable to access Appeal info");    
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
          this.getInterestedParties();
        }
      }
    },

    getDocumentTypesFailure:function(error) {
      //just continue if error and hide quick links section in appeal detail controller
      this.getInterestedParties();
    },
    
    getInterestedParties:function() {
      gblInterestedParties = [];
      operationName =  "getInterestedPartiesByAppealIdAndHatsUserId";
      var data= {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getInterestedPartiesSuccess, this.getInterestedPartiesFailure);
    },
    
    getInterestedPartiesSuccess:function(response) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errInterestedParties;
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
            if(response.interestedParties !== null && response.interestedParties !== undefined) {
              gblInterestedParties = response.interestedParties;  
            }
          }
          this.navigateToAppealDetail();
        }
      }
    },
  
  	getInterestedPartiesFailure:function(error) {
      //just continue if error
      this.navigateToAppealDetail();
	},     
    
    navigateToAppealDetail:function() {
      var form = "frmAppealDetails";
      if(gblIsARUser)
        form = "frmGeneralAppealDetails";
      var params = {"reloadData":false};
      var ntf = new kony.mvc.Navigation(form);
      ntf.navigate(params);      
    },

    showMoreLess:function() {
      var currentButtonText = this.view.btnShowMore.text;
      if(currentButtonText === "Show More") {
        this.showMore();
      }
      else {
        this.showLess();
      }
    },
    
    showMore:function() {
        this.view.btnShowMore.text = "Show Less";
        var dataRows = [];
        for(var i = 0; i < this.appealDetails.length; i++) {
          var detail = this.appealDetails[i];
  
          var detailRow = {"imgArrowRight":"arrow_right_1.png", 
                           "lblTypeTitle":detail.portalProgramDesc,
                           "lblTextStatus":detail.portalIssueCode,
                           "lblAgentName":detail.obPersonName,
                           "lblNumberGroup":detail.appealNumber,
                           "imgHashtagIcon":"hashtag_white_1.png",
                           "lblUILine":"-Line-",
                           "appealId":detail.appealId,
                           "dispositionId":detail.dispositionId,
                           "appealNumber":detail.appealNumber, 
                           "portalStatus": detail.portalStatus,
                           "appealTypeDescription": detail.appealTypeDescription,
                          };
          dataRows.push(detailRow);
        }
        this.view.sgmDataHearingGroup.setData(dataRows);
    },
    
    showLess:function() {
        this.view.btnShowMore.text = "Show More";
        var dataRows = [];
        for(var i = 0; i < 3; i++) {
          var detail = this.appealDetails[i];
          var detailRow = {"imgArrowRight":"arrow_right_1.png", 
                           "lblTypeTitle":detail.portalProgramDesc,
                           "lblTextStatus":detail.portalIssueCode,
                           "lblAgentName":detail.obPersonName,
                           "lblNumberGroup":detail.appealNumber,
                           "imgHashtagIcon":"hashtag_white_1.png",
                           "lblUILine":"-Line-",
                           "appealId":detail.appealId,
                           "dispositionId":detail.dispositionId,
                           "appealNumber":detail.appealNumber,
                           "portalStatus": detail.portalStatus,
                           "appealTypeDescription": detail.appealTypeDescription,
                          };
          dataRows.push(detailRow);
        }
        this.view.sgmDataHearingGroup.setData(dataRows);
    },
    
    getHearingInformationForWithdraw:function() {
      var dataRows = this.view.sgmDataHearingGroup.data;
      gblSelectedAppealId = dataRows[0].appealId;
      gblSelectedDispositionId = dataRows[0].dispositionId;      
      
      gblHearingInfo = {};
      operationName =  "getHearingInformationByAppealIdAndDispositionIdAndHatsUserId";
      data= {"appealId": gblSelectedAppealId,"dispositionId": gblSelectedDispositionId,"hatsUserId":testHatsUserId};
      headers= {};
      var serviceName = "appealDetails";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getHearingInformationForWithdrawSuccess, this.getHearingInformationByAppealIdAndDispositionIdAndHatsUserIdFailure);
    },

    getHearingInformationForWithdrawSuccess:function(response){
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
          hearingDate = "";
          if(response !== null && response !== undefined) {
            if(response.HearingInformation !== null && response.HearingInformation !== undefined) {

              var details = response.HearingInformation[0];
              var addressLine1 = details.AddressLine1;
              var addressLine2 = details.AddressLine2;
              var city = details.City;
              var state = details.State;
              var zipCode = details.ZipCode;
              hearingDate = details.HearingDate;
              var hearingTime = details.HearingTime;
              var address = addressLine1+' '+addressLine2+'\n'+city+ ', '+state+' '+zipCode;

              gblHearingInfo = {
                isVisible:true,
                address:address,
                hearingDate:hearingDate,
                hearingTime:hearingTime,
                phoneNumber:"",
                interestedPartyCompanyName:details.interestedPartyCompanyName,
              };          

            }
            else {
              gblHearingInfo = {
                isVisible:false,
                address:"",
                hearingDate:"",
                hearingTime:"",
                phoneNumber:"",
                interestedPartyCompanyName:"",
                showQuickAction:false
              };          

            }
          }
          this.navWithdraw();
        }
      }
    },    

    navWithdraw: function(){
      var ntf = new kony.mvc.Navigation("frmWithdrawHearingStep1");
      ntf.navigate({"appealId": gblSelectedAppealId});
    }
  };
});