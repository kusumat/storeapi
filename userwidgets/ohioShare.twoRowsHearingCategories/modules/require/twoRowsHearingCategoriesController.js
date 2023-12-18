define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.PrimaryButton.onClickNav = this.setClickNav;
      this.view.flxHearingCategoryHeadingContainer.accessibilityConfig = {
        "a11yLabel": this.view.lblAccessShare.text,
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    setClickNav:function(){
      var buttonText = this.view.PrimaryButton.buttonText.trim();
      if (buttonText === 'LOGIN'){
        this.navigateTo('frmLogin');
      }else if (buttonText === 'ACCESS APPEAL DECISION RECORDS'){
        this.openLink();
      }
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    navigateTo:function(form){
      var pForm =  kony.application.getCurrentForm();
      var x = new kony.mvc.Navigation(form);
      x.navigate();
    },
    openLink: function () {
      kony.application.openURL("http://www.odjfs.state.oh.us/HearingsAppeals/");
    },
    updatingRowSkin:function(template){
      var data = this.view.sgmTabData.data;
      this.view.sgmTabData.rowTemplate = template;
      this.view.sgmTabData.data = data;
      
    },
    breakPointChange:function(widthVal){
      if(widthVal <= 1024 && widthVal >= 900 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.left = '0%';
        
        this.view.flxSquare2.width = '45%';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.right = '0%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.width = '90%';
        this.view.flxContentSquare2.right = '5%';
        
        this.view.imgPostitImage.right= '0%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rTextDescription.skin='richTextNormalBlack16px';
        this.updatingRowSkin('flxtmpSgmTabItem16');
        
      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.left = '0%';
        
        this.view.flxSquare2.width = '50%';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.right = '0%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.width = '90%';
        this.view.flxContentSquare2.right = '5%';
        
        this.view.imgPostitImage.right= '0%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rTextDescription.skin='richTextNormalBlack16px';
        this.updatingRowSkin('flxtmpSgmTabItem16');
        
      } if(widthVal <= 720 ){
        this.view.top = '0px';
        
        this.view.flxSkeleton.top = '10px';
        
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxSquare1.width = '100%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.width = '100%';
        this.view.flxContentSquare1.left = '5%';
        
        this.view.flxSquare2.width = '100%';
        this.view.flxSquare2.top = '0px';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.width = '100%';
        this.view.flxContentSquare2.right = '5%';
        
        this.view.imgPostitImage.right= '0%';
        this.view.imgPostitImage.width= '90%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rTextDescription.skin='richTextNormalBlack16px';
        this.updatingRowSkin('flxtmpSgmTabItem16');
        //if(widthVal <= 479 ){              }
      } if(widthVal > 1024){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.left = '0%';
        
        this.view.flxSquare2.width = '45%';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.right = '0%';
        this.view.flxContentSquare2.top = '60px';
        this.view.flxContentSquare2.width = '90%';
        this.view.flxContentSquare2.right = '5%';
        
        this.view.imgPostitImage.right= '0%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold38px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular24px';
        this.view.rTextDescription.skin='richTextNormalBlack24px';
        this.updatingRowSkin('flxtmpSgmTabItem24');
      }
      this.view.forceLayout();
    }
  };
});