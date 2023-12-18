var tempStateSelected = "Select State";
define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      dismissLoadingIndicator();
      this.view.btnContinue.onClick = this.validateUserInfo;
      this.view.btnBack.onClick = this.goBack;
      this.view.btnCancel.onClick = this.goHome;
      this.view.CalendarSignedDate.onTouchEnd = this.alignCalendarSigned.bind(this);
      this.view.calendarReceiveNotice.onTouchEnd = this.alignCalendarReceive.bind(this);
      this.initCalendar();
      var recaptcha = this.view.recaptcha;
      recaptcha.siteKey = gblGoogleRecaptchaSitekey; 
      recaptcha.secretKey = gblGoogleRecaptchaApikey; 
      recaptcha.pageName = "Init";
      recaptcha.siteKeyType = "V3";  /* or "V2_CHECKBOX" */
      recaptcha.autoLoad = true;
      
      this.view.lstBoxState.onSelection = this.getStateSelected;
      this.view.lblRequiredFields.accessibilityConfig = {
        "a11yLabel": "* Indicates Required Fields",
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
      };      
      this.view.lblTextTitle.accessibilityConfig = {
        "a11yLabel": "Request a Hearing Information Page",
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
      };  
      this.view.lblResidence.accessibilityConfig = {
        "a11yLabel": "Address Section",
        "a11yARIA": {"role": "heading", "aria-level": "2"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
      this.view.lblAgency.accessibilityConfig = {
        "a11yLabel": "Agency Section",
        "a11yARIA": {"role": "heading", "aria-level": "2"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
      this.view.lblMailDate.accessibilityConfig = {
        "a11yLabel": "Notice Section",
        "a11yARIA": {"role": "heading", "aria-level": "2"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
      this.view.lblOptional.accessibilityConfig = {
        "a11yLabel": "Optional Section",
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
      this.view.lblSignedName.accessibilityConfig = {
        "a11yLabel": "Electronic Signature Section",
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
      
      this.view.txtBoxEnterCaseNumber.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Case Number", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterFirstName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "First Name", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };

      this.view.txtBoxEnterLastName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Last Name", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterAddress.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Address", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterCity.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "City", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.lstBoxState.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "State", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterZipCode.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Zip Code", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };         
      this.view.txtBoxEnterPhoneNumber.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Phone Number", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterEmail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Email Address", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxAgency.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Agency", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.calendarReceiveNotice.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      var CheckBoxObject = [["Cash Assistance", "Cash Assistance", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Cash Assistance", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxCashAssistance.masterData = CheckBoxObject;
      CheckBoxObject = [["Food Assistance", "Food Assistance", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Food Assistance", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxFoodAssistance.masterData = CheckBoxObject;  
      CheckBoxObject = [["Medicaid", "Medicaid", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Medicaid", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxMedicaid.masterData = CheckBoxObject; 
      CheckBoxObject = [["Medicaid Waiver", "Medicaid Waiver", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Medicaid Waiver", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxMedicaidWaiver.masterData = CheckBoxObject;
      CheckBoxObject = [["Prevention Retention and Contingency (PRC)", "Prevention Retention ", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Prevention Retention and Contingency", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxPRC.masterData = CheckBoxObject; 
      CheckBoxObject = [["Child Care", "Child Care", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Child Care", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxChildCare.masterData = CheckBoxObject; 
      CheckBoxObject = [["Adoption Assistance", "Adoption Assistance", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Adoption Assistance", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxAdoptionAssistance.masterData = CheckBoxObject; 
      CheckBoxObject = [["Child Support", "Child Support", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Child Support", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxChildSupport.masterData = CheckBoxObject; 
      CheckBoxObject = [["Other", "Other", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Other", "a11yHint": "Other", "a11yIndex": 0}]];
      this.view.CheckBoxOther.masterData = CheckBoxObject; 

      this.view.RadioButtonGroupManagedCare.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Are you requesting a hearing about the denial of your Managed Care Service?", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.RadioButtonGroupWaiverServices.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Are you requesting a hearing about the denial of your Waiver Services?", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.RadioButtonGroupDenialService.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Are you requesting a hearing about the denial of your Service?", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxBriefDescription.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Please provide a brief description of the issue(s): (450 character limit)",
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxInterpretationNeeds.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "List Any Interpretation Needs", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.RadioButtonGroupResolveIssues.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Would you like someone from State Hearings to help with resolving your issue(s)?", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.RadioButtonGroupCountyConf.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Would you like a County Conference?", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.RadioButtonGroupDiscontinueBenefits.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Do you want to discontinue your benefits?", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterPhoneNumberSMS.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Phone Number with Area Code", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };  
      this.view.txtBoxEnterSignedFullName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Electronic Signature", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };  
      this.view.CalendarSignedDate.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };  
      this.view.CalendarSignedDate.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };  

     // this.view.lblUILine.accessibilityConfig = {
     //   "a11yHidden": false, 
     //   "a11yLabel": "", 
     //   "a11yHint": "", 
     //   "a11yIndex": 0 
     // };

      amplify.subscribe("PreloginHearingRequest", this, this.onBreakpointChange, 1);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    initCalendar:function() {
      
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate());
      var currentDay = currentDate.getUTCDate();
      var currentMonth = currentDate.getMonth()+1;
      var currentYear = currentDate.getFullYear();
      this.view.calendarReceiveNotice.enableRangeOfDates([currentDay,currentMonth,currentYear-100], 
                                                         [currentDay,currentMonth,currentYear], "sknCalendarNormal", true);    
      currentDate = new Date();
      currentDate.setDate(currentDate.getDate());
      currentDay = currentDate.getDate();
      currentMonth = currentDate.getMonth()+1;
      currentYear = currentDate.getFullYear();
      this.view.CalendarSignedDate.enableRangeOfDates([currentDay,currentMonth,currentYear], 
                                                     [currentDay,currentMonth,currentYear], "sknCalendarNormal", true);

    },
    alignCalendarSigned: function() {
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.CalendarSignedDate.setContext({
          "widget": this.view.CalendarSignedDate,
          "anchor": "top"
        });
      } catch (ex) {
        kony.print("Exception found in alignCalendar: " + ex);
      }
    },
    alignCalendarReceive: function() {
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.calendarReceiveNotice.setContext({
          "widget": this.view.calendarReceiveNotice,
          "anchor": "top"
        });
      } catch (ex) {
        kony.print("Exception found in alignCalendar: " + ex);
      }
    },

    onBreakpointChange: function(width){
      try{
        if(width <= gblBreakPoint) {
          this.view.lblResidence.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
          this.view.lblOptional.skin = 'sknLblGrayishDark115Mobile';
          this.view.richTextProgramDesc.width = "100px";
          this.view.richTextProgramDesc.top = "0px";
          
          this.view.txtBoxEnterCaseNumber.width = '95%';
          this.view.txtBoxEnterFirstName.width = '95%';
          this.view.txtBoxEnterLastName.width = '95%';
          this.view.txtBoxEnterAddress.width = '95%';         
          this.view.txtBoxEnterCity.width = '95%';
          this.view.lstBoxState.width = '95%';
          this.view.txtBoxEnterZipCode.width = '95%';
          this.view.txtBoxEnterPhoneNumber.width = '95%';
          this.view.txtBoxEnterEmail.width = '95%';
          this.view.txtBoxAgency.width = '95%';
          this.view.txtBoxEnterPhoneNumberSMS.width = '95%';
          this.view.txtBoxEnterSignedFullName.width = '95%';
          this.view.txtBoxBriefDescription.width = '95%';
          this.view.txtBoxInterpretationNeeds.width = '95%';
          this.view.btnBack.width = '75px';
          this.view.btnContinue.width = '75px';
          this.view.btnCancel.width = '75px';
          this.view.CheckBoxPRC.height = '25px';
          this.view.lblPRCContinued.left = '28px';
          this.view.lblPRCContinued.top = '-10px';          
          this.view.lblOptional.top  = '15px';
          this.view.lblPRCContinued.skin = 'lblLigthGrayReg90';
          
          //text fields
          this.view.txtBoxEnterCaseNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxEnterAddress.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxAgency.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxEnterPhoneNumberSMS.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxEnterSignedFullName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxBriefDescription.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          this.view.txtBoxInterpretationNeeds.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
          
          
          this.view.RadioButtonGroupManagedCare.skin = 'slRadioButtonGroupMobile'; 
          this.view.RadioButtonGroupWaiverServices.skin = 'slRadioButtonGroupMobile'; 
          this.view.RadioButtonGroupDenialService.skin = 'slRadioButtonGroupMobile'; 
          this.view.RadioButtonGroupResolveIssues.skin = 'slRadioButtonGroupMobile'; 
          this.view.RadioButtonGroupCountyConf.skin = 'slRadioButtonGroupMobile'; 
          this.view.RadioButtonGroupDiscontinueBenefits.skin = 'slRadioButtonGroupMobile'; 
          
          this.view.CheckBoxCashAssistance.skin = 'sknCheckBoxGroupRegular90'; 
          this.view.CheckBoxFoodAssistance.skin = 'sknCheckBoxGroupRegular90';  
          this.view.CheckBoxMedicaid.skin = 'sknCheckBoxGroupRegular90'; 
          this.view.CheckBoxMedicaidWaiver.skin = 'sknCheckBoxGroupRegular90'; 
          this.view.CheckBoxPRC.skin = 'sknCheckBoxGroupRegular90'; 
          this.view.CheckBoxChildCare.skin = 'sknCheckBoxGroupRegular90'; 
          this.view.CheckBoxAdoptionAssistance.skin = 'sknCheckBoxGroupRegular90'; 
          this.view.CheckBoxChildSupport.skin = 'sknCheckBoxGroupRegular90'; 
          this.view.CheckBoxOther.skin = 'sknCheckBoxGroupRegular90'; 
          this.view.CalendarSignedDate.skin = 'sknCalendarNormal90';
          this.view.calendarReceiveNotice.skin = 'sknCalendarNormal90';
      //list boxes
          this.view.lstBoxState.skin = 'sknLstBoxNOrmalMobile';
        }
        else {
          
          this.view.richTextProgramDesc.width = "190px";
          this.view.richTextProgramDesc.top = "0px";
          this.view.txtBoxEnterCaseNumber.width = '50%';
          this.view.txtBoxEnterFirstName.width = '50%';
          this.view.txtBoxEnterLastName.width = '50%';
          this.view.txtBoxEnterAddress.width = '50%';
          this.view.txtBoxEnterCity.width = '50%';
          this.view.lstBoxState.width = '50%';
          this.view.txtBoxEnterZipCode.width = '50%';
          this.view.txtBoxEnterPhoneNumber.width = '50%';
          this.view.txtBoxEnterEmail.width = '50%';
          this.view.txtBoxAgency.width = '50%';
          this.view.txtBoxEnterPhoneNumberSMS.width = '50%';
          this.view.txtBoxEnterSignedFullName.width = '50%';
          this.view.txtBoxBriefDescription.width = '50%';
          this.view.txtBoxInterpretationNeeds.width = '50%';
          this.view.btnBack.width = '100px';
          this.view.btnContinue.width = '100px';
          this.view.btnCancel.width = '100px';
          this.view.CheckBoxPRC.height = '25px';
          this.view.lblPRCContinued.left = '173px';
          this.view.lblPRCContinued.top = '-28px';
          this.view.lblOptional.top  = '0px';
          this.view.lblPRCContinued.skin = 'lblLigthGrayReg100';
          
          
          this.view.lblResidence.skin = 'sknLblSubtitleDarkGrayRegMedium';

          //text fields
          this.view.txtBoxEnterCaseNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxEnterAddress.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          
          this.view.txtBoxAgency.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxEnterSignedFullName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxBriefDescription.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          this.view.txtBoxInterpretationNeeds.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
          
          this.view.RadioButtonGroupManagedCare.skin = 'sknRadioBtnDarkGrayReg100'; 
          this.view.RadioButtonGroupWaiverServices.skin = 'sknRadioBtnDarkGrayReg100'; 
          this.view.RadioButtonGroupDenialService.skin = 'sknRadioBtnDarkGrayReg100'; 
          this.view.RadioButtonGroupResolveIssues.skin = 'sknRadioBtnDarkGrayReg100'; 
          this.view.RadioButtonGroupCountyConf.skin = 'sknRadioBtnDarkGrayReg100'; 
          this.view.RadioButtonGroupDiscontinueBenefits.skin = 'sknRadioBtnDarkGrayReg100'; 
          
          this.view.CheckBoxCashAssistance.skin = 'sknCheckBoxGroupRegular100'; 
          this.view.CheckBoxFoodAssistance.skin = 'sknCheckBoxGroupRegular100';  
          this.view.CheckBoxMedicaid.skin = 'sknCheckBoxGroupRegular100'; 
          this.view.CheckBoxMedicaidWaiver.skin = 'sknCheckBoxGroupRegular100'; 
          this.view.CheckBoxPRC.skin = 'sknCheckBoxGroupRegular100'; 
          this.view.CheckBoxChildCare.skin = 'sknCheckBoxGroupRegular100'; 
          this.view.CheckBoxAdoptionAssistance.skin = 'sknCheckBoxGroupRegular100'; 
          this.view.CheckBoxChildSupport.skin = 'sknCheckBoxGroupRegular100'; 
          this.view.CheckBoxOther.skin = 'sknCheckBoxGroupRegular100'; 
          this.view.CalendarSignedDate.skin = 'sknCalendarNormal';
          this.view.calendarReceiveNotice.skin = 'sknCalendarNormal';
          //list boxes
          this.view.lstBoxState.skin = 'sknLstBoxNOrmal';
        } 
      }catch(err){
        kony.print("onBreakpointChange Exception:"+err);
      }
    },     
    
    goBack:function() {
      var ntf = new kony.mvc.Navigation("frmRequestHearingOptions");
      ntf.navigate();
    },
    goHome:function() {
      var ntf = new kony.mvc.Navigation("frmHomeScreen");
      ntf.navigate();
    },
    
    validateUserInfo:function() {
      
      var errorMessage = "";
      var error = "";
      if(this.view.txtBoxEnterCaseNumber.text === "") {
        if (error === "") {this.view.txtBoxEnterCaseNumber.setFocus(true);}
        error = "Case number is required";        
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }
      if(!this.view.txtBoxEnterFirstName.text.trim()) {
        if (error === "") {this.view.txtBoxEnterFirstName.setFocus(true);}
        error = "First name is required";        
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }
      
      if(this.view.txtBoxEnterLastName.text.trim() === "") {
        if (error === "") {this.view.txtBoxEnterLastName.setFocus(true);}
				error = "Last name is required";        
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }
      if(this.view.txtBoxEnterAddress.text.trim() === "") {
        if (error === "") {this.view.txtBoxEnterAddress.setFocus(true);}
        error = "Address is required";

        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }
      if(this.view.txtBoxEnterCity.text.trim() === "") {
        if (error === "") {this.view.txtBoxEnterCity.setFocus(true);}
        error = "City is required";
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }
      if(this.view.txtBoxEnterZipCode.text.trim() === "") {
        if (error === "") {this.view.txtBoxEnterZipCode.setFocus(true);}
        error = "Zip code is required";
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }
      else
      {
        if (!this.isZipCodeValid(this.view.txtBoxEnterZipCode.text.trim())) {
          if (error === "") {this.view.txtBoxEnterZipCode.setFocus(true);}
          error = "Zip code is invalid";
          errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
        }
      }
      if (this.view.lstBoxState.selectedkey === "SS") {
        if (error === "") {this.view.lstBoxState.setFocus(true);}
        error = "State is required";
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }   
      if(this.view.txtBoxEnterPhoneNumber.text === "") {
        if (error === "") {this.view.txtBoxEnterPhoneNumber.setFocus(true);}
        error = "Phone number is required";
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }
      else
        {
        if(!isPhoneNumberValid(this.view.txtBoxEnterPhoneNumber.text.trim())) {
          if (error === "") {this.view.txtBoxEnterPhoneNumber.setFocus(true);}
          error = "Phone number must be 10 digits";
          errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
        }
      }
      
      if(this.view.txtBoxEnterEmail.text.trim() !== "") {
        if(!kony.string.isValidEmail(this.view.txtBoxEnterEmail.text.trim())) {
          if (error === "") {this.view.txtBoxEnterEmail.setFocus(true);}
          error = "Email is invalid"; 
          errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
        }
      }
      
      if (this.view.calendarReceiveNotice.month !== null) {
        var DateCheck = this.view.calendarReceiveNotice.month+'/'+ this.view.calendarReceiveNotice.day +'/' + this.view.calendarReceiveNotice.year;
        if (error === "") {this.view.calendarReceiveNotice.setFocus(true);}
        if (this.isFutureDate(DateCheck)) {
          error = "Notice mail date may not be in the future";
          errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
        } 
      }
      if (this.view.CheckBoxCashAssistance.selectedKeys === null &&
          this.view.CheckBoxFoodAssistance.selectedKeys === null &&
          this.view.CheckBoxMedicaid.selectedKeys === null &&
          this.view.CheckBoxMedicaidWaiver.selectedKeys === null &&
          this.view.CheckBoxPRC.selectedKeys === null &&
          this.view.CheckBoxChildCare.selectedKeys === null &&
          this.view.CheckBoxAdoptionAssistance.selectedKeys === null &&
          this.view.CheckBoxChildSupport.selectedKeys === null &&
          this.view.CheckBoxOther.selectedKeys === null) {
        if (error === "") {this.view.CheckBoxCashAssistance.setFocus(true);}
        error = "Must select at least one program to request a hearing";
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }

      if (this.view.CheckBoxOther.selectedKeys !== null && this.view.txtBoxBriefDescription.text.trim() === "")
        {
          if (error === "") {this.view.txtBoxBriefDescription.setFocus(true);}
          error = "Brief Description is required when Other Program is selected";
        	errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
        }
      
      
      if(this.view.txtBoxEnterPhoneNumberSMS.text !== "") {
        if(!isPhoneNumberValid(this.view.txtBoxEnterPhoneNumberSMS.text)) {
          if (error === "") {this.view.txtBoxEnterPhoneNumberSMS.setFocus(true);}
          error = "SMS Phone number must be 10 digits";
          errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
        }
      }         
      if (this.view.txtBoxEnterSignedFullName.text.trim() === "") {
        if (error === "") {this.view.txtBoxEnterSignedFullName.setFocus(true);}
        error = "Electronic Signature is required";
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }
      if (this.view.CalendarSignedDate.day === null ||
          this.view.CalendarSignedDate.month === null ||
          this.view.CalendarSignedDate.year === null){
        if (error === "") {this.view.CalendarSignedDate.setFocus(true);}
        error = "Electronic Signature date is required";
        errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
      }
      
      if (this.view.CalendarSignedDate.day !== null &&
          this.view.CalendarSignedDate.month !== null &&
          this.view.CalendarSignedDate.year !== null) {
        var DateSigned = this.view.CalendarSignedDate.month+'/'+ this.view.CalendarSignedDate.day +'/' + this.view.CalendarSignedDate.year;
        if (error === "") {this.view.CalendarSignedDate.setFocus(true);}
        if (!this.isTodaysDate(DateSigned)) {
          error = "Electronic Signature date must be today's date.";
          errorMessage = errorMessage !== "" ? errorMessage+ "\n" + error : error;
        } 
      }

      if (errorMessage !== ""){        
        callSpecificMsg = "Validation errors:\n\n" + errorMessage;      
        alert(callSpecificMsg);
      }
      else
      { 
        this.view.recaptcha.pageName = "frmRequestHearingPrelogin";
        this.view.recaptcha.renderCaptcha();;        
      }
    },
    verificationCallback:function(result){
      if (result.score < gblGoogleRecaptchaScore){ 
        alert("Security safeguards are preventing you from accessing this website. \n\nAdditional help, please call the Bureau of State Hearings at 866 635-3748.");
        this.goHome();
      }
      else
        {
          showLoadingIndicator();
          this.mailRequestHearing();
        }
    },
    /**
    * @event: errorCallback
    * @description: Called when fabric API encounters an error
    */
    errorCallback:function(error){
      alert("Error VC: " + JSON.stringify(error));
    },
    isFutureDate:function(noticeDate) {
      var rightNow = new Date();
      rightNow.setDate(rightNow.getDate());
      var dateEntered = new Date(noticeDate);
      if (rightNow < dateEntered) {
        return true;
      } else {
        return false;
      }
    },
    
    isNumeric:function(caseNumber) {
      var isNumeric = kony.string.isNumeric(caseNumber);
      var containsPeriod = kony.string.containsChars (caseNumber, ['.']);
      if(isNumeric && !containsPeriod) {
        return true;
      }
      else {
        return false;         
      }
    },
    isZipCodeValid:function(zipcode) {
      var isValid = false;
      var isNumeric = kony.string.isNumeric(zipcode);
      var containsHyphen = kony.string.containsChars (zipcode, ['-']);
      if(isNumeric && (zipcode.length === 5 || zipcode.length === 9)) {
        return true;
      }
      else {        
        if (zipcode.length === 10 && containsHyphen){
          if (zipcode.substring(5, 6) === "-")
          {
            zipcode = removeNonNumerics(zipcode);
            if (zipcode.length === 9){
              return true;
            }
            else {
              return false;
            }
          }
          else {
            return false;
          }    
        }
      }      
    },
    isTodaysDate:function(inputDate) {
      var inputDate = new Date(inputDate);
      var todaysDate = new Date();
      if(inputDate.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) {
        return true;
      } else {
        return false;
      }
    },
    mailRequestHearing :function(){     
      var emailBody = this.populateBody();
      operationName = "SendHearingRequest";
      var data = {"emailSubject": "BSH Hearing Request","emailBody": emailBody};   
      var headers = {};
      var serviceName = "SMTPService";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.mailRequestHearingSuccess, this.mailRequestHearingFailure);
    }, 


    mailRequestHearingSuccess:function(response){
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errDocumentTypeList;
        response.userAction = apiActions.actionNull;
        navigateToErrorPage(response);  
      }
      else
      {
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }
        else
          {
            dismissLoadingIndicator();           
            gblFrmCurrentName = "frmHearingRequestPrelogin";
            callSpecificMsg = name + "Hearing Request Successfully Submitted";
            currentFrm.view.puInformationDialog.flxContainerInfoHeight = '175px';
            currentFrm.view.puInformationDialog.lblTitleText = "Request a Hearing Information Page";
            currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
            currentFrm.view.puInformationDialog.isVisible = true; 
            addEventListener('keydown',this.preventTabMsg);
            currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
            currentFrm.view.forceLayout();            
          }
      }
    },

    mailRequestHearingFailure:function(error){
      dismissLoadingIndicator();
      alert("Failed to send Hearing Request via SMTP Mail");
       
    },
    populateBody: function(){
      var indentation = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
      var emailBody = "From: BSH@jfs.ohio.gov</br>";
      if (this.view.txtBoxEnterEmail.text !== ""){
        emailBody = "From: " +this.view.txtBoxEnterEmail.text + "</br>";
      }
      emailBody = emailBody + "Subject: BSH Hearing Request</br></br></br>";
      emailBody = emailBody + "Case Number: " +  this.view.txtBoxEnterCaseNumber.text + "</br>";
      emailBody = emailBody + "First Name: " + this.view.txtBoxEnterFirstName.text + "</br>";
      emailBody = emailBody + "Last Name: " + this.view.txtBoxEnterLastName.text + "</br>";
      emailBody = emailBody + "Address: " + this.view.txtBoxEnterAddress.text + "</br>";
      emailBody = emailBody + "City: " + this.view.txtBoxEnterCity.text + "</br>";
      emailBody = emailBody + "State: " + this.view.lstBoxState.selectedKey + "</br>";
      emailBody = emailBody + "Zip Code: " + removeNonNumerics(this.view.txtBoxEnterZipCode.text) + "</br>";
      emailBody = emailBody + "Phone Number: " + this.view.txtBoxEnterPhoneNumber.text + "</br>";            
      
      emailBody = emailBody + "Area Requesting Action: " + this.view.txtBoxAgency.text + "</br>";
      if (this.view.calendarReceiveNotice.day !== undefined &&
          this.view.calendarReceiveNotice.month !== undefined &&
          this.view.calendarReceiveNotice.year !== undefined){
        emailBody = emailBody + "Notice Mail Date: " + this.view.calendarReceiveNotice.month + "/" + this.view.calendarReceiveNotice.day + "/" + this.view.calendarReceiveNotice.year + "</br>";
      }
      else
      {
        emailBody = emailBody + "Notice Mail Date: "+"</br>";
      }
      emailBody = emailBody + "Benefits Programs:" + "</br>";
       
      emailBody = emailBody + indentation+ "* Cash Assistance: " + (this.view.CheckBoxCashAssistance.selectedKeys === null ? "No" : "Yes") + "</br>";     
      emailBody = emailBody + indentation+ "* Food Assistance: "+ (this.view.CheckBoxFoodAssistance.selectedKeys === null ? "No" : "Yes") + "</br>";     
      emailBody = emailBody + indentation+ "* Medicaid: " + (this.view.CheckBoxMedicaid.selectedKeys === null ? "No" : "Yes") + "</br>";     
      emailBody = emailBody + indentation+ "* Medicaid Waiver: " + (this.view.CheckBoxMedicaidWaiver.selectedKeys === null ? "No" : "Yes") + "</br>";     
      emailBody = emailBody + indentation+ "* Prevention Retention and Contingency (PRC): "+ (this.view.CheckBoxPRC.selectedKeys === null ? "No" : "Yes") + "</br>";     
      emailBody = emailBody + indentation+ "* Child Care: " + (this.view.CheckBoxChildCare.selectedKeys === null ? "No" : "Yes") + "</br>";     
      emailBody = emailBody + indentation+ "* Adoption Assistance: " + (this.view.CheckBoxAdoptionAssistance.selectedKeys === null ? "No" : "Yes") + "</br>";     
      emailBody = emailBody + indentation+ "* Child Support: " + (this.view.CheckBoxChildSupport.selectedKeys === null ? "No" : "Yes") + "</br>";     
      emailBody = emailBody + indentation+ "* Other: " + (this.view.CheckBoxOther.selectedKeys === null ? "No" : "Yes") + "</br>";     
      emailBody = emailBody + "Denial For Managed Care Service: "+ (this.view.RadioButtonGroupManagedCare.selectedKey === null ? "" : this.view.RadioButtonGroupManagedCare.selectedKey) + "</br>";
      emailBody = emailBody + "Denial Of Waiver Services: " + (this.view.RadioButtonGroupWaiverServices.selectedKey === null ? "" : this.view.RadioButtonGroupWaiverServices.selectedKey) + "</br>";
      emailBody = emailBody + "Denial Of Your Services: " + (this.view.RadioButtonGroupDenialService.selectedKey === null ? "" : this.view.RadioButtonGroupDenialService.selectedKey) + "</br>";
      emailBody = emailBody + "Description: " + this.view.txtBoxBriefDescription.text + "</br>";
      emailBody = emailBody + "Interpretation Needs: " + this.view.txtBoxInterpretationNeeds.text + "</br>";
      emailBody = emailBody + "State Hearing Contact Request: " + (this.view.RadioButtonGroupResolveIssues.selectedKey === null ? "" : this.view.RadioButtonGroupResolveIssues.selectedKey) + "</br>";
      emailBody = emailBody + "County Conference Request: " + (this.view.RadioButtonGroupCountyConf.selectedKey === null ? "" : this.view.RadioButtonGroupCountyConf.selectedKey) + "</br>";
      emailBody = emailBody + "Discontinue Benefits Request: " + (this.view.RadioButtonGroupDiscontinueBenefits.selectedKey === null ? "" : this.view.RadioButtonGroupDiscontinueBenefits.selectedKey) + "</br>";
      emailBody = emailBody + "P B P_ Hearing Phone Number: " + this.view.txtBoxEnterPhoneNumberSMS.text + "</br>";
      emailBody = emailBody + "Electronic Signature: " + this.view.txtBoxEnterSignedFullName.text + "</br>";
      if (this.view.CalendarSignedDate.day !== undefined &&
          this.view.CalendarSignedDate.month !== undefined &&
          this.view.CalendarSignedDate.year !== undefined){
        emailBody = emailBody + "Electronic Signature Date: "+ this.view.CalendarSignedDate.month + "/" + this.view.CalendarSignedDate.day + "/" + this.view.CalendarSignedDate.year + "</br>";      
      }
      else
      {
        emailBody = emailBody + "Electronic Signature Date: " + "</br>";      
      }
      return emailBody;
    },
  };
});