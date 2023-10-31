define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.lblSeeDetailsText.onTouchEnd = this.openLink;
      this.view.imgMoreDetailsIcon.onTouchEnd = this.openLink;
      amplify.subscribe("loginMain", this, this.onBreakpointChange, 1);

    },
    openLink:function() {
      kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/indexOHLanding.jsp#wlp_applyForBenefits14");
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
		this.view.lblTextLogIn.skin = 'sknLblBlackBold125Mobile';
        this.view.lblSeeDetailsText.skin = 'sknLblBlueBold95Mobile';
      }
      else {
		this.view.lblTextLogIn.skin = 'sknLblBlackBold125';
        this.view.lblSeeDetailsText.skin = 'sknLblBlueBold95';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     
  };
});