define(function() {

  return {
	constructor: function(baseConfig, layoutConfig, pspConfig) {
	
	},
	//Logic for getters/setters of custom properties
	initGettersSetters: function() {
	
	},
	setData: function(context) {
	  
// 	  var params = {
// 		"homelessIndicator": homelessIndicator,
// 		"appelantName": firstName + " " + lastName,
// 		"phoneType": arPhoneType,
// 		"phoneNumber": arPhoneNumber,
// 		"email": email,
// 		"address1": arAddressLine1,
// 		"address2": arAddressLine2,
// 		"city": arCity,
// 		"county": arCounty,
// 		"state": arState,
// 		"zipCode": arZipCode
// 	  };

	  this.view.lblDescAppellantName.text = context.appelantName;
      this.view.flxAppellantCellPhone.isVisible = false;
	  
	  if (context.email !== undefined && context.email !== "") {
		this.view.lblDescAppellantEmail.text = context.email;		
		this.view.flxAppellantEmail.isVisible = true;
	  } else {
		this.view.flxAppellantEmail.isVisible = false;
	  }

	  if (context.phoneNumber !== undefined && context.phoneNumber !== "") {
		this.view.lblTitleAppellantHomePhone.text = context.phoneType + " " + "Phone";
		this.view.lblDescAppellantHomePhone.text = normalizePhone(context.phoneNumber);
		this.view.flxAppellantHomePhone.isVisible = true;
	  } else {
		this.view.flxAppellantHomePhone.isVisible = false;
	  }
	  
	  if (context.phoneNumber2 !== undefined && context.phoneNumber2 !== "") {
		this.view.lblTitleAppellantCellPhone.text = context.phoneType2 + " " + "Phone";
		this.view.lblDescAppellantCellPhone.text = normalizePhone(context.phoneNumber2);
		this.view.flxAppellantCellPhone.isVisible = true;
	  } else {
		this.view.flxAppellantCellPhone.isVisible = false;
	  }
	  
	  if(context.homelessIndicator === "Y") {
	  	this.view.lblDescAppellantAddress1.text = "Homeless";
		this.view.lblDescAppellantAddress2.text = context.county + " County";
	  } else {
		this.view.lblDescAppellantAddress1.text = this.composeAddress1Text(context);
		this.view.lblDescAppellantAddress2.text = this.composeAddress2Text(context);
	  }
	  this.view.forceLayout();
	},
	
	composeAddress1Text:function(context) {
	  var address = context.address1;
	  if (context.address2 !== undefined && context.address2 !== "") {
		address += (", " + context.address2);
	  }
	  
	  return address;
	},
	
	composeAddress2Text:function(context) {
	  var address = context.city + ", ";
	  if (context.county !== undefined && context.county !== "") {
		address += context.county + " County, ";
	  }
	  address += (context.state + " " + context.zipCode);
	  
	  return address;
	},

	onUpdateClick:function(form){
	  try{
        this.view.btnUpdateSummary.onClick = function(){
          var ntf = new kony.mvc.Navigation(form);
          ntf.navigate();
        };
      }catch(err){
        kony.print("Shomething went wrong while naviagation Back");
      }
    },
  };
});