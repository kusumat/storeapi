define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          
          //this.view.stateHearingItem.sectionTitleText = "New Text";

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      
        setSectionTitle:function(title) {
          this.view.stateHearingItem.sectionTitleText = title;	  
        },
      
        setSectionSegmentData:function(appealDetails) {
          alert("setting segment data");
    	},
      
        setSectionData:function(appealDetails) {
          //this.view.stateHearingItem.setSectionData(appealDetails);
          this.view.stateHearingItem.setSectionData(appealDetails);
    	}, 
      
        setSubComponentData:function(appealList, title, message) {
          this.view.stateHearingItem.setSectionData(appealList, title, message);
        }      
	};
});