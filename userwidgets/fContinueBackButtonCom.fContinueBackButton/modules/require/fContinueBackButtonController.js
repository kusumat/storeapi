define(function () {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
    },
    //----------------------------------------------------------------------------
    //Created by:CruzAmbrocio
    //Date_10-25-18
    //----------------------------------------------------------------------------
    navigatingBFormsContinue: function (form) {
      try{
        kony.print("Going to form " + form);
        this.view.btnContinue.onClick = function(){
          var ntf = new kony.mvc.Navigation(form);
          ntf.navigate();
        };
      }catch(err){
        kony.print("Shomething went wrong while naviagating to form " + form);
      }
    },
    //----------------------------------------------------------------------------
    //Created by:CruzAmbrocio
    //Date_10-30-18
    //----------------------------------------------------------------------------
    navigatingBFormsBack:function(form){
      try{
        kony.print("Going to form " + form);
        this.view.btnBack.onClick = function(){
          var ntf = new kony.mvc.Navigation(form);
          var params = {"isBack":true};
          ntf.navigate(params);
        };
      }catch(err){
        kony.print("Shomething went wrong while naviagating to form " + form);
      }
    },
  };
});