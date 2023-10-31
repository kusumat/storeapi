define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

	// TODO: Change the function name and every reference to it
    //-----------------------------------------------------------------------
    //Created by:CruzAmbrocio
    //Date_10-25-18
    //-----------------------------------------------------------------------
    toHearingRequest: function(form){
      try{
        kony.print("Going to Hearing request");
        this.view.btnCancelX.onClick = function(){
          resetFlow();
          var ntf = new kony.mvc.Navigation(form);
          var params = {"isCancelled": true};
          ntf.navigate(params);
        };
      }catch(err){
        kony.print("Shomething went wrong while naviagation");
      }
    },
  };
});