define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    breakPointChange:function(widthVal){
      if(widthVal <= 1024 && widthVal >= 900 ){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        
      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        
      } if(widthVal <= 720 ){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        
      } if(widthVal > 1024){
        this.view.left = '2.5%';
        this.view.width = '97.5%';        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold38px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular24px';
        
      } if(widthVal > 1600){
        this.view.left = '5%';
        this.view.width = '95%';
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold38px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular24px';
        
      }
      
      this.view.forceLayout();
    }
  };
});