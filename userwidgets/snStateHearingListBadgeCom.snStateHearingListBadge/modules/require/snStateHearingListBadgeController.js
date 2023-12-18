define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            
		},
      
        setSubComponentData:function(appealList, title, message, displayNew) {
          var top = displayNew ? "-8px" : "16px";
          this.view.hearingGroupItem.top = top;  
          this.view.hearingGroupItem.setSectionData(appealList, title, message);
        }
	};
});