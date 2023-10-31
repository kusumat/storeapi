define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnQuickActions.onClick = this.navWithdraw;
       amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    onBreakpointChange: function(form, width){
      try{
      
      if(width <= gblBreakPoint) {
        this.view.flxContainerColumnsMobile.setVisibility(true);
        this.view.flxContainerColumns.setVisibility(false);

      }
      else {
        this.view.flxContainerColumnsMobile.setVisibility(false);
        this.view.flxContainerColumns.setVisibility(true);
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },   

    
    setComponentData:function(person, program, noticeDate, fairHearingBenefitStatus, 
                               hearingDate, receivedDate, caseNumber, requestDate, appealNumber, portalIssueCode, showQuickAction) {
      this.view.lblDescPerson.text = person;
      this.view.lblDescProgram.text = program;
      this.view.lblDescNoticeDate.text = noticeDate;
      this.view.lblDescfhbStatus.text = fairHearingBenefitStatus;
      this.view.lblDescHearingDate.text = hearingDate;
      this.view.lblDescReciveDate2.text = receivedDate;
      this.view.lblDescCaseNumber.text = caseNumber;
      this.view.lblDescRequestDate.text = requestDate;
      this.view.lblNumberGroup.text = appealNumber;
      this.view.lblDescIssue.text = portalIssueCode;
      
      this.view.lblDescPersonMobile.text = person;
      this.view.lblDescProgramMobile.text = program;
      this.view.lblDescNoticeDateMobile.text = noticeDate;
      this.view.lblDescfhbStatusMobile.text = fairHearingBenefitStatus;
      this.view.lblDescHearingDateMobile.text = hearingDate;
      this.view.lblDescReciveDate2Mobile.text = receivedDate;
      this.view.lblDescCaseNumberMobile.text = caseNumber;
      this.view.lblDescRequestDateMobile.text = requestDate;
      this.view.lblDescIssueMobile.text = portalIssueCode;
      
      if(fairHearingBenefitStatus === "") {
        this.view.lblDescfhbStatus.isVisible = false;
        this.view.lblTypefhbStatus.isVisible = false;
        this.view.lblDescfhbStatusMobile.isVisible = false;
        this.view.lblTypefhbStatusMobile.isVisible = false;
      }
      else {
        this.view.lblDescfhbStatus.isVisible = true;
        this.view.lblTypefhbStatus.isVisible = true;
        this.view.lblDescfhbStatusMobile.isVisible = true;
        this.view.lblTypefhbStatusMobile.isVisible = true;
      }
      
      this.view.lblTitleSectionCard.text = gblAppealTypeDescription;
      this.view.btnQuickActions.isVisible = showQuickAction;
      
    },

    navWithdraw: function(){
      withdrawRequest.appealIds[0] =gblAppellantId;
      var ntf = new kony.mvc.Navigation("frmWithdrawHearingStep1");
      ntf.navigate();
    },
    
    setDocumentData:function() {
      //every appeal has at least one document, even if not added
      var docList = gblAppellantDocuments;
      if(docList.length > 0) {
        var dataRows = [];
        for(var i = 0; i < docList.length; i++) {
          var documentType = docList[i].documentType;
          var createdBy = docList[i].createdBy;
          var documentId = docList[i].documentId;
          var documentTitle = docList[i].documentTitle;
          var createdOn = docList[i].createdOn;
          var imgViewDoc = "file_doc.png";
          if (documentType === "Hearing Recording" || documentType === "Virtual Hearing Recording")
          {
            imgViewDoc = "download_button.png";
          }
          var row = {"lblDocumentType":documentType, 
                     "lblDocTitle":{onClick: this.viewDocument.bind(this), text: documentTitle},
                     "imgViewDoc": imgViewDoc, 
                     "flxBtnView":{onClick: this.viewDocument.bind(this)},"documentId":documentId};
          dataRows.push(row);
        }
        this.view.sgmDocuments.data = dataRows;
      }
      else{
        var dataRow = [];
        this.view.sgmDocuments.data = dataRow;        
      }
      this.view.btnDownloadAll.isVisible = false;
      this.view.forceLayout(); 
    },
    
    setAssociatedAppealData:function() {
      var associatedAppeals = gblAssociatedAppeals;
      var dataRows = [];
      if(associatedAppeals.length > 0) {
        for(var i = 0; i < associatedAppeals.length; i++) {
          var appealNumber = associatedAppeals[i].appealNbr;
          var programDescription = associatedAppeals[i].portalProgramDesc;
          var obPersonName = associatedAppeals[i].obPersonName;
          var issueCode = associatedAppeals[i].portalIssueCd;   
          
          var row = {"lblTypeTitle":programDescription, 
                     "lblTextStatus":issueCode, 
                     "lblAgentName":obPersonName,
                     "lblNumberGroup":appealNumber,
                     "lblHashtagIcon":{"skin": "sknLblHashTag", 
                                       "background": "url(./images/hashtag_white.png) 0% 0% / 100% 100% no-repeat;",
                                       "accessibilityConfig": {
                                         "a11yHidden": false, 
                                         "a11yHint": "", 
                                         "a11yIndex": 0}
                                      }
                    };
          dataRows.push(row);
        }
        this.view.sgmAssociatedAppeals.data = dataRows;
        this.view.flxAssociatedAppealsContainer.isVisible = true;
        this.view.flxUILine3.isVisible = true;
      }
      else {
        this.view.flxAssociatedAppealsContainer.isVisible = false;
        this.view.flxUILine3.isVisible = false;
      }
    },    
    
    viewDocument:function(scope) {
      showLoadingIndicator();
      var selectedRow = this.view.sgmDocuments.selectedRowItems[0];
      var documentId = selectedRow.documentId;
      var documentData = testDocument.pdf;
      operationName =  "viewDocumentByDocumentId";
      var data= {"documentId": documentId, "hatsUserId":testHatsUserId};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, 
                                     this.viewDocumentSuccess, this.viewDocumentFailure);
    }, 
    
    viewDocumentSuccess:function(response) {
      dismissLoadingIndicator();
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errSubmitRescheduleRequest;
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
          if(response !== null && response !== undefined && 
             response.uploadedDocument !== null && response.uploadedDocument !== undefined) {
            var documentData = response.uploadedDocument;
            var selectedRow = this.view.sgmDocuments.selectedRowItems[0];
            var documentType = selectedRow.lblDocumentType;     
            var documentTitle = selectedRow.lblDocTitle.text;
            
            if (documentType == "Hearing Recording" || documentType === "Virtual Hearing Recording") {
              var basicConf = {
                alertType: constants.ALERT_TYPE_CONFIRMATION,
                alertTitle: "Confirm",
                alertYesLabel: "Yes",
                alertNoLabel: "No",
                message: "Do you want to download the \"" + documentTitle + ".mp3\" audio file?",
                alertHandler: function (label) {
                  if (label) {
                    displayPDFWindow(documentData, documentType, documentTitle, this.win);
                  }
                }
              };
              var pspConfig = {
                "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
              };

              kony.ui.Alert(basicConf, pspConfig);
            }
            else {
              displayPDFWindow(documentData, documentType, documentTitle, this.win);
            }
          }
        }
      }
    },
    displayErrorMessages:function(errorStatus) {
      var alertMessage = "";
      for(var i = 0; i < errorStatus.length; i++) {
        alertMessage += errorStatus[i].errorMessage + "\n\n";
      }

      //alert(alertMessage);
      var alertBasic = {alertTitle:"Input Error", message:alertMessage,alertType:constants.ALERT_TYPE_ERROR};
      var alertPSP = {"contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER};
      var alert = kony.ui.Alert(alertBasic, alertPSP);      
    },
	viewDocumentFailure:function(error) {
      dismissLoadingIndicator();
	  alert("Unable to display Document");
    }    
    
  };
});