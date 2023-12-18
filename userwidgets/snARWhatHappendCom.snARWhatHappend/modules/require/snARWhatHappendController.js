define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.radioWhatHappened.onSelection = this.onSelectionWhatHappened;

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    onSelectionWhatHappened:function() {
      kony.print("inside onSelectionWhatHappened");
      gblWhatHappenedCode = this.view.radioWhatHappened.selectedKeyValue[0];
      gblWhatHappenedText = this.view.radioWhatHappened.selectedKeyValue[1];
    },

  };
});