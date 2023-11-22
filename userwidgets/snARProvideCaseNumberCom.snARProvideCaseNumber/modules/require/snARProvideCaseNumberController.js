define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      this.view.txtBoxEnterCaseNumber.onKeyUp = this.getCaseNumber;
    },

    getCaseNumber:function() {
      var caseNumber = this.view.txtBoxEnterCaseNumber.text;
      var isNumeric = kony.string.isNumeric(caseNumber);
      if(isNumeric) {
        hearingRequest.caseNumber = caseNumber;
      }
      else {
        if(caseNumber !== "") {
          hearingRequest.caseNumber = ""; 
          alert("Case Number must be numeric");          
        }
        else {
        	hearingRequest.caseNumber = ""; 
        }
      }
    },
  };
});