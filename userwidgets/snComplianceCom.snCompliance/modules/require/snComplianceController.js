define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    setComplianceAgencies:function() {
      var compList = gblComplianceAgencies;
      var dataRows = [];
      if(compList.length > 0) {
        for(var i=0; i< compList.length; i++) {
          var agency = compList[i].AgencyName;
          var complianceDueDate = compList[i].ComplianceDueDate === "" ? "None" : compList[i].ComplianceDueDate;
          var achievedDate = compList[i].AchievedDate === "" ? "None" : compList[i].AchievedDate;
          var receivedDate = compList[i].DispositionDate === "" ? "None" : compList[i].DispositionDate;
          var portalComplianceStatus = compList[i].PortalComplianceStatus;
          var dataRow = {"lblTypeTitleAgency":"Agency",
                         "lblDescAgency":agency, 
                         "lblTypeTitleDueDate":"Due Date",
                         "lblDescDueDate":complianceDueDate,
                         "lblTypeTitleArchivedDate":"Achieved Date",
                         "lblDescArchivedDate":achievedDate,
                         "lblTypeTitleReceivedDate":"Received Date",
                         "lblDescReceivedDate":receivedDate,
                         "lblTypeTitleApproved":"Compliance Status",
                         "lblDescApproved":portalComplianceStatus};
          dataRows.push(dataRow);
        }
        this.view.sgmCompliance.setData(dataRows);
        this.view.setVisibility(true);
        this.view.forceLayout();
      }
      else {
        this.view.sgmCompliance.setData([]);
        this.view.setVisibility(false);
        this.view.forceLayout();        
      }
    },
    
    setDocumentData:function() {
      var docList = gblComplianceDocuments;
      var dataRows = [];
      if(docList.length > 0) {
        for(var i = 0; i < docList.length; i++) {
          var documentType = docList[i].documentType;
          var createdBy = docList[i].createdBy;
          var documentId = docList[i].documentId;
          var documentTitle = docList[i].documentTitle;
          var createdOn = docList[i].createdOn;
          var imgViewDoc = "file_doc.png";
          if (documentType === "Hearing Recording" || documentTitle === "Virtual Hearing Recording")
          {
            imgViewDoc = "download_button.png";
          }
          var row = {"lblDocumentType":documentType,
                     "lblDocTitle":{onClick: this.viewDocument.bind(this), text: documentTitle},
                     "imgViewDoc": imgViewDoc, 
                     "flxBtnView":{onClick: this.viewDocument.bind(this)},
                     "documentId":documentId};
          dataRows.push(row);
        }
        this.view.sgmDocuments.data = dataRows;
        this.view.flxMaincontainer.isVisible = true;
        this.view.btnDownloadAll.isVisible = false;
        this.view.flxUILine2.isVisible = true;
        this.view.flxDocumentsContainer.isVisible = true;
        this.view.forceLayout();        
      }
      else {
        this.view.flxMaincontainer.isVisible = false;
        this.view.btnDownloadAll.isVisible = false;        
        this.view.flxUILine2.isVisible = false;
        this.view.flxDocumentsContainer.isVisible = false;
        this.view.forceLayout();
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
            var documentTitle = selectedRow.lblDocTitle;        
            displayPDFWindow(documentData, documentType, documentTitle, this.win);
          }
        }
      }
    },

	viewDocumentFailure:function(error) {
      dismissLoadingIndicator();
	  alert("Unable to display Document");
    }    
   
  };
});