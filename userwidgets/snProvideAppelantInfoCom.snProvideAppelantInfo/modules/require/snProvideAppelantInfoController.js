define(function() {

  var residenceAddressId = null;
  var homePhoneId = null;
  var homePhoneExt = "";

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.initializeDropdowns();
      this.view.btnAddPhone.onClick = this.onAddPhoneButtonClick;
      
      var CheckBoxObject = [["Homeless Checkbox", "Homeless Checkbox", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Homeless", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckHomeless.masterData = CheckBoxObject;   
       
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
      
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      // Make Primary button visible/invisible when phone txtBox value changes
      this.view.txtBoxEnterPhoneNumber.onTextChange = this.togglePrimary1;
      this.view.txtBoxEnterPhoneNumber2.onTextChange = this.togglePrimary2;
      // Toggle "Make Primary"/"Primary" text when the "Make Primary" botton is clicked
      this.view.btnMakePrimary1.onClick = this.setAsPrimaryPhone1;
      this.view.btnMakePrimary2.onClick = this.setAsPrimaryPhone2;
    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblTitle2.skin = 'sknLblGrayishDark115Mobile';

        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        //this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        //this.view.txtBoxEnterPhoneNumber2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterAddress1.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadiusMobile';
        
        //list boxes
        this.view.lstBoxPhoneType.skin = 'sknLstBoxNOrmalMobile';
        this.view.lstBoxPhoneType2.skin = 'sknLstBoxNOrmalMobile';
        this.view.lstBoxState.skin = 'sknLstBoxNOrmalMobile';
        this.view.lstBoxCounty.skin = 'sknLstBoxNOrmalMobile';
        this.view.txtBoxEnterPhoneNumber.skin = 'sknLstBoxNOrmalMobile';
        this.view.txtBoxEnterPhoneNumber2.skin = 'sknLstBoxNOrmalMobile';
      }
      else {
        
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.lblTitle2.skin = 'sknLblGrayishDark115';

        //text fields
        this.view.txtBoxEnterFirstName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterLastName.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterPhoneNumber.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterPhoneNumber2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterEmail.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterAddress1.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterAddress2.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterCity.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        this.view.txtBoxEnterZipCode.skin = 'sknTxtBoxBorderRadiusBlackFontCornerRadius';
        
        //list boxes
        this.view.lstBoxPhoneType.skin = 'sknLstBoxNOrmal';
        this.view.lstBoxPhoneType2.skin = 'sknLstBoxNOrmal';
        this.view.lstBoxState.skin = 'sknLstBoxNOrmal';
        this.view.lstBoxCounty.skin = 'sknLstBoxNOrmal';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    

    togglePrimary1:function() {
      if (this.view.txtBoxEnterPhoneNumber.text !== null && 
          this.view.txtBoxEnterPhoneNumber.text !== undefined && 
          this.view.txtBoxEnterPhoneNumber.text.length > 0) {
        this.view.btnMakePrimary1.isVisible = true;
      } else {
        this.view.btnMakePrimary1.isVisible = false;
      }
      this.view.forceLayout();
    },

    togglePrimary2:function() {
      if (this.view.txtBoxEnterPhoneNumber2.text !== null && 
          this.view.txtBoxEnterPhoneNumber2.text !== undefined && 
          this.view.txtBoxEnterPhoneNumber2.text.length > 0) {
        this.view.btnMakePrimary2.isVisible = true;
      } else {
        this.view.btnMakePrimary2.isVisible = false;
      }
      this.view.forceLayout();
    },

    setAsPrimaryPhone1:function() {
      this.view.btnMakePrimary1.text = "Primary";
      this.view.btnMakePrimary1.setEnabled(false);
      this.view.btnMakePrimary2.text = "Make Primary";
      this.view.btnMakePrimary2.setEnabled(true);
      this.view.forceLayout();
    },

    setAsPrimaryPhone2:function() {
      this.view.btnMakePrimary2.text = "Primary";
      this.view.btnMakePrimary2.setEnabled(false);
      this.view.btnMakePrimary1.text = "Make Primary";
      this.view.btnMakePrimary1.setEnabled(true);
      this.view.forceLayout();
    },

    resetHearingRequest : function() {
      hearingRequest.hatsUserId = "";
      hearingRequest.appellantFirstName = "";
      hearingRequest.appellantLastName = "";
      hearingRequest.appellantMiddleName = "";
      phoneDetail.phoneNumber = "";
      addressDetail.addrLine1 = "";
      addressDetail.addrLine2 = "";
      addressDetail.city = "";
      addressDetail.county = "";
      addressDetail.state = "";
      addressDetail.zipCd = ""; 
      hearingRequest.phoneDetails = [];
      hearingRequest.email = "";
      hearingRequest.addressDetails = [];
    },
    
    getSelectedKey:function(){
      return this.view.CheckHomeless.selectedKeys;
    },
    getSelectedCounty:function(){
      return this.view.lstBoxCounty.selectedKeyValue[1] === "Select County" ? "" : this.view.lstBoxCounty.selectedKeyValue[1];
    },
    getSelectedState:function(){
      return this.view.lstBoxState.selectedKeyValue[1] === "Select State" ? "" : this.view.lstBoxState.selectedKeyValue[1];
    },
	getSelectedPhoneType:function() {
	  return this.view.lstBoxPhoneType.selectedKeyValue[1] === "Phone Type" ? "" : this.view.lstBoxPhoneType.selectedKeyValue[1];
      //return this.view.lstBoxPhoneType.selectedKeyValue[1] === "Select Phone Type" ? "" : this.view.lstBoxPhoneType.selectedKeyValue[1];
	},
	getSelectedPhoneType2:function() {
	  return this.view.lstBoxPhoneType2.selectedKeyValue[1] === "Phone Type" ? "" : this.view.lstBoxPhoneType2.selectedKeyValue[1];
      //return this.view.lstBoxPhoneType2.selectedKeyValue[1] === "Select Phone Type" ? "" : this.view.lstBoxPhoneType2.selectedKeyValue[1];
	},
    
    initializeDropdowns:function() {
      var countyList = [];
      countyList.push([0,"Select County"]);
      for(var i = 0; i < gblCountiesList.length; i++) {
        var county = gblCountiesList[i];
        countyList.push([county.countyId, county.countyDescription]);
	  } 

      var stateList = [];
      stateList.push([0,"Select State"]);
      for(i = 0; i < gblStatesList.length; i++) {
        var state = gblStatesList[i];
        stateList.push([state.stateId, state.stateCd]);
      }

	  var phoneTypesList = [];
	  phoneTypesList.push([0, "Phone Type"]);
	  for (i = 0; i < gblPhoneTypesList.length; i++) {
        var item = gblPhoneTypesList[i];
		phoneTypesList.push([item.phoneTypeId, item.phoneTypeDescription]);
	  }
	  
      this.view.lstBoxCounty.masterData = countyList;
      this.view.lstBoxState.masterData = stateList;
	  this.view.lstBoxPhoneType.masterData = phoneTypesList;
      this.view.lstBoxPhoneType2.masterData = phoneTypesList;

    },   
    onAddPhoneButtonClick:function() {
      if (this.view.btnAddPhone.text === "Add Phone Number") {
        this.view.flxContainerInoutPhone2.isVisible = true;
        this.view.btnAddPhone.text = "Remove Phone Number";
        this.view.btnMakePrimary2.text = "Make Primary";
        this.view.btnMakePrimary2.setEnabled(true);
      } else {
        this.view.flxContainerInoutPhone2.isVisible = false;
        this.view.btnAddPhone.text = "Add Phone Number";
        this.view.txtBoxEnterPhoneNumber2.text = "";
        this.view.lstBoxPhoneType2.selectedKey = 0;
        this.view.btnMakePrimary2.isVisible = false;
        this.view.btnMakePrimary1.text = "Primary";
      }
    }
  };
});