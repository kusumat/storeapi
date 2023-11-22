define(function() {

  var continueButton;
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      var checkBoxObject = [["I Agree", "I Agree", accessibilityConfig={"a11yHidden": false, "a11yLabel": "I Agree", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxAgreeChecks.masterData = checkBoxObject;
      this.view.CheckBoxAgreeChecks.onSelection = this.selection;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    setComponentData: function(contButton) {
      gblWithdrawAgree = false;
      this.view.CheckBoxAgreeChecks.selectedKeys = null;
      this.continueButton = contButton;
    },

    selection: function() {
      if(this.view.CheckBoxAgreeChecks.selectedKeys !== null)
        gblWithdrawAgree = true; //this.continueButton.btnContinueSetEnabled(true);
      else
        gblWithdrawAgree = false; //this.continueButton.btnContinueSetEnabled(false);
    },

    hideForAA: function() {
      this.view.lblDesc2.setVisibility(false);
    },

  };
});