define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    getSelectedAttorney:function() {
      return this.view.radioYesNo.selectedKey;
    }

  };
});