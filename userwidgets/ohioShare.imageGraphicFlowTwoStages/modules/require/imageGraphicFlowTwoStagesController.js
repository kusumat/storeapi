define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnStep1.onClick = this.openLink;
      this.view.btnStep2.onClick = this.navLogin;
      this.view.btnMobileStep1.onClick = this.openLink;
      this.view.btnMobileStep2.onClick = this.navLogin;
      this.view.btnThreeWeb.onClick = this.navLogin;
      this.view.btnThreeMobile.onClick = this.navLogin;
      
      this.view.btnThreeWeb.accessibilityConfig = {
        "a11yLabel": "Hearing can be requested by mail, by a phone call, and the SHARE Portal Login Page.",
        "a11yHidden": false,
        "a11yIndex": 0,
      };
      this.view.btnThreeMobile.accessibilityConfig = {
        "a11yLabel": "Hearing can be requested by mail, by a phone call, and the SHARE Portal Login Page.",
        "a11yHidden": false,
        "a11yIndex": 0,
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    openLink: function(){
      kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/index.jsp");
      return;
    },
    
    navLogin: function(){
      var ntf = new kony.mvc.Navigation('frmLogin');
  	  ntf.navigate();
    },
    
    breakPointChange:function(widthVal){
      if(widthVal <= 1024 && widthVal >= 900 ){
        this.view.btnStep1.isVisible = true;
        this.view.btnStep2.isVisible = true;
        this.view.flxContainerMobileStep.isVisible = false;
 
        this.view.btnThreeWeb.isVisible = true;
        this.view.btnThreeMobile.isVisible = false;
        
        this.view.imgHearingConnectHelpFlow.isVisible = true;
        this.view.imgHearingConnectHelpFlowMobile.isVisible = false;
        
      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.btnStep1.isVisible = true;
        this.view.btnStep2.isVisible = true;
        this.view.flxContainerMobileStep.isVisible = false;
        
        this.view.btnThreeWeb.isVisible = true;
        this.view.btnThreeMobile.isVisible = false;
        
        this.view.imgHearingConnectHelpFlow.isVisible = true;
        this.view.imgHearingConnectHelpFlowMobile.isVisible = false;
        
      } if(widthVal <= 720 ){
        this.view.btnStep1.isVisible = false;
        this.view.btnStep2.isVisible = false;
        this.view.flxContainerMobileStep.isVisible = true;
        
        this.view.btnThreeWeb.isVisible = false;
        this.view.btnThreeMobile.isVisible = true;
        
        this.view.imgHearingConnectHelpFlow.isVisible = false;
        this.view.imgHearingConnectHelpFlowMobile.isVisible = true;

      } if(widthVal > 1024){
        this.view.btnStep1.isVisible = true;
        this.view.btnStep2.isVisible = true;
        this.view.flxContainerMobileStep.isVisible = false;
        
 
        this.view.btnThreeWeb.isVisible = true;
        this.view.btnThreeMobile.isVisible = false;
        
        this.view.imgHearingConnectHelpFlow.isVisible = true;
        this.view.imgHearingConnectHelpFlowMobile.isVisible = false;
      }
      this.view.forceLayout();
    }
  };
});