define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1); 
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      this.view.txtBoxEnterCaseNumber.onEndEditing = this.getCaseNumber;
    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.flxMainContainer.height       = '240dp'; 
        this.view.lblTitle1.skin                = 'sknLblGrayishDark115Mobile';
        this.view.flxContainerInout.layoutType  = kony.flex.FLOW_VERTICAL;
        this.view.txtBoxEnterCaseNumber.width   = '90%';
        this.view.btnMissingCaseNumber.width    = '90%';
        this.view.lblDescToInput.width          = '90%';
        this.view.lblDescToInput.top            = '8px';
        this.view.txtBoxEnterCaseNumber.centerY = 'Default';
        this.view.lblDescToInput.centerY        = 'Default';
        this.view.flxContainerInout.height      = '90px';
        this.view.imgExampleLOcation.top        = '-10dp';
        this.view.btnMissingCaseNumber.top      = '0px';
        this.view.btnMissingCaseNumber.height   = '40dp';
        this.view.btnMissingCaseNumber.skin     = 'sknBtnOnlyTextBlueRegNormalMobile';
      }
      else {
        this.view.flxMainContainer.height       = '220dp';
        this.view.lblTitle1.skin                = 'sknLblGrayishDark115';
        this.view.flxContainerInout.layoutType  = kony.flex.FLOW_HORIZONTAL;
        this.view.txtBoxEnterCaseNumber.width   = '45%';
        this.view.lblDescToInput.width          = '45%';
        this.view.lblDescToInput.top            = '0px';
        this.view.txtBoxEnterCaseNumber.centerY = '50%';
        this.view.lblDescToInput.centerY        = '50%';
        this.view.flxContainerInout.height      = '50px';
        this.view.imgExampleLOcation.top        = '-40dp';
        this.view.btnMissingCaseNumber.top      = '16px';
        this.view.btnMissingCaseNumber.height   = '40dp';
        this.view.btnMissingCaseNumber.skin     = 'sknBtnOnlyTextBlueRegNormal';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     

    getCaseNumber:function() {
      var caseNumber = this.view.txtBoxEnterCaseNumber.text;
      var isNumeric = kony.string.isNumeric(caseNumber);
      if(isNumeric) {
        hearingRequest.caseNumber = caseNumber.trim();
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