define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.PrimaryButton.onClickNav = this.setClickNav;
      this.view.flxVideoReverseHeadingContainer.accessibilityConfig = {
        "a11yLabel" : "",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },    
    setClickNav:function(){
      if (this.view.PrimaryButton.buttonText.trim() === 'BEFORE A HEARING'){
        this.navigateTo('frmBeforeHearing');
      }
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    navigateTo:function(form){
      var x = new kony.mvc.Navigation(form);
      x.navigate();
    },
    breakPointChange:function(widthVal){
      if(widthVal >= 900 && widthVal <= 1024 ){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxSquare1.left = '0%';
        this.view.flxSquare1.right = '';
        this.view.flxSquare1.top = '10px';
        this.view.flxSquare1.width = '100%';
        this.view.flxSquare1.height = 'preferred';
        this.view.flxContentSquare1.left = '17%';
        this.view.flxContentSquare1.right = '5%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.bottom = '';
        this.view.flxContentSquare1.width = '';
        this.view.flxContentSquare1.height = 'preferred';
        this.view.browserHearingVideo.width = '80%';
        this.view.browserHearingVideo.height = '359px';        
        this.view.flxSquare2.left = '5%';
        this.view.flxSquare2.right = '';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.centerX = '';
        this.view.flxSquare2.height = '350px';
        this.view.flxSquare2.width = '350px';
        this.view.flxContentSquare2.left = '';
        this.view.flxContentSquare2.right = '';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.bottom = '0px';
        this.view.flxContentSquare2.width = '355px';
        this.view.flxContentSquare2.height = '360px';
        this.view.flxContentSquare2.centerX = '50%';
      } if(widthVal >= 721 && widthVal < 900){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxSquare1.left = '0%';
        this.view.flxSquare1.rigth = '';
        this.view.flxSquare1.top = '0px';
        this.view.flxSquare1.bottom = '-50px';
        this.view.flxSquare1.width = '100%';
        this.view.flxSquare1.height = 'preferred';
        this.view.flxContentSquare1.left = '17%';
        this.view.flxContentSquare1.right = '5%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.bottom = '';
        this.view.flxContentSquare1.width = '';
        this.view.flxContentSquare1.height = 'preferred';
        this.view.browserHearingVideo.width = '90%';
        this.view.browserHearingVideo.height = '304px';         
        this.view.flxSquare2.left = '5%';
        this.view.flxSquare2.right = '';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.centerX = '';
        this.view.flxSquare2.height = '320px';
        this.view.flxSquare2.width = '320px';
        this.view.flxContentSquare2.left = '';
        this.view.flxContentSquare2.right = '';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.bottom = '0px';
        this.view.flxContentSquare2.width = '320px';
        this.view.flxContentSquare2.height = '320px';
        this.view.flxContentSquare2.centerX = '50%';
        this.view.flxContainerText.top = '23%';
      } if(widthVal <= 720 ){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxSquare1.left = '0%';
        this.view.flxSquare1.top = '0px';
        this.view.flxSquare1.width = '100%';
        this.view.flxSquare1.height = 'preferred';
        this.view.flxSquare1.bottom = 'Default';
        this.view.flxContentSquare1.right = '0%';
        this.view.flxContentSquare1.left = '';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.bottom = 'Default';
        this.view.flxContentSquare1.width = '100%';
        this.view.flxContentSquare1.height = 'preferred';
        this.view.browserHearingVideo.width = '100%';
        this.view.browserHearingVideo.height = '211px';       
        this.view.flxSquare2.right = '';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.centerX = '50%';
        this.view.flxSquare2.bottom = '';
        this.view.flxSquare2.height = '330px';
        this.view.flxSquare2.width = '100%';
        this.view.flxContentSquare2.right = '';
        this.view.flxContentSquare2.left = '';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.bottom = '0px';
        this.view.flxContentSquare2.height = 'preferred';
        this.view.flxContentSquare2.width = '100%';
        this.view.top = '-30px';
        this.view.flxButton.top = '30px';
        this.view.lblLoginTextTitle.top = '10px';
        this.view.flxMainContainer.bottom = '0px';
      } if(widthVal > 1024){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.top = '0px';
        this.view.flxButton.top = '15px';
        this.view.lblLoginTextTitle.top = '0px';
        this.view.flxMainContainer.bottom = '50px';
        this.view.flxSquare1.left = '0%';
        this.view.flxSquare1.rigth = '';
        this.view.flxSquare1.top = '10';
        this.view.flxSquare1.bottom = '';
        this.view.flxSquare1.width = '100%';
        this.view.flxSquare1.height = 'preferred';
        this.view.flxContentSquare1.left = '17%';
        this.view.flxContentSquare1.right = '6%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.bottom = '';
        this.view.flxContentSquare1.width = '';
        this.view.flxContentSquare1.height = 'preferred';
        this.view.browserHearingVideo.width = '90%';
        this.view.browserHearingVideo.height = '561px';
        this.view.flxSquare2.left = '5%';
        this.view.flxSquare2.right = '';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.centerX = '';
        this.view.flxSquare2.height = '350px';
        this.view.flxSquare2.width = '350px';
        this.view.flxContentSquare2.left = '';
        this.view.flxContentSquare2.right = '';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.bottom = '0px';
        this.view.flxContentSquare2.width = '355px';
        this.view.flxContentSquare2.height = '360px';
        this.view.flxContentSquare2.centerX = '50%';
      }
      if(widthVal > 1600){
        this.view.flxContentSquare1.left = '8%';
        this.view.browserHearingVideo.width = '86%';
        this.view.browserHearingVideo.height = '610px';        
      }
      this.view.forceLayout();
    }
  };
});