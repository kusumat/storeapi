define({ 
  //Type your controller code here
  showPopUp:function(){
    this.view.Popup.isVisible = true;
  },
  dismissPopUp:function(){
    this.view.Popup.isVisible = false;
  },
  onNavigate:function(lblName){
    setDefaultValues();
    this.view.CreateOrder.checkPlatform(lblName);
  }
});