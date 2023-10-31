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
        this.view.lblTitle2.skin = 'sknLblGrayishDark115Mobile';
        this.view.sgmDataThingsYouNeed.rowTemplate = 'flxtmpSgmYellowMarkListPrefMobile';
      }
      else {
		this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblTitle2.skin = 'sknLblGrayishDark115';
        this.view.sgmDataThingsYouNeed.rowTemplate = 'flxtmpSgmYellowMarkListPref';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     
    
    hideForAA: function() {
      this.view.lblTitle2.setVisibility(false);
      this.view.sgmDataThingsYouNeed.setVisibility(false);

    },
  };
});