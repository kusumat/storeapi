define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1); 
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblDesc2.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
      }
      else {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblDesc2.skin = 'sknLblSubtitleDarkGrayRegMedium';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },       
  };
});