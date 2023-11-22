define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      
    },
    
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      
    },
    
    setData:function(data) {
      this.view.lblDescProgramName.text = data.programName;
      this.view.lblDescDescriptionProgram.text = data.programDescription;
      this.view.lblDescPersonName.text = data.personName;
      this.view.lblDescCaseNumb.text = data.caseNumber;
      this.view.lblDescIssueName.text = data.issueName;
      this.view.lblDescHearingDate.text = data.hearingDate;
      
      this.view.forceLayout();
    }
  };
});