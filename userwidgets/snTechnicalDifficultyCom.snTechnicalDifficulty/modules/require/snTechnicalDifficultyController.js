define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnCloseWindow.onClick = this.closeWindow;
      this.view.lblDesc1.text = "widget assigned default value.";
      this.view.lblSuggestedAction.text = "widget assigned suggested action.";
      this.view.lblSuggestedAction.isVisible = false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
		
    },
    
    closeWindow:function() {
      closePopupWindow();
    }
  };
});