var homelessIndicator = "N";
var isSummaryEdit = false;

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
    isSummaryEdit = false;
    if (params !== undefined && params.isSummaryEdit !== undefined) {
      isSummaryEdit = params.isSummaryEdit;
      appellantInfo = params.appellantInfo;
      params = params.appellantInfo;
    }       
    // TODO: Call the homeless-checkbox to initialize the state var
    this.onHomelessSelection(); // homelessIndicator is now "Y" or "N"
    this.view.preShow = this.preShow;
    this.view.fContinueBackButton.navigatingBFormsBack("frmARHearingRequestStep1");
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.view.fContinueBackButton.btnContinueOnClick = this.validateInput;
	this.view.snProvideAppelantInfo.onHomelessSelection = this.onHomelessSelection;
    if(gblIsARUser){
      this.view.headerCancelRHearing.toHearingRequest(gblARHearingFrom);
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);

    } 
    else{
      this.view.headerCancelRHearing.toHearingRequest("frmAuthorizedRepDash");
      this.view.mainHeaderScreens.setComponentData("");
    }    
    this.view.onBreakpointChange = this.onBreakpointChange;

    addToFlow(this.view.id, this.view);
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
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },
  
  onHomelessSelection:function() {
    //     let checkboxVisibility = this.view.snProvideAppelantInfo.isVisible();
    //     console("checkbox " + (checkboxVisibility ? " is " : " is NOT ") + " visible");
    let selectedKeys = this.view.snProvideAppelantInfo.getSelectedKey();
    console.log("checkbox " + ((selectedKeys === null) ? "null" : JSON.stringify(selectedKeys)));
    if (selectedKeys !== null) {
      homelessIndicator = "Y";
    } else {
      homelessIndicator = "N";
    }
  },
  validateInput:function() {
    var firstName = this.view.snProvideAppelantInfo.textTxtBoxEnterFirstName;
    var lastName = this.view.snProvideAppelantInfo.textTxtBoxEnterLastName;
    var phoneNumber = this.view.snProvideAppelantInfo.textTxtBoxEnterPhoneNumber;
	var phoneType = this.view.snProvideAppelantInfo.getSelectedPhoneType();
    var isPrimaryPhone1 = (this.view.snProvideAppelantInfo.textBtnMakePrimary1 === "Primary");
    var phoneNumber2 = this.view.snProvideAppelantInfo.textTxtBoxEnterPhoneNumber2;
	var phoneType2 = this.view.snProvideAppelantInfo.getSelectedPhoneType2();
    var isPrimaryPhone2 = (this.view.snProvideAppelantInfo.textBtnMakePrimary2 === "Primary");
    var email = this.view.snProvideAppelantInfo.textTxtBoxEnterEmail;
    var arAddressLine1 = this.view.snProvideAppelantInfo.textTxtBoxEnterAddress1;
    var arAddressLine2 = this.view.snProvideAppelantInfo.textTxtBoxEnterAddress2;
    var arCity = this.view.snProvideAppelantInfo.textTxtBoxEnterCity;
    var arZipCode = this.view.snProvideAppelantInfo.textTxtBoxEnterZipCode;
    var arCounty = this.view.snProvideAppelantInfo.getSelectedCounty();
    var arState = this.view.snProvideAppelantInfo.getSelectedState();

	var alertMessage = "";
    if(firstName === "") {
      alertMessage+="First Name is Required\n";
    }
    if(lastName === "") {
      alertMessage+="Last Name is Required\n";
    }
    if(email !== "") {
      if(!kony.string.isValidEmail(email))
      {
        alertMessage+="Email is Invalid\n";
      }
    }
    if(homelessIndicator === "Y") {
      if(arCounty === ""){
        alertMessage+="County is Required\n";
      }
    }
    if (phoneNumber !== "" && phoneType === "") {
      alertMessage += "Phone Type is Required for Phone Number\n";
    }
    if (phoneNumber === "" && phoneType !== "") {
      alertMessage += "Phone Number is Required for Phone Type\n";
    }  
    if (phoneNumber2 !== "" && phoneType2 === "") {
      alertMessage += "Phone Type is Required for Phone Number\n";
    }
    if (phoneNumber2 === "" && phoneType2 !== "") {
      alertMessage += "Phone Number is Required for Phone Type\n";
    }   
    if(phoneNumber !== ""){
	  alertMessage = this.validatePhoneNumber(phoneNumber, alertMessage);
	}
    if(phoneNumber2 !== "") {
      alertMessage = this.validatePhoneNumber(phoneNumber2, alertMessage);
    }
    if(homelessIndicator === "N") {
	  if(phoneNumber === "") {
		alertMessage+="Phone Number is Required\n";
	  }
	  if(phoneType === "") {
		alertMessage += "Phone Type is Required\n";
	  }
      if(arAddressLine1 === "") {
        alertMessage+="Address 1 is Required\n";
      }
      if(arCity === "") {
        alertMessage+="City is Required\n";
      }
      if(arCity !== "") {
        var tempCity = removeNonNumerics(arCity);
        if(tempCity.length > 0) {
          alertMessage+="City is Invalid. Numbers are not allowed.\n";
        }
      }
      if(arZipCode !== "") {
        alertMessage = this.validateZipcode(arZipCode, alertMessage);
      } else {
        alertMessage+="Zip Code is Required\n";
      }
      if(arCounty === "") {
        alertMessage+="County is Required\n";
      }      
      if(arState === ""){
        alertMessage+="State is Required\n";
      }
    }
    if(alertMessage !== ""){
      alert(alertMessage); 
    }
    else { 
	  var params = {
		"homelessIndicator": homelessIndicator,
		"appelantName": firstName + " " + lastName,
		"phoneType": phoneType,
		"phoneNumber": phoneNumber,
		"phoneType2": phoneType2,
		"phoneNumber2": phoneNumber2,
		"email": email,
		"address1": arAddressLine1,
		"address2": arAddressLine2,
		"city": arCity,
		"county": arCounty,
		"state": arState,
		"zipCode": arZipCode
	  };
	  
      hearingRequest.appellantFirstName = firstName;
      hearingRequest.appellantLastName = lastName;

      if(phoneNumber !== "") {
        phoneDetail.phoneNumber = phoneNumber;
        phoneDetail.phoneTypCD = phoneType;//Need to get from list.
        phoneDetail.primaryInd = (isPrimaryPhone1) ? "Y" : "N";
        phoneDetail.phoneXrefId = null;
        hearingRequest.phoneDetails = [];
        hearingRequest.phoneDetails.push(phoneDetail);
      }
      if(phoneNumber2 !== "") {
        var phoneDetail2 = {
          "phoneTypCD": phoneType2,
          "phoneNumber": phoneNumber2,
          "ext": "",
          "primaryInd": (isPrimaryPhone2) ? "Y" : "N",
          "phoneXrefId": null
        };
        hearingRequest.phoneDetails.push(phoneDetail2);        
      }
      hearingRequest.email = email;
      hearingRequest.addressDetails = [];
      var address = {
          "city": arCity,
          "addrLine2": arAddressLine2,
          "addrLine1": arAddressLine1,
          "addrTypCd": "Residence",
          "county": arCounty,
          "zipCd": arZipCode,
          "state": arState,
          "addressId": null
      };
      hearingRequest.addressDetails.push(address);
      hearingRequest.homelessInd = homelessIndicator;	
      var nextPage = "frmHearingRequestStep2";
      if(isSummaryEdit) {
        nextPage = "frmHearingRequestStep8";
      }
      var ntf = new kony.mvc.Navigation(nextPage);
      ntf.navigate(params);
    }
  },
  validatePhoneNumber:function(phoneNumber, alertMessage){
    if(!isPhoneNumberValid(phoneNumber)) {
    	alertMessage+="Please enter a 10 digit phone number\n";
    }
    else {
      phoneDetail.phoneNumber = phoneNumber.replace(/\D/g,'');
    }
    return alertMessage;
  },
  validateZipcode:function(zipcode, alertMessage){
	if (!isZipCodeValid(zipcode)) {
      alertMessage+="Zip code must be 5 or 9 digits in length.\n";
    } else {
      zipcode = zipcode.replace(/\D/g,'');
    }
    return alertMessage;
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