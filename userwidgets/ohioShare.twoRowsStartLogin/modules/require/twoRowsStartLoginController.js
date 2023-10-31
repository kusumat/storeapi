define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxLoginStartHearingContainer.accessibilityConfig = {
        "a11yLabel" : "",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    breakPointChange:function(widthVal){
      this.view.loginFields.changingTheme('black');
      this.view.loginFields.breakPointChange(widthVal);
      if(widthVal <= 1024 && widthVal >= 900 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxSquare1.top = '30px';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '0%';
        this.view.flxContentSquare1.left = '';

        this.view.flxSquare2.width = '50%';
        this.view.loginFields.top = '30px';
        this.view.loginFields.width = '80%';
        this.view.loginFields.left = '2.5%';
        
        this.view.flxSkeleton.top = '0px';
        
        this.view.flxSquare1.skin = 'sknFlxBg5890BC';


      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxSquare1.top = '30px';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '0%';
        this.view.flxContentSquare1.left = '';
        
        this.view.flxSquare2.width = '50%';
        this.view.loginFields.top = '30px';
        this.view.loginFields.width = '90%';
        this.view.loginFields.left = '2.5%';
        
        this.view.flxSkeleton.top = '0px';
        
        this.view.flxSquare1.skin = 'sknFlxBg5890BC';
        
      } if(widthVal <= 720 ){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxSquare1.width = '100%';
        this.view.flxSquare1.top = '0px';
        
        this.view.flxContainerStartHere.top = '0px';
        this.view.flxContainerStartHere.bottom = '60px';
        
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.width = '100%';
        this.view.flxContentSquare1.right = '';
        this.view.flxContentSquare1.left = '0px';

        this.view.flxSquare2.width = '100%';
        this.view.loginFields.top = '0px';
        this.view.loginFields.width = '100%';
        this.view.loginFields.left = '0px';
        this.view.flxSkeleton.top = '0px';
        
        this.view.flxSquare1.skin = 'sknFlxBgFFFFFF';
        
      } if(widthVal > 1024){
        
        this.view.flxContainerStartHere.top = '40px';
        this.view.flxContainerStartHere.bottom = '80px';
        
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxSquare1.top = '30px';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '0%';
        this.view.flxContentSquare1.left = '';

        this.view.flxSquare2.width = '50%';
        this.view.loginFields.top = '30px';
        this.view.loginFields.width = '80%';
        this.view.loginFields.left = '2.5%';
        
        this.view.flxSkeleton.top = '0px';
        
        this.view.flxSquare1.skin = 'sknFlxBg5890BC';

      }
      this.view.forceLayout();
    }
  };
});