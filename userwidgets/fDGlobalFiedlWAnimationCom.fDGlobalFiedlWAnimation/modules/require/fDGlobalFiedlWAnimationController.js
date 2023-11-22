define(function() {

  return {
    //sknBtnLigthGrayReg100
    //sknBtnBlackTinyBGWhite90
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnSomeAction.onClick = this.openLink;
      this.view.txtBoxField.onBeginEditing = this.turningOnField;
      this.view.txtBoxField.onTextChange = this.onTextChangeField;
      this.view.txtBoxField.onEndEditing = this.turningOffField;
      amplify.subscribe("loginMain", this, this.onBreakpointChange, 1);
      this.view.forceLayout();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      
    },
    openLink:function() {
          kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/indexOHLanding.jsp#wlp_applyForBenefits14");
    },
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
		this.view.btnFakeTitle.skin = 'sknBtnLigthGrayReg100Mobile';
        this.view.btnSomeAction.skin = 'sknBtnOnlyTextBlueRegNormalMobile';
        this.view.btnSomeAction.width = 'Preferred';
      }
      else {
		this.view.btnFakeTitle.skin = 'sknBtnLigthGrayReg100';
        this.view.btnSomeAction.skin = 'sknBtnOnlyTextBlueRegNormal';
        this.view.btnSomeAction.width = '200px';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    turningOnField:function(){
      console.log("in");
      this.view.btnFakeTitle.skin = "sknLbBlackTinyBGWhite90";
      this.view.btnFakeTitle.zIndex = 2;
      this.view.txtBoxField.zIndex = 1;
      this.view.btnFakeTitle.width = "preferred";
      this.view.btnFakeTitle.text = this.uptitle;
      this.animateWidgetsTitle("20%", "1%", 0.2, 0, "inside");
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    turningOffField:function(){
      console.log("out");
      var countField = this.view.txtBoxField.text;
      if (countField === "" || countField === null || countField === undefined){
        var statusTitle = this.view.btnFakeTitle.centerY;
        this.view.btnFakeTitle.skin = "sknLbLigthGrayReg100";
        this.view.btnFakeTitle.zIndex = 1;
        this.view.txtBoxField.zIndex = 2;
        this.view.btnFakeTitle.text = this.placeholder;
        this.animateWidgetsTitle("55%", "2%", 0.2, 0, "outside");
      }
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    onTextChangeField:function(){
      var countField = this.view.txtBoxField.text;
      if (countField === "" || countField === null || countField === undefined){
        this.turningOffField();
      }
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    animateWidgetsTitle:function(centerY, left, time, delay, callBack){
      var pForm = kony.application.getCurrentForm();
      var self = this;
      try{
        console.log("inside animation");
        self.view.btnFakeTitle.animate(
          kony.ui.createAnimation(
            {"100":{
              "centerY": centerY,
              "left": left,
              "stepConfig":{
                "timingFunction": kony.anim.EASE
              }
            }
            }
          ),
          {"delay": delay, "iterationCount": 1, "fillMode": kony.anim.FILL_MODE_FORWARDS, "duration": time,
           "direction": kony.anim.DIRECTION_ALTERNATE},
          {"animationEnd": function(){
            self.animationCallback(callBack);
          }
          }
        );
      }catch(e){
        console.log(e);
      }
    },

    animationCallback:function(callBack){
      if(callBack === "inside"){
      }else if (callBack === "outside"){
        this.view.btnFakeTitle.width = "50%";
        console.log("animation callback done");
      }
    }
  };
});