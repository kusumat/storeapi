define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
		this.view.btnSubmitAnotherIssue.onClick = this.submitAnotherIssue;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      

    },

    submitAnotherIssue:function() {
      //resetGlobals();
      gblSubmitAnotherIssue = true;
      var ntf = new kony.mvc.Navigation("frmHearingRequestStep3");
      var params = {"isBack":true};
      ntf.navigate(params);    
    }
    
  };
});