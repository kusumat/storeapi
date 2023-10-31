define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

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
        
      }
      this.view.forceLayout();
    }
  };
});