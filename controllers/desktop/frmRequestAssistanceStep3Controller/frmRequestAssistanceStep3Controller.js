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

  onNavigate:function(params) {
    gblSettings(this);
    this.params = params;
    this.view.preShow = this.preShow;
	this.view.headerCancelRHearing.onCancelClick = this.navigateOnCancel;
    this.view.fContinueBackButton.btnBackOnClick = this.navigateBack;
    if(params.dataForSelectedAppealsCard) {
      this.view.miniBoxSelectedList.setData(this.params.dataForSelectedAppealsCard);
    }
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.view.fContinueBackButton.btnContinueOnClick = this.validateInput;
    this.view.onBreakpointChange = this.onBreakpointChange;      
    gblHearingInfo.showQuickAction = false;
    this.view.snHearingInfoDetails.setHearingData(gblHearingInfo);
	addToFlow(this.view.id, this.view);
    this.view.forceLayout();
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
    adjustRequestAssistanceSummary(this.view, width);
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },  
  
  navigateBack:function() {
    var ntf = new kony.mvc.Navigation("frmRequestAssistanceStep2");
    ntf.navigate(this.params);          
  },
  
  navigateOnCancel:function() {
    resetFlow();
    var ntf = new kony.mvc.Navigation("frmAppealDetails");
    ntf.navigate();
  },  

  validateInput:function() {
    var firstName = this.view.snHowRepresentInfo.textTxtBoxFirstName;
    var lastName = this.view.snHowRepresentInfo.textTxtBoxLastName;
    var arPhoneNumber = this.view.snHowRepresentInfo.textTxtBoxPhoneNumber;
	var arPhoneType = this.view.snHowRepresentInfo.getSelectedPhoneType();
    var arPhoneExtension = this.view.snHowRepresentInfo.textTxtPhoneExtension;
    var email = this.view.snHowRepresentInfo.textTxtBoxEmail;
    var companyName = this.view.snHowRepresentInfo.textTxtBoxCompanyName;
    var arAddressLine1 = this.view.snHowRepresentInfo.textTxtBoxAddress1;
    var arAddressLine2 = this.view.snHowRepresentInfo.textTxtBoxAddress2;
    var arCity = this.view.snHowRepresentInfo.textTxtBoxEnterCity;
    var arZipCode = this.view.snHowRepresentInfo.textTxtBoxZipCode;
    var arState = this.view.snHowRepresentInfo.getSelectedState();

	var alertMessage = "";
    if(firstName === "") {
      alertMessage+="First Name is Required\n";
    }
    if(lastName === "") {
      alertMessage+="Last Name is Required\n";
    }
    if(email === "") {
      alertMessage+="Email is Required\n";
    }
    if(email !== "") {
      if(!kony.string.isValidEmail(email))
      {
        alertMessage+="Email is Invalid\n";
      }
    }
    if(arPhoneNumber !== ""){
      alertMessage = this.validatePhoneNumber(arPhoneNumber, alertMessage);
      if(arPhoneType === "") {
        alertMessage += "Phone Type is Required\n";
      }
    }
    else {
      if(arPhoneType !== "") {
        alertMessage += "Phone Number is Required\n";
      }      
    }
    if(arAddressLine1 === "") {
      alertMessage+="Street Address 1 is Required\n";
    }
    if(arCity !== "") {
      var tempCity = removeNonNumerics(arCity);
      if(tempCity.length > 0) {
        alertMessage+="City is Invalid. Numbers are not allowed.\n";
      }
    }
    if(arCity === "") {
      alertMessage+="City is Required\n";
    }
    if(arState === ""){
      alertMessage+="State is Required\n";
    }
    if(arZipCode !== "") {
      alertMessage = this.validateZipcode(arZipCode, alertMessage);
    } else {
      alertMessage+="Zip Code is Required\n";
    }
    if(alertMessage !== ""){
      alert(alertMessage); 
    }
    else { 
      addAuthorizedRepRequest.appealIds = [];
      var selectedAppeals = this.params.dataForSelectedAppealsCard;
      for(var i = 0; i < selectedAppeals.length; i++) {
        var appealId = selectedAppeals[i].appealId;
        var appealRow= {"appealId":appealId};
        addAuthorizedRepRequest.appealIds.push(appealRow); 
      }
      addAuthorizedRepRequest.contactFirstName = firstName;
      addAuthorizedRepRequest.contactLastName = lastName;
      addAuthorizedRepRequest.phoneNumber = removeNonNumerics(arPhoneNumber);
      addAuthorizedRepRequest.phoneType = arPhoneType;
      addAuthorizedRepRequest.ext = arPhoneExtension;
      addAuthorizedRepRequest.contactEmail = email;
      addAuthorizedRepRequest.companyName = companyName;
      addAuthorizedRepRequest.addressLine1 = arAddressLine1;
      addAuthorizedRepRequest.addressLine2 = arAddressLine2;
      addAuthorizedRepRequest.city = arCity;
      addAuthorizedRepRequest.state = arState;
      addAuthorizedRepRequest.zipCode = removeNonNumerics(arZipCode);
      addAuthorizedRepRequest.hatsUserId = testHatsUserId;
      
      var nextPage = "frmRequestAssistanceStep4";
      if(isSummaryEdit) {
        nextPage = "frmRequestAssistanceStep5";
      }
      var ntf = new kony.mvc.Navigation(nextPage);
      ntf.navigate(this.params);
    }
  },
  validatePhoneNumber:function(phoneNumber, alertMessage){
    if(!isPhoneNumberValid(phoneNumber)) {
    	alertMessage+="Please enter a 10 digit phone number\n";
    }
    else {
      phoneNumber = phoneNumber.replace(/\D/g,'');
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