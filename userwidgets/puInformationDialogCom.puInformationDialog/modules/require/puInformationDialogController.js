define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //this.view.flxBtnCancelRHearing.onTouchEnd = this.closeDialog;
      this.view.btnCancelMsg.onClick = this.closeDialog;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);       
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    onBreakpointChange: function(form, width){
      try {
        if (this.view.btnCancelMsg.isvisible === true ){
          this.view.btnCancelMsg.setFocus(true);
        }
        if(width <= gblBreakPoint) {
          this.view.flxContainerInformationDialog.width = '90%'; 
          this.view.lblTitle1.skin = 'sknLblBlackBold115Mobile';
          this.view.flxBtnCancelRHearing.width = '20px';
          this.view.flxBtnCancelRHearing.height = '20px';
        }
        else {
          this.view.flxContainerInformationDialog.width = '80%';
          this.view.lblTitle1.skin = 'sknLblBlackBold115';
          this.view.flxBtnCancelRHearing.width = '18px';
          this.view.flxBtnCancelRHearing.height = '18px';          
        }

      }
      catch(err) {
      kony.print("onBreakpointChange Exception:"+err);
      }
    },    
    
    closeDialog:function() {
      this.view.setVisibility(false);
    }
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------
  };
});