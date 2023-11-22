define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxRichTextRowHeadingContainer.accessibilityConfig = {
        "a11yLabel": this.view.lblTitle.text,
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    breakPointChange:function(widthVal){
      if(widthVal <= 1024 && widthVal >= 900 ){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.rtextDescription.skin = 'richTextNormalBlack16px';
        this.view.rtextDescription.linkSkin = 'richTextBlackLink16px';
        
      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.rtextDescription.skin = 'richTextNormalBlack16px';
        this.view.rtextDescription.linkSkin = 'richTextBlackLink16px';
        
      } if(widthVal <= 720 ){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.rtextDescription.skin = 'richTextNormalBlack16px';
        this.view.rtextDescription.linkSkin = 'richTextBlackLink16px';
        
      } if(widthVal > 1024){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold38px';
        this.view.rtextDescription.skin = 'richTextNormalBlack24px';
        this.view.rtextDescription.linkSkin = 'richTextBlackLink24px';
        
      }
      this.view.forceLayout();
    }
  };
});