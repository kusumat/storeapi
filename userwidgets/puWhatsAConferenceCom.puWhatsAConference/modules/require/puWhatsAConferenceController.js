define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxBtnCancelRHearing.onClick = this.closePopup;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------
    closePopup:function(){
      try{
        kony.print("Closing popup");
        var pForm = kony.application.getCurrentForm();
        pForm.puWhatsAConference.isVisible = false;
      }catch(err){
        kony.print("Shomething went wrong while Closing popup");
      }
    },
  };
});