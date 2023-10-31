define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.buttonHamBurgerOpen.onClick = this.openingMenu;
      this.view.btnFAQ.onClick = this.navigateTo.bind(this,'frmFAQ');
      this.view.btnregistration.onClick = this.navigateTo.bind(this,'frmRegistration');
      this.view.btnAfterHearing.onClick = this.navigateTo.bind(this,'frmAfterHearing');
      this.view.btnDuringHearing.onClick = this.navigateTo.bind(this,'frmDuringHearing');
      this.view.btgtnBeforeHearing.onClick = this.navigateTo.bind(this,'frmBeforeHearing');
      this.view.btnConnectHearing.onClick = this.navigateTo.bind(this,'frmConnectToHearing');
      this.view.BtnLogoHome.onClick = this.navigateTo.bind(this,'frmHomeScreen');
      this.view.BtnLogoHomeMobile.onClick = this.navigateTo.bind(this,'frmHomeScreen');
      this.view.flxSHARENavHeadingContainer.accessibilityConfig = {
        "a11yLabel" : "SHARE Navigation",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    typeSkinButton:String(''),
    typeSkinButtonSelected:String(''),
    openingMenu:function(){
      try
      {
        if (currentFrm.view.chatbotFAQiframe.isConversationOpen()){
          currentFrm.onClickChat();
        }
      }
      catch(e)
    {}
      var pForm = kony.application.getCurrentForm();
      pForm.hamburgerMenu.show();
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    navigateTo:function(form, self){
      var x = new kony.mvc.Navigation(form);
      x.navigate();
    },
    setCurrentPage:function(page){
//       const normalSkin = 'sknBtnFontFFFFFFSansProBold18px';
//       const selectedSkin = 'sknBtnBorderFontFFFFFFSansProBold18px';sknBtnBorderFontFFFFFFSansProBold16px
      const normalSkin = this.typeSkinButton;
      const selectedSkin = this.typeSkinButtonSelected;
      this.view.btnFAQ.skin = normalSkin;
      this.view.btnAfterHearing.skin = normalSkin;
      this.view.btnDuringHearing.skin = normalSkin;
      this.view.btgtnBeforeHearing.skin = normalSkin;
      this.view.btnConnectHearing.skin = normalSkin;
      this.view.btnregistration.skin = normalSkin;
       
      if (page === 'frmRegistration') {
        this.view.btnregistration.skin = selectedSkin;
      } else if (page === 'frmBeforeHearing') {
        this.view.btgtnBeforeHearing.skin = selectedSkin;
      } else if (page === 'frmConnectToHearing') {
        this.view.btnConnectHearing.skin = selectedSkin;
      } else if (page === 'frmDuringHearing') {
        this.view.btnDuringHearing.skin = selectedSkin;
      } else if (page === 'frmAfterHearing') {
        this.view.btnAfterHearing.skin = selectedSkin;
      } else if (page === 'frmFAQ') {
        this.view.btnFAQ.skin = selectedSkin;
      }
    },

    changinSkin:function(isDesktop){
      this.typeSkinButton = isDesktop ? 'sknBtnFontFFFFFFSansProBold18px':'sknBtnFontFFFFFFSansProSemiBold16px';
      this.typeSkinButtonSelected = isDesktop ? 'sknBtnBorderFontFFFFFFSansProBold18px':'sknBtnBorderFontFFFFFFSansProBold16px';
      this.view.btnFAQ.skin = this.typeSkinButton;
      this.view.btnFAQ.focusSkin = this.typeSkinButton;
      
      this.view.btnAfterHearing.skin = this.typeSkinButton;
      this.view.btnAfterHearing.focusSkin = this.typeSkinButton;
      
      this.view.btnDuringHearing.skin = this.typeSkinButton;
      this.view.btnDuringHearing.focusSkin = this.typeSkinButton;
      
      this.view.btnConnectHearing.skin = this.typeSkinButton;
      this.view.btnConnectHearing.focusSkin = this.typeSkinButton;      
      
      this.view.btgtnBeforeHearing.skin = this.typeSkinButton;
      this.view.btgtnBeforeHearing.focusSkin = this.typeSkinButton;
      
      this.view.btnregistration.skin = this.typeSkinButton;
      this.view.btnregistration.focusSkin = this.typeSkinButton;
      
    },
    breakPointChange:function(widthVal){
      if(widthVal >= 1024 && widthVal <= 1200){
        this.view.height = '145px';
        this.view.imgHeaderLogo.isVisible= true;
        this.view.imgLogoResponsive.isVisible= false;
        this.view.flxNavButtonsContainer.isVisible= true;
        this.view.buttonHamBurgerOpen.isVisible= false;
        this.view.imgHeaderLogo.width = '210px';
        this.view.btnAfterHearing.width= '95px';
        this.view.btnDuringHearing.width= '95px';
        this.view.btgtnBeforeHearing.width= '95px';
        this.view.btnConnectHearing.width= '95px';
        
        this.view.btnregistration.right= '57%';
        this.view.btgtnBeforeHearing.right= '45%';
        this.view.btnConnectHearing.right= '32%';
        this.view.btnDuringHearing.right= '20%';
        this.view.btnAfterHearing.right= '11%';
        this.view.btnFAQ.right= '5%';
        
        this.changinSkin(false);
      }if(widthVal >= 900 && widthVal <= 1024){
        this.view.height = '145px';
        this.view.imgHeaderLogo.isVisible= true;
        this.view.imgLogoResponsive.isVisible= false;
        this.view.flxNavButtonsContainer.isVisible= true;
        this.view.buttonHamBurgerOpen.isVisible= false;
        this.view.imgHeaderLogo.width = '210px';
        this.view.btnAfterHearing.width= '95px';
        this.view.btnDuringHearing.width= '95px';
        this.view.btgtnBeforeHearing.width= '95px';
        this.view.btnConnectHearing.width= '95px';
        
        this.view.btnregistration.right= '57%';
        this.view.btgtnBeforeHearing.right= '45%';
        this.view.btnConnectHearing.right= '32%';
        this.view.btnDuringHearing.right= '20%';
        this.view.btnAfterHearing.right= '11%';
        this.view.btnFAQ.right= '5%';
        
        this.changinSkin(false);
      } if(widthVal >= 768 && widthVal <= 900){
        this.view.height = '145px';
        this.view.imgHeaderLogo.isVisible= true;
        this.view.imgLogoResponsive.isVisible= false;
        this.view.flxNavButtonsContainer.isVisible= true;
        this.view.buttonHamBurgerOpen.isVisible= false;
        this.view.imgHeaderLogo.width = '210px';
        this.view.btnAfterHearing.width= '95px';
        this.view.btnDuringHearing.width= '95px';
        this.view.btgtnBeforeHearing.width= '95px';
        this.view.btnConnectHearing.width= '95px';
        
        this.view.btnregistration.right= '53%';
        this.view.btgtnBeforeHearing.right= '41%';
        this.view.btnConnectHearing.right= '30%';
        this.view.btnDuringHearing.right= '18%';
        this.view.btnAfterHearing.right= '7%';
        this.view.btnFAQ.right= '1%';
        
        this.changinSkin(false);
      } if(widthVal >= 720  && widthVal <= 768){
        this.view.height = '145px';
        this.view.imgHeaderLogo.isVisible= true;
        this.view.imgLogoResponsive.isVisible= false;
        this.view.flxNavButtonsContainer.isVisible= true;
        this.view.buttonHamBurgerOpen.isVisible= false;
        this.view.imgHeaderLogo.width = '210px';
        this.view.btnAfterHearing.width= '95px';
        this.view.btnDuringHearing.width= '95px';
        this.view.btgtnBeforeHearing.width= '95px';
        this.view.btnConnectHearing.width= '95px';
        
        this.view.btnregistration.right= '51%';
        this.view.btgtnBeforeHearing.right= '39%';
        this.view.btnConnectHearing.right= '28%';
        this.view.btnDuringHearing.right= '16%';
        this.view.btnAfterHearing.right= '5%';
        this.view.btnFAQ.right= '1%';


      } if(widthVal <= 720 ){
        this.view.height = '100px';
        this.view.imgHeaderLogo.isVisible= false;
        this.view.imgLogoResponsive.isVisible= true;
        this.view.flxNavButtonsContainer.isVisible= false;
        this.view.buttonHamBurgerOpen.isVisible= true;
        this.changinSkin(false);
        
      } if(widthVal > 1200){
        this.view.height = '145px';
        this.view.imgHeaderLogo.isVisible= true;
        this.view.imgLogoResponsive.isVisible= false;
        this.view.flxNavButtonsContainer.isVisible= true;
        this.view.buttonHamBurgerOpen.isVisible= false;
        this.view.imgHeaderLogo.width = '250px';
        this.view.btnAfterHearing.width= 'preferred';
        this.view.btnDuringHearing.width= 'preferred';
        this.view.btgtnBeforeHearing.width= 'preferred';
        this.view.btnConnectHearing.width= 'preferred';
        
        this.view.btnregistration.right= '63%';
        this.view.btgtnBeforeHearing.right= '49%';
        this.view.btnConnectHearing.right= '33%';
        this.view.btnDuringHearing.right= '18%';
        this.view.btnAfterHearing.right= '5%';
        this.view.btnFAQ.right= '1%';
        
        this.changinSkin(true);
      }
      this.view.forceLayout();
    }
  };
});