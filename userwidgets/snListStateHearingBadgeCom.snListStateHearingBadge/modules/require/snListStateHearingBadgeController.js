define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            
		},
      
        setSubComponentData:function(appealList, title, appellantName, message, displayNew) {
          var top = displayNew ? "-8px" : "16px";
          this.view.snListHearingGroupItem.top = top;  
          this.view.snListHearingGroupItem.setSectionData(appealList, title, appellantName, message);
        }
	};
});