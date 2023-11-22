define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.PrimaryButton.onClickNav = this.setClickNav;
      this.view.flxPerYourClassheadingContainer.accessibilityConfig = {
        "a11yLabel": this.view.lblAccessShare.text,
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    setClickNav:function(){
      if (this.view.PrimaryButton.buttonText.trim() === 'LOGIN'){
        this.navigateTo('frmLogin');
      }
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    navigateTo:function(form){
      var x = new kony.mvc.Navigation(form);
      x.navigate();
    },
    breakPointChange:function(widthVal){
      if(widthVal <= 1024 && widthVal >= 900 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '2.5%';
        
        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.width = '90%';
        this.view.flxContentSquare2.left = '2.5%';
        
        this.view.imgPostitImage.right= '2.5%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblTitle2.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rtDescription.skin = "CopydefRichTextRegular16px";
        this.view.rtDescription2.skin = "CopydefRichTextRegular16px";
        
      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '2.5%';
        
        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.width = '90%';
        this.view.flxContentSquare2.left = '2.5%';
        
        this.view.imgPostitImage.right= '2.5%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblTitle2.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rtDescription.skin = "CopydefRichTextRegular16px";
        this.view.rtDescription2.skin = "CopydefRichTextRegular16px";
        
      } if(widthVal <= 720 ){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxSquare1.width = '100%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.width = '100%';
        this.view.flxContentSquare1.right = '0px';
        
        this.view.flxSquare2.width = '100%';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.width = '100%';
        this.view.flxContentSquare2.left = '0px';
        this.view.flxContentSquare2.bottom = '0px';
        
        this.view.imgPostitImage.right= '5%';
        this.view.imgPostitImage.width= '90%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblTitle2.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rtDescription.skin = "CopydefRichTextRegular16px";
        this.view.rtDescription2.skin = "CopydefRichTextRegular16px";

        this.view.lblAccessShare.top = '0px';
        
      } if(widthVal > 1024){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '2.5%';
        
        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.width = '90%';
        this.view.flxContentSquare2.left = '2.5%';
        this.view.flxContentSquare2.bottom = '30px';
        this.view.flxContentSquare2.height = 'preferred';
        
        this.view.imgPostitImage.right= '2.5%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold38px';
        this.view.lblTitle2.skin = 'lblFont700017OpenSansSemiBold38px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular24px';
        this.view.rtDescription.skin = "CopydefRichTextRegular24px";
        this.view.rtDescription2.skin = "CopydefRichTextRegular24px";
        this.view.lblAccessShare.top = '32px';
        
      }
      this.view.forceLayout();
    }
  };
});