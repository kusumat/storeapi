var frm;
var contactId;

define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnRemove.onClick= this.remove;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
     remove: function() {
       	this.frm.view.puRemoveARF.loadAppealList(this.frm, this.contactId, this.view.lblName.text);
    },
    
   
    setComponentData: function(ar_info, form) {
            
      		this.frm = form;
          	this.contactId = ar_info.contactId;
            this.view.lblName.text = ar_info.contactFirstName+" "+ar_info.contactLastName;
      		this.view.lblName.text = this.view.lblName.text + (ar_info.attorneyInd === "Y" ? " (Attorney)": "");
            this.view.lblTitleDirection.text =ar_info.companyName;
      		this.view.lblTextDirections.text =ar_info.addressLine1+" "+ar_info.addressLine2+", "+ar_info.city+", "+ar_info.state+", "+ar_info.zipCode;
            
            this.view.lblTextPhone.text =ar_info.conPhone;
      
      		this.view.lblTextConctedBy1.text =ar_info.msgText;
            if(ar_info.msgText && ar_info.msgText.length > 100) {
              this.view.flxContainerPhone.height='150px';
              this.view.lblTextConctedBy1.height='150px';
              this.view.lblTextConctedBy1.text =ar_info.msgText;
              this.view.flxContainerPhone.forceLayout();
            }  
            
            if (gblVrtHearingIndArSection === 'N'){
              this.view.flxContainerPhone.setVisibility(true);
            }else{
              this.view.flxContainerPhone.setVisibility(false);
            }  
      
      		if(ar_info.conPhone === '')
              this.view.flxContainerPhone.setVisibility(false);
      
            this.view.lblTextDate.text =ar_info.conEmail;
      		this.view.lblTextDate.toolTip = ar_info.conEmail;
      
            if(ar_info.conEmail === '')
              this.view.flxContainerDate.setVisibility(false);
      		
      		kony.print("gblPortalStatus : "+gblPortalStatus);
      		if(gblPortalStatus === "Closed" || gblPortalStatus === "Compliance Pending")
				this.view.btnRemove.setVisibility(false);
      		else
              	this.view.btnRemove.setVisibility(true);
      
      		if(gblIsARUser)
      			this.view.btnRemove.setVisibility(false);
      		this.view.forceLayout();
      
            /*"zipCode": "45402",
            "contactId": "60379",
            "city": "Dayton",
            "conEmail": "HATS_NONPROD@jfs.ohio.gov",
            "companyName": "AAA PSA 3",
            "contactFirstName": "JOHN",
            "partyTypeCd": "AR",
            "conPhExt": "",
            "contactFullName": "",
            "conPhone": "(614) 867-5309",
            "addressLine1": "40 W 2ND ST",
            "msgText": "Participating by phone.",
            "contactLastName": "SMITH",
            "addressLine2": "",
            "state": "OH",
            "contactMiddleName": ""*/

    },


  };
});
