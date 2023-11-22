define(function() {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.view.flxCntnrPreviousPageHeading.accessibilityConfig = {
        "a11yLabel" : "Previous Page Navigation",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yHidden" : false 
      };
      this.view.postShow = this.postShow;
    },
    postShow: function() {
      this.view.txtBoxSearchField.setFocus(true);
    },
  };
});