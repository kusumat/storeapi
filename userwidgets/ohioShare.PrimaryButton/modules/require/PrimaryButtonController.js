define(function() {

	return {
      constructor: function(baseConfig, layoutConfig, pspConfig) {
 //       this.setA11yLabel();
		},
      //Logic for getters/setters of custom properties
      initGettersSetters: function() {
        
        },
      
      setA11yLabel() {
        this.view.btnPrimary.accessibilityConfig={
  //      "a11yLabel": this.view.lblButtonText.text,
          "a11yIndex": 0,
          "a11yHidden": false
          };
//         this.view.btnSecondary.accessibilityConfig={
//           "a11yLabel": this.view.lblButtonText.text,
//           "a11yIndex": 0,
//           "a11yHidden": false
//           };
        }
	};
});