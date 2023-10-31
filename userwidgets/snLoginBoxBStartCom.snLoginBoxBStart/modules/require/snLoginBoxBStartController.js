define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnOptionsRadio.selectedKey = "";
      this.view.btnOptionsRadio.onSelection = this.getSelectedRepresentingKey;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);      
    },
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
		this.view.lblTextLogIn.skin = 'sknLblBlackBold125Mobile';
        this.view.lblStatusStepNumber.skin = 'sknLblBlackReg100Mobile';
        this.view.btnOptionsRadio.skin = 'sknRadioBtnDarkGrayReg100Mobile';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
      }
      else {
        this.view.lblTextLogIn.skin = 'sknLblBlackBold125';
        this.view.lblStatusStepNumber.skin = 'sknLblBlackReg100';
        this.view.btnOptionsRadio.skin = 'sknRadioBtnDarkGrayReg100';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    
    //Logic for getters/setters of custom properties
    getSelectedRepresentingKey:function() {
      kony.print("inside getSelectedRepresentingKey");
      gblRepresentingOption = this.view.btnOptionsRadio.selectedKey;
    },
    initGettersSetters: function() {
    }
  };
});