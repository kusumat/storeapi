define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.initializeDropdowns();
      this.view.btnUpdateSummary.onClick = this.displayNoInfoMessage;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
      
      this.view.txtBoxEnterFirstName.onTextChange = this.onTextChanged;
      this.view.txtBoxEnterLastName.onTextChange = this.onTextChanged;
      this.view.txtBoxEnterPhoneNumber.onTextChange = this.onTextChanged;
      this.view.txtPhoneExtension.onTextChange = this.onTextChanged;
      this.view.txtBoxEnterEmail.onTextChange = this.onTextChanged;
      this.view.txtBoxCompanyName.onTextChange = this.onTextChanged;
      this.view.txtBoxEnterAddress.onTextChange = this.onTextChanged;
      this.view.txtBoxEnterAddress2.onTextChange = this.onTextChanged;
      this.view.txtBoxEnterCity.onTextChange = this.onTextChanged;
      this.view.txtBoxEnterZipCode.onTextChange = this.onTextChanged;
      
      this.view.lstBoxPhoneType.onSelection = this.onTextChanged;
      
      this.onTextChanged();
      
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    onTextChanged: function() {
      
      this.view.lstBoxPhoneType.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.lstBoxPhoneType.selectedKey > 0 ? this.view.lstBoxPhoneType.placeholder : "", 
        "a11yHint": "Select Phone Type", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterFirstName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxEnterFirstName.text.length > 0 ? this.view.txtBoxEnterFirstName.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterLastName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxEnterLastName.text.length > 0 ? this.view.txtBoxEnterLastName.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterPhoneNumber.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxEnterPhoneNumber.text.length > 0 ? this.view.txtBoxEnterPhoneNumber.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtPhoneExtension.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtPhoneExtension.text.length > 0 ? this.view.txtPhoneExtension.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterEmail.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxEnterEmail.text.length > 0 ? this.view.txtBoxEnterEmail.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxCompanyName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxCompanyName.text.length > 0 ? this.view.txtBoxCompanyName.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterAddress.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxEnterAddress.text.length > 0 ? this.view.txtBoxEnterAddress.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterAddress2.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxEnterAddress2.text.length > 0 ? this.view.txtBoxEnterAddress2.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterCity.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxEnterCity.text.length > 0 ? this.view.txtBoxEnterCity.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.txtBoxEnterZipCode.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": this.view.txtBoxEnterZipCode.text.length > 0 ? this.view.txtBoxEnterZipCode.placeholder : "", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };     
    },
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
        
        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtPhoneExtension.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxCompanyName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterAddress.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        
        //list boxes
        this.view.lstBoxPhoneType.skin = 'sknLstBoxNOrmalMobile';
        this.view.lstBoxState.skin = 'sknLstBoxNOrmalMobile';
        
        //adjust phone number, phohe type and phone extension
        this.view.flxContainerInoutRow2.height = '80px';
        this.view.lstBoxPhoneType.right = 'Default';
        this.view.lstBoxPhoneType.left = '0%';
        this.view.lstBoxPhoneType.top = '44px';
        this.view.lstBoxPhoneType.width = '48%';
        
        this.view.txtBoxEnterPhoneNumber.width = '100%';
        
        this.view.txtPhoneExtension.left = '52%';
        this.view.txtPhoneExtension.top = '44px';
        this.view.txtPhoneExtension.width = '48%';
        
        //adjust city, state, zip code 
        this.view.flxContainerInoutRow8.height = '80px';
        this.view.txtBoxEnterCity.width = '100%';
        this.view.lstBoxState.right = 'Default';
        this.view.lstBoxState.left = '0%';
        this.view.lstBoxState.top = '44px';
        this.view.lstBoxState.width = '48%';
        this.view.txtBoxEnterZipCode.left = '52%';
        this.view.txtBoxEnterZipCode.top = '44px';
        this.view.txtBoxEnterZipCode.width = '48%';
        this.view.lstBoxState.centerX = 'Default';

      }
      else {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        
        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtPhoneExtension.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxCompanyName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterAddress.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';

        //list boxes
        this.view.lstBoxPhoneType.skin = 'sknLstBoxNOrmal';
        this.view.lstBoxState.skin = 'sknLstBoxNOrmal';
        
        this.view.flxContainerInoutRow2.height = '40px';
        this.view.lstBoxPhoneType.right = '23%';
        this.view.lstBoxPhoneType.left = 'Default';
        this.view.lstBoxPhoneType.top = 'Default'; 
        this.view.lstBoxPhoneType.width = '25%';
        
        this.view.txtBoxEnterPhoneNumber.width = '48%';
        
        this.view.txtPhoneExtension.left = 'Default';
        this.view.txtPhoneExtension.top = '0dp';
        this.view.txtPhoneExtension.width = '20%';    
        
        this.view.flxContainerInoutRow8.height = '40px';
        this.view.txtBoxEnterCity.width = '33%';
        this.view.lstBoxState.right = 'Default';
        this.view.lstBoxState.left = 'Default';
        this.view.lstBoxState.top = 'Default';
        this.view.lstBoxState.width = '30%';
        this.view.txtBoxEnterZipCode.left = 'Default';
        this.view.txtBoxEnterZipCode.top = '0dp';
        this.view.txtBoxEnterZipCode.width = '33%';
        this.view.lstBoxState.centerX = '50%';
        
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     
    
    initializeDropdowns:function() {
      var stateList = [];
      stateList.push([0,"Select State"]);
      for(var i = 0; i < gblStatesList.length; i++) {
        var state = gblStatesList[i];
        stateList.push([state.stateId, state.stateCd]);
      }

      var phoneTypesList = [];
      phoneTypesList.push([0, "Select Phone Type"]);
      for (i = 0; i < gblPhoneTypesList.length; i++) {
        var item = gblPhoneTypesList[i];
        phoneTypesList.push([item.phoneTypeId, item.phoneTypeDescription]);
      }
	  
      this.view.lstBoxState.masterData = stateList;
      this.view.lstBoxPhoneType.masterData = phoneTypesList;

    },
    
    displayNoInfoMessage:function() {
      alert("We cannot process this request at this time. You are welcome to try again when you have the Name, a current Mailing Address, Company Name (if valid), email, and phone number.");
      var ntf = new kony.mvc.Navigation("frmAppealDetails");
      ntf.navigate();
    },
    
    getSelectedState:function(){
      return this.view.lstBoxState.selectedKeyValue[1] === "Select State" ? "" : this.view.lstBoxState.selectedKeyValue[1];
    },
    
	getSelectedPhoneType:function() {
	  return this.view.lstBoxPhoneType.selectedKeyValue[1] === "Select Phone Type" ? "" : this.view.lstBoxPhoneType.selectedKeyValue[1];
	},    

  };
});