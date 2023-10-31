define(function() {

  return {    
    
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxProfileMenuContainer.onTouchEnd = this.hideProfileMenu;
      this.setOptions();
     this.view.postShow=this._postShow;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {


    },
    _postShow: function(){
	this.view.isVisible=false;
  },
    
    hideProfileMenu:function() {
      this.view.isVisible = false;
    },
    
    setOptions:function() {      
      var updateInfo = {"lblTypeTitle":"Update Personal Information","imgArrowRight":"","lblUILine":"-Line-"};
      var logout = {"lblTypeTitle":"Log Out","imgArrowRight":"","lblUILine":"-Line-"};
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