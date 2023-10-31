define(function() {

  return {    
    
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxProfileMenuContainer.onTouchEnd = this.hideProfileMenu;
      this.setOptions();
      this.view.postShow=this._postShow;
      this.view.flxProfileMenuHeading.accessibilityConfig = {
        "a11yLabel": "Profile Menu",
        "a11yARIA": {"role": "heading", "aria-level": "1"},
        "a11yIndex": 0, 
        "a11yHidden": false 
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {


    },
    _postShow: function(){
	this.view.isVisible=false;
  },
    
    hideProfileMenu: function() {
      this.view.isVisible = false;
    },
    
    setOptions: function() {      
      var updateInfo = {"btnTransparentButton": {"isVisible": true},"lblTypeTitle": "Update Personal Information","imgArrowRight": "","lblUILine": "-Line-"};
      updateInfo.btnTransparentButton.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Update Personal Information ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      var logout = {"btnTransparentButton": {"isVisible": true},"lblTypeTitle": "Log Out","imgArrowRight": "","lblUILine": "-Line-"};
      logout.btnTransparentButton.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": "Logout ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      var dataRows = [];
      //dataRows.push(roles);
      if(gblIsTPMUser) {
        dataRows.push(logout);
      }
      else {
        dataRows.push(updateInfo);
        dataRows.push(logout);        
      }
      this.view.sgmProfileMenu.data = dataRows;
      this.view.forceLayout();
    }
    
  };
});