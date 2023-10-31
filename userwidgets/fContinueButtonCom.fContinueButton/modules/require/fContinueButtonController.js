define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    //----------------------------------------------------------------------------
    //Created by:CruzAmbrocio
    //Date_10-25-18
    //----------------------------------------------------------------------------
    navigatingBFormsOnlyContinue:function(form){
      try{
        kony.print("Going to other form");
        this.view.btnContinue.onClick = function(){
          resetFlow();		  
          var ntf = new kony.mvc.Navigation(form);
          ntf.navigate();
        };
      }catch(err){
        kony.print("Shomething went wrong while naviagation Back");
      }
    },
  };
});