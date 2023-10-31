define(function () {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.view.lstBoxLanguages.onSelection = this.setLocale;
      this.view.flxLangHeadingContainer.accessibilityConfig = {
        "a11yLabel" : "",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.lblSelecttext.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.lstBoxLanguages.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {

    },

    setLocale: function () {
      kony.i18n.setCurrentLocaleAsync(this.view.lstBoxLanguages.selectedKey, this.setLocaleSuccess, this.setLocaleFailure);
    },

    setLocaleSuccess: function () {
      setLocaleSuccess();
    },

    setLocaleFailure: function () {
      //this.view.setVisibility(false);
    },
  };
});