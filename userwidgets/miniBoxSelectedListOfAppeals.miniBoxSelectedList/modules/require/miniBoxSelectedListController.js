define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
 		this.view.sgmListOfAppeals.data = [];
	},
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
	
	setData:function(data) {
	  // lblProgram, lblOBName, lblIssue, lblAppealId
	  this.view.sgmListOfAppeals.setData(data);
      this.view.sgmListOfAppeals.forceLayout();
      this.view.forceLayout();
	}
  };
});