define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.lblTextRegisterNow.onTouchEnd = this.openLink;
      this.view.imgDownArrow.onTouchEnd = this.openLink;      
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    openLink:function() {
      kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/indexOHLanding.jsp#wlp_applyForBenefits14");
    },    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.flxContainerLoggedUser.right = '0%';
        this.view.imgMainLogoApp.left = '0%';
        this.view.lblTextRegisterNow.skin = 'sknLblRegularWhiteStandarMobile';
        this.view.flxDownUserLogged.width = '10dp';
        this.view.flxDownUserLogged.height = '10dp';
        this.view.lblTextRegisterNow.right = '0dp';
      }
      else {
        this.view.flxContainerLoggedUser.right = '5%';       
        this.view.imgMainLogoApp.left = '5%';
        this.view.lblTextRegisterNow.skin = 'sknLblRegularWhiteStandar';
        this.view.flxDownUserLogged.width = '50dp';
        this.view.flxDownUserLogged.height = '50dp';  
        this.view.lblTextRegisterNow.right = '0dp';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },       
  };
});