define(function() {

  var appealDetails = [];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.sgmDataHearingGroup.onRowClick = this.displayAppealDetail;
      this.view.btnShowMore.onClick = this.showMoreLess;
      this.view.btnQuickActions.onClick = this.getHearingInformationForWithdraw;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    //----------------------------------------------------------------------------
    //Created by:CruzAmbrocio
    //Date_11-11-18
    //----------------------------------------------------------------------------
    /**
   * @function
   *
   */
    onNavigate:function(){
      alert("afsdf com");
      this.settingUpEventsActions();
    },
    //----------------------------------------------------------------------------
    //Created by:CruzAmbrocio
    //Date_11-11-18
    //----------------------------------------------------------------------------
    settingUpEventsActions:function(){
      try{
        alert("123com");
        this.view.flxContainerAnimated.onHover = this.onHoverEventCallback;
      }catch(err){
        kony.print("Shomething went wrong while settingUp com");
      }
    },
    moveElementsTop:function(form, distance, time, delay){
      var pForm = kony.application.getCurrentForm();
      try {
        pForm[form].animate(
          kony.ui.createAnimation(
            {"100":{
              "top": distance, "stepConfig":{
                "timingFunction": kony.anim.EASE
              }
            }
            }
          ),
          {"delay": delay, "iterationCount": 1, "fillMode": kony.anim.FILL_MODE_FORWARDS, "duration": time,

           "direction": kony.anim.DIRECTION_ALTERNATE},
          {"animationEnd": function(){ }
          }
        );
      } catch (e) {
      }
    },
    //Sample code to use onHover event
    /**
   * @function
   *
   * @param widget 
   * @param context 
   */
    onHoverEventCallback:function(widget,context){
      alert("8787 com");
      console.log("button hover event executed" + context.eventType);
      if (context.eventType == constants.ONHOVER_MOUSE_ENTER){
        alert("ONHOVER_MOUSE_ENTER");
      }
      else if (context.eventType == constants.ONHOVER_MOUSE_MOVE){
        alert("ONHOVER_MOUSE_MOVE");
      }
      else if (context.eventType == constants.ONHOVER_MOUSE_LEAVE){ 
        alert("ONHOVER_MOUSE_LEAVE");
      }
    },

    setSectionData:function(appealDetails, title, appellantName, message) {

      this.appealDetails = appealDetails;

      //hearingGroupItemSectionData

      this.view.lblTitleSectionCard.text = title;
      this.view.lblNumberAppeal.text = message; 
      this.view.lblAppellantName.text = appellantName;
      var portalStatus = appealDetails[0].portalStatus;
      gblPortalStatus = portalStatus;
      this.checkForCompliancePending(portalStatus, appealDetails);
      var showWithdrawBtn = (appealDetails[0].showWithdrawBtn === "true" || appealDetails[0].showWithdrawBtn === true) ? true : false;
      this.view.btnQuickActions.isVisible = showWithdrawBtn;
      this.view.btnShowMore.text = "Show More";

      var segmentLength = appealDetails.length >= 4 ? 3 : appealDetails.length;  

      
//       "portalStatus": "Open",
//       "appealGrpId": "1076349",
//       "hearingDate": "07/28/2011",
//       "appellantMiddleName": "",
//       "dispositionId": "1027294",
//       "portalIssueDesc": "Termination ",
//       "appealId": "696986",
//       "hearingTime": "11:00",
//       "appellantFirstName": "LETTIE",
//       "portalProgramDesc": "Ohio Works First",
//       "appealNumber": "1668646",
//       "appellantId": "127741",
//       "appellantLastName": "HANNAN",
//       "appealTypeDesc": "State Hearing"
      
      
      var dataRows = [];
      for(var i = 0; i < segmentLength; i++) {
        var detail = appealDetails[i];
        var detailRow = {"imgArrowRight":"arrow_right_1.png", 
                         "lblTypeTitle":detail.portalProgramDesc,
                         "lblTextStatus":detail.portalIssueDesc,
                         "lblAppellantName":detail.appellantFirstName + " " + detail.appellantLastName,
                         "lblNumberGroup":detail.appealNumber,
                         "lblHashtagIcon":{"skin": "sknLblHashTag", 
                                       "background": "url(./images/hashtag_white.png) 0% 0% / 100% 100% no-repeat;",
                                       "accessibilityConfig": {
                                         "a11yHidden": false, 
                                         "a11yHint": "", 
                                         "a11yIndex": 0}
                                      },
                         "lblUILine":"-Line-",
                         "appealId":detail.appealId,
                         "appellantId":detail. appellantId,
                         "dispositionId":detail.dispositionId,
                         "appealNumber":detail.appealNumber,
                         "portalStatus": detail.portalStatus,
                         "appealTypeDescription": detail.appealTypeDesc,
                        };
        dataRows.push(detailRow);
      }
      
      var appealText = appealDetails.length == 1 ? "Appeal" : "Appeals"; 

      this.view.lblOpenAppealText.text = appealDetails.length + " " + portalStatus + " " + appealText;
      this.view.sgmDataHearingGroup.data = dataRows;

      if(appealDetails.length >= 4) {
        this.view.btnShowMore.isVisible = true;
      }
      else {
      	this.view.btnShowMore.isVisible = false;  
      }
	
    },
    
    checkForCompliancePending:function(status, appeals) {
      if(status.toLowerCase() === "closed") {
        for(var i = 0; i < appeals.length; i++) {
          var portalStatus = appeals[i].portalStatus;
          if(portalStatus.toLowerCase() === "compliance pending") {
            status = portalStatus;
          }
        }
      }
    },   

    displayAppealDetail:function() {
      var selectedRows = this.view.sgmDataHearingGroup.selectedRowItems[0];
      gblSelectedAppealId = selectedRows.appealId; 
      gblSelectedDispositionId = selectedRows.dispositionId;
      gblAppealNumber = selectedRows.appealNumber;
      gblPortalProgramDesc = selectedRows.lblTypeTitle;
      gblportalIssueDesc = selectedRows.lblTextStatus;
      gblObPersonName = selectedRows.lblAgentName;
      gblPortalStatus = selectedRows.portalStatus;
      gblAppellantId = selectedRows.appellantId;
      gblAppealTypeDescription = selectedRows.appealTypeDescription;
      this.viewDocumentListByAppealIdAndHatsUserId();
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
              gblAppealDetailInfo.portalIssueDesc = details.PortalIssueCode;
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
                           "lblTextStatus":detail.portalIssueDesc,
                           "lblAgentName":detail.obPersonName,
                           "lblNumberGroup":detail.appealNumber,
                           "lblHashtagIcon":{"skin": "sknLblHashTag", 
                                       "background": "url(./images/hashtag_white.png) 0% 0% / 100% 100% no-repeat;",
                                       "accessibilityConfig": {
                                         "a11yHidden": false, 
                                         "a11yHint": "", 
                                         "a11yIndex": 0}
                                      },
                           "lblUILine":"-Line-",
                           "appealId":detail.appealId,
                           "dispositionId":detail.dispositionId,
                           "appealNumber":detail.appealNumber, 
                           "portalStatus": detail.portalStatus,
                           "appealTypeDescription": detail.appealTypeDesc,
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
                           "lblTextStatus":detail.portalIssueDesc,
                           "lblAgentName":detail.obPersonName,
                           "lblNumberGroup":detail.appealNumber,
                           "lblHashtagIcon":{"skin": "sknLblHashTag", 
                                       "background": "url(./images/hashtag_white.png) 0% 0% / 100% 100% no-repeat;",
                                       "accessibilityConfig": {
                                         "a11yHidden": false, 
                                         "a11yHint": "", 
                                         "a11yIndex": 0}
                                      },
                           "lblUILine":"-Line-",
                           "appealId":detail.appealId,
                           "dispositionId":detail.dispositionId,
                           "appealNumber":detail.appealNumber,
                           "portalStatus": detail.portalStatus,
                           "appealTypeDescription": detail.appealTypeDesc,
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