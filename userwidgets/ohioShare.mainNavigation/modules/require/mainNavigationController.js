define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.BtnLogin.onClick = this.navigateTo.bind(this, 'frmLogin');
      this.view.btnContact.onClick = this.navigateTo.bind(this, 'frmContact');
      this.view.btnHeaderLogoss.onClick = this.navToMainJFSSite;
      this.view.btnSupport.onClick = this.navigateSupport;
      this.view.flxJFSNavHeadingContainer.accessibilityConfig = {
        "a11yLabel" : "JFS Navigation",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.flxMainContainer.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.imgHeaderLogo.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.flxNavButtonsContainer.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.btnDecisionsAdministrative.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };      
      this.view.btnApplyBenefits.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.btnAidInformation.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };      
      this.view.btnSupport.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.btnContact.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };      
      this.view.BtnLogin.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
//       this.view.btnSupport.onClick = this.navigateTo('');
//       this.view.btnAidInformation.onClick = this.navigateTo('');
//       this.view.btnApplyBenefits.onClick = this.navigateTo('');
//       this.view.btnDecisionsAdministrative.onClick = this.navigateTo('');
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    navigateTo:function(page, self) {
      currentFrm.view.hamburgerMenu.isVisible = false; 
      const nav = new kony.mvc.Navigation(page);
      nav.navigate();
    },
    
    navToMainJFSSite:function() {
      kony.application.openURL('https://jfs.ohio.gov/');  
    },
    
    navigateSupport:function() {
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '220px';
      currentFrm.view.puInformationDialog.lblTitleText = "Bureau of State Hearings";
      currentFrm.view.puInformationDialog.lblDescText = "Phone: " + gblBHSPhone + "\n\nEmail: " + gblBHSEmail + "\n\n" + gblBHSNote;
      currentFrm.view.puInformationDialog.isVisible = true; 
      this.view.forceLayout();
      addEventListener('keydown',this.preventTabNav);
      currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
      currentFrm.view.forceLayout(); 
    },
    
    preventTabNav: function(e){ 
      e = e || window.event; 
      if (currentFrm.view.puInformationDialog.isVisible === true){
        if (e.keyCode === 9)  // If tab key is pressed
        { 
          e.preventDefault(); // stop event from its action 
          currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
        } 
      }else{
        removeEventListener('keydown',this.preventTabNav);
      }
    },
   
//     setCurrentPage(page){
//       const normalSkin = 'sknBtnFontFFFFFFSansProBold18px';
//       const selectedSkin = 'sknBtnBorderFontFFFFFFSansProBold18px';
//       this.view.btnFAQ.skin = normalSkin;
//       this.view.btnAfterHearing.skin = normalSkin;
//       this.view.btnDuringHearing.skin = normalSkin;
//       this.view.btgtnBeforeHearing.skin = normalSkin;
//       this.view.btnregistration.skin = normalSkin;
//       if (page === 'frmRegistration') {
//         this.view.btnregistration.skin = selectedSkin;
//       } else if (page === 'frmBeforeHearing') {
//         this.view.btgtnBeforeHearing.skin = selectedSkin;
//       } else if (page === 'frmDuringHearing') {
//         this.view.btnDuringHearing.skin = selectedSkin;
//       } else if (page === 'frmAfterHearing') {
//         this.view.btnAfterHearing.skin = selectedSkin;
//       } else if (page === 'frmFAQ') {
//         this.view.btnFAQ.skin = selectedSkin;
//       }
//     },
    breakPointChange:function(widthVal){
	  if(widthVal >= 900 && widthVal <= 1130){
        this.view.height = '50px';
        this.view.btnDecisionsAdministrative.width= '140px';
        this.view.btnApplyBenefits.width= '70px';
        this.view.btnAidInformation.width= '105px';
        this.view.imgHeaderLogo.width = '250px';
        this.view.imgHeaderLogo.left = '5%';
        this.view.btnHeaderLogoss.height = '100%';
        this.view.BtnLogin.right= '4%';
        this.view.btnContact.right = '13%';
        this.view.btnSupport.right = '21%';
        this.view.btnAidInformation.right = '28%';
        this.view.btnApplyBenefits.right = '40%';
        this.view.btnDecisionsAdministrative.right = '49%';
        this.view.btnContact.isVisible = true;
        this.view.btnSupport.isVisible = true;
        this.view.btnAidInformation.isVisible = true;
        this.view.btnApplyBenefits.isVisible = true;
        this.view.btnDecisionsAdministrative.isVisible = true;
      } if(widthVal >= 768 && widthVal <= 900){
        this.view.height = '50px';
        this.view.BtnLogin.width= 'preferred';
        this.view.btnDecisionsAdministrative.width= '140px';
        this.view.btnApplyBenefits.width= '70px';
        this.view.btnAidInformation.width= '105px';
        this.view.imgHeaderLogo.width = '224px';
        this.view.imgHeaderLogo.left = '3%';
        this.view.BtnLogin.right= '0%';
        this.view.btnContact.right = '10%';
        this.view.btnSupport.right = '18%';
        this.view.btnAidInformation.right = '25%';
        this.view.btnApplyBenefits.right = '38%';
        this.view.btnDecisionsAdministrative.right = '48%';
        this.view.btnContact.isVisible = true;
        this.view.btnSupport.isVisible = true;
        this.view.btnAidInformation.isVisible = true;
        this.view.btnApplyBenefits.isVisible = true;
        this.view.btnDecisionsAdministrative.isVisible = true;
      }if(widthVal >= 720  && widthVal <= 768){
        this.view.height = '50px';
        this.view.BtnLogin.width= 'preferred';
        this.view.btnDecisionsAdministrative.width= '140px';
        this.view.btnApplyBenefits.width= '70px';
        this.view.btnAidInformation.width= '105px';
        this.view.imgHeaderLogo.width = '200px';
        this.view.imgHeaderLogo.left = '1%';
        this.view.btnHeaderLogoss.height = '80%';
        this.view.BtnLogin.right= '0%';
        this.view.btnContact.right = '10%';
        this.view.btnSupport.right = '19%';
        this.view.btnAidInformation.right = '27%';
        this.view.btnApplyBenefits.right = '41%';
        this.view.btnDecisionsAdministrative.right = '51%';
        this.view.btnContact.isVisible = true;
        this.view.btnSupport.isVisible = true;
        this.view.btnAidInformation.isVisible = true;
        this.view.btnApplyBenefits.isVisible = true;
        this.view.btnDecisionsAdministrative.isVisible = true;
      }  if(widthVal <= 720 ){
        this.view.height = '40px';
        this.view.BtnLogin.width= '90px';
        this.view.BtnLogin.right= '0%';
        this.view.imgHeaderLogo.width = '250px';
        this.view.imgHeaderLogo.left = '1%';
		this.view.btnHeaderLogoss.height = '100%';
        this.view.btnContact.isVisible = false;
        this.view.btnSupport.isVisible = false;
        this.view.btnAidInformation.isVisible = false;
        this.view.btnApplyBenefits.isVisible = false;
        this.view.btnDecisionsAdministrative.isVisible = false;
      } if(widthVal > 1130){
        this.view.height = '50px';
        this.view.BtnLogin.width= 'preferred';
        this.view.btnContact.isVisible = true;
        this.view.btnSupport.isVisible = true;
        this.view.btnAidInformation.isVisible = true;
        this.view.btnApplyBenefits.isVisible = true;
        this.view.btnDecisionsAdministrative.isVisible = true;
        this.view.btnDecisionsAdministrative.width= (widthVal >= 1024 && widthVal <= 1600)? '200px':'preferred';
        this.view.btnApplyBenefits.width= 'preferred';
        this.view.btnAidInformation.width= 'preferred';
        this.view.imgHeaderLogo.width = '250px';
        this.view.imgHeaderLogo.left = '5%';
        this.view.btnHeaderLogoss.height = '100%';
        this.view.BtnLogin.right= '2%';
        this.view.btnContact.right = '10%';
        this.view.btnSupport.right = '16%';
        this.view.btnAidInformation.right = '22%';
        this.view.btnApplyBenefits.right = '37%';
        this.view.btnDecisionsAdministrative.right = '49%';
      }
      this.view.forceLayout();
    }
  };
});