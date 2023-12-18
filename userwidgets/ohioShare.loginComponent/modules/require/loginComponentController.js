define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.loginFields.theme = 'black';
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    navigateTo:function(){
      var x = new kony.mvc.Navigation("frmDuringHearing");
      x.navigate();
    },
    breakPointChange:function(widthVal){
      this.view.loginFields.changingTheme('black');
      this.view.loginFields.breakPointChange(widthVal);
      if(widthVal <= 1024 && widthVal >= 900 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '85%';
        this.view.flxContentSquare1.right = '2.5%';
        this.view.flxContentSquare1.height = '620px';
        this.view.flxContentSquare1.centerX = '';
        this.view.flxContentSquare1.maxWidth = '';

        this.view.flxSquare2.width = '50%';
        this.view.loginFields.top = '30px';
        this.view.loginFields.width = '90%';
        this.view.loginFields.left = '2.5%';
        this.view.loginFields.height = '620px';
        this.view.flxContentPostit.top = '26%';
        
        this.view.flxSkeleton.top = '0px';
        
        this.view.chatBot.right = '82.5%';
        this.view.chatBot.top = '500px';

      } if(widthVal < 900 && widthVal >= 768 ){
        this.view.top = "0px";
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '85%';
        this.view.flxContentSquare1.right = '2.5%';
        this.view.flxContentSquare1.height = '640px';
        this.view.flxContentSquare1.centerX = '';
        this.view.flxContentSquare1.maxWidth = '';

        this.view.flxSquare2.width = '50%';
        this.view.loginFields.top = '30px';
        this.view.loginFields.width = '90%';
        this.view.loginFields.left = '2.5%';
        this.view.loginFields.height = '640px';
        this.view.flxContentPostit.top = '20%';
        
        this.view.flxSkeleton.top = '0px';
        
        this.view.chatBot.right = '82.5%';
        this.view.chatBot.top = '500px';

      } if(widthVal <= 720 ){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxSquare1.width = '100%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.width = '';
        this.view.flxContentSquare1.right = '0px';
        this.view.flxContentSquare1.height = '670px';
        this.view.flxContentSquare1.centerX = '50%';
        this.view.flxContentSquare1.maxWidth = '475px';

        this.view.flxSquare2.width = '100%';
        this.view.loginFields.top = '0px';
        this.view.loginFields.width = '100%';
        this.view.loginFields.left = '0px';
        this.view.loginFields.height = '640px';
        this.view.flxContentPostit.top = '18%';
        
        this.view.flxSkeleton.top = '-30px';
        
        this.view.chatBot.right = '82.5%';
        this.view.chatBot.top = '640px';
        
      } if(widthVal > 1024){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '85%';
        this.view.flxContentSquare1.right = '2.5%';
        this.view.flxContentSquare1.height = '620px';
        this.view.flxContentSquare1.centerX = '';
        this.view.flxContentSquare1.maxWidth = '';

        this.view.flxSquare2.width = '50%';
        this.view.loginFields.top = '30px';
        this.view.loginFields.width = '90%';
        this.view.loginFields.left = '2.5%';
        this.view.loginFields.height = '620px';
        this.view.flxContentPostit.top = '26%';
        
        this.view.flxSkeleton.top = '0px';
        
        this.view.chatBot.right = '82.5%';
        this.view.chatBot.top = '500px';

      }
      this.view.forceLayout();
    }
  };
});