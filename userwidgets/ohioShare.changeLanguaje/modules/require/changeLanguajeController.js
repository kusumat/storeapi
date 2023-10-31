define(function () {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.view.lstBoxLanguages.onSelection = this.setLocale;
      this.view.btnDetailCommits.onClick = this.navigateCommits;
      //alert(globalChatConfig.env);
      if (globalChatConfig.env  === "prod")
      {
        this.view.flxCntnDetailCommits.isVisible = false;
        this.view.btnDetailCommits.isVisible = false;
      }
      else
      {
        this.view.flxCntnDetailCommits.isVisible = true;
        this.view.btnDetailCommits.isVisible = true;
      }
      this.view.flxLangHeadingContainer.accessibilityConfig = {
        "a11yLabel": "Language Section",
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
      this.view.lblSelecttext.accessibilityConfig = {
        "a11yIndex": 0,
        "a11yHidden": false
      };
      this.view.lstBoxLanguages.accessibilityConfig = {
        "a11yIndex": 0,
        "a11yHidden": false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {

    },
    
    navigateCommits: function(){
      var ntf = new kony.mvc.Navigation('frmSHARECommitDetails');
      ntf.navigate();
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