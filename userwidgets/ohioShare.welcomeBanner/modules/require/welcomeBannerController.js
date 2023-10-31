define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxWelcomeHeadingContainer.accessibilityConfig = {
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
      this.view.imgBg.centerX = '50%'; 
      if(widthVal <= 1024 && widthVal >= 900 ){
        this.view.imgBg.width = '1024px';
        this.view.imgBg.top = '0px';
        this.view.flxContainerPostIt.height = '500px';
        this.view.flxContainerPostIt.right = '5%';
        this.view.flxContainerPostIt.width = '450px';
        this.view.flxContainerPostIt.left = '';
        this.view.flxContainerPostIt.top = '-460px';
        this.view.imgPostitImage.height = '540px';
        this.view.flxMainContainer.skin = 'slFbox';
      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.imgBg.width = '1200px';
        this.view.imgBg.top = '-120px';
        this.view.imgBg.left = '40px';        
        this.view.flxContainerPostIt.height = '460px';
        this.view.flxContainerPostIt.right = '-2%';
        this.view.flxContainerPostIt.width = '450px';
        this.view.flxContainerPostIt.left = '';
        this.view.flxContainerPostIt.top = '-260px';
        this.view.imgPostitImage.height = '540px';
        this.view.flxMainContainer.skin = 'slFbox';
   
      } if(widthVal < 768 && widthVal > 720 ){
        this.view.imgBg.width = '900px ';
        this.view.imgBg.top = '0px';
        this.view.flxContainerPostIt.height = '500px';
        this.view.flxContainerPostIt.right = '0%';
        this.view.flxContainerPostIt.width = '450px';
        this.view.flxContainerPostIt.left = '';
        this.view.flxContainerPostIt.top = '-460px';
        this.view.imgPostitImage.height = '540px';
        this.view.flxMainContainer.skin = 'slFbox';
        //this.view.lblLoginTextTitle.top = '100px';
      } if(widthVal <= 720 ){
        this.view.imgBg.width= '1220px';
        this.view.imgBg.height = 'preferred';
        
        this.view.imgBg.top = '-135px';
        //this.view.imgBg.left = '-230px';
        this.view.imgBg.centerX = '101%'; //this is weird but it works   
        this.view.flxContainerPostIt.height = '500px';
        this.view.flxContainerPostIt.width = '100%';
        this.view.flxContainerPostIt.right = '0px';
        this.view.flxContainerPostIt.left = '0px';
        this.view.flxContainerPostIt.top = '-125px';
        this.view.imgPostitImage.height = 'preferred';       
        this.view.flxMainContainer.skin = 'sknFlxBgFFBE0E';
        
        //this.view.lblLoginTextTitle.top = '150px';     
      } if(widthVal > 1024){
        this.view.imgBg.width = '1600px';
        this.view.imgBg.top = '0px';
        this.view.flxContainerPostIt.height = '500px';
        this.view.flxContainerPostIt.right = '5%';
        this.view.flxContainerPostIt.width = '450px';
        this.view.flxContainerPostIt.left = '';
        this.view.flxContainerPostIt.top = '-460px';
        this.view.imgPostitImage.height = '540px';
        this.view.flxMainContainer.skin = 'slFbox';
        //this.view.lblLoginTextTitle.top = '100px';
      }

      this.view.forceLayout();
    },
  };
});