define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.lblLoginTextTitle.accessibilityConfig = {
        "a11yLabel" : "Top 10 Reasons to Register with SHARE",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.lblTextTitle.accessibilityConfig = {
        "a11yLabel" : "Request a Hearing Options",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      amplify.subscribe("PreloginHearingRequest", this, this.onBreakpointChange, 1);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },   
    onBreakpointChange: function(width){
      if(width <= 900){
        this.view.btnLogin.skin = 'sknBtnLigthRedBgWhiteTxtNormal100';
        this.view.btnRegisterNow.skin = 'sknBtnLigthRedBgWhiteTxtNormal00';
        this.view.btnContinue.skin = 'sknBtnLigthRedBgWhiteTxtNormal100';       
        this.view.flxSelection.isVisible = false; 
        this.view.lblNote.isVisible = false;
        this.view.flxOptions.isVisible = true;  
        this.view.flxLeft.width = "100%";
        this.view.flxRight.width  = "100%";
        this.view.flxPostit.width = "100%";
//         this.view.flxContent.height = "1000px";
        this.view.flxTop.layoutType = voltmx.flex.FLOW_VERTICAL;
      }else if(width > 900){
        this.view.btnLogin.skin = 'sknBtnLigthRedBgWhiteTxtNormal100';
        this.view.btnRegisterNow.skin = 'sknBtnLigthRedBgWhiteTxtNormal100';
        this.view.btnContinue.skin = 'sknBtnLigthRedBgWhiteTxtNormal100';

        this.view.flxSelection.isVisible = true; 
        this.view.lblNote.isVisible = true; 
        this.view.flxOptions.isVisible = false;  
        this.view.flxLeft.width = "50%";
        this.view.flxRight.width  = "50%";
        this.view.flxPostit.width = "70%";
//         this.view.flxContent.height = "800px";
        this.view.flxTop.layoutType = voltmx.flex.FLOW_HORIZONTAL;
      }
      this.view.forceLayout();
    }, 
  };
});