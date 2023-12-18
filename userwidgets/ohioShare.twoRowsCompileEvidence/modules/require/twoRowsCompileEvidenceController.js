define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.PrimaryButton.onClickNav = this.setClickNav;

      if (this.view.lblLoginTextTitle.text !== "&nbsp;"){
        this.view.flxCompileEvidenceContainer.accessibilityConfig = {
        "a11yLabel": this.view.lblLoginTextTitle.text,
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false};
      }

      if (this.view.lblAccessShare.text !== "&nbsp;"){
        this.view.flxCompileEvidenceheading2Container.accessibilityConfig = {
        "a11yLabel": this.view.lblAccessShare.text,
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
        };
      }      

      
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
      if(widthVal < 1024 && widthVal >= 900 ){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';

        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.width = '90%';
        
        this.view.flxSkeleton.top = '0px';
        
        this.view.flxSquare1.skin = 'sknFlxBg5890BC';
        
        this.view.lblTitleForm.skin = 'lblFont000000OpenSansSemiBold36px';
        this.view.lblLoginDisclaimForm.skin = 'lblFont000000OpenSansRegular18px';
        this.view.flxContentSquare1.skin = 'slFbox';
        this.view.lblLoginTextTitle.top = '0px';

      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';

        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.width = '85%';
        
        this.view.flxSkeleton.top = '0px';
        
        this.view.flxSquare1.skin = 'sknFlxBg5890BC';
        
        this.view.lblTitleForm.skin = 'lblFont000000OpenSansSemiBold33px';
        this.view.lblLoginDisclaimForm.skin = 'lblFont000000OpenSansRegular16px';
        this.view.flxContentSquare1.skin = 'slFbox';
        this.view.lblLoginTextTitle.top = '10px';

      } if(widthVal <= 720 ){
        const blueBGSkin = 'sknFlxBg5890BC';
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxSquare1.width = '100%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.width = '100%';

        this.view.flxSquare2.width = '100%';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.width = '100%';
        this.view.lblLoginTextTitle.top = '10px';
        
        // this.view.flxSkeleton.top = '-30px';
        if(this.view.flxSkeleton.reverseLayoutDirection){
          this.view.flxContentSquare1.right= '0%';
        }
        
        this.view.flxSquare1.skin = 'sknFlxBgFFFFFF';
        
        this.view.lblTitleForm.skin = 'lblFont000000OpenSansSemiBold33px';
        this.view.lblLoginDisclaimForm.skin = 'lblFont000000OpenSansRegular16px';
        
        if (this.view.flxSkeleton.reverseLayoutDirection) {
          this.view.flxContentSquare1.skin = blueBGSkin;
        }
        this.view.lblLoginTextTitle.top = '10px';

      } if(widthVal > 1024){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';

        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.width = '90%';
        
        this.view.flxSkeleton.top = '0px';
        
        this.view.flxSquare1.skin = 'sknFlxBg5890BC';
        
        this.view.lblTitleForm.skin = 'lblFont000000OpenSansSemiBold36px';
        this.view.lblLoginDisclaimForm.skin = 'lblFont000000OpenSansRegular18px';
        this.view.flxContentSquare1.skin = 'slFbox';
        this.view.lblLoginTextTitle.top = '0px';

      }
      this.view.forceLayout();
    }
  };
});