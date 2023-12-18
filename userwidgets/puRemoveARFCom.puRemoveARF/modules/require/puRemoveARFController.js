var frm;
var conId;
var appealList;
var onConfirm = false;
define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnRequestHearing.onClick = this.removeAR;
      this.view.btnBack.onClick = this.hideAppealList;
      this.view.btnCancelMsg.onClick = this.cancelDialog;

      
	  amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
    },
    
    onBreakpointChange: function(form, width){
      try{
        if(width <= gblBreakPoint) 
          this.view.flxContainerUpdateInformation.width = '95%';
        else 
          this.view.flxContainerUpdateInformation.width = '70%';
      }catch (err) {
      kony.print("onBreakpointChange Exception:"+err);
      }
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    cancelDialog: function() {
      this.frm.view.puRemoveARF.setVisibility(false);
    },

    hideAppealList: function() {
      if(this.onConfirm){
        this.view.snAppealToReschedule.textLblTitle="Provide the Benefits Program affected";
        this.view.snAppealToReschedule.textLblDesc="Select all that apply";
        this.view.lblTitle2.text = "Select the Issues you want to remove "+this.ar_name+ " from";
        this.view.snAppealToReschedule.setARData(this.appealList);
        this.view.btnRequestHearing.text="CONTINUE";
        this.view.snAppealToReschedule.setARData(this.appealList);
        this.onConfirm =false;
      }
      else
        this.frm.view.puRemoveARF.setVisibility(false);
    },

    removeAR: function() {

      if(this.onConfirm){
        showLoadingIndicator();
        operationName =  "removeAuthRepRequestByListOfAppealIdAndContactIdAndHatsUserId";
        var appealId="";
        selectedAppeals.forEach(function(val, key, map) {
          appealId = appealId + "{appealIds:"+ val.appealId+"}, ";
        });        
        appealId = appealId.substring(0, appealId.lastIndexOf(','));

        var data= {"appealIds": "["+appealId+"]",
                   "contactId" : this.conId,
                   "hatsUserId": testHatsUserId};   
        kony.print(JSON.stringify(data));
        var headers= {"Content-Type": "application/json"};
        var serviceName = "appellantServices";
        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        integrationObj.invokeOperation(operationName, headers, data, this.submitRemoveARRequestSuccess, this.submitRemoveARRequestFailure);

      }
      else {
        var appealIds = selectedAppeals.size;
        if(appealIds === 0) {
          alert("Select one or more Appeals");
        }		
        else {
          this.view.snAppealToReschedule.textLblTitle="";
          this.view.snAppealToReschedule.textLblDesc="";
          this.view.lblTitle2.text="You will remove "+this.ar_name+ " from this issue: ";
          this.view.snAppealToReschedule.setARDataCofirm(this.appealList);
          this.view.btnRequestHearing.text="CONFIRM";
          this.onConfirm =true;
          this.view.btnCancelMsg.setFocus(true);
        }
      }
    },

    submitRemoveARRequestSuccess:function(response) {
      if(response.errorStatus !== undefined && response.errorStatus.length > 0 && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
        response.errorStatus = response.errorStatus;
        response.userAction = apiActions.actionWait;
        navigateToErrorPage(response);  
      }  
      else
      {
        if(response.errorCode !== undefined) {
          navigateToErrorPage(response);  
        }
        else 
        { 
          dismissLoadingIndicator();
          kony.print(JSON.stringify(response));
          if(response.errorMessage)
            alert(response.errorMessage);
          else {	
            this.frm.view.puRemoveARF.setVisibility(false);
            //this.frm.view.snAuthorizedRepresentativesDetails.loadAR(this.frm);
            this.getInterestedParties();
          }
        }
      }
    },

    submitRemoveARRequestFailure:function(error) {
      dismissLoadingIndicator();
      alert("Failure: " + JSON.stringify(error));
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
          this.refreshARCard();
        }
      }
    },

    getInterestedPartiesFailure:function(error) {
      this.refreshARCard();     
    }, 

    refreshARCard:function() {
      this.frm.view.snAuthorizedRepresentativesDetails.loadAR(this.frm);
    },      

    loadAppealList: function(form, contactId, arname) {
      showLoadingIndicator();
      this.frm = form;
      this.conId =contactId;
      this.ar_name = arname;
      this.onConfirm = false;
      this.view.lblDesc3.text="You are about to remove "+this.ar_name+ " as your Authorized Representative.";
      this.view.lblTitle2.text = "Select the Issues you want to remove "+this.ar_name+ " from";
      this.view.btnRequestHearing.text="CONTINUE";
      this.frm.view.puRemoveARF.setVisibility(true);
      this.view.btnCancelMsg.setFocus(true);
      addEventListener('keydown',this.preventTabMsg);

      operationName =  "getListOfAssociatedAppealsByAppealIdAndContactIdAndHatsUserId";
      var data= {"appealId": gblSelectedAppealId,"contactId":contactId, "hatsUserId": testHatsUserId};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getARListSuccess, this.getARListFailure);
    },

    getARListSuccess:function(response) {
      if(response !== null && response !== undefined) {
        if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
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
          this.appealList = response.associatedAppeals;

          selectedAppeals.clear();
          for(var j = 0; j < this.appealList.length; j++){ 
            selectedAppeals.set(this.appealList[j].appealNbr, this.appealList[j]);
            selectedAppeals2.set(this.appealList[j].appealNbr, this.appealList[j]);
          }
          addEventListener('keydown',this.preventTabNav);

          this.view.snAppealToReschedule.setARData(this.appealList);
          this.view.snAppealToReschedule.forceLayout();
          this.view.forceLayout();
          this.frm.view.forceLayout();
        }
      }
      }
      dismissLoadingIndicator();
    },

    getARListFailure:function(error) {
      if(error.errmsg  !== null && error.errmsg  !== undefined && error.errmsg !== "") {
        //alert("Error - Document Types: " + error.errmsg);
      }
      else {
        var callSpecificMsg = "Service Error - Unable to get Document types.";
        currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
        currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
        currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
        currentFrm.view.puInformationDialog.isVisible = true; 
        addEventListener('keydown',this.preventTabNav);

        currentFrm.view.forceLayout();
        
      } 
      dismissLoadingIndicator();
    }, 


  };
});