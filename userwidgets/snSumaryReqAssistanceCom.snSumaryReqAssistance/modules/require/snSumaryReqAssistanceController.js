define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);       
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
        this.view.flxContainerHeaderWithButtons1.height = '47px';
        this.view.flxContainerCol1.width = '50%';
        this.view.flxContainerCol2.width = '50%';
      }
      else {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.flxContainerHeaderWithButtons1.height = '32px';
        this.view.flxContainerCol1.width = '33.3%';
        this.view.flxContainerCol2.width = '33.3%';        
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },      

    setComponenentData:function() {
      this.view.lblDescName.text = addAuthorizedRepRequest.contactFirstName + 
        " " + addAuthorizedRepRequest.contactLastName + (addAuthorizedRepRequest.attorneyInd === "Y" ? " (Attorney)" : "");
      this.view.lblTypeTitlePhone.text = addAuthorizedRepRequest.phoneType + " Phone";
      this.view.lblDescPhoneNumberExt.text = addAuthorizedRepRequest.ext === "" ? "None" : addAuthorizedRepRequest.ext; 
      this.view.lblDescPhone.text = addAuthorizedRepRequest.phoneNumber === "" ? "None" : normalizePhone(addAuthorizedRepRequest.phoneNumber);
      this.view.lblDescEmail.text = addAuthorizedRepRequest.contactEmail === "" ? "None" : addAuthorizedRepRequest.contactEmail;
      this.view.lblDescEmail.text = this.view.lblDescEmail.text.replace("@", "\n@");
      this.view.lblDescEmail.toolTip = addAuthorizedRepRequest.contactEmail === "" ? "None" : addAuthorizedRepRequest.contactEmail;
      this.view.lblDescCompany.text = addAuthorizedRepRequest.companyName === "" ? "None" : addAuthorizedRepRequest.companyName;      
      var address = "";
      address = addAuthorizedRepRequest.addressLine1;
      if(addAuthorizedRepRequest.addressLine2 !== "") {
        address = address + "\n" + addAuthorizedRepRequest.addressLine2;  
      }
      address = address + "\n" + addAuthorizedRepRequest.city + ", " + addAuthorizedRepRequest.state + " " + addAuthorizedRepRequest.zipCode;
      this.view.lblDescAddress.text = address;
    }

  };
});