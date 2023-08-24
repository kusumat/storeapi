define({ 
 //Type your controller code here 
  onNavigate:function(segdetailsObj){
    checkDevcie();
    this.view.MobProductDetail.setInfoInForm(segdetailsObj);
    this.view.MobProductDetail.onProductInfoClick = this.segOnClick.bind(this);
  },
  segOnClick:function(){
    var nft = new kony.mvc.Navigation("frmProductDescription");
    nft.navigate();
    this.view.forceLayout();
  }
 });