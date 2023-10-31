define(function() {

  var mailingAddressId = null;
  var residenceAddressId = null;
  var homePhoneId = null;
  var homePhoneExt = "";
  var cellPhoneId = null;
  var cellPhoneExt = "";
  var workPhoneId = null;
  var workPhoneExt = "";
  var busPhoneId = null;
  var busPhoneExt = "";
  var primaryPhoneType = null;
  var returnPage = "";
  
  var selectedId;
  var selectedItem;
  
  var vSmsActiveInd;
  var vSmsIndPrev="";
  var vPrimPhonToolTip;
    
  var ApplntPhoneupdate = { 
    "lblApplntPhoneNbrType":"",
    "lblApplntPhoneNbr": "",
    "lblApplntPhoneExtension": "",
    "lblApplntActionType": "",
    "lblApplntXrefId": "",
	"lblApplntSmsInd":"",
    "lblApplntPrimInd":""
  };

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnSaveInfo.onClick = this.saveInfo;
      this.view.btnCancel.onClick = this.cancelInfo;
      this.view.btnAddAppllntPhone.onClick = this.addPhoneNumber;
      var CheckBoxObject = [["Homeless Checkbox", "Homeless Checkbox", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Homeless", "a11yHint": "", "a11yIndex": 0}]];
      this.view.checkHomeless.masterData = CheckBoxObject;  
      this.view.txtBoxEnterFirstName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
    
      amplify.subscribe("secondaryBreakpointTrigger", this, this.onBreakpointChange, 1); 
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
 
    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.flxContainerInoutRow1.parent.width = '95%';
        this.view.lblTitle1.skin = 'sknLblBlackBold115Mobile';
        this.view.lblTitle2.skin = 'sknLblBlackBold115Mobile';
        
        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.lstBoxApplntPhoneType.skin = 'sknLstBoxNOrmalMobile';
        this.view.txtBoxApplntEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxApplntEnterExtension.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        
        this.view.txtBoxEnterAddress1.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        //this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';

        this.view.txtBoxEnterAddressMail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterAddress2Mail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterCityMail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        //this.view.txtBoxEnterZipCodeMail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        
        //list boxes
        this.view.lstBoxCounty.skin = 'sknLstBoxNOrmalMobile';        
        this.view.lstBoxState.skin =  'sknLstBoxNOrmalMobile';
        this.view.txtBoxEnterZipCode.skin = 'sknLstBoxNOrmalMobile';
        
        this.view.lstBoxCountyMail.skin = 'sknLstBoxNOrmalMobile';        
        this.view.lstBoxStateMail.skin =  'sknLstBoxNOrmalMobile';
        this.view.txtBoxEnterZipCodeMail.skin = 'sknLstBoxNOrmalMobile';
        
        this.view.btnAddAppllntPhone.skin = 'sknBtnBlueshedRegNormal80';
        this.view.sgmApplPhoneNmbrList.rowTemplate = 'flxtmpSgmApplntPhoneItemsMobile';
        
      }
      else {
       
        
        this.view.flxContainerInoutRow1.parent.width = '50%';
        
        this.view.lblTitle1.skin = 'sknLblBlackBold115';
        this.view.lblTitle2.skin = 'sknLblBlackBold115';

        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.lstBoxApplntPhoneType.skin = 'sknLstBoxNOrmal';
        this.view.txtBoxApplntEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxApplntEnterExtension.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        
        this.view.txtBoxEnterAddress1.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';

        this.view.txtBoxEnterAddressMail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterAddress2Mail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterCityMail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterZipCodeMail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        
        //list boxes
        this.view.lstBoxCounty.skin = 'sknLstBoxNOrmal';        
        this.view.lstBoxState.skin = 'sknLstBoxNOrmal';
        this.view.lstBoxCountyMail.skin = 'sknLstBoxNOrmal';        
        this.view.lstBoxStateMail.skin = 'sknLstBoxNOrmal';
        
        this.view.btnAddAppllntPhone.skin = 'sknBtnBlueshedRegNormal';
        this.view.sgmApplPhoneNmbrList.rowTemplate = 'flxtmpSgmApplntPhoneItems';
      }
      
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    

    setReturnPage:function(returnPage) {
      this.returnPage = returnPage;  
    },

    getInitialAppellantDemographicInfo:function() {
//      alert("get initial date");
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
      
      this.resetMainForm();
      
      //alert("InitInfo: " + JSON.stringify(gblDemographicInfo));
      vSmsActiveInd = gblDemographicInfo.smsActiveInd;
      //vSmsActiveInd = "N";   //Test SMS inactive
      
      this.view.txtBoxEnterFirstName.text = gblDemographicInfo.AppellantFirstName;
      this.view.txtBoxEnterLastName.text = gblDemographicInfo.AppellantLastName;
      this.view.txtBoxEnterEmail.text = gblDemographicInfo.Email;
      if (vSmsActiveInd === "N")
      {
         this.view.flxSmsWarningMsg.isVisible = true;
      }else{
         this.view.flxSmsWarningMsg.isVisible = false;
      }
      var homelessIndicator = gblDemographicInfo.HomelessIndicator;
      if(homelessIndicator === "Y") {
        this.view.checkHomeless.selectedKeys = ["cbg1"];
      }
      else {
        this.view.checkHomeless.selectedKeys = null;
      }

            
      if(gblDemographicInfo.PhoneDetails !== null &&
         gblDemographicInfo.PhoneDetails !== undefined &&
         gblDemographicInfo.PhoneDetails.length > 0) {
        var dataRows = [];
      	var row = "";
      	var rowFull = "";
      	var lstPhoneDetails = gblDemographicInfo.PhoneDetails;
        
        // how many phone numbers are deleted
        var vPpnCount = 0;
        for(var pd = 0; pd < lstPhoneDetails.length; pd++) {
          var phoneDetailCount = lstPhoneDetails[pd];
          if (phoneDetailCount.lblApplntPrimInd === "Y"){
            vPpnCount++;
          }
        }
        
        
        if(vPpnCount > 1){
          vPrimPhonToolTip = "Primary Phone: Select to re-establish as primary.";
        }else{
          vPrimPhonToolTip = "Primary Phone";
        }
        
        // set phone
        //alert(JSON.stringify(gblDemographicInfo.PhoneDetails));
        for(var p = 0; p < lstPhoneDetails.length; p++) {
          var phoneDetail = lstPhoneDetails[p];
          var phonePrimVis;
          var phone2ndryVis;
          var phoneSMSOnVis;
          var phoneSMSOffVis;
          var vFlxApplntSMSVis;
          var vPhoneSmsLockVis;
          
          
          if(phoneDetail.primaryInd === "Y"){
            phonePrimVis  = true;
            phone2ndryVis = false;
            }
          else{
            phonePrimVis  = false;
            phone2ndryVis = true;
          }
          
          // check for SMS active
          if (vSmsActiveInd === "Y"){
            // SMS is active
            if (phoneDetail.phoneTypCD === "Cell" ){
              vFlxApplntSMSVis = true;
              vPhoneSmsLockVis = false;
          	  if (phoneDetail.smsInd === "P" || phoneDetail.smsInd === "Y"){ 
                if (phoneDetail.smsInd === "Y"){
                  vSmsIndPrev = phoneDetail.phoneXrefId;
                }
                phoneSMSOnVis  = true;
                phoneSMSOffVis = false;
          	  }else{
                phoneSMSOnVis  = false;
    	        phoneSMSOffVis = true;
              }
            }else{
              vFlxApplntSMSVis = false;  
            }
          }else{
            // SMS is inactive
            phoneSMSOnVis  = false;
            phoneSMSOffVis = false;
            if (phoneDetail.smsInd === "P" || phoneDetail.smsInd === "Y"){ 
              vPhoneSmsLockVis = true;
              vFlxApplntSMSVis = true; 
            }else{
              vPhoneSmsLockVis = false;
              vFlxApplntSMSVis = false;
            }
          }
          

          
          row = {
            "lblApplntPhoneNbrType": phoneDetail.phoneTypCD,
            "lblApplntPhoneNbr": normalizePhone(phoneDetail.phoneNumber),
           	"lblApplntPhoneExtension": phoneDetail.ext,
           	"lblApplntActionType": "",
		   	"lblApplntSmsInd":phoneDetail.smsInd,
            "lblApplntPrimInd":phoneDetail.primaryInd,
            "lblApplntXrefId": phoneDetail.phoneXrefId,
            "imgApplntSMSIcon" : {'isVisible' : true},
            "btnImgSMSToggleOn" :  {'isVisible' : phoneSMSOnVis},
            "btnImgSMSToggleOff": {'isVisible' : phoneSMSOffVis},
            "btnImgSMSLocked"   : {'isVisible' : vPhoneSmsLockVis},
            "flexSmsCntnr"   : {'isVisible' : vFlxApplntSMSVis},
            "lblSmsDescr"    : "OPT-IN Text Message Notification",
            "flxApplntSMSVis"   : {'isVisible' : vFlxApplntSMSVis},
            "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
            "imgBtnApplnt2ndryPhone": {'isVisible' : true},
            "btnImgPPhnToggleOn" :  {'isVisible' : phonePrimVis,'toolTip': vPrimPhonToolTip},
			"btnImgPPhnToggleOff"  :  {'isVisible' : phone2ndryVis},
            "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
            "lblPrimPhoneDescr" : "Primary Phone Number",
		  	"imgBtnApplntStatus":  {"isVisible" :false},
          	"imgBtnApplntNewPhone":{"isVisible" :false},
		  	"imgBtnApplntDeletedPhone": {"isVisible" :false},
          	"flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")},
          	"btnImgApplntDelete": {"isVisible" :true},
		  	"btnImgApplntUndelete": {"isVisible" :false}
         	};	 
           
          dataRows.push(row);
      	}
      	this.view.sgmApplPhoneNmbrList.setData(dataRows);  

      }
      else {
        var dataRowsEmpty = [];
        this.view.sgmApplPhoneNmbrList.setData(dataRowsEmpty);  
      }
           
      
      var curMailCounty = "";
      var curMailState = "";
      var curResidenceCounty = "";
      var curResidenceState = "";

      if(gblDemographicInfo.AddressDetails !== null &&
         gblDemographicInfo.AddressDetails !== undefined &&
         gblDemographicInfo.AddressDetails.length > 0) {
        var addressDetails = gblDemographicInfo.AddressDetails;
        for(var j = 0; j < addressDetails.length; j++) {
          var addressDetail = addressDetails[j];
          if(addressDetail.addrTypCd === "Mailing") {
            this.view.txtBoxEnterAddressMail.text = addressDetail.addrLine1;
            this.view.txtBoxEnterAddress2Mail.text = addressDetail.addrLine2;
            this.view.txtBoxEnterCityMail.text = addressDetail.city;
            this.view.txtBoxEnterZipCodeMail.text = addressDetail.zipCd;
            curMailCounty = addressDetail.county;
            curMailState = addressDetail.state;
            mailingAddressId = addressDetail.addressId;
          }
                    
          if(addressDetail.addrTypCd === "Residence") {
            this.view.txtBoxEnterAddress1.text = addressDetail.addrLine1;
            this.view.txtBoxEnterAddress2.text = addressDetail.addrLine2;
            this.view.txtBoxEnterCity.text = addressDetail.city;
            this.view.txtBoxEnterZipCode.text = addressDetail.zipCd;
            curResidenceCounty = addressDetail.county;
            curResidenceState = addressDetail.state;
            residenceAddressId = addressDetail.addressId;
          }
        }
      }
      
      let vA11yHintTextA = "";
      if (this.view.txtBoxEnterFirstName.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterFirstName.placeholder;
      } else {
        vA11yHintTextA = "";
      }
      this.view.txtBoxEnterFirstName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterLastName.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterLastName.placeholder;
      } else {
        vA11yHintTextA = "";
      }
      this.view.txtBoxEnterLastName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterEmail.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterEmail.placeholder;
      } else {
        vA11yHintTextA = "";
      }
      this.view.txtBoxEnterEmail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.lstBoxApplntPhoneType.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "Phone Type", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxApplntEnterPhoneNumber.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxApplntEnterPhoneNumber.placeholder;
      } else {
        vA11yHintTextA = "";
      }
      this.view.txtBoxApplntEnterPhoneNumber.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxApplntEnterExtension.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxApplntEnterExtension.placeholder;
      } else {
        vA11yHintTextA = "";
      }
      this.view.txtBoxApplntEnterExtension.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint":  "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterAddress1.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterAddress1.placeholder;
      } else {
        vA11yHintTextA = "";
      }
      this.view.txtBoxEnterAddress1.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterAddress2.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterAddress2.placeholder;
      } else {
        vA11yHintTextA = "";
      }
      this.view.txtBoxEnterAddress2.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterCity.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterCity.placeholder;
      } else {
        vA11yHintTextA = "";
      }
      this.view.txtBoxEnterCity.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.lstBoxCounty.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "County Name", 
        "a11yIndex": 0 
      };
      this.view.lstBoxState.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "State Abbreviation", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterZipCode.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterZipCode.placeholder;
      } else {
        vA11yHintTextA = "";
      } 
      this.view.txtBoxEnterZipCode.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterAddressMail.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterAddressMail.placeholder;
      } else {
        vA11yHintTextA = "";
      } 
      this.view.txtBoxEnterAddressMail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterAddress2Mail.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterAddress2Mail.placeholder;
      } else {
        vA11yHintTextA = "";
      } 
      this.view.txtBoxEnterAddress2Mail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterCityMail.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterCityMail.placeholder;
      } else {
        vA11yHintTextA = "";
      } 
      this.view.txtBoxEnterCityMail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.lstBoxCountyMail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "County Name", 
        "a11yIndex": 0 
      }; 
      this.view.lstBoxStateMail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "State Abbreviation", 
        "a11yIndex": 0 
      };  
      if (this.view.txtBoxEnterZipCodeMail.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterZipCodeMail.placeholder;
      } else {
        vA11yHintTextA = "";
      }  
      this.view.txtBoxEnterZipCodeMail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };      

      this.initializeDropdowns(curMailCounty,curMailState,curResidenceCounty,curResidenceState);
    },

    initializeDropdowns:function(curMailCounty,curMailState,curResidenceCounty,curResidenceState) {
	  var phoneTypesList = [];
      phoneTypesList.push([0, "Phone Type"]);
      for (i = 0; i < gblPhoneTypeList.length; i++) {
        var item = gblPhoneTypeList[i];
        phoneTypesList.push([item.phoneTypId, item.phoneTypCd]);
      }
      this.view.lstBoxApplntPhoneType.masterData = phoneTypesList;

      
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
    
    resetMainForm:function() {
    // alert('Rest Main Form');
      this.view.txtBoxEnterFirstName.text = "";
      this.view.txtBoxEnterLastName.text = "";
      this.view.txtBoxEnterEmail.text = "";
      this.view.checkHomeless.selectedKeys = null;
      this.view.txtBoxEnterAddressMail.text = "";
      this.view.txtBoxEnterAddress2Mail.text = "";
      this.view.txtBoxEnterCityMail.text = "";
      this.view.txtBoxEnterZipCodeMail.text = "";
      this.view.txtBoxEnterAddress1.text = "";
      this.view.txtBoxEnterAddress2.text = "";
      this.view.txtBoxEnterCity.text = "";
      this.view.txtBoxEnterZipCode.text = "";
      this.view.lstBoxCountyMail.selectedKey = null;
      this.view.lstBoxStateMail.selectedKey = null;
      this.view.lstBoxCounty.selectedKey = null;
      this.view.lstBoxState.selectedKey = null;

      this.view.lstBoxApplntPhoneType.selectedKey = 0;
      this.view.txtBoxApplntEnterPhoneNumber.text = "";
      this.view.txtBoxApplntEnterExtension.text = "";
    },

    
    resetPhoneNumber() {
      this.view.lstBoxApplntPhoneType.selectedKey = 0;
      this.view.txtBoxApplntEnterPhoneNumber.text = "";
      this.view.txtBoxApplntEnterExtension.text = "";
      this.view.forceLayout();
    },
    
    addPhoneNumber() {
      var errorFound = false;
      var alertMessage = " ";
      var vFlxApplntSMSVis;
 	  
      if (vSmsActiveInd === "Y"){
        if(this.view.lstBoxApplntPhoneType.selectedKeyValue[1] === "Cell"){
          vFlxApplntSMSVis = true;
        }else{
          vFlxApplntSMSVis = false;
        }
      }else{
        vFlxApplntSMSVis = false;
      }
      
      var lstPhoneDetails = this.view.sgmApplPhoneNmbrList.data;
      // if this is the only phone number make it primary
      if (lstPhoneDetails.length === 0){
        ApplntPhoneupdate = {
          "lblApplntPhoneNbrType": this.view.lstBoxApplntPhoneType.selectedKeyValue[1],
          "lblApplntPhoneNbr": normalizePhone(this.view.txtBoxApplntEnterPhoneNumber.text),
          "lblApplntPhoneExtension": this.view.txtBoxApplntEnterExtension.text,
          "lblApplntActionType": "A",
   	      "lblApplntXrefId": removeNonNumerics(this.view.txtBoxApplntEnterPhoneNumber.text),
	      "lblApplntSmsInd":"N"  ,
          "lblApplntPrimInd":"Y",
          "imgApplntSMSIcon":  {'isVisible' : true},
          "btnImgSMSToggleOn" :  {'isVisible' : false},
          "btnImgSMSToggleOff" : {'isVisible' : true},
          "flexSmsCntnr" : {'isVisible' : vFlxApplntSMSVis},
          "lblSmsDescr" : "OPT-IN Text Message Notification",
          "flxApplntSMSVis"   : {'isVisible' : vFlxApplntSMSVis},
          "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
          "imgBtnApplnt2ndryPhone": {"isVisible" :true},
          "btnImgPPhnToggleOn"  :  {'isVisible' : true},
          "btnImgPPhnToggleOff" :  {'isVisible' : false},
          "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
          "lblPrimPhoneDescr" : "Primary Phone Number",
		  "imgBtnApplntStatus":  {"isVisible" :false},
          "imgBtnApplntNewPhone":{"isVisible" :true},
		  "imgBtnApplntDeletedPhone": {"isVisible" :false},
          "btnImgApplntDelete": {"isVisible" :true},
		  "btnImgApplntUndelete": {"isVisible" :false},
          "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
        };        
      } 
      else {
        ApplntPhoneupdate = {
          "lblApplntPhoneNbrType": this.view.lstBoxApplntPhoneType.selectedKeyValue[1],
          "lblApplntPhoneNbr": normalizePhone(this.view.txtBoxApplntEnterPhoneNumber.text),
          "lblApplntPhoneExtension": this.view.txtBoxApplntEnterExtension.text,
          "lblApplntActionType": "A",
   	      "lblApplntXrefId": removeNonNumerics(this.view.txtBoxApplntEnterPhoneNumber.text),
	      "lblApplntSmsInd":"N",
          "lblApplntPrimInd":"N",
          "imgApplntSMSIcon":  {'isVisible' : true},
          "btnImgSMSToggleOn" :  {'isVisible' : false},
          "btnImgSMSToggleOff" : {'isVisible' : true},
          "flxApplntSMSVis"   : {'isVisible' : vFlxApplntSMSVis},
          "flexSmsCntnr" : {'isVisible' : vFlxApplntSMSVis},
          "lblSmsDescr" : "OPT-IN Text Message Notification",
          "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
          "imgBtnApplnt2ndryPhone": {"isVisible" :true},
		  "btnImgPPhnToggleOn"  :  {'isVisible' : false},
          "btnImgPPhnToggleOff" :  {'isVisible' : true},
          "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
          "lblPrimPhoneDescr" : "Primary Phone Number",
		  "imgBtnApplntStatus":  {"isVisible" :false},
          "imgBtnApplntNewPhone":{"isVisible" :true},
          "imgBtnApplntDeletedPhone": {"isVisible" :false},
          "btnImgApplntDelete": {"isVisible" :true},
		  "btnImgApplntUndelete": {"isVisible" :false},
          "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
        };        
      }
      
      if (ApplntPhoneupdate.lblApplntPhoneNbrType === "Phone Type") {
        errorFound = true;
        alertMessage = alertMessage += "The type of phone number is required. \n" ;
       }
      var testPhone = removeNonNumerics(ApplntPhoneupdate.lblApplntPhoneNbr);
      if (testPhone.length !== 10) {
        errorFound = true;
        alertMessage = alertMessage += "The phone number must have ten numbers. \n" ;
       }
      if (errorFound === false) {
        this.view.sgmApplPhoneNmbrList.addDataAt(ApplntPhoneupdate,0, 0);
        this.view.forceLayout();
        this.resetPhoneNumber();
      }
      else {
        var alertBasic = {alertTitle:"Input Error", message:alertMessage,alertType:constants.ALERT_TYPE_ERROR};
	    var alertPSP = {};
        var alert = kony.ui.Alert(alertBasic, alertPSP);   
      }
      errorFound = false;
      alertMessage = "";
    },

    
    SMSPhoneNumber:function(scope, index)  {
      var vAttestationOk = false;
      var errorFound = false;
      var errorMessage = " ";
      var selectedRow = this.view.sgmApplPhoneNmbrList.selectedRowItems[0];
      selectedId = this.view.sgmApplPhoneNmbrList.selectedRowIndex[1];
	  var appllntXrefID;
      var phoneSMSOnVis;
      var phoneSMSOffVis;
      var varApplntSmsInd;
      var varApplntActionType;
      
      var messageMade = "* Service fees may apply, check with your service provider.";
      messageMade += "\n\n";
      messageMade += "Once the Text Notification change is saved, you will receive a confirmation text at the phone number selected.";
      messageMade += "\n\n";
      messageMade += "Select OK to continue.";
      var pspConfig = {};
      var alertBasic = {
        message: messageMade,
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        noLabel: "No",
        yesLabel: "Yes",
        alertTitle: "Confirmation",
        alertHandler: function (label) {
          if (label) {
            vAttestationOk = true;
          }
        }
      };
      
      // error handling
      if (vSmsActiveInd === "N") {
        errorMessage = errorMessage += "The SMS Text Message options are currently unavailable. \n";
        errorFound = true;
      }
      
      if (selectedRow.lblApplntActionType === "D" && selectedRow.lblApplntSmsInd === "N"){
        errorMessage = errorMessage += "Phone numbers that are being deleted cannot be changed. \n";
        errorFound = true;
      }
		
      if (selectedRow.lblApplntPhoneNbrType !== "Cell" && selectedRow.lblApplntSmsInd === "N"){
        errorMessage = errorMessage += "SMS must be activated on a Cell Phone. \n";
        errorFound = true;
      }
	  	
      // check for error - process if no error
      if (errorFound){
        alert(errorMessage);
        errorFound = false;
      }else{
        if (selectedRow.lblApplntSmsInd === "N"){
          kony.ui.Alert(alertBasic, pspConfig);  
        }else{
          vAttestationOk = true;
        }
 	    
       
        if (vAttestationOk){
          if (selectedRow.lblApplntSmsInd === "P" || selectedRow.lblApplntSmsInd === "Y"){ 
            phoneSMSOnVis  = false;
            phoneSMSOffVis = true;
            varApplntSmsInd = "N";
          }else{
            phoneSMSOnVis  = true;
            phoneSMSOffVis = false;
             
            if (vSmsIndPrev === selectedRow.lblApplntXrefId && selectedRow.lblApplntActionType !== "A")
            {
              varApplntSmsInd = "Y";
            }else{
              varApplntSmsInd = "P";
            }
          }
          
          if (selectedRow.lblApplntActionType === "A"){
            varApplntActionType = "A";
            appllntXrefID = normalizePhone(selectedRow.lblApplntPhoneNbr);
          }else{
            if (selectedRow.lblApplntActionType === "D"){
              varApplntActionType = "D";
              appllntXrefID = selectedRow.lblApplntXrefId;
            }else{
              varApplntActionType = "C";
              appllntXrefID = selectedRow.lblApplntXrefId;
            }
          }
          
          ApplntPhoneupdate = {
            "lblApplntPhoneNbrType" : selectedRow.lblApplntPhoneNbrType,
            "lblApplntPhoneNbr" : normalizePhone(selectedRow.lblApplntPhoneNbr),  
            "lblApplntPhoneExtension" : selectedRow.lblApplntPhoneExtension,
            "lblApplntActionType" : varApplntActionType,
   	        "lblApplntXrefId" : selectedRow.lblApplntXrefId,
	        "lblApplntSmsInd" : varApplntSmsInd,
            "imgApplntSMSIcon" : {'isVisible' : true},
            "btnImgSMSToggleOn" :  {'isVisible' : phoneSMSOnVis},
            "btnImgSMSToggleOff" : {'isVisible' : phoneSMSOffVis},
            "lblSmsDescr" : selectedRow.lblSmsDescr,
            "flxSMSToggleCntnr" : {onClick: this.SMSPhoneNumber.bind(this, "index")},
            "lblApplntPrimInd" : selectedRow.lblApplntPrimInd,
            "imgBtnApplnt2ndryPhone" : selectedRow.imgBtnApplnt2ndryPhone,
            "btnImgPPhnToggleOn" : selectedRow.btnImgPPhnToggleOn,
            "btnImgPPhnToggleOff" : selectedRow.btnImgPPhnToggleOff,
            "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
            "lblPrimPhoneDescr" : "Primary Phone Number",
            "imgBtnApplntStatus" : selectedRow.imgBtnApplntStatus,
            "imgBtnApplntNewPhone" : selectedRow.imgBtnApplntNewPhone,
            "imgBtnApplntDeletedPhone" : selectedRow.imgBtnApplntDeletedPhone,
            "btnImgApplntDelete" : selectedRow.btnImgApplntDelete,
	        "btnImgApplntUndelete" : selectedRow.btnImgApplntUndelete,
            "flxImgApplntDelete" : {onClick: this.removePhoneNumber.bind(this, "index")}
          };
          
          this.view.sgmApplPhoneNmbrList.setDataAt(ApplntPhoneupdate, selectedId, 0);
          
          if (varApplntSmsInd === "P" || varApplntSmsInd === "Y"){
            var dataRows = [];
            var row = "";
            var lstSetPhoneDetails = this.view.sgmApplPhoneNmbrList.data;
           // alert(JSON.stringify(lstSetPhoneDetails));
            
            for(var p = 0; p < lstSetPhoneDetails.length; p++) {
              var phoneDetail = lstSetPhoneDetails[p];
              
              if ((phoneDetail.lblApplntXrefId === appllntXrefID && phoneDetail.lblApplntActionType !== "A") || 
              (phoneDetail.lblApplntActionType === "A" && appllntXrefID ===  normalizePhone(phoneDetail.lblApplntPhoneNbr)))
              {
              
                row = {
                  "lblApplntPhoneNbrType": phoneDetail.lblApplntPhoneNbrType,
           		  "lblApplntPhoneNbr": normalizePhone(phoneDetail.lblApplntPhoneNbr),
           	      "lblApplntPhoneExtension": phoneDetail.lblApplntPhoneExtension,
           		  "lblApplntActionType": phoneDetail.lblApplntActionType,
		   		  "lblApplntSmsInd"   : phoneDetail.lblApplntSmsInd,
                  "imgApplntSMSIcon" : {'isVisible' : true},
                  "btnImgSMSToggleOn"  : {"isVisible" :true},
                  "btnImgSMSToggleOff" : {"isVisible" :false},
                  "flexSmsCntnr"    : phoneDetail.flexSmsCntnr,
                  "lblSmsDescr"     : phoneDetail.lblSmsDescr,
                  "flxApplntSMSVis" : phoneDetail.flxApplntSMSVis,
                  "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
              	  "lblApplntPrimInd":phoneDetail.lblApplntPrimInd,
              	  "lblApplntXrefId": phoneDetail.lblApplntXrefId,
                  "imgBtnApplnt2ndryPhone": {"isVisible" :true},
                  "btnImgPPhnToggleOn"  :  phoneDetail.btnImgPPhnToggleOn,
                  "btnImgPPhnToggleOff" :  phoneDetail.btnImgPPhnToggleOff,
                  "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
                  "lblPrimPhoneDescr" : "Primary Phone Number",
                  "imgBtnApplntStatus":phoneDetail.imgBtnApplntStatus,
                  "imgBtnApplntNewPhone":phoneDetail.imgBtnApplntNewPhone,
                  "imgBtnApplntDeletedPhone":phoneDetail.imgBtnApplntDeletedPhone,
                  "btnImgApplntDelete": phoneDetail.btnImgApplntDelete,
	              "btnImgApplntUndelete": phoneDetail.btnImgApplntUndelete,
                  "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
                };
              }else{
         
                row = {
           		  "lblApplntPhoneNbrType": phoneDetail.lblApplntPhoneNbrType,
           		  "lblApplntPhoneNbr": normalizePhone(phoneDetail.lblApplntPhoneNbr),
           		  "lblApplntPhoneExtension": phoneDetail.lblApplntPhoneExtension,
           		  "lblApplntActionType": phoneDetail.lblApplntActionType,
		   		  "lblApplntSmsInd"   : "N",
                  "imgApplntSMSIcon" : {'isVisible' : true},
                  "btnImgSMSToggleOn"  : {"isVisible" :false},
                  "btnImgSMSToggleOff" : {'isVisible' : true},
                  "flexSmsCntnr"    : phoneDetail.flexSmsCntnr,
                  "lblSmsDescr"     : phoneDetail.lblSmsDescr,
                  "flxApplntSMSVis" : phoneDetail.flxApplntSMSVis,
                  "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
              	  "lblApplntPrimInd":phoneDetail.lblApplntPrimInd,
              	  "lblApplntXrefId": phoneDetail.lblApplntXrefId,
                  "imgBtnApplnt2ndryPhone": {"isVisible" :true},
                  "btnImgPPhnToggleOn"  :  phoneDetail.btnImgPPhnToggleOn,
                  "btnImgPPhnToggleOff" :  phoneDetail.btnImgPPhnToggleOff,
                  "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
                  "lblPrimPhoneDescr" : "Primary Phone Number",
                  "imgBtnApplntStatus":phoneDetail.imgBtnApplntStatus,
                  "imgBtnApplntNewPhone":phoneDetail.imgBtnApplntNewPhone,
                  "imgBtnApplntDeletedPhone":phoneDetail.imgBtnApplntDeletedPhone,
                  "btnImgApplntDelete": phoneDetail.btnImgApplntDelete,
	              "btnImgApplntUndelete": phoneDetail.btnImgApplntUndelete,
           		  "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
                };
              }
              dataRows.push(row);
                
              this.view.sgmApplPhoneNmbrList.setData(dataRows);
            }
          }
        }
      }
    },
          
    
    
    PrimaryPhoneNumber:function(scope, index)  {
      var errorFound = false;
      var selectedRow = this.view.sgmApplPhoneNmbrList.selectedRowItems[0];
      selectedId = this.view.sgmApplPhoneNmbrList.selectedRowIndex[1];
	  var appllntXrefID = selectedRow.lblApplntXrefId;
      vPrimPhonToolTip = "Primary Phone";
            
     if (selectedRow.lblApplntActionType === "A"){
        ApplntPhoneupdate = {
          "lblApplntPhoneNbrType":  selectedRow.lblApplntPhoneNbrType,
          "lblApplntPhoneNbr": normalizePhone(selectedRow.lblApplntPhoneNbr),
          "lblApplntPhoneExtension": selectedRow.lblApplntPhoneExtension,
          "lblApplntActionType": "A",
   	      "lblApplntXrefId": selectedRow.lblApplntXrefId,
	      "lblApplntSmsInd"   :selectedRow.lblApplntSmsInd,
          "imgApplntSMSIcon" : selectedRow.imgApplntSMSIcon,
          "btnImgSMSToggleOn"  : selectedRow.btnImgSMSToggleOn,
          "btnImgSMSToggleOff" : selectedRow.btnImgSMSToggleOff,
          "btnImgSMSLocked"   : selectedRow.btnImgSMSLocked,
          "flexSmsCntnr"    : selectedRow.flexSmsCntnr,
          "lblSmsDescr"     : selectedRow.lblSmsDescr,
          "flxApplntSMSVis" : selectedRow.flxApplntSMSVis,
          "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
          "lblApplntPrimInd":"Y",
          "imgBtnApplnt2ndryPhone": {"isVisible" :true},
		  "btnImgPPhnToggleOn"  :  {'isVisible' : true,'toolTip': vPrimPhonToolTip},
          "btnImgPPhnToggleOff" :  {'isVisible' : false},
          "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
          "lblPrimPhoneDescr" : "Primary Phone Number",
          "imgBtnApplntStatus":{"isVisible" :false},
          "imgBtnApplntNewPhone":{"isVisible" :true},
          "imgBtnApplntDeletedPhone":{"isVisible" :false},
          "btnImgApplntDelete": {"isVisible" :true},
	      "btnImgApplntUndelete": {"isVisible" :false},
          "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
        };
      }
      else {
        if (selectedRow.lblApplntActionType === "D"){
          alert('Phone numbers that are being deleted cannot be made a primary phone number.');
          errorFound = true;
      	}
        else{
          ApplntPhoneupdate = {
            "lblApplntPhoneNbrType":  selectedRow.lblApplntPhoneNbrType,
            "lblApplntPhoneNbr": normalizePhone(selectedRow.lblApplntPhoneNbr),
            "lblApplntPhoneExtension": selectedRow.lblApplntPhoneExtension,
            "lblApplntActionType": "C",
   	        "lblApplntXrefId" : selectedRow.lblApplntXrefId,
	        "lblApplntSmsInd"   : selectedRow.lblApplntSmsInd,
            "imgApplntSMSIcon" : selectedRow.imgApplntSMSIcon,
            "btnImgSMSToggleOn"  : selectedRow.btnImgSMSToggleOn,
            "btnImgSMSToggleOff" : selectedRow.btnImgSMSToggleOff,
            "btnImgSMSLocked"   : selectedRow.btnImgSMSLocked,
            "flexSmsCntnr"    : selectedRow.flexSmsCntnr,
            "lblSmsDescr"     : selectedRow.lblSmsDescr,
            "flxApplntSMSVis" : selectedRow.flxApplntSMSVis,
            "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
            "lblApplntPrimInd":"Y",
            "imgBtnApplnt2ndryPhone": {"isVisible" :true},
            "btnImgPPhnToggleOn"  :  {'isVisible' : true,'toolTip': vPrimPhonToolTip},
            "btnImgPPhnToggleOff" :  {'isVisible' : false},
            "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
            "lblPrimPhoneDescr" : "Primary Phone Number",
            "imgBtnApplntStatus":{"isVisible" :false},
            "imgBtnApplntNewPhone":{"isVisible" :false},
            "imgBtnApplntDeletedPhone":{"isVisible" :false},
            "btnImgApplntDelete": {"isVisible" :true},
	        "btnImgApplntUndelete": {"isVisible" :false},
            "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
          };  
        }
      }
      
      this.view.sgmApplPhoneNmbrList.setDataAt(ApplntPhoneupdate, selectedId, 0);
      
      
      if (errorFound === false) {
        var dataRows = [];
        var row = "";
        var lstPhoneDetails = this.view.sgmApplPhoneNmbrList.data;
        //alert(JSON.stringify(lstPhoneDetails));
      
        for(var p = 0; p < lstPhoneDetails.length; p++) {
          var phoneDetail = lstPhoneDetails[p];
          //alert(JSON.stringify(phoneDetail));
          if (phoneDetail.lblApplntXrefId === appllntXrefID){
            row = {
           		"lblApplntPhoneNbrType": phoneDetail.lblApplntPhoneNbrType,
           		"lblApplntPhoneNbr": normalizePhone(phoneDetail.lblApplntPhoneNbr),
           		"lblApplntPhoneExtension": phoneDetail.lblApplntPhoneExtension,
           		"lblApplntActionType": phoneDetail.lblApplntActionType,
		   		"lblApplntSmsInd"   : phoneDetail.lblApplntSmsInd,
                "imgApplntSMSIcon" : {'isVisible' : true},
                "btnImgSMSToggleOn"  : phoneDetail.btnImgSMSToggleOn,
                "btnImgSMSToggleOff" : phoneDetail.btnImgSMSToggleOff,
                "btnImgSMSLocked"   : phoneDetail.btnImgSMSLocked,
                "flexSmsCntnr"    : phoneDetail.flexSmsCntnr,
                "lblSmsDescr"     : phoneDetail.lblSmsDescr,
                "flxApplntSMSVis" : phoneDetail.flxApplntSMSVis,
                "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
              	"lblApplntPrimInd":phoneDetail.lblApplntPrimInd,
              	"lblApplntXrefId": phoneDetail.lblApplntXrefId,
                "imgBtnApplnt2ndryPhone": {"isVisible" :true},
                "btnImgPPhnToggleOn"  :  {'isVisible' : true,'toolTip': vPrimPhonToolTip},
                "btnImgPPhnToggleOff" :  {'isVisible' : false},
                "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
                "lblPrimPhoneDescr" : "Primary Phone Number",
                "imgBtnApplntStatus":phoneDetail.imgBtnApplntStatus,
                "imgBtnApplntNewPhone":phoneDetail.imgBtnApplntNewPhone,
                "imgBtnApplntDeletedPhone":phoneDetail.imgBtnApplntDeletedPhone,
                "btnImgApplntDelete": phoneDetail.btnImgApplntDelete,
	            "btnImgApplntUndelete": phoneDetail.btnImgApplntUndelete,
                "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
            };
          }
          else{
            row = {
           		"lblApplntPhoneNbrType": phoneDetail.lblApplntPhoneNbrType,
           		"lblApplntPhoneNbr": normalizePhone(phoneDetail.lblApplntPhoneNbr),
           		"lblApplntPhoneExtension": phoneDetail.lblApplntPhoneExtension,
           		"lblApplntActionType": phoneDetail.lblApplntActionType,
		   		"lblApplntSmsInd"   : phoneDetail.lblApplntSmsInd,
                "imgApplntSMSIcon" : {'isVisible' : true},
                "btnImgSMSToggleOn"  : phoneDetail.btnImgSMSToggleOn,
                "btnImgSMSToggleOff" : phoneDetail.btnImgSMSToggleOff,
                "btnImgSMSLocked"   : phoneDetail.btnImgSMSLocked,
                "flexSmsCntnr"    : phoneDetail.flexSmsCntnr,
                "lblSmsDescr"     : phoneDetail.lblSmsDescr,
                "flxApplntSMSVis" : phoneDetail.flxApplntSMSVis,
                "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
              	"lblApplntPrimInd":"N",
              	"lblApplntXrefId": phoneDetail.lblApplntXrefId,
                "imgBtnApplnt2ndryPhone": {"isVisible" :true},
                "btnImgPPhnToggleOn"  :  {'isVisible' : false,'toolTip': vPrimPhonToolTip},
                "btnImgPPhnToggleOff" :  {'isVisible' : true},
                "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
                "lblPrimPhoneDescr" : "Primary Phone Number",
                "imgBtnApplntStatus":phoneDetail.imgBtnApplntStatus,
                "imgBtnApplntNewPhone":phoneDetail.imgBtnApplntNewPhone,
                "imgBtnApplntDeletedPhone":phoneDetail.imgBtnApplntDeletedPhone,
                "btnImgApplntDelete": phoneDetail.btnImgApplntDelete,
	            "btnImgApplntUndelete": phoneDetail.btnImgApplntUndelete,
           		"flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
         	};
          }
          dataRows.push(row);
        }
        this.view.sgmApplPhoneNmbrList.setData(dataRows);
      }
      else{
        errorFound = false;
      }
      this.view.forceLayout();
    },

    removePhoneNumber:function(scope, index) {
      var errorFound = false;
      var lstPhoneDetails = this.view.sgmApplPhoneNmbrList.data;
      var selectedRow = this.view.sgmApplPhoneNmbrList.selectedRowItems[0];
      selectedId = this.view.sgmApplPhoneNmbrList.selectedRowIndex[1];
      var varApplntPrimInd;
      var varBtnApplntPrimPhone;
      var varBtnApplnt2ndryPhone;
      //alert(JSON.stringify(selectedRow));
      
      ApplntPhoneupdate = {
        "lblApplntPhoneNbrType":  selectedRow.lblApplntPhoneNbrType,
        "lblApplntPhoneNbr": normalizePhone(selectedRow.lblApplntPhoneNbr),
        "lblApplntPhoneExtension": selectedRow.lblApplntPhoneExtension,
        "lblApplntActionType": "D",
   	    "lblApplntXrefId": selectedRow.lblApplntXrefId,
	    "lblApplntSmsInd":selectedRow.lblApplntSmsInd,
        "imgApplntSMSIcon" : selectedRow.imgApplntSMSIcon,
        "btnImgSMSToggleOn"  : selectedRow.btnImgSMSToggleOn,
        "btnImgSMSToggleOff" : selectedRow.btnImgSMSToggleOff,
        "btnImgSMSLocked"   : selectedRow.btnImgSMSLocked,
        "flexSmsCntnr"    : selectedRow.flexSmsCntnr,
        "lblSmsDescr"     : selectedRow.lblSmsDescr,
        "flxApplntSMSVis" : selectedRow.flxApplntSMSVis,
        "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
        "lblApplntPrimInd":"N",
        "imgBtnApplnt2ndryPhone": {"isVisible" :true},
        "btnImgPPhnToggleOn"  :  {'isVisible' : false,'toolTip': vPrimPhonToolTip},
        "btnImgPPhnToggleOff" :  {'isVisible' : true},
        "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
        "lblPrimPhoneDescr" : "Primary Phone Number",
        "imgBtnApplntStatus":{"isVisible" :false},
        "imgBtnApplntNewPhone":{"isVisible" :false},
        "imgBtnApplntDeletedPhone":{"isVisible" :true},
        "btnImgApplntDelete": {"isVisible" :false},
	    "btnImgApplntUndelete": {"isVisible" :true},
        "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
      };
      
      // how many phone numbers are deleted
      var DelCount = 0;
      for(var pd = 0; pd < lstPhoneDetails.length; pd++) {
         var phoneDetailCount = lstPhoneDetails[pd];
         if (phoneDetailCount.lblApplntActionType === "D"){
            DelCount++;
         }
      }
      
      if (selectedRow.lblApplntPrimInd === "N") {
        if (selectedRow.lblApplntActionType === "A"){
          this.view.sgmApplPhoneNmbrList.removeAt(selectedId, 0);
        }
        else {
          if (selectedRow.lblApplntActionType === "D"){
            ApplntPhoneupdate ={
              "lblApplntPhoneNbrType":  selectedRow.lblApplntPhoneNbrType,
              "lblApplntPhoneNbr": normalizePhone(selectedRow.lblApplntPhoneNbr),
              "lblApplntPhoneExtension": selectedRow.lblApplntPhoneExtension,
              "lblApplntActionType": "",
              "lblApplntXrefId": selectedRow.lblApplntXrefId,
	    	  "lblApplntSmsInd":selectedRow.lblApplntSmsInd,
              "imgApplntSMSIcon" : selectedRow.imgApplntSMSIcon,
              "btnImgSMSToggleOn"  : selectedRow.btnImgSMSToggleOn,
              "btnImgSMSToggleOff" : selectedRow.btnImgSMSToggleOff,
              "btnImgSMSLocked"   : selectedRow.btnImgSMSLocked,
              "flexSmsCntnr"    : selectedRow.flexSmsCntnr,
              "lblSmsDescr"     : selectedRow.lblSmsDescr,
              "flxApplntSMSVis" : selectedRow.flxApplntSMSVis,
              "flxSMSToggleCntnr" :{onClick: this.SMSPhoneNumber.bind(this, "index")},
              "lblApplntPrimInd":selectedRow.lblApplntPrimInd,
              "imgBtnApplnt2ndryPhone": selectedRow.imgBtnApplnt2ndryPhone,
              "btnImgPPhnToggleOff"  :  selectedRow.btnImgPPhnToggleOff,
              "imgPPhnToggleOff" :  selectedRow.imgPPhnToggleOff,
              "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
              "lblPrimPhoneDescr" : "Primary Phone Number",
              "imgBtnApplntStatus" :  {"isVisible" :false},
              "imgBtnApplntNewPhone" :  selectedRow.imgBtnApplntNewPhone,
              "imgBtnApplntDeletedPhone" : {"isVisible" :false},
              "btnImgApplntDelete": {"isVisible" :true},
	          "btnImgApplntUndelete": {"isVisible" :false},
              "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
            };
            this.view.sgmApplPhoneNmbrList.setDataAt(ApplntPhoneupdate, selectedId, 0);
          }
          else{
            this.view.sgmApplPhoneNmbrList.setDataAt(ApplntPhoneupdate, selectedId, 0);
          }
        }
       
      }
      else{
        if ((lstPhoneDetails.length - DelCount) === 2) {
          if (selectedRow.lblApplntActionType === "A"){
             this.view.sgmApplPhoneNmbrList.removeAt(selectedId, 0);
          }
          else{
            this.view.sgmApplPhoneNmbrList.setDataAt(ApplntPhoneupdate, selectedId, 0);
          }
        
          // there are only two phones switch the primary phone
          vPrimPhonToolTip = "Primary Phone";
          var dataRows = [];
          var row = "";
          lstPhoneDetails = this.view.sgmApplPhoneNmbrList.data;
        
          for(var p = 0; p < lstPhoneDetails.length; p++) {
            var phoneDetail = lstPhoneDetails[p];
           // alert(JSON.stringify(phoneDetail));
            
            if (phoneDetail.lblApplntActionType === "D"){
              varApplntPrimInd = "N";
              varBtnApplntPrimPhone = false;
              varBtnApplnt2ndryPhone = true;
            }
            else{
              varApplntPrimInd = "Y";
              varBtnApplntPrimPhone = true;
              varBtnApplnt2ndryPhone = false;
            }
            
            row = {
           		"lblApplntPhoneNbrType": phoneDetail.lblApplntPhoneNbrType,
           		"lblApplntPhoneNbr": normalizePhone(phoneDetail.lblApplntPhoneNbr),
           		"lblApplntPhoneExtension": phoneDetail.lblApplntPhoneExtension,
           		"lblApplntActionType": phoneDetail.lblApplntActionType,
		   		"lblApplntSmsInd":phoneDetail.lblApplntSmsInd,
                "imgApplntSMSIcon" : phoneDetail.imgApplntSMSIcon,
                "flexSmsCntnr"     : phoneDetail.flexSmsCntnr,
                "lblSmsDescr"      : phoneDetail.lblSmsDescr,
                "btnImgSMSToggleOn"   : phoneDetail.btnImgSMSToggleOn,
                "btnImgSMSToggleOff"  : phoneDetail.btnImgSMSToggleOff,
              	"btnImgSMSLocked"     : phoneDetail.btnImgSMSLocked,
                "flxApplntSMSVis"  : phoneDetail.flxApplntSMSVis,
              	"flxSMSToggleCntnr":{onClick: this.SMSPhoneNumber.bind(this, "index")},
                "lblApplntXrefId"  : phoneDetail.lblApplntXrefId,
              	"lblApplntPrimInd" :varApplntPrimInd,
                "imgBtnApplnt2ndryPhone": {"isVisible" :varBtnApplnt2ndryPhone},
                "btnImgPPhnToggleOn"  :  {'isVisible' : varBtnApplntPrimPhone,'toolTip': vPrimPhonToolTip},
                "btnImgPPhnToggleOff" :  {'isVisible' : varBtnApplnt2ndryPhone},
                "flxPrimPhoneToggleCntnr" : {onClick: this.PrimaryPhoneNumber.bind(this, "index")},
                "lblPrimPhoneDescr" : "Primary Phone Number",
                "imgBtnApplntStatus":phoneDetail.imgBtnApplntStatus,
                "imgBtnApplntNewPhone":phoneDetail.imgBtnApplntNewPhone,
                "imgBtnApplntDeletedPhone":phoneDetail.imgBtnApplntDeletedPhone,
                "btnImgApplntDelete": phoneDetail.btnImgApplntDelete,
	            "btnImgApplntUndelete": phoneDetail.btnImgApplntUndelete,
                "flxImgApplntDelete": {onClick: this.removePhoneNumber.bind(this, "index")}
              };
            
            dataRows.push(row);
          }
          this.view.sgmApplPhoneNmbrList.setData(dataRows);
        }
        else{
          if ((lstPhoneDetails.length - DelCount) === 1)
          {
            alert('Please contact BSH@jfs.ohio.gov for assistance with the deletion of your last phone number.');
          }
          else
          {
            alert('Primary Phone numbers may not be deleted. Please change the primary phone before deleting.');
          }
            
            errorFound = true;
        }
      }
      this.view.forceLayout();
    }, 
    
    
    cancelInfo: function () {
      // add functionality to remove and rebuild phone segments
      
      let self = this; 
      var basicConf = {
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        alertTitle: "Confirm",
        message: "Changes will be lost if you don’t save your changes",
        alertHandler: function (label) {
          if (label) {
            self.resetMainForm();
           self.view.setVisibility(false);
          }
        }
      };
      var pspConfig = {
        "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
      };

      kony.ui.Alert(basicConf, pspConfig);
      

    },

    
    saveInfo:function() {
      showLoadingIndicator();
      var phonesDataRows = [];
      var dataRowPhone = { 
        "phoneTypCD": "",
        "phoneNumber": "",
        "ext": "",
		"phoneXrefId": "",
	    "primaryInd":"",
        "smsInd": "", 
        "actionType": ""
      };
      vSmsIndPrev ="";
      var lstPhoneDetails = this.view.sgmApplPhoneNmbrList.data;
      
      for(var p = 0; p < lstPhoneDetails.length; p++) {
        var phoneDetail = lstPhoneDetails[p];
 
        if (phoneDetail.lblApplntActionType === "A"){
          dataRowPhone = {
            "phoneTypCD" :  phoneDetail.lblApplntPhoneNbrType,
            "phoneNumber" : removeNonNumerics(phoneDetail.lblApplntPhoneNbr),
            "ext" : phoneDetail.lblApplntPhoneExtension,
		    "phoneXrefId" : "",
	        "primaryInd" : phoneDetail.lblApplntPrimInd,
            "smsInd": phoneDetail.lblApplntSmsInd,
            "actionType": "A"
          };
        }else{ 
           if (phoneDetail.lblApplntActionType === "D"){
          	 dataRowPhone = {
            	"phoneTypCD" :  phoneDetail.lblApplntPhoneNbrType,
            	"phoneNumber" : removeNonNumerics(phoneDetail.lblApplntPhoneNbr),
            	"ext" : phoneDetail.lblApplntPhoneExtension,
		    	"phoneXrefId" : phoneDetail.lblApplntXrefId,
	        	"primaryInd" : phoneDetail.lblApplntPrimInd,
            	"smsInd": phoneDetail.lblApplntSmsInd,
            	"actionType": "D"
          		};
           }else{
           	 dataRowPhone = {
               "phoneTypCD" :  phoneDetail.lblApplntPhoneNbrType,
               "phoneNumber" : removeNonNumerics(phoneDetail.lblApplntPhoneNbr),
               "ext" : phoneDetail.lblApplntPhoneExtension,
		       "phoneXrefId" : phoneDetail.lblApplntXrefId,
	           "primaryInd" : phoneDetail.lblApplntPrimInd,
               "smsInd": phoneDetail.lblApplntSmsInd,
               "actionType": "C"
             };
          }
        }
        phonesDataRows.push(dataRowPhone);   
      }
      
      var address = "";
      var addressDetails = [];

      var mailAddress1 = "";
      var mailAddress2 = "";
      var mailCity = "";
      var mailCounty = "";
      var mailState = "";
      var mailZipCode = "";
      var mailAddressId = 0;      

      if(mailingAddressId !== null) {  //modify or remove the mailing address
        mailAddress1 = this.view.txtBoxEnterAddressMail.text;
        mailAddress2 = this.view.txtBoxEnterAddress2Mail.text; 
        mailCity = this.view.txtBoxEnterCityMail.text;
        mailCounty = this.view.lstBoxCountyMail.selectedKeyValue[1] === "Select County" ? "" : this.view.lstBoxCountyMail.selectedKeyValue[1];
        mailState = this.view.lstBoxStateMail.selectedKeyValue[1] === "Select State" ? "" : this.view.lstBoxStateMail.selectedKeyValue[1];
        mailZipCode = this.view.txtBoxEnterZipCodeMail.text !== null ? this.view.txtBoxEnterZipCodeMail.text.replace(/\D/g,'') : ""; 
        mailAddressId = mailingAddressId;

        address = {
          "addrTypCd": "Mailing",
          "addrLine1": mailAddress1,
          "addrLine2": mailAddress2,
          "city": mailCity,
          "county": mailCounty,
          "state": mailState,
          "zipCd": mailZipCode,
          "addressId": mailAddressId
        };
        
        //if the address is empty then we do not include it so it will be removed from the appellant record
        if(mailAddress1 !== "" || mailCity !== "" || mailState !== "" || mailZipCode !== "") {
          addressDetails.push(address);  
        }
      }
      else { //add the mailing address
        mailAddress1 = this.view.txtBoxEnterAddressMail.text;
        mailAddress2 = this.view.txtBoxEnterAddress2Mail.text; 
        mailCity = this.view.txtBoxEnterCityMail.text;
        mailCounty = this.view.lstBoxCountyMail.selectedKeyValue[1] === "Select County" ? "" : this.view.lstBoxCountyMail.selectedKeyValue[1];
        mailState = this.view.lstBoxStateMail.selectedKeyValue[1] === "Select State" ? "" : this.view.lstBoxStateMail.selectedKeyValue[1];
        mailZipCode = this.view.txtBoxEnterZipCodeMail.text !== null ? this.view.txtBoxEnterZipCodeMail.text.replace(/\D/g,'') : ""; 
        mailAddressId = mailingAddressId; 

        address = {
          "addrTypCd": "Mailing",
          "addrLine1": mailAddress1,
          "addrLine2": mailAddress2,
          "city": mailCity,
          "county": mailCounty,
          "state": mailState,
          "zipCd": mailZipCode,
          "addressId": null
        };
        
        //if the address is empty and does not exist we do not add it
        if(mailAddress1 !== "" || mailCity !== "" || mailState !== "" || mailZipCode !== "") {
          addressDetails.push(address);  
        }        
      }

      var resAddress1 = "";
      var resAddress2 = "";
      var resCity = "";
      var resCounty = "";
      var resState = "";
      var resZipCode = "";
      var resAddressId = 0;

      if(residenceAddressId !== null) {
        resAddress1 = this.view.txtBoxEnterAddress1.text; 
        resAddress2 = this.view.txtBoxEnterAddress2.text;
        resCity = this.view.txtBoxEnterCity.text;
        resCounty = this.view.lstBoxCounty.selectedKeyValue[1] === "Select County" ? "" : this.view.lstBoxCounty.selectedKeyValue[1];
        resState = this.view.lstBoxState.selectedKeyValue[1] === "Select State" ? "" : this.view.lstBoxState.selectedKeyValue[1];
        resZipCode = this.view.txtBoxEnterZipCode.text !== null ? this.view.txtBoxEnterZipCode.text.replace(/\D/g,'') : "";
        resAddressId = residenceAddressId;

        address = {
          "addrTypCd": "Residence",
          "addrLine1": resAddress1,
          "addrLine2": resAddress2,
          "city": resCity,
          "county": resCounty,
          "state": resState,
          "zipCd": resZipCode,
          "addressId": resAddressId
        };
        addressDetails.push(address);
      }
      else {
        resAddress1 = this.view.txtBoxEnterAddress1.text; 
        resAddress2 = this.view.txtBoxEnterAddress2.text;
        resCity = this.view.txtBoxEnterCity.text;
        resCounty = this.view.lstBoxCounty.selectedKeyValue[1] === "Select County" ? "" : this.view.lstBoxCounty.selectedKeyValue[1];
        resState = this.view.lstBoxState.selectedKeyValue[1] === "Select State" ? "" : this.view.lstBoxState.selectedKeyValue[1];
        resZipCode = this.view.txtBoxEnterZipCode.text !== null ? this.view.txtBoxEnterZipCode.text.replace(/\D/g,'') : "";
        resAddressId = residenceAddressId;

        address = {
          "addrTypCd": "Residence",
          "addrLine1": resAddress1,
          "addrLine2": resAddress2,
          "city": resCity,
          "county": resCounty,
          "state": resState,
          "zipCd": resZipCode,
          "addressId": null
        };
        addressDetails.push(address);          
      }

      var appealTypeCode = gblDemographicInfo.AppealTypeCode !== "null" ? gblDemographicInfo.AppealTypeCode : "";

      var homeless = this.view.checkHomeless.selectedKeys;
      var homelessIndicator = "N";
      if(homeless !== null && homeless !== undefined) {
        if(homeless[0] === "cbg1") {
          homelessIndicator = "Y";
        }
      }
      var hatsUserId = parseInt(testHatsUserId, 10);
      var appellantId = parseInt(gblAppellantId, 10);
      var email = this.view.txtBoxEnterEmail.text;

      var interperterIndicator = hearingRequest.interptrReqInd === "" ? gblDemographicInfo.InterpreterRequiredIndicator : hearingRequest.interptrReqInd;
      var languageId = hearingRequest.intprLangId === 0 ? gblDemographicInfo.languageId : hearingRequest.intprLangId; 
      var inCareOf = hearingRequest.inCareOf === "" ? gblDemographicInfo.inCareOf : hearingRequest.inCareOf;   
      var appeallantHomelessIndMsgTxt = hearingRequest.appeallantHomelessIndMsgTxt === "" ? gblDemographicInfo.AppellantHomelessIndMessageText : hearingRequest.appeallantHomelessIndMsgTxt;   
      operationName =  "updateAppellantDemographicsByAppellantIdAndHatsUserId";

      var data = {
        "hatsUserId": hatsUserId,
        "appellantId": appellantId,
        "appealId": null,
        "appealTypeCd": null,
        "appealNumber": null,
        "appellantFirstName": this.view.txtBoxEnterFirstName.text.trim(),
        "appellantMiddleName": gblDemographicInfo.AppellantMiddleName,
        "appellantLastName": this.view.txtBoxEnterLastName.text.trim(),
        "inCareOf": inCareOf,
        "interptrReqInd": interperterIndicator,
        "languageId": languageId,
        "appellantHomelessIndMessageText": appeallantHomelessIndMsgTxt,
        "homelessInd": homelessIndicator,
        "email": email,
        "addressDetails": addressDetails,
        "phoneDetails": phonesDataRows
      };

     // this.addPhonesToData(data);

      //verified on 12/13/2018
      //alert(JSON.stringify(data));

      var headers= {"Content-Type": "application/json"};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);      
      integrationObj.invokeOperation(operationName, headers, data, this.saveInfoSuccess, this.saveInfoFailure);        



    },

    saveInfoSuccess:function(response) {
      dismissLoadingIndicator();
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.err;
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
          if(response.errorStatus !== null && response.errorStatus !== undefined && response.errorStatus[0].errorCode !== "UNEXPECTED_ERROR") {
            this.displayErrorMessages(response.errorStatus);       
          }
          else {
            if(screen.width <= gblBreakPoint) {
              displayHamburgerScreen();
            }
            this.view.setVisibility(false);
            this.getAppellantDemographicInfo();    
          }
        }
      }
    },

    saveInfoFailure:function(error) {
      dismissLoadingIndicator();
      alert('save info Fail');
      if(error.errorStatus !== null && error.errorStatus !== undefined && error.errorStatus.length > 0) {
      	this.displayErrorMessages(error.errorStatus);  
      }
	  else {
        var callSpecificMsg = "Unable to Update Personal Information.";
        currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
        currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
        currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
        currentFrm.view.puInformationDialog.isVisible = true; 
        currentFrm.view.forceLayout(); 
      }
    }, 
    
    displayErrorMessages:function(errorStatus) {
      var alertMessage = "";
      for(var i = 0; i < errorStatus.length; i++) {
        alertMessage = alertMessage += errorStatus[i].errorMessage;
        if(i !== errorStatus.length) {
          alertMessage += "\n";
        }
      }
      
      //alert(alertMessage);
      var alertBasic = {alertTitle:"Input Error", message:alertMessage,alertType:constants.ALERT_TYPE_ERROR};
	  var alertPSP = {};
      var alert = kony.ui.Alert(alertBasic, alertPSP);            
    },

    addPhonesToData:function(data) {
      var i = 0;
      var phoneNumber = "";
      if (this.view.txtBoxEnterPhoneNumber.text !== null &&
          this.view.txtBoxEnterPhoneNumber.text !== undefined &&
          this.view.txtBoxEnterPhoneNumber.text.length > 0) {
        phoneNumber = this.checkPhoneNumber(this.view.txtBoxEnterPhoneNumber.text);//.replace(/\D/g,'');
        data.phoneDetails.push({
          "phoneTypCD": "Home",
          "phoneNumber": phoneNumber,
          "ext": homePhoneExt,
          "phoneXrefId": homePhoneId,
          "primaryInd": (this.view.btnMakePrimaryHomeP.text === "Primary") ? "Y" : "N"
        });
      }
      if (this.view.txtBoxEnterCellNumber.text !== null &&
          this.view.txtBoxEnterCellNumber.text !== undefined &&
          this.view.txtBoxEnterCellNumber.text.length > 0) {
        phoneNumber = this.checkPhoneNumber(this.view.txtBoxEnterCellNumber.text);//.replace(/\D/g,'');
        data.phoneDetails.push({
          "phoneTypCD": "Cell",
          "phoneNumber": phoneNumber,
          "ext": cellPhoneExt,
          "phoneXrefId": cellPhoneId,
          "primaryInd": (this.view.btnMakePrimaryCellP.text === "Primary") ? "Y" : "N"
        });
      }
      if (this.view.txtBoxEnterWorkNumber.text !== null &&
          this.view.txtBoxEnterWorkNumber.text !== undefined &&
          this.view.txtBoxEnterWorkNumber.text.length > 0) {
        phoneNumber = this.checkPhoneNumber(this.view.txtBoxEnterWorkNumber.text);//.replace(/\D/g,'');
        data.phoneDetails.push({
          "phoneTypCD": "Work",
          "phoneNumber": phoneNumber,
          "ext": workPhoneExt,
          "phoneXrefId": workPhoneId,
          "primaryInd": (this.view.btnMakePrimaryWorkP.text === "Primary") ? "Y" : "N"
        });
      }
      if (this.view.txtBoxEnterBusNumber.text !== null &&
          this.view.txtBoxEnterBusNumber.text !== undefined &&
          this.view.txtBoxEnterBusNumber.text.length > 0) {
        phoneNumber = this.checkPhoneNumber(this.view.txtBoxEnterBusNumber.text);//.replace(/\D/g,'');
        data.phoneDetails.push({
          "phoneTypCD": "Business",
          "phoneNumber": phoneNumber,
          "ext": busPhoneExt,
          "phoneXrefId": busPhoneId,
          "primaryInd": (this.view.btnMakePrimaryBusP.text === "Primary") ? "Y" : "N"
        });
      }
    },
    checkPhoneNumber:function(phoneNumber)
    { 
      var regEx = "^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$";
      
      var phoneno = phoneNumber;
      phoneno = phoneno.split(' ').join('');
      if (phoneno.substr(3,1) == "-" || phoneno.substr(3,1) == ".")
      {
        phoneno = phoneno.slice(0, 3) + phoneno.slice(4);
      }
      if (phoneno.substr(0,1) == "(")
      {
        phoneno = phoneno.slice(1);
      }
      if (phoneno.substr(3,1) == ")")
      {
        phoneno = phoneno.slice(0, 3) + phoneno.slice(4);
      }
      
      if (phoneno.substr(6,1) == "-" || phoneno.substr(6,1) == ".")
      {
        phoneno = phoneno.slice(0, 6) + phoneno.slice(7);
      }
      
      return phoneno;
    },    

    getAppellantDemographicInfo:function () { 
      operationName =  "getAppellantDemographicsByAppellantId";
      var data= {"appellantId": gblAppellantId};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, 
                                     this.getAppellantDemographicInfoSuccess, 
                                     this.getAppellantDemographicInfoFailure);
    },

    getAppellantDemographicInfoSuccess:function(response) { //alert('get Appellant success');
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
          if(response !== null && response !== undefined) {

            if(response.AppellantDemographicDetails !== null && response.AppellantDemographicDetails !== undefined) {
              var details = response.AppellantDemographicDetails[0]; 
              var firstName = details.AppellantFirstName; 
              gblDemographicInfo = details;
            }
          }
          var ntf = new kony.mvc.Navigation(this.returnPage);
          ntf.navigate();
        }
      }
    }
  };
});