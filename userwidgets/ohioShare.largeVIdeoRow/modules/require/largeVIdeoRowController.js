define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxVideoHeadingContainer.accessibilityConfig = {
        "a11yLabel": this.view.lblLoginTextTitle.text,
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    breakPointChange:function(widthVal){
      if(widthVal <= 1024 && widthVal > 900 ){
        this.view.flxSquare1.left = '0%';
        this.view.flxSquare1.rigth = '';
        this.view.flxSquare1.top = '30px';
        this.view.flxSquare1.bottom = '';
        this.view.flxSquare1.width = '100%';
        this.view.flxSquare1.height = 'preferred';

        this.view.flxContentSquare1.left = '10%';
        this.view.flxContentSquare1.right = '17%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.bottom = '';
        this.view.flxContentSquare1.width = '';
        this.view.flxContentSquare1.height = 'preferred';
        
        // REPLACE THIS FOR THE VIDEO
        this.view.imgFakeVideo.width = '100%';
        
        this.view.browserExplainerVideo.width = '80%';
        this.view.browserExplainerVideo.height = '339px';        
        
        this.view.videoPlayer.centerX = '50%';
        this.view.videoPlayer.top = '0px';
        this.view.videoPlayer.bottom = '0px';
        this.view.videoPlayer.width = '100%';
        this.view.videoPlayer.height = 'preferred';

        this.view.flxSquare2.left = '';
        this.view.flxSquare2.right = '5%';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.centerX = '';
        this.view.flxSquare2.bottom = '';
        this.view.flxSquare2.height = '360px';
        this.view.flxSquare2.width = '350px';

        this.view.flxContentSquare2.left = '';
        this.view.flxContentSquare2.right = '';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.bottom = '0px';
        this.view.flxContentSquare2.width = '355px';
        this.view.flxContentSquare2.height = '360px';
        this.view.flxContentSquare2.centerX = '50%';
      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.flxSquare1.left = '0%';
        this.view.flxSquare1.rigth = '';
        this.view.flxSquare1.top = '30px';
        this.view.flxSquare1.bottom = '';
        this.view.flxSquare1.width = '100%';
        this.view.flxSquare1.height = 'preferred';

        this.view.flxContentSquare1.left = '10%';
        this.view.flxContentSquare1.right = '17%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.bottom = '';
        this.view.flxContentSquare1.width = '';
        this.view.flxContentSquare1.height = 'preferred';
        
        // REPLACE THIS FOR THE VIDEO
        this.view.imgFakeVideo.width = '100%';
        
        this.view.browserExplainerVideo.width = '85%';
        this.view.browserExplainerVideo.height = '270px';        
        
        this.view.videoPlayer.centerX = '50%';
        this.view.videoPlayer.top = '0px';
        this.view.videoPlayer.bottom = '0px';
        this.view.videoPlayer.width = '100%';
        this.view.videoPlayer.height = 'preferred';

        this.view.flxSquare2.left = '';
        this.view.flxSquare2.right = '5%';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.centerX = '';
        this.view.flxSquare2.bottom = '';
        this.view.flxSquare2.height = '360px';
        this.view.flxSquare2.width = '350px';

        this.view.flxContentSquare2.left = '';
        this.view.flxContentSquare2.right = '';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.bottom = '0px';
        this.view.flxContentSquare2.width = '355px';
        this.view.flxContentSquare2.height = '360px';
        this.view.flxContentSquare2.centerX = '50%';
      } if(widthVal <= 720 ){
        this.view.flxSquare1.left = '0%';
        this.view.flxSquare1.top = '0px';
        this.view.flxSquare1.width = '100%';
        this.view.flxSquare1.height = 'preferred';
        this.view.flxSquare1.bottom = '';

        this.view.flxContentSquare1.right = '0%';
        this.view.flxContentSquare1.left = '';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.bottom = '';
        this.view.flxContentSquare1.width = '100%';
        this.view.flxContentSquare2.height = 'preferred';
        
        // REPLACE THIS FOR THE VIDEO
        this.view.imgFakeVideo.width = '180%';
        this.view.imgFakeVideo.centerX = '38%';
        
        this.view.browserExplainerVideo.width = '100%';
        this.view.browserExplainerVideo.height = '211px';
        
        this.view.flxSquare2.left = '';
        this.view.flxSquare2.right = '';
        //this.view.flxSquare2.top = '-150px';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.centerX = '50%';
        this.view.flxSquare2.bottom = '';
        this.view.flxSquare2.height = '360px';
        this.view.flxSquare2.width = '100%';

        this.view.flxContentSquare2.right = '';
        this.view.flxContentSquare2.left = '';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.bottom = '0px';
        this.view.flxContentSquare2.height = '360px';
        //this.view.flxContentSquare2.maxHeight = '440px';
        this.view.flxContentSquare2.width = '100%';
        //this.view.flxContentSquare2.maxWidth = '350px';
        this.view.flxContentSquare2.centerX = '50%';
      } if(widthVal > 1024){
        
        this.view.flxSquare1.left = '0%';
        this.view.flxSquare1.rigth = '';
        this.view.flxSquare1.top = '52px';
        this.view.flxSquare1.bottom = '';
        this.view.flxSquare1.width = '100%';
        this.view.flxSquare1.height = 'preferred';

        this.view.flxContentSquare1.left = '5%';
        this.view.flxContentSquare1.right = '17%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.bottom = '';
        this.view.flxContentSquare1.width = '';
        this.view.flxContentSquare1.height = 'preferred';
        
        this.view.imgFakeVideo.width = '90%';

        this.view.browserExplainerVideo.width = '90%';
        this.view.browserExplainerVideo.height = '569px';        
        
        this.view.flxSquare2.left = '';
        this.view.flxSquare2.right = '5%';
        this.view.flxSquare2.top = '0px';
        this.view.flxSquare2.centerX = '';
        this.view.flxSquare2.bottom = '';
        this.view.flxSquare2.height = '350px';
        this.view.flxSquare2.width = '350px';

        this.view.flxContentSquare2.left = '';
        this.view.flxContentSquare2.right = '';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.bottom = '0px';
        this.view.flxContentSquare2.width = '355px';
        this.view.flxContentSquare2.height = '360px';
        this.view.flxContentSquare2.centerX = '50%';
      }
      if(widthVal > 1600){
        this.view.flxContentSquare1.left = '8%';
        this.view.browserExplainerVideo.width = '86%';
        this.view.browserExplainerVideo.height = '610px';        
      }      

      this.view.forceLayout();
    }
  };
});