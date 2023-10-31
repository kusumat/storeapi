define(function() {
  var selectedId;
  var selectedItem;
  var returnPage = "";
  
  var vSmsActiveInd;
  var vSmsIndPrev;
  
  var ARPhoneupdate = { 
    "lblARPhoneNbrType":"",
    "lblARPhoneNbr": "",
    "lblARPhoneExtension": "",
    "lblARActionType": "",
    "lblARXrefId": "",
	"lblARSmsInd":"",
    "lblARPBPInd":""
  };
  
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnSaveInfo.onClick = this.saveInfo;
      this.initializeDropdowns();
      this.view.btnCancel.onClick = this.cancelInfo;

      this.view.btnAddARPhone.onClick = this.addPhoneNumber;
      this.view.txtBoxEnterFirstName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };      
     
      amplify.subscribe("secondaryBreakpointTrigger", this, this.onBreakpointChange, 1);

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() { },
    
    onBreakpointChange: function(form, width) {
      try{
      if (width <= gblBreakPoint) {
        this.view.flxContainerInoutRow1.parent.width = '95%';
        this.view.lblTitle1.skin = 'sknLblBlackBold115Mobile';
        this.view.lblTitle2.skin = 'sknLblBlackBold115Mobile';
        this.view.lblEmailTitle.skin = 'sknLblBlackBold115Mobile';
        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterMiddleName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.lblBoxAREmail.skin = 'sknLblBlackModerate100Mobile';
        this.view.lblBoxARCompanyName.skin = 'sknLblBlackModerate100Mobile';
        this.view.lblBoxARAddress1.skin = 'sknLblBlackModerate100Mobile';
        this.view.lblBoxARAddress2.skin = 'sknLblBlackModerate100Mobile';
        this.view.lblBoxARCity.skin = 'sknLblBlackModerate100Mobile';
        this.view.lblComma.skin = 'sknLblBlackModerate100Mobile';
        this.view.lblBoxARState.skin = 'sknLblBlackModerate100Mobile';
        this.view.lblBoxARZipCode.skin = 'sknLblBlackModerate100Mobile';
        this.view.lstBoxPhoneType.skin = 'sknLstBoxNOrmalMobile';
        this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterExtension.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';

        this.view.sgmPhoneNumberList.rowTemplate = 'flxtmpSgmPhoneItemsMobile';
        this.view.btnAddARPhone.skin = 'sknBtnBlueshedRegNormal80';
      } 
      else 
      {
        this.view.flxContainerInoutRow1.parent.width = '50%';

          this.view.lblTitle1.skin = 'sknLblBlackBold115';
        this.view.lblTitle2.skin = 'sknLblBlackBold115';
        this.view.lblEmailTitle.skin = 'sknLblBlackBold115';
        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterMiddleName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.lblBoxAREmail.skin = 'sknLblBlackModerate100';
        this.view.lblBoxARAddress1.skin = 'sknLblBlackModerate100';
        this.view.lblBoxARAddress2.skin = 'sknLblBlackModerate100';
        this.view.lblBoxARCity.skin = 'sknLblBlackModerate100';
        this.view.lblComma.skin = 'sknLblBlackModerate100';
        this.view.lblBoxARState.skin = 'sknLblBlackModerate100';
        this.view.lblBoxARZipCode.skin = 'sknLblBlackModerate100';
        this.view.lstBoxPhoneType.skin = 'sknLstBoxNOrmal';
        this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterExtension.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        
        this.view.sgmPhoneNumberList.rowTemplate = 'flxtmpSgmPhoneItems';
        this.view.btnAddARPhone.skin = 'sknBtnBlueBgWhiteFontRegNormal95';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },
    
    setReturnPage: function(returnPage) {
      this.returnPage = returnPage;
    },
   

    
    addPhoneNumber() {
      var errorFound = false;
      var alertMessage = " ";
      
      var vArDeleteContainer;
      var vImgPBPAR;
      var vImgBtnArStatus;
        
      var vArPhoneSMSOn;
      var vArPhoneSMSOff;
      var vArPhoneSMSOnVis;
      
      if (vSmsActiveInd === "Y"){
        if (this.view.lstBoxPhoneType.selectedKeyValue[1] === "Cell"){
          vArPhoneSMSOnVis = true;
        }else{
          vArPhoneSMSOnVis = false;
        }
      }else{
        vArPhoneSMSOnVis = false;
      }
      
      ARPhoneupdate = {
        "lblARPhoneNbrType": this.view.lstBoxPhoneType.selectedKeyValue[1],
        "lblARPhoneNbr": normalizePhone(this.view.txtBoxEnterPhoneNumber.text),
        "lblARPhoneExtension": this.view.txtBoxEnterExtension.text,
        "lblARActionType": "A",
   	    "lblARXrefId": "",
        
        "flexArSmsCntnr" : {'isVisible' : vArPhoneSMSOnVis},
        "imgArSMSIcon"   : {'isVisible' : vArPhoneSMSOnVis},
	    "lblARSmsInd":"N",
        "lblArSmsDescr" : "OPT-IN Text Message Notification",
        "imgArSMSToggleOn" :  {'isVisible' : false},
        "imgArSMSToggleOff" : {'isVisible' : true},
 		"flxArSMSToggleCntnr" :{onClick: this.SMSPhoneNumberAR.bind(this, "index")},
        "imgBtnArStatus":{"isVisible" :false},
        "imgBtnArNewPhone":{"isVisible" :true},
        "imgBtnArDeletedPhone":{"isVisible" :false},
		"imgPBPAR": {"isVisible" :false},
        "flxImgDelete": {onClick: this.removePhoneNumber.bind(this, "index")},
        "flxArDeleteContainer":{"isVisible" :true},
        "imgBtnArDelete": {"isVisible" :true},
		"imgBtnArUndelete": {"isVisible" :false},
      };
    
      if (ARPhoneupdate.lblARPhoneNbrType === "Phone Type") {
        errorFound = true;
        alertMessage = alertMessage += "The type of phone number is required. \n" ;
      }
      
      var testPhone = removeNonNumerics(ARPhoneupdate.lblARPhoneNbr);
      if (testPhone.length !== 10) {
        errorFound = true;
        alertMessage = alertMessage += "The phone number must have ten numbers. \n" ;
      }
      
      if (errorFound === false) {
        this.view.sgmPhoneNumberList.addDataAt(ARPhoneupdate,0, 0);
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
    
    removePhoneNumber:function(scope, index) {
      var errorFound = false;
      var selectedRow = this.view.sgmPhoneNumberList.selectedRowItems[0];
      selectedId = this.view.sgmPhoneNumberList.selectedRowIndex[1];

      ARPhoneupdate ={
        "lblARPhoneNbrType":  selectedRow.lblARPhoneNbrType,
        "lblARPhoneNbr": normalizePhone(selectedRow.lblARPhoneNbr),
        "lblARPhoneExtension": selectedRow.lblARPhoneExtension,
        "lblARActionType": "D",
   	    "lblARXrefId": selectedRow.lblARXrefId,
        
	    "lblARSmsInd":selectedRow.lblARSmsInd,
        "flxArSMSToggleCntnr" :{onClick: this.SMSPhoneNumberAR.bind(this, "index")},
        "flexArSmsCntnr"   : selectedRow.flexArSmsCntnr,
 		"imgArSMSIcon"     : selectedRow.imgArSMSIcon,
        "imgArSMSToggleOn" : selectedRow.imgArSMSToggleOn,
        "imgArSMSToggleOff": selectedRow.imgArSMSToggleOff,
        "imgSMSLocked"     : selectedRow.imgSMSLocked,
        "lblArSmsDescr" : "OPT-IN Text Message Notification",
        
        "imgBtnArStatus":{"isVisible" :false},
        "imgBtnArNewPhone":{"isVisible" :false},
        "imgBtnArDeletedPhone":{"isVisible" :true},
        "imgPBPAR": selectedRow.imgPBPAR,
        "flxImgDelete": {onClick: this.removePhoneNumber.bind(this, "index")},
        "flxArDeleteContainer":selectedRow.flxArDeleteContainer,
        "imgBtnArDelete": {"isVisible" :false},
		"imgBtnArUndelete": {"isVisible" :true}
      };
      
      //if (ARPhoneupdate.lblARXrefId === undefined || ARPhoneupdate.lblARXrefId === null || ARPhoneupdate.lblARXrefId === "") {
      if (selectedRow.lblARActionType === "A"){
        this.view.sgmPhoneNumberList.removeAt(selectedId, 0);
      }
      else {
        if (selectedRow.lblARActionType === "D"){
          ARPhoneupdate ={
            "lblARPhoneNbrType":  selectedRow.lblARPhoneNbrType,
            "lblARPhoneNbr": normalizePhone(selectedRow.lblARPhoneNbr),
            "lblARPhoneExtension": selectedRow.lblARPhoneExtension,
            "lblARActionType": "",
   	        "lblARXrefId": selectedRow.lblARXrefId,
	        "lblARSmsInd":selectedRow.lblARSmsInd,
            "flxArSMSToggleCntnr" :{onClick: this.SMSPhoneNumberAR.bind(this, "index")},
            "flexArSmsCntnr" : selectedRow.flexArSmsCntnr,
            "imgArSMSIcon": selectedRow.imgArSMSIcon,
            "imgArSMSToggleOn" : selectedRow.imgArSMSToggleOn,
            "imgArSMSToggleOff": selectedRow.imgArSMSToggleOff,
            "imgSMSLocked"     : selectedRow.imgSMSLocked,
            "lblArSmsDescr" : "OPT-IN Text Message Notification",
            "imgBtnArStatus":{"isVisible" :false},
            "imgBtnArNewPhone":{"isVisible" :false},
            "imgBtnArDeletedPhone":{"isVisible" :false},
            "imgPBPAR": selectedRow.imgPBPAR,
            "flxImgDelete": {onClick: this.removePhoneNumber.bind(this, "index")},
            "flxArDeleteContainer":selectedRow.flxArDeleteContainer,
            "imgBtnArDelete": {"isVisible" :true},
		    "imgBtnArUndelete": {"isVisible" :false}
          };
          this.view.sgmPhoneNumberList.setDataAt(ARPhoneupdate, selectedId, 0);
        }
        else{
          this.view.sgmPhoneNumberList.setDataAt(ARPhoneupdate, selectedId, 0);
        }
        
      }
      this.view.forceLayout();
    },    
    

    SMSPhoneNumberAR:function(scope, index)  {
      var errorFound = false;
      var errorMessage = " ";
      var selectedRow = this.view.sgmPhoneNumberList.selectedRowItems[0];
      selectedId = this.view.sgmPhoneNumberList.selectedRowIndex[1];
      
	  
      var varArSmsInd;
      var varArActionType;
      
      var vArPhoneSMSOn;
      var vArPhoneSMSOff;
      var vArPhoneSMSOnVis;
      var vArXrefID = "";
      
      //Setup SMS attestation message      
      var vAttestationOk = false;      
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
        // when SMS is inactive don't allow any change and notify the customer
        errorMessage = errorMessage += "The SMS Text Message options are currently unavailable. \n";
        errorFound = true;
      }
      
      if (selectedRow.lblARActionType === "D"&& selectedRow.lblARSmsInd === "N"){
        // Don't allow the SMS indicator to be set to Pendning when the item is deleted.
        errorMessage = errorMessage += "Phone numbers that are being deleted cannot be changed. \n";
        errorFound = true;
      }
		
      if (selectedRow.lblARPhoneNbrType !== "Cell" && selectedRow.lblARSmsInd === "N"){
         // Don't allow the SMS indicator to be set to Pendning for non-cell phones.
        errorMessage = errorMessage += "SMS must be activated on a Cell Phone. \n";
        errorFound = true;
      }
      
 	  	
      // check for error - process if no error
      if (errorFound){
        alert(errorMessage);
        errorFound = false;
      }
      else {
        // Check the current state. When Pending or Yes, skip the attestation.
        if (selectedRow.lblARSmsInd === "N"){
        	kony.ui.Alert(alertBasic, pspConfig);  
        }else{
          // when Pending or yes the attestation was already accepted.  Allow the customer to remove SMS.
          vAttestationOk = true;
        }
        
 	    // when the attestation is not accepted leave with no update.
        if (vAttestationOk){
          // when the current SMS state is pending or yes. then set sms to no (off)
          if (selectedRow.lblARSmsInd === "P" || selectedRow.lblARSmsInd === "Y"){ 
            vArPhoneSMSOn  = false;
            vArPhoneSMSOff = true;
            varArSmsInd = "N";
           }
          else{
            // when the current SMS state is no. then set sms to pending or yes
            vArPhoneSMSOn  = true;
            vArPhoneSMSOff = false;
            if (vSmsIndPrev === selectedRow.lblARXrefId && selectedRow.lblARActionType !== "A")
            {
              // sms to yes when it was previously yes
              varArSmsInd = "Y";
            }else{
              // sms to pending when not previously yes
              varArSmsInd = "P";
            }
          }
          
          // check the action code. if there is an existing code maintain it, else it is a change
          if (selectedRow.lblARActionType === "A"){
            varArActionType = "A";
            vArXrefID = normalizePhone(selectedRow.lblARPhoneNbr) ;
          }else{
            if (selectedRow.lblARActionType === "D"){
              varArActionType = "D";
              vArXrefID = selectedRow.lblARXrefId;
            }else{
              varArActionType = "C";
              vArXrefID = selectedRow.lblARXrefId;
            }
          }
 		  
          ARPhoneupdate = {
            "lblARPhoneNbrType":  selectedRow.lblARPhoneNbrType,
            "lblARPhoneNbr": normalizePhone(selectedRow.lblARPhoneNbr),
            "lblARPhoneExtension": selectedRow.lblARPhoneExtension,
            "lblARActionType": varArActionType,
   	        "lblARXrefId": selectedRow.lblARXrefId,
            
	        "lblARSmsInd":varArSmsInd,
            "flxArSMSToggleCntnr" :{onClick: this.SMSPhoneNumberAR.bind(this, "index")},
            
            "flexArSmsCntnr" : selectedRow.flexArSmsCntnr,
            "imgArSMSIcon"   : selectedRow.imgArSMSIcon,
            
            "imgArSMSToggleOn"  : {'isVisible' : vArPhoneSMSOn},
            "imgArSMSToggleOff" : {'isVisible' : vArPhoneSMSOff},
            "imgSMSLocked"      : selectedRow.imgSMSLocked,
            "lblArSmsDescr"     : "OPT-IN Text Message Notification",
          
            "imgBtnArStatus"       :selectedRow.imgBtnArStatus,
            "imgBtnArNewPhone"     :selectedRow.imgBtnArNewPhone,
            "imgBtnArDeletedPhone" :selectedRow.imgBtnArDeletedPhone,
            "imgPBPAR"             : selectedRow.imgPBPAR,
            
            "flxArDeleteContainer": selectedRow.flxArDeleteContainer,
            "flxImgDelete": {onClick: this.removePhoneNumber.bind(this, "index")},
            "imgBtnArDelete":  selectedRow.imgBtnArDelete,
		    "imgBtnArUndelete":  selectedRow.imgBtnArUndelete
          };
        
        
          this.view.sgmPhoneNumberList.setDataAt(ARPhoneupdate, selectedId, 0);
          
          if (varArSmsInd === "P" || varArSmsInd === "Y"){
            var dataRows = [];
            var row = "";
            var lstSetPhoneDetails = this.view.sgmPhoneNumberList.data;
             
            for(var p = 0; p < lstSetPhoneDetails.length; p++) {
              var phoneDetail = lstSetPhoneDetails[p];
		      
              if ((phoneDetail.lblARXrefId === vArXrefID && phoneDetail.lblARActionType !== "A") || 
              (phoneDetail.lblARActionType === "A" && vArXrefID ===  normalizePhone(phoneDetail.lblARPhoneNbr))){
                row = {
                  "lblARPhoneNbrType"   : phoneDetail.lblARPhoneNbrType,
           		  "lblARPhoneNbr"       : normalizePhone(phoneDetail.lblARPhoneNbr),
           		  "lblARPhoneExtension" : phoneDetail.lblARPhoneExtension,
           		  "lblARActionType"     : phoneDetail.lblARActionType,
				  "lblARXrefId"         : phoneDetail.lblARXrefId,
				  "lblARSmsInd"         : phoneDetail.lblARSmsInd,
				  "flexArSmsCntnr"      : phoneDetail.flexArSmsCntnr,
				  "imgArSMSIcon"        : {'isVisible' : true},
                  "imgArSMSToggleOn"    : {"isVisible" :true},
                  "imgArSMSToggleOff"   : {"isVisible" :false},
                  "imgSMSLocked"        : phoneDetail.imgSMSLocked,
                  "lblArSmsDescr"       : phoneDetail.lblArSmsDescr,
                  "flxArSMSToggleCntnr" :{onClick: this.SMSPhoneNumberAR.bind(this, "index")},
                  "imgBtnArStatus"      : phoneDetail.imgBtnArStatus,
                  "imgBtnArNewPhone"    : phoneDetail.imgBtnArNewPhone,
				  "imgBtnArDeletedPhone": phoneDetail.imgBtnArDeletedPhone,
                  "imgPBPAR"            : phoneDetail.imgPBPAR,
                  "flxImgDelete"        : {onClick: this.removePhoneNumber.bind(this, "index")},
				  "flxArDeleteContainer": phoneDetail.flxArDeleteContainer,
				  "imgBtnArDelete"      :  phoneDetail.imgBtnArDelete,
		          "imgBtnArUndelete"    :  phoneDetail.imgBtnArUndelete
                };
              }else{
                row = {
                  "lblARPhoneNbrType"  : phoneDetail.lblARPhoneNbrType,
           		  "lblARPhoneNbr"      : normalizePhone(phoneDetail.lblARPhoneNbr),
           		  "lblARPhoneExtension": phoneDetail.lblARPhoneExtension,
           		  "lblARActionType"    : phoneDetail.lblARActionType,
				  "lblARXrefId"        : phoneDetail.lblARXrefId,
				  "lblARSmsInd"        : "N",
				  "flexArSmsCntnr"     : phoneDetail.flexArSmsCntnr,
                  "imgArSMSIcon"       : {'isVisible' : true},
                  "imgArSMSToggleOn"   : {"isVisible" : false},
                  "imgArSMSToggleOff"  : {'isVisible' : true},
                  "imgSMSLocked"       : phoneDetail.imgSMSLocked,
                  "lblArSmsDescr"      : phoneDetail.lblArSmsDescr,
                  "flxArSMSToggleCntnr":{onClick: this.SMSPhoneNumberAR.bind(this, "index")},
                  "imgBtnArStatus"     : phoneDetail.imgBtnArStatus,
                  "imgBtnArNewPhone"   : phoneDetail.imgBtnArNewPhone,
				  "imgBtnArDeletedPhone": phoneDetail.imgBtnArDeletedPhone,
                  "imgPBPAR"           : phoneDetail.imgPBPAR,
                  "flxImgDelete" : {onClick: this.removePhoneNumber.bind(this, "index")},
				  "flxArDeleteContainer" : phoneDetail.flxArDeleteContainer,
				  "imgBtnArDelete" :  phoneDetail.imgBtnArDelete,
		          "imgBtnArUndelete" :  phoneDetail.imgBtnArUndelete
                };
              }
              //alert(JSON.stringify(row));
              dataRows.push(row);
              
              this.view.sgmPhoneNumberList.setData(dataRows);
            }
          }
        }
      }
    },
    
    resetPhoneNumber() {
      this.view.lstBoxPhoneType.selectedKey = 0;
      this.view.txtBoxEnterPhoneNumber.text = "";
      this.view.txtBoxEnterExtension.text = "";
      this.view.forceLayout();
    },
    
    resetMainForm() {
      this.view.txtBoxEnterFirstName.text = "";
      this.view.txtBoxEnterMiddleName.text = "";
      this.view.txtBoxEnterLastName.text = "";
      this.view.flxContainerInoutRow8.isVisible = false;
      this.view.lstBoxPhoneType.selectedKey = 0;
      this.view.txtBoxEnterPhoneNumber.text = "";
      this.view.txtBoxEnterExtension.text = "";
    },
    
    getInitialARDemographicInfo:function() {
      operationName =  "retrieveContactDemographicsByUserIdAndPortalUserType";
      var data= {"hatsUserId": testHatsUserId, "portalUserType":"AR" };
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, 
                                     this.getInitialARDemographicInfoSuccess, 
                                     this.getInitialARDemographicInfoFailure);
    },

    getInitialARDemographicInfoSuccess:function(response) {
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
              gblARDemographicInfo.firstName = undefined;
              this.view.mainHeaderScreens.setComponentData(undefined);
              alert("There was a problem getting demographic information: " + response.errmsg);
            }
            else if(response.ContactDemographicsDTO !== null && response.ContactDemographicsDTO !== undefined) {
              var details = response.ContactDemographicsDTO[0]; 
              var firstName = details.firstName; 
              gblARDemographicInfo = details;
              this.initInfo();
              
              var ntf = new kony.mvc.Navigation(this.returnPage);
              ntf.navigate();
            }
          }
        }
      }
    },
    
    getInitialARDemographicInfoFailure:function(error) {
      var callSpecificMsg = "Unable to access demographic info.";
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
      currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
      currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
      currentFrm.view.puInformationDialog.isVisible = true; 
      currentFrm.view.forceLayout();
    },      
    

    initInfo:function() {
      this.view.txtBoxEnterFirstName.setFocus(true);
      //alert("InitInfo:  " + JSON.stringify(gblARDemographicInfo));
      this.resetMainForm();
      this.initializeDropdowns();
      vSmsActiveInd = gblARDemographicInfo.smsActiveInd;
      //vSmsActiveInd = "N";   //Test SMS inactive
      
      this.view.txtBoxEnterFirstName.text = gblARDemographicInfo.firstName;
      this.view.txtBoxEnterMiddleName.text = gblARDemographicInfo.middleName;
      this.view.txtBoxEnterLastName.text = gblARDemographicInfo.lastName;
      this.view.lblBoxAREmail.text = gblARDemographicInfo.email;
      this.view.lblBoxARCompanyName.text = gblARDemographicInfo.interestedPartyCompanyName;
      this.view.lblBoxARAddress1.text = gblARDemographicInfo.addressDetails[0].addrLine1;
      if(gblARDemographicInfo.addressDetails[0].addrLine2 !== null && gblARDemographicInfo.addressDetails[0].addrLine2 !== undefined) {
        this.view.lblBoxARAddress2.text = gblARDemographicInfo.addressDetails[0].addrLine2;
        this.view.flxContainerInoutRow8.isVisible = true;
      }
      	
      this.view.lblBoxARCity.text = gblARDemographicInfo.addressDetails[0].city;
      this.view.lblBoxARState.text = gblARDemographicInfo.addressDetails[0].state;
      this.view.lblBoxARZipCode.text = gblARDemographicInfo.addressDetails[0].zipCd;

      if (vSmsActiveInd === "N")
      {
         this.view.flxSmsWarningMsg.isVisible = true;
      }else{
          this.view.flxSmsWarningMsg.isVisible = false;
      }
      
      
      var dataRows = [];
      var row = "";
      var rowFull = "";
      var lstPhoneDetails = gblARDemographicInfo.phoneDetails;
	  for(var p = 0; p < lstPhoneDetails.length; p++) {
        var phoneDetail = lstPhoneDetails[p];
                   
        var vArDeleteContainer;
        var vImgPBPAR;
        var vImgBtnArStatus;
        
        var vArPhoneSMSOn;
        var vArPhoneSMSOff;
        var vArPhoneSMSOnVis;
        var vArPhoneSmsLockVis;
        
        // check for SMS active
        if (vSmsActiveInd === "Y"){        
          // SMS is active
          if (phoneDetail.phoneTypCD === "Cell"){
            vArPhoneSMSOnVis = true;
            vArPhoneSmsLockVis = false;
            if (phoneDetail.smsInd === "P" || phoneDetail.smsInd === "Y"){
              vArPhoneSMSOn = true;
              vArPhoneSMSOff =  false; 
              if (phoneDetail.smsInd === "Y"){
                vSmsIndPrev = phoneDetail.phoneXrefId;
              }
            }else{
              vArPhoneSMSOn = false;
              vArPhoneSMSOff = true; 
            }
          }else{
            vArPhoneSMSOnVis = false;
          }
        }else{
          // SMS is inactive
          vArPhoneSMSOn = false;
          vArPhoneSMSOff = false; 
          if (phoneDetail.smsInd === "P" || phoneDetail.smsInd === "Y"){
            vArPhoneSMSOnVis = true;
            vArPhoneSmsLockVis = true;
          }else{
            vArPhoneSMSOnVis = false;
            vArPhoneSmsLockVis = false;
          }
        }

        if (phoneDetail.pbpInd === "Y"){
          vImgBtnArStatus = false;
          vImgPBPAR = true;
          vArDeleteContainer = false;
      	}else{
          vImgBtnArStatus = false;
          vImgPBPAR = false;
          vArDeleteContainer = true;
       }
        
        row = {
          "lblARPhoneNbrType": phoneDetail.phoneTypCD,
          "lblARPhoneNbr": normalizePhone(phoneDetail.phoneNumber),
          "lblARPhoneExtension": phoneDetail.ext,
          "lblARActionType": "",
          "lblARXrefId": phoneDetail.phoneXrefId,
          
		  "lblARSmsInd":phoneDetail.smsInd,
          "imgArSMSIcon" : {'isVisible' : true},
          "flexArSmsCntnr" : {'isVisible' : vArPhoneSMSOnVis},
          "lblArSmsDescr" : "OPT-IN Text Message Notification",
          
          "imgArSMSToggleOn" : {'isVisible' : vArPhoneSMSOn},
          "imgArSMSToggleOff": {'isVisible' : vArPhoneSMSOff},
          "imgSMSLocked"     : {'isVisible' : vArPhoneSmsLockVis},
          "flxArSMSToggleCntnr" :{onClick: this.SMSPhoneNumberAR.bind(this, "index")},

          "imgBtnArStatus":  {"isVisible" :vImgBtnArStatus},
          "imgBtnArNewPhone":{"isVisible" :false},
		  "imgBtnArDeletedPhone": {"isVisible" :false},
          "imgPBPAR": {"isVisible" :vImgPBPAR},

          "flxImgDelete": {onClick: this.removePhoneNumber.bind(this, "index")},
          "flxArDeleteContainer":{"isVisible" :vArDeleteContainer},
          "imgBtnArDelete": {"isVisible" :true},
		  "imgBtnArUndelete": {"isVisible" :false}
        };
         // Test see the phone numbers
      	//alert(JSON.stringify(row));
        dataRows.push(row);
      }
      this.view.sgmPhoneNumberList.setData(dataRows);  
      
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
      if (this.view.txtBoxEnterMiddleName.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterMiddleName.placeholder;
      } else {
        vA11yHintTextA = "";
      }  
      this.view.txtBoxEnterMiddleName.accessibilityConfig = {
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
      this.view.lstBoxPhoneType.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "Phone Type", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterPhoneNumber.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterPhoneNumber.placeholder;
      } else {
        vA11yHintTextA = "";
      }  
      this.view.txtBoxEnterPhoneNumber.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      if (this.view.txtBoxEnterExtension.text.length > 0) {
        vA11yHintTextA = this.view.txtBoxEnterExtension.placeholder;
      } else {
        vA11yHintTextA = "";
      }  
      this.view.txtBoxEnterExtension.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": vA11yHintTextA, 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
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

        
    saveInfo: function() {
      showLoadingIndicator();
      var phonesDataRows = [];
      var dataRowPhone = { 
        "actionType":"",
        "ext": "",
        "phoneNumber": "",
        "phoneTypCD": "",
        "phoneXrefId": "",
	    "smsInd":""
      };
      vSmsIndPrev ="";
      
      if(this.view.txtBoxEnterMiddleName.text === undefined || this.view.txtBoxEnterMiddleName.text === null) {
        this.view.txtBoxEnterMiddleName.text = "";
      }
      
      var lstPhoneDetails = this.view.sgmPhoneNumberList.data;
      var actionCode;

      
      for(var p = 0; p < lstPhoneDetails.length; p++) {
        var phoneDetail = lstPhoneDetails[p];
        actionCode = "";
        if (phoneDetail.lblARActionType === "A"){
          actionCode = "A";
        }else{
          if (phoneDetail.lblARActionType === "D"){
            actionCode = "D"; 
          }else{
            actionCode = "C"; 
          }
        }
		
        dataRowPhone = {
          "actionType" : actionCode,
          "ext" : phoneDetail.lblARPhoneExtension,
          "phoneNumber" : removeNonNumerics(phoneDetail.lblARPhoneNbr),
          "phoneTypCD" :  phoneDetail.lblARPhoneNbrType,
          "phoneXrefId" : phoneDetail.lblARXrefId,
	      "smsInd" : phoneDetail.lblARSmsInd
        };
        phonesDataRows.push(dataRowPhone);
      }
      
           
      operationName =  "updateContactDemographics";
      var data = {
        "contactId": gblARDemographicInfo.contactId,
        "firstName": this.view.txtBoxEnterFirstName.text,
        "hatsUserId": gblARDemographicInfo.hatsUserId,
        "lastName": this.view.txtBoxEnterLastName.text,
        "middleName": this.view.txtBoxEnterMiddleName.text,
        "phoneDetails": phonesDataRows,
        "portalUserType": gblARDemographicInfo.portalUserType
      };
      
      //verified on 12/13/2018
      // alert(JSON.stringify(data));
      
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
      else {
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.errorStatus = response.errorStatus;
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }  
        else { 
//          if(response.errorStatus !== null && response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
           if(response.status === "Failed to update the demographics information") {
            this.displayErrorMessages(response.errorStatus);       
          }
          else {
            if(screen.width <= gblBreakPoint) {
              displayHamburgerScreen();
            }
            this.view.setVisibility(false);
            this.getInitialARDemographicInfo();    
          }
        }
      }
    },
    
    saveInfoFailure:function(error) {
      dismissLoadingIndicator();
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
    
    initializeDropdowns: function() {
      var phoneTypesList = [];
      phoneTypesList.push([0, "Phone Type"]);
      for (i = 0; i < gblPhoneTypeList.length; i++) {
        var item = gblPhoneTypeList[i];
        phoneTypesList.push([item.phoneTypId, item.phoneTypCd]);
      }
      this.view.lstBoxPhoneType.masterData = phoneTypesList;
    },

    
  };
});