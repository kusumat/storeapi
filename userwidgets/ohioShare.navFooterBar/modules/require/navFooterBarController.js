define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnOhioGov.onClick = this.openLinkGov;
      this.view.btnUSDANDS.onClick = this.openLinkUSDANDS;
      this.view.btnForms.onClick = this.openLinkForms;
      this.view.btnInfoCenter.onClick = this.openLinkInfo;
      this.view.btnPrivacyNotice.onClick = this.openLinkPrivacy;
      
      this.view.btnPrivacyNoticeMobile.onClick = this.openLinkPrivacy;
      this.view.btnUSDANDSMobile.onClick = this.openLinkUSDANDS;
      this.view.btnInfoCenterMobile.onClick = this.openLinkInfo;
      this.view.btnOhioGovMobile.onClick = this.openLinkGov;   
      this.view.btnFormsMobile.onClick = this.openLinkForms;
      this.view.flxFooterHeadingContainer.accessibilityConfig = {
        "a11yLabel" : "",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    openLinkGov: function () {
      kony.application.openURL("https://ohio.gov/wps/portal/gov/site/home/");
    },
    
    openLinkUSDANDS: function () {
      kony.application.openURL("http://jfs.ohio.gov/ocomm_root/Foodstamp_disclaimer.stm");
    },
        
    openLinkForms: function () {
      kony.application.openURL("http://www.odjfs.state.oh.us/forms/");
    },
    
    openLinkInfo: function () {
      kony.application.openURL("https://benefits.ohio.gov/");
    },
    
    openLinkPrivacy: function () {
      kony.application.openURL("http://jfs.ohio.gov/ocomm_root/privacy.stm");
    },
   
    openLink: function () {
      kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/indexOHLanding.jsp#wlp_applyForBenefits14");
    },
    
    breakPointChange:function(widthVal){
//       if(widthVal <= 1024 && widthVal >= 900 ){
//         this.view.height = '70px';
//         this.view.flxMainContainer.isVisible= true;
//         this.view.flxMainContainerMobile.isVisible= false;
//         this.view.btnInfoCenter.width= 'preferred';
//         this.view.btnPrivacyNotice.width= 'preferred';
//         this.view.imgFooterLogo.width= '250px';
        
//       } 
//       if(widthVal <= 900 && widthVal >= 768 ){
//         this.view.height = '160px';
//         this.view.flxMainContainer.isVisible= true;
//         this.view.flxMainContainerMobile.isVisible= false;
//         this.view.btnInfoCenter.width= '90px';
//         this.view.btnPrivacyNotice.width= '60px';
//         this.view.imgFooterLogo.width= '210px';  

//       } 
      if(widthVal <= 1100){
        this.view.height = '150px';
        this.view.flxMainContainer.isVisible= false;
        this.view.flxMainContainerMobile.isVisible= true;
        
      }if(widthVal > 1100){
        this.view.height = '70px';
        this.view.flxMainContainer.isVisible= true;
        this.view.flxMainContainerMobile.isVisible= false;
        this.view.btnInfoCenter.width= 'preferred';
        this.view.btnPrivacyNotice.width= 'preferred';
        this.view.imgFooterLogo.width= '250px';
        
        this.view.btnPrivacyNotice.right= '546px';
        this.view.lblLIne0.right= '536px';
        this.view.btnInfoCenter.right= '400px';
        this.view.lblLIne1.right= '390px';
        this.view.btnForms.right= '340px';
        this.view.lblLIne2.right= '330px';
        this.view.btnUSDANDS.right= '95px';
        this.view.lblLIne3.right= '91px';
        this.view.btnOhioGov.right= '20px';
        
      }
      this.view.forceLayout();
    }
  };
});