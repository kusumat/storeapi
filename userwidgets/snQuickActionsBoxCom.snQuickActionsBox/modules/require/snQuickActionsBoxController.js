define(function() {
  var quickLinkPage = "";
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.sgmDataQuickActions.onRowClick = this.navigateToQuickActionLink;
      var data =[];
      this.view.sgmDataQuickActions.setData(data);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    navigateToQuickActionLink:function() {
      
      var selectedRow = this.view.sgmDataQuickActions.selectedRowItems[0];
      flowName = selectedRow.lblNameItemList;
      if (this.params === null || this.params === undefined) {
        this.params = {};
      } else {
        if (this.params.appealInfo !== null && this.params.appealInfo !== undefined) {
          var appealInfo = this.params.appealInfo;
          delete this.params;
          this.params = {"appealInfo": appealInfo};
        }
      }
      
      Object.assign(this.params, {"docTypeId": selectedRow.docTypeId});
      if(flowName.trim() == "AA Withdraw Req")
        Object.assign(this.params, {"withdrawType": "AA"});
      
      if(flowName.trim() === "Compliance") {
        gblComplianceDocumentTypes = [];
		this.getComplianceDocumentsList();        
        Object.assign(this.params, {"achievedDate": null});
      }
      quickLinkPage = selectedRow.quickLinkPage;
      if (flowName === "Upload Hearing Document") {
        if(selectedRow.quickLinkPage !== undefined && selectedRow.quickLinkPage !== "") {
          this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType();         
        }
      }
      else {
        var ntf = new kony.mvc.Navigation(quickLinkPage);
        ntf.navigate(this.params);
      }
    },
    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType:function(){
      operationName = "getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType";
      var data = {
        "appealId": gblSelectedAppealId, 
        "hatsUserId": testHatsUserId, 
        "docType": this.params.docTypeId,
      };
      var headers = {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure);
    }, 
    
    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess:function(response){
      kony.print('Appeal List:'+JSON.stringify(response));
      if(response !== null && response !== undefined) {
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
            if(response.associatedAppealsWithDispositions !== null && response.associatedAppealsWithDispositions !== undefined) {
              var appealsWithDispositions = response.associatedAppealsWithDispositions;
              var detail = appealsWithDispositions[0].errorStatus;
              if (detail !== null && detail !== undefined && detail.length > 0) {
                if (detail[0].errorMessage !== "MaxLimitToUploadDoc") {
                  var ntf = new kony.mvc.Navigation(quickLinkPage);
                  ntf.navigate(this.params); 
                }
                else{
                  alert("Reached Max Document Upload Limit (4 Documents) for this Appeal!");
                  return;
                }               
              }
            }
          }
        }
      }
    },

    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure:function(error){
      alert("No appeals and dispositions found for the input document type.");
      resetFlow();
      var ntf = new kony.mvc.Navigation("frmAppealDetails");
      ntf.navigate();
    },
    setComponentData: function(documentTypes) {
//       var dataMap = {
//         "lblNameItemList": "lblNameItemList",
//         "imgInfoCircle": "imgInfoCircle",
//         "imgArrowRight": "imgArrowRight",
//         "lblUILine": "lblUILine",
//         "quickLinkPage":"quickLinkPage",
//         "docTypeId": "docTypeId",
//       };
//       this.view.sgmDataQuickActions.widgetDataMap = dataMap;
      var data =[];
      for(var i = 0; i < documentTypes.length; i++) {
        var docTypeId      = documentTypes[i].documentTypeId;
        var docTypeCode    = documentTypes[i].documentTypeCd;
        var docDescription = this.getQuickLinkDescription(docTypeCode);
        var quickLinkPage  = this.getQuickLinkPage(docTypeCode);
        var dataRow = {
          "lblNameItemList":docDescription, 
          "imgInfoCircle": {"onClick": this.navigateToQuickActionLink.bind(this)}, 
          "imgArrowRight":{"onClick": this.navigateToQuickActionLink.bind(this)},
          "lblUILine":"|",
          "quickLinkPage": quickLinkPage,
          "docTypeId": docTypeId
        }; 
        dataRow.imgInfoCircle.accessibilityConfig = {
          "a11yLabel" : docDescription,
          "a11yHidden" : false
        };
        dataRow.imgArrowRight.accessibilityConfig = {
          "a11yLabel" : docDescription,
          "a11yHidden" : false
        };

        data.push(dataRow);
      }
      this.view.sgmDataQuickActions.setData(data);
    },
    
    getHasReschedule:function() {
      var hasReschedule = false;
      var data = this.view.sgmDataQuickActions.data;
      for(var i = 0; i < data.length; i++) {
        var docDescription = data[i].lblNameItemList;
        if(docDescription === "Reschedule Request") {
          hasReschedule = true;
          break;
        }
      }
      return hasReschedule;
    },

    getHasWithdrawal:function() {
      var hasWithdrawal = false;
      var data = this.view.sgmDataQuickActions.data;
      for(var i = 0; i < data.length; i++) {
        var docDescription = data[i].lblNameItemList;
        if(docDescription === "Withdraw Request") {
          hasWithdrawal = true;
          break;
        }
      }      
      return hasWithdrawal;    
    },
    
    getQuickLinkDescription:function(docTypeCode) {
      var descriptions = new Map();
      descriptions.set("Appellant Document", "Upload Hearing Document");
      descriptions.set("Authorized Rep", "Name a representative for the hearing");
      descriptions.set("AA Withdraw Req", "AA Withdraw Req");
      descriptions.set("Withdraw Req W", "Withdraw Request");
      descriptions.set("Reschedule Request", "Reschedule Request");
      descriptions.set("Request - AA", "Request Admin Appeal");
      descriptions.set("Exhibit - County", "Exhibit - County");
      descriptions.set("Appeal Summary", "Appeal Summary");
      descriptions.set("Compliance", "Compliance");
      descriptions.set("Request - CR", "Request - CR");
      descriptions.set("MCP Denial Form", "MCP Denial Form");
      var quickLinkDescription = descriptions.get(docTypeCode);
	  //this shows any unmapped actions so we can find and map them	
      if(quickLinkDescription === null || quickLinkDescription === undefined) {
      	return docTypeCode;  
      }
      return quickLinkDescription;
    },
    
    getQuickLinkPage:function(docTypeCode) {
      var pages = new Map();
      pages.set("Appellant Document", "frmUploadDocment1");
      pages.set("Exhibit - County", "frmUploadDocment1");
      pages.set("Appeal Summary", "frmUploadDocment1");
      pages.set("Compliance", "frmUploadDocment1");
      pages.set("Request - CR", "frmUploadDocment1");
      pages.set("Authorized Rep", "frmRequestAssistanceStep1");
      pages.set("Withdraw Req W", "frmWithdrawHearingStep1");
      pages.set("AA Withdraw Req", "frmWithdrawHearingStep1");
      pages.set("Reschedule Request", "frmRescheduleHearing01");
      pages.set("Request - AA", "frmUploadDocment1");
      pages.set("MCP Denial Form", "frmUploadDocment1");
      var quickLinkPage = pages.get(docTypeCode);
      if(quickLinkPage === null || quickLinkPage === undefined) {
      	//alert("quick link page not found for: " + docTypeCode); 
        quickLinkPage = "";
      }      
      return quickLinkPage;
    },
    
    addAppealInfoToParams:function(appealInfo) {
      if (this.params === null || this.params === undefined) {
        this.params = {};
      }
      Object.assign(this.params, {"appealInfo": appealInfo});
    },
    
    getComplianceDocumentsList :function(){
      if(gblComplianceDocumentTypes.length === 0) {
        operationName = "getComplianceDocumentListByAppealIdAndHatsUserId";
        var data = {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};
        var headers = {};
        var serviceName = "appellantServices";
        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        integrationObj.invokeOperation(operationName, headers, data, this.getComplianceDocumentsListSuccess, this.getComplianceDocumentsListFailure);
      }
    }, 

    getComplianceDocumentsListSuccess:function(response){
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
          if(response !== undefined && response.availableComplianceDocuments !== undefined) {
            gblComplianceDocumentTypes = response.availableComplianceDocuments; 
          }
        }
      }
    },

    getComplianceDocumentsListFailure:function(error){
    },    
    
  };
});
