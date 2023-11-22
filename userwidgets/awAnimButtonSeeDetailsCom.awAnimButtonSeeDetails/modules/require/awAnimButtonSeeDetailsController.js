define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxMainContainerButt.onHover = this.onHoverEventCallback;
    },
    
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    
    onHoverEventCallback:function(widget,context){
      console.log("button hover event executed" + context.eventType);
      if (context.eventType == constants.ONHOVER_MOUSE_ENTER){
        this.onHoverMouseEnter();
        console.log("ONHOVER_MOUSE_ENTER");
      }
      /*else if (context.eventType == constants.ONHOVER_MOUSE_MOVE){
        console.log("ONHOVER_MOUSE_MOVE");
      }*/
      else if (context.eventType == constants.ONHOVER_MOUSE_LEAVE){ 
        this.onHoverMouseLeave();
        console.log("ONHOVER_MOUSE_LEAVE");
      }
    },
    
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_11-11-18
  //----------------------------------------------------------------------------
  onHoverMouseEnter:function(){
    this.changeSizeWidgets("flxMainContainerButt", "150px", 0.2, 0);
    this.view.lblSeeDetailsText.isVisible = true;
  },
    
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_11-11-18
  //----------------------------------------------------------------------------
  onHoverMouseLeave:function(){
    this.changeSizeWidgets("flxMainContainerButt", "32px", 0.2, 0);
    this.view.lblSeeDetailsText.isVisible = false;
  },
    
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_11-11-18
  //----------------------------------------------------------------------------

  changeSizeWidgets:function(form, distance, time, delay){
    console.log("enetr");
    //var pForm = kony.application.getCurrentForm();
    try {
      this.view[form].animate(
        kony.ui.createAnimation(
          {"100":{
            "width": distance, "stepConfig":{
              "timingFunction": kony.anim.EASE
            }
          }
          }
        ),
        {"delay": delay, "iterationCount": 1, "fillMode": kony.anim.FILL_MODE_FORWARDS, "duration": time,

         "direction": kony.anim.DIRECTION_ALTERNATE},
        {"animationEnd": function(){ }
        }
      );
    } catch (e) {
    }
  },
  };
});