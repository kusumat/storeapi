var frm;
define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.postShow = this.postShowOps;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    loadAR:function(form) {
      this.frm = form;
      if(gblInterestedParties.length === 0) {
        this.view.flxMainContainer.removeAll();
        operationName =  "getInterestedPartiesByAppealIdAndHatsUserId";
        var data= {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};
        var headers= {};
        var serviceName = "appellantServices";
        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        integrationObj.invokeOperation(operationName, headers, data, this.getARListSuccess, this.getARListFailure);

      }
      else {
        this.setInterestedParties(gblInterestedParties);	  
      }
    },

    getARListSuccess:function(response) {
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
            kony.print("AR List:"+JSON.stringify(response)); 

            var interestedParties = response.interestedParties;

            this.setInterestedParties(interestedParties);

          }
        }
      }
    },

    setInterestedParties:function(interestedParties) {
      this.view.flxMainContainer.removeAll();

      if(interestedParties) {   
        if(interestedParties.length == 1)
          this.view.flxMainContainer.height='200dp';
        else
          this.view.flxMainContainer.height='220dp';

        for(var i = 0; i < interestedParties.length; i++) {

          var snARRow = new snAuthorizedRepresentativesDetailsCom.snAuthorizedRepresentativesDetailsRow({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": true,
            "id": "snARRow" + i,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "width": "100%"
          }, {}, {}); 
          snARRow.setComponentData(interestedParties[i], this.frm);
          this.view.flxMainContainer.add(snARRow);
        }
        this.view.lblDesc1.setVisibility(false);
      }
      else {
        this.view.lblDesc1.setVisibility(true);
        this.view.flxMainContainer.height='20dp';
      }

      this.view.flxMainContainer.forceLayout();
      this.view.forceLayout();
      this.frm.view.forceLayout(); 


    }, 

    postShowOps:function() {
      this.view.flxMainContainer.forceLayout();
      this.view.forceLayout();
      this.frm.view.forceLayout();
    },

    getARListFailure:function(error) {
      if(error.errmsg  !== null && error.errmsg  !== undefined && error.errmsg !== "") {
        //alert("Error - Document Types: " + error.errmsg);
      }
      else {
        var callSpecificMsg = "Service Error - Unable to get Interested Parties list.";
        currentFrm.view.puInformationDialog.flxContainerInfoHeight = '175px';
        currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
        currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg;
        currentFrm.view.puInformationDialog.isVisible = true; 
        currentFrm.view.forceLayout();
      } 
    }, 


  };
});
