define(function() {

  var currentRole = null;
  var returnPage = "";

  return {



    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnContinue.onClick = this.btnContinue;
      this.view.btnCancel.onClick = this.cancelInfo;
      amplify.subscribe("secondaryBreakpointTrigger", this, this.onBreakpointChange, 1); 
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    
    onBreakpointChange: function(form, width){
      if(width <= gblBreakPoint) {
        this.view.flxContainerInoutRow1.parent.width = '95%';
        this.view.lblTitle1.skin = 'sknLblBlackBold115Mobile';
        this.view.lblNewRole.skin = 'sknLblBlackBold115Mobile';
               
        //list boxes
        this.view.lstBoxRoles.skin = 'sknLstBoxNOrmalMobile';        
      }
      else {
        this.view.flxContainerInoutRow1.parent.width = '50%';
        this.view.lblTitle1.skin = 'sknLblBlackBold115';
        this.view.lblNewRole.skin = 'sknLblBlackBold115';
        
        
        //list boxes
        this.view.lstBoxRoles.skin = 'sknLstBoxNOrmal';        
      }
    },    

    setReturnPage:function(returnPage) {
      this.returnPage = returnPage;  
    },
   
    getInitialAppellantDemographicInfo:function() {
      operationName =  "getAppellantDemographicsByAppellantId";
      var data= {"appellantId": gblAppellantId};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, 
                                     this.getInitialAppellantDemographicInfoSuccess, 
                                     this.getInitialAppellantDemographicInfoFailure);
    },

    getInitialAppellantDemographicInfoSuccess:function(response) {
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
              this.initInfo();
            }
          }
        }
      }
    },

    getInitialAppellantDemographicInfoFailure:function(error) {
      var callSpecificMsg = "Unable to access demographic info.";
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
      currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
      currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
      currentFrm.view.puInformationDialog.isVisible = true; 
      currentFrm.view.forceLayout();
    },  
    

    initInfo:function() {
   
      this.view.lstBoxRoles.masterData = gblPortalUserTypeCodes;
     
      
//       this.view.lstBoxRoles.selectedKey = gblPortalUserRole.toUpperCase();
//       this.view.lblCurrentRole.text = gblPortalUserRole;
      
    },

    initializeDropdowns:function(curMailCounty,curMailState,curResidenceCounty,curResidenceState) {

      var emptyCountyRow = [0,"Select County"];
      var countyList = [];
      var countyItem = [];
      var curMailCountyKey = null;
      var curResidenceCountyKey = null;
      countyList.push(emptyCountyRow);

      for(var i = 0; i < gblCountiesList.length; i++) {
        countyItem = [];
        var county = gblCountiesList[i];
        countyItem[0] = county.countyId;
        countyItem[1] = county.countyDescription;
        countyList.push(countyItem);
        if(curMailCounty === county.countyDescription) {
          curMailCountyKey = county.countyId; 
        }
        if(curResidenceCounty === county.countyDescription) {
          curResidenceCountyKey = county.countyId;
        }      
      } 

      var emptyStateRow = [0,"Select State"];
      var curMailStateKey = null;
      var curResidenceStateKey = null;
      var stateList = [];
      var stateItem = [];
      stateList.push(emptyStateRow);

      for(i = 0; i < gblStatesList.length; i++) {
        stateItem = [];
        var state = gblStatesList[i];
        stateItem[0] = state.stateId;
        stateItem[1] = state.stateCd;
        stateList.push(stateItem);
        if(curMailState === state.stateCd) {
          curMailStateKey = state.stateId; 
        }
        if(curResidenceState === state.stateCd) {
          curResidenceStateKey = state.stateId;
        }
      }

      this.view.lstBoxCounty.masterData = countyList;
      this.view.lstBoxState.masterData = stateList;
      this.view.lstBoxCountyMail.masterData = countyList;
      this.view.lstBoxStateMail.masterData = stateList;       

      if(curMailCountyKey !== null) {
        this.view.lstBoxCountyMail.selectedKey = curMailCountyKey;
      }
      if(curMailStateKey !== null) {
        this.view.lstBoxStateMail.selectedKey = curMailStateKey;
      }
      if(curResidenceCountyKey !== null) {
        this.view.lstBoxCounty.selectedKey = curResidenceCountyKey;
      }
      if(curResidenceStateKey !== null) {
        this.view.lstBoxState.selectedKey = curResidenceStateKey;
      }
      
      this.view.forceLayout();
      
    },
    
    cancelInfo:function() {
      this.view.setVisibility(false);
    },

    btnContinue:function() {
    },

  };
});