define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    setInfoInForm:function(objDetails){
      _productDetailsinfo.push(objDetails);
      objDetails = objDetails ? objDetails : _productDetailsinfo[0];
      this.view.lblProductNameMoble.text = objDetails[0].lblProductName.text;
      this.view.lblProductTypeMobile.text = objDetails[0].lblProductName.text;
      this.view.rchTxtProductdescrption.text = objDetails[0].lblProductDescription.text;
      this.view.lblQuantityMobile.text = objDetails[0].lblProductName.text;
      this.view.lblPriceMobile.text = objDetails[0].lblEAPrice.text;

    }
  };
});