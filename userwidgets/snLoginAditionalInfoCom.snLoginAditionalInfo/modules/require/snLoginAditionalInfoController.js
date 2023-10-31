var isUserHomeless = false;
var tempCountySelected = "Select County";
var tempStateSelected = "Select State";
var tempCompanyStateSelected = "Select State";
define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      dismissLoadingIndicator();
      this.view.CheckBoxAgreeChecks.onSelection = this.disableAddressFields;
      this.view.btnContinue.onClick = this.validateUserInfo;
      this.view.btnBack.onClick = this.goBack;
      this.view.lstBoxCounty.onSelection = this.getCountySelected;
      this.view.lstBoxState.onSelection = this.getStateSelected;
      var CheckBoxObject = [["homeless", "Homeless", accessibilityConfig={"a11yHidden": false, "a11yLabel": "", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxAgreeChecks.masterData = CheckBoxObject;
      this.view.txtBoxEnterFirstName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterLastName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterPhoneNumber.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterEmail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterAddress1.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterAddress2.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterCity.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterZipCode.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };    
      this.view.txtCompanyName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };      
      this.view.txtCompanyAddress.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };      
      this.view.txtCompanyAddress2.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };      
      this.view.txtCompanyCity.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };      
      this.view.txtCompanyZipCode.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };      
      this.view.txtBoxEnterNumberCase.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.lblUILine.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
     
      //this.view.btnBack.onClick = this.goBack;
      this.getCountiesList();

      //getCountiesList();
      // 	if(gblCountiesList === "" || gblStatesList === "") {
      //       getCountiesList();
      //     }
      this.setCountyandStatesDropdownsData();
      kony.print("County List: "+gblCountiesList);
      kony.print("States list: "+gblStatesList);
      //this.view.flxCompanyTitle.parent.forceLayout();
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
		this.view.lblTextLogIn.skin = 'sknLblBlackBold125Mobile';
        this.view.lblTextLogIn.width = '75%';
        this.view.lblStatusStepNumber.width = '25%';
        this.view.lblStatusStepNumber.skin = 'sknLblBlackReg100Mobile';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblTitle2.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblCompanyTitle.skin = 'sknLblGrayishDark115Mobile';
        
        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterAddress1.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtCompanyName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtCompanyAddress.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtCompanyAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtCompanyCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtCompanyZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterNumberCase.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        
        //list boxes
        this.view.lstBoxCounty.skin = 'sknLstBoxNOrmalMobile';
        this.view.lstBoxState.skin = 'sknLstBoxNOrmalMobile';
        this.view.lstCompanyState.skin = 'sknLstBoxNOrmalMobile';
      }
      else {
        this.view.lblTextLogIn.skin = 'sknLblBlackBold125';
        this.view.lblTextLogIn.width = '80%';
        this.view.lblStatusStepNumber.width = '19.25%';
        this.view.lblStatusStepNumber.skin = 'sknLblBlackReg100';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblTitle2.skin = 'sknLblGrayishDark115';
        this.view.lblCompanyTitle.skin = 'sknLblGrayishDark115';
        
        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterAddress1.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtCompanyName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtCompanyAddress.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtCompanyAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtCompanyCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtCompanyZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius'; 
        this.view.txtBoxEnterNumberCase.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';

        //list boxes
        this.view.lstBoxCounty.skin = 'sknLstBoxNOrmal';
        this.view.lstBoxState.skin = 'sknLstBoxNOrmal';
        this.view.lstCompanyState.skin = 'sknLstBoxNOrmal';        
      } 
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     
    
    goBack:function() {
      var ntf = new kony.mvc.Navigation("frmLoginBeforeStart");
      ntf.navigate();
    },
    getCountiesList:function() {
      operationName =  "getCountiesDropdownList";
      var data= {};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
      integrationObj.invokeOperation(operationName, headers, data, this.getCountiesListSuccess, this.getCountiesListFailure);
    },
    getCountiesListSuccess:function(response) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errCounties;
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
            if(response.availableCounties !== null && response.availableCounties !== undefined) {
              gblCountiesList = response.availableCounties; 	  
            }
          }
          this.getStatesList(); 
        }
      }
    },

    getCountiesListFailure:function(error) {
      alert("Unable to access Counties list");
    },
    getStatesList:function() {
      operationName =  "getStatesList";
      var data= {};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
      integrationObj.invokeOperation(operationName, headers, data, this.getStatesListSuccess, this.getStatesListFailure);
    },

    getStatesListSuccess:function(response) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errStates;
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
            if(response.availableStates !== null && response.availableStates !== undefined) {
              gblStatesList = response.availableStates; 	  
            }
          }
          this.setCountyandStatesDropdownsData();
        }
      }
    },
    getStatesListFailure:function(error) {
      alert("Unable to access Counties list");
    },    
    getCountySelected:function() {
      kony.print("Inside getCountySelected");
      tempCountySelected = this.view.lstBoxCounty.selectedKeyValue[1];
      
      kony.print("inside tempCountySelected: "+JSON.stringify(tempCountySelected));
    },
    getStateSelected:function() {
      kony.print("Insid getStateSelected");
      tempStateSelected = this.view.lstBoxState.selectedKeyValue[1];
      kony.print("inside tempCountySelected: "+JSON.stringify(tempStateSelected));
    },
    getCompanyStateSelected:function() {
      kony.print("Insid getStateSelected");
      tempCompanyStateSelected = this.view.lstCompanyState.selectedKeyValue[1];
      kony.print("inside tempCompanySelected: "+JSON.stringify(tempCompanyStateSelected));
    },
    disableAddressFields: function() {
      var homelessSelected = this.view.CheckBoxAgreeChecks.selectedKeys;
      kony.print("inside disableAddressFields: "+homelessSelected);
      if(homelessSelected === "homeless") {
        isUserHomeless = true;
        this.view.txtBoxEnterAddress1.setEnabled(false);
        this.view.txtBoxEnterAddress2.setEnabled(false);
        this.view.txtBoxEnterCity.setEnabled(false);
        this.view.txtBoxEnterZipCode.setEnabled(false);
        this.view.lstBoxState.setEnabled(false);
      } else {
        isUserHomeless = false;
        this.view.txtBoxEnterAddress1.setEnabled(true);
        this.view.txtBoxEnterAddress2.setEnabled(true);
        this.view.txtBoxEnterCity.setEnabled(true);
        this.view.txtBoxEnterZipCode.setEnabled(true);
        this.view.lstBoxState.setEnabled(true);
      }
    },
    setCountyandStatesDropdownsData:function() {
      var emptyCountyRow = [0,"Select County"];
      var countyList = [];
      var countyItem = [];
      countyList.push(emptyCountyRow);

      for(var i = 0; i < gblCountiesList.length; i++) {
        countyItem = [];
        var county = gblCountiesList[i];
        countyItem[0] = county.countyId;
        countyItem[1] = county.countyDescription;
        countyList.push(countyItem);
      } 

      var emptyStateRow = [0,"Select State"];
      var stateList = [];
      var stateItem = [];
      stateList.push(emptyStateRow);

      for(i = 0; i < gblStatesList.length; i++) {
        stateItem = [];
        var state = gblStatesList[i];
        stateItem[0] = state.stateId;
        stateItem[1] = state.stateCd;
        stateList.push(stateItem);
      }

      this.view.lstBoxCounty.masterData = countyList;
      this.view.lstBoxState.masterData = stateList;
      this.view.lstCompanyState.masterData = stateList;
      if(gblRepresentingOption.startsWith("AR") || gblRepresentingOption.startsWith("TPM")) {
        this.view.lstCompanyState.setVisibility(true);        
      }
      else
        {
          this.view.lstCompanyState.setVisibility(true); 
        }
    },
    validateUserInfo:function() {
      kony.print("inside validateUserInfo");
      if(this.view.txtBoxEnterFirstName.text === "") {
        alert("First name cannot be empty");
        this.view.txtBoxEnterFirstName.setFocus(true);
        return false;
      } else {
        gblUserInfo.firstName = this.view.txtBoxEnterFirstName.text;
      }
      if(this.view.txtBoxEnterLastName.text === "") {
        alert("Last name cannot be empty");
        this.view.txtBoxEnterLastName.setFocus(true);
        return false;
      } else {
        gblUserInfo.lastName = this.view.txtBoxEnterLastName.text;
      }
      if(this.view.txtBoxEnterPhoneNumber.text !== "") {
        if(isPhoneNumberValid(this.view.txtBoxEnterPhoneNumber.text)) {
          gblUserInfo.PhoneNumber = this.view.txtBoxEnterPhoneNumber.text.replace(/\D/g, '');
        }
        else{
          alert("Please enter a 10 digit phone number only");
          this.view.txtBoxEnterPhoneNumber.setFocus(true);
          return false;
        }
      } else {
        gblUserInfo.PhoneNumber = "";
      }
      if(this.view.txtBoxEnterEmail.text === "") {
        alert("Email cannot be empty");
        this.view.txtBoxEnterEmail.setFocus(true);
        return false;
      } else {
        if(!kony.string.isValidEmail(this.view.txtBoxEnterEmail.text)) {
          alert("Email is invalid"); 
          this.view.txtBoxEnterEmail.setFocus(true);
          return false;
        }
        else {
          gblUserInfo.Email = this.view.txtBoxEnterEmail.text;  
        }
      }
      if(this.view.txtBoxEnterAddress1.text === "") {
        alert("Address cannot be empty");
        this.view.txtBoxEnterAddress1.setFocus(true);
        return false;
      } else {
        gblUserInfo.Address = this.view.txtBoxEnterAddress1.text;
      }
      if(this.view.txtBoxEnterCity.text === "") {
        alert("City cannot be empty");
        this.view.txtBoxEnterCity.setFocus(true);
        return false;
      } else {
        gblUserInfo.city = this.view.txtBoxEnterCity.text;
      }
      if(this.view.txtBoxEnterZipCode.text === "") {
        alert("Zip code cannot be empty");
        this.view.txtBoxEnterZipCode.setFocus(true);
        return false;
      }
      else
      {
        if (isZipCodeValid(this.view.txtBoxEnterZipCode.text)) {
          gblUserInfo.zipCode = this.view.txtBoxEnterZipCode.text.replace(/\D/g,'');
        }
        else
        {
          alert("Zip code is invalid");
          this.view.txtBoxEnterZipCode.setFocus(true);
          return false;
        }
      }
   
      if(tempCountySelected === "Select County") {
        alert("Please select county");
        return false;
      } else {
        gblUserInfo.county = tempCountySelected;
      }
      kony.print("inside state: "+tempStateSelected);
      if(tempStateSelected === "Select State") {
        alert("Please select state");
        return false;
      } else {
        gblUserInfo.state = tempStateSelected;
      }
      if(this.view.txtBoxEnterAddress2.text !== "") {
        gblUserInfo.Address2 = this.view.txtBoxEnterAddress2.text;
      } else {
        gblUserInfo.Address2 = "";
      }
      if(gblRepresentingOption.startsWith("AR") || gblRepresentingOption.startsWith("TPM")) {
        if(this.view.txtCompanyAddress.text === "") {
          alert("Company address cannot be empty");
          this.view.txtCompanyAddress.setFocus(true);
          return false;
        } else {
          gblUserInfo.companyAddress = this.view.txtCompanyAddress.text;
        }
        if(this.view.txtCompanyCity.text === "") {
          alert("City cannot be empty");
          this.view.txtCompanyCity.setFocus(true);
          return false;
        } else {
          gblUserInfo.companyCity = this.view.txtCompanyCity.text;
        }        
        
        if(this.view.txtCompanyZipCode.text === "") {
          alert("Zip code cannot be empty");
          this.view.txtCompanyZipCode.setFocus(true);
          return false;
        }
        else
        {
          if (isZipCodeValid(this.view.txtCompanyZipCode.text)) {
            gblUserInfo.companyZipcode = this.view.txtCompanyZipCode.text.replace(/\D/g,'');
          }
          else
          {
            alert("Zip code is invalid");
            this.view.txtCompanyZipCode.setFocus(true);
            return false;
          }
        }        
        kony.print("inside company state: "+tempCompanyStateSelected);
        if(tempCompanyStateSelected === "Select State") {
          alert("Please select company state");
          return false;
        } else {
          gblUserInfo.companyState = tempCompanyStateSelected;
        }
        if(this.view.txtCompanyAddress2.text !== "") {
          gblUserInfo.companyAddress2 = this.view.txtCompanyAddress2.text;
        } else {
          gblUserInfo.companyAddress2 = "";
        }
        if(this.view.txtCompanyName.text !== "") {
          gblUserInfo.companyName = this.view.txtCompanyName.text;
        } else {
          gblUserInfo.companyName = "";
        }
      }
      if(gblRepresentingOption.startsWith("APP")) {
        if(this.view.txtBoxEnterNumberCase.text !== "") {
          gblUserInfo.caseNumber = this.view.txtBoxEnterNumberCase.text;
        } else {
          gblUserInfo.caseNumber = "";
        }  
      } else {
        gblUserInfo.caseNumber = "";
      }
      kony.print("inside gblUserInfo: "+JSON.stringify(gblUserInfo));
      showLoadingIndicator();
      gblUserInfoValidated = true;
      var ntf = new kony.mvc.Navigation("frmLoginIdentityVerification");
      ntf.navigate();
    },
    showOrHideCompanyInfo:function() {
      kony.print("insid showOrHideCompanyInfo");
      kony.print("inside gblRepresentingOption: "+gblRepresentingOption);
      //this.setCountyandStatesDropdownsData();
      if(gblRepresentingOption.startsWith("AR") || gblRepresentingOption.startsWith("TPM")) {
        this.view.lstCompanyState.onSelection = this.getCompanyStateSelected;
        this.view.flxContainerInoutRow9.setVisibility(false);
        this.view.flxCompanyTitle.setVisibility(true);
        this.view.flxCompanyAddress.setVisibility(true);
        this.view.flxCompanyAddress2.setVisibility(true);
        this.view.flxCompanyCityState.setVisibility(true);
        this.view.flxCompanyZipCode.setVisibility(true);
        this.view.flxCompanyName.setVisibility(true);
      } else {
        this.view.flxContainerInoutRow9.setVisibility(true);
        this.view.flxCompanyTitle.setVisibility(false);
        this.view.flxCompanyAddress.setVisibility(false);
        this.view.flxCompanyAddress2.setVisibility(false);
        this.view.flxCompanyCityState.setVisibility(false);
        this.view.flxCompanyZipCode.setVisibility(false);
        this.view.flxCompanyName.setVisibility(false);
      }
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    }
  };
});