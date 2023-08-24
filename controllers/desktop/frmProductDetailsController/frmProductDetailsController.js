define({ 
 //Type your controller code here 
  onNavigate:function(segdetailsObj){
     checkDevcie();
    this.view.ProductDetails.setInfoToForm(segdetailsObj);
  }
 });