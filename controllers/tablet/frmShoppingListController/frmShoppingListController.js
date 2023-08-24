define({ 

 //Type your controller code here 
  onNavigate: function () { 
    this.view.flxMain.onTouchEnd = this.gotoAutoPay;
  },
  gotoAutoPay: function(){
    	var nft = new kony.mvc.Navigation("frmCreateOrder");
        nft.navigate();
  },

 });