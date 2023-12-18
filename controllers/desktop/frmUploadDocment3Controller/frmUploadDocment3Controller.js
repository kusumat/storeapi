define({ 
  stateCfg: { 
    // See also: "chatBpSpecs" in gblChatSpecs.js
    parentContainer: null,
    chatSpec: {},
  },
  
  setParentSize: function(flxContainer) {
    this.stateCfg.parentContainer = flxContainer;
    this.stateCfg.parentSize = { height: flxContainer.frame.height, width: flxContainer.frame.width };
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
  },
  onNavigate:function(params){
    gblSettings(this);
    this.params = params;    
    gblAttestationAgree = false;
    this.view.headerCancelRHearing.onCancelClick = this.navigateOnCancel;
    this.view.fContinueBackButton.btnBackOnClick = this.navigateBack;
    this.view.fContinueBackButton.btnContinueOnClick = this.navigateForward;
    this.view.fContinueBackButton.textBtnContinue = "SUBMIT";
    this.view.miniBoxSelectedList.lblRescheduleSummaryHeaderText ="Selected Appeals";
    if(params.dataForSelectedAppealsCard) {
      this.view.miniBoxSelectedList.setData(this.params.dataForSelectedAppealsCard);
    }
    this.view.snDocCauses.setFileName(gblUploadedFileName);
    this.view.snDocCauses.onEditClick = this.navigateBack;
    this.view.snDocCauses.onEditClickBtn = this.navigateBack;

    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    if(gblIsARUser){
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    } 
    else{
      this.view.mainHeaderScreens.setComponentData(gblDemographicInfo.AppellantFirstName);  
    }
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    
    if (flowName === "MCP Denial Form") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload MCP Denial Document";
      this.view.txtBoxEnterReasonText.setVisibility(true);
      this.view.snDocCauses.setVisibility(false);
    }
    if (flowName === "Exhibit - County") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Exhibit - County Document";
    }  
	if (flowName === "Appeal Summary") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Appeal Summary Document";
    } 
    if (flowName === "Compliance") {
      this.view.headerCancelRHearing.lblRequestCancelText="Upload Compliance Document";
    }
    this.view.onBreakpointChange = this.onBreakpointChange; 
    this.view.snDocCauses.setComponentData(this.view.fContinueBackButton);
    this.view.snDocCauses.isVisibleCheckboxAttestation = flowName === "Appeal Summary" || gblIsTPMUser === true;
    this.view.snDocCauses.isVisibleHipaaText = (flowName === "Appeal Summary" || flowName === "Exhibit - County") && gblIsTPMUser === true;    
    this.view.snDocCauses.isVisibleRadioContainsHipaaData = (flowName === "Appeal Summary" || flowName === "Exhibit - County") && gblIsTPMUser === true; 
    
	this.view.preShow = this.preShow;
    addToFlow(this.view.id, this.view);
    this.view.forceLayout();
  },
  preShow: function(eventobject){
	voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },  
  onBreakpointChange: function(form, width){
    try{
    amplify.publish("authorizedDash", form, width);
    this.view.navFooterBarPostLogin.breakPointChange(width);
    
    this.view.headerCancelRHearing.height = "35px";
    heightAdjust = 0;
    if(width <= gblBreakPoint){ 
      this.view.mainHeaderScreens.height ='130px'; 
      
      heightAdjust = (165/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";
    }
    else{
      this.view.mainHeaderScreens.height ='100px';   
      heightAdjust = (135/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";     
    }   

    this.view.flxGroupContent.height = kony.os.deviceInfo().screenHeight + "px";      								   
    this.view.flxContainerBody.height = "100%";
                                                                                                                                       
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
    appealsSummaryLayoutDirection(this.view, width);
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },
  
  navigateOnCancel:function() {
     gblCancelClckd = true;
    this.view.snDocCauses.removeDocument();
    var ntf;
    
    if (flowName === "MCP Denial Form" || flowName === "Exhibit - County" || flowName === "Appeal Summary" ||flowName === "Compliance") 
      ntf = new kony.mvc.Navigation("frmGeneralAppealDetails");
   	if (flowName === "Request - CR" || flowName === "Request Admin Appeal") 
    	ntf = new kony.mvc.Navigation("frmAppellantDash");
    if (flowName === "Upload Hearing Document") 
      ntf = new kony.mvc.Navigation("frmAppealDetails");
    if (flowName === "Upload Hearing Document" && gblIsARUser) 
    	ntf = new kony.mvc.Navigation("frmGeneralAppealDetails");
    
    resetFlow();
    ntf.navigate();    
  },

  navigateBack:function() {
    Object.assign(this.params, {"isBack": true});
    var ntf = new kony.mvc.Navigation("frmUploadDocment2");
    ntf.navigate(this.params);    
  },
  
  navigateForward:function() {    
    if (flowName === "Appeal Summary" && gblAttestationAgree === false){
      alert('Please attest that the document that you have uploaded is true, accurate, and complete only to the appellant associated with this appeal(s).'); 
      return;
    }
    if (flowName === "Exhibit - County" && gblAttestationAgree === false && gblIsTPMUser === true){
      alert('Please attest that the document that you have uploaded is true, accurate, and complete only to the appellant associated with this appeal(s).'); 
      return;
    }    
    if (flowName === "MCP Denial Form" & this.view.txtBoxEnterReasonText.text.trim()=== "") {
      alert('Please enter MCP Denial ReasonText.'); 
      return; 
    }
    var invalidChars = ["<", ">", "\\", "/","*", ":", "?", "\"" ,"|"];
    var testString = this.view.snDocCauses.textBoxMoreInfo;

    if (invalidChars.some(function(v) { return testString.indexOf(v) >= 0; })) {
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '200px';
      currentFrm.view.puInformationDialog.lblTitleText = "Invalid document title";
      currentFrm.view.puInformationDialog.lblDescText = "A document title can't contain any of the following characters:\n\n\\ / : * ? \" < > |"; 
      currentFrm.view.puInformationDialog.isVisible = true; 
      currentFrm.view.forceLayout();
      return;
    }
    this.finishFlow();   
  },
  
  finishFlow:function() {
    
    switch (flowName) {
      case "Upload Hearing Document":
        this.uploadDocument("Appellant Document");
        break;
      case "Request Admin Appeal":
        break;
      case "Request - CR":
        this.addCountyReviewAppealByListOfDispositionIdAndHatsUserId();
        var ntf = new kony.mvc.Navigation("frmUploadDocment4");
        ntf.navigate(this.params); 
        break;     
      case "MCP Denial Form":
         this.addMCPDenial();
        var ntf = new kony.mvc.Navigation("frmUploadDocment4");
        ntf.navigate(this.params); 
        break;    
      case "Exhibit - County":  
        this.addDocumentByListOfAppealIdAndHatsUserIdExhibit();
        break;
      case "Appeal Summary":  
        this.uploadDocument("Appeal Summary");
        break;        
      
    }    
  },
  
  addMCPDenial:function() {
    showLoadingIndicator();
    operationName =  "addMCPDenial";
    var appealIds = [];
    
    selectedAppeals.forEach(function(val, key, map) {
      var appealId = val.appealId;
      appealIds.push({"appealId": appealId});
    });    

    var data = {
      "appealIds": appealIds,
      "hatsUserId": testHatsUserId,
      "uploadDocument": this.params.docToUpload,
      "mcpDenialReasonText": this.view.txtBoxEnterReasonText.text
    };
    var headers = {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.sendAdmninAppealSuccess, this.sendAdmninAppealFailure);
  },
  
  uploadDocument:function(docType) {
    showLoadingIndicator();
    operationName =  "addDocumentByListOfAppealIdAndHatsUserId";
    var appealIds = [];

    selectedAppeals.forEach(function(val, key, map) {
      var appealId = val.appealId;
      if(appealId) {
        appealIds.push({"appealId": appealId});
      }
    });    
    
    var data= {
      "appealIds": appealIds,
      "hatsUserId": testHatsUserId, 
      "uploadDocument": this.params.docToUpload,
      "docType": docType,
      "docTitle": this.view.snDocCauses.textBoxMoreInfo,
      "hipaaInd": gblDocContainsHipaaData,
      "attestationInd" : gblAttestationAgree
    };
    var headers= {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var options = {
      "httpRequestOptions": {
        "timeoutIntervalForRequest": 1440,
        "timeoutIntervalForResource": 4800
      }
    };
    integrationObj.invokeOperation(operationName, headers, data, this.uploadDocumentSuccess, this.uploadDocumentFailure,options);
  },
  
  addDocumentByListOfAppealIdAndHatsUserIdExhibit:function() {
    
    showLoadingIndicator();
    operationName =  "addDocumentByListOfAppealIdAndHatsUserIdExhibit";
    var appealIds = [];

    selectedAppeals.forEach(function(val, key, map) {
      var appealId = val.appealId;
      if(appealId) {
        appealIds.push({"appealId": appealId});
      }
    });      

    var data= {
      "appealIds": appealIds,
      "hatsUserId": testHatsUserId, 
      "uploadDocument": this.params.docToUpload,
      "docTitle": this.view.snDocCauses.textBoxMoreInfo,
      "hipaaInd": gblDocContainsHipaaData,
      "attestationInd" : gblAttestationAgree
    };
    var headers= {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var options = {};
//       "httpRequestOptions": {
//         "timeoutIntervalForRequest": 1440,
//         "timeoutIntervalForResource": 4800
//       }
//     };
    integrationObj.invokeOperation(operationName, headers, data, this.uploadDocumentSuccess, this.uploadDocumentFailure,options);
  },
  
  uploadDocumentSuccess:function(response) {
    dismissLoadingIndicator();
    if(response !== null && response !== undefined) {
      if(response.errorStatus !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errSubmitDocument;
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
            var detail = response.associatedAppealsWithDispositions[0].errorStatus;
            if (detail !== null && detail !== undefined && detail.length > 0) {
              if (detail[0].errorMessage !== null && detail[0].errorMessage !== undefined && detail[0].errorMessage !== "") {
                Object.assign(this.params, {"title": detail[0].errorMessage});
              }
            }
          }    
          var ntf = new kony.mvc.Navigation("frmUploadDocment4");
          ntf.navigate(this.params); 
        }
      }
    }
    if (this.params.title !== null && this.params.title !== undefined && this.params.title !== "") {
      this.view.snDocCauses.textLblTitle = this.params.title;
      this.view.snDocCauses.forceLayout();
    }

  },
  
  uploadDocumentFailure:function(error) {
    dismissLoadingIndicator();
    if(error.errmsg  !== null && error.errmsg  !== undefined && error.errmsg !== "") {
      alert("Error: " + error.errmsg);
    } else {
      alert("Service Error: " + JSON.stringify(error));
    } 
  },  
    
  displayProfileMenu:function() {
    displayProfileMenu(this.view);
  },

  selectProfileMenuItem:function() {
    selectProfileMenuItem(this.view);
  },
   
  onEnableChat: function() {
    gblSetEnableChat(this, true);
  },

  onDisableChat: function() {
    //gblSetEnableChat(this, false);
  },

  onClickChat: function() {
    if (this.view.chatbotFAQiframe.isConversationOpen()) {
      kony.print("????? >>>> CLICK closeChat");
      this.view.chatbotFAQiframe.closeChat();
      // Overlay -- position & size
      let overlaySpec = this.stateCfg.chatSpec.overlay.close;
      this.view.flxOverlayChat.bottom = 50 +'dp';
      this.view.flxOverlayChat.right = 30 + 'dp';
      this.view.flxOverlayChat.height = overlaySpec.h;
      this.view.flxOverlayChat.width = overlaySpec.w;
      // Chat iFrame - visibility
      let frameSpec = this.stateCfg.chatSpec.frame.close;
      this.view.chatbotFAQiframe.setVisibility(false);
      // Button 
      let buttonSpec = this.stateCfg.chatSpec.button.close;
      this.view.chatbotButton.right = 30+'dp';
      this.view.chatbotButton.bottom = 50+'dp';
    } else {
      kony.print("????? >>>> CLICK openChat");
      this.view.chatbotFAQiframe.openChat(this.onClickChat);
      // Overlay -- position & size
      let overlaySpec = this.stateCfg.chatSpec.overlay.open;
      this.view.flxOverlayChat.bottom = 50 +'dp';
      this.view.flxOverlayChat.right = 30 + 'dp';
      this.view.flxOverlayChat.height = overlaySpec.h;
      this.view.flxOverlayChat.width = overlaySpec.w;
      // Chat iFrame - size and visibility
      let frameSpec = this.stateCfg.chatSpec.frame.open;
      this.view.chatbotFAQiframe.setVisibility(true);
      this.view.chatbotFAQiframe.height = frameSpec.h;
      this.view.chatbotFAQiframe.width = frameSpec.w;
      this.view.chatbotFAQiframe.right = 30+'dp';
      this.view.chatbotFAQiframe.bottom = 0+'dp';
      // Button 
      let buttonSpec = this.stateCfg.chatSpec.button.open;
      this.view.chatbotButton.right = 30+'dp';
      this.view.chatbotButton.bottom = 50+'dp';
    }
    this.view.forceLayout();
  },   
});