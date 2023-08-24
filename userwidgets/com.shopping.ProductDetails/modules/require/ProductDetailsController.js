define(function() {
  return {
    _isNativeMobile : false,
    _isNativeTab : false,
    _isMobilePWA : false,
    _isTabletPWA : false,
    _isDesktopPWA : false,
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = this.onPreShow.bind(this);
      this.view.postShow = this.onPostShow.bind(this);
      this.view.MobProductDetail.onProductInfoClick = this.onSegProdClick.bind(this);
    },
    onPostShow: function() {
    },
    onPreShow: function() {
      var mediaWidth = kony.os.deviceInfo().deviceWidth;
      var deviceInfo = kony.os.deviceInfo();
      var os = deviceInfo.name /*android and iOS*/;
      if(os === "iPhone"){
        this._isNativeMobile = true;
      }else if(os === "iPad"){
        this._isNativeTab = true;
      }
      else if(os === "android"){
        this._isNativeMobile = true;
      }
      else if(os === "thinclient"){
        if (mediaWidth <= 640) {
          this._isMobilePWA = true;
        } else if (mediaWidth <= 1024) {
          this._isTabletPWA = true;
        } else {
          this._isDesktopPWA = true;
        }
      }
    },
    onSegProdClick:function(){
      var nft = new kony.mvc.Navigation("frmProductDescription");
      nft.navigate();
    },
    channelSpecificVisibility : function(){
      if(_isNativeMobile){
        this.view.MobProductDetail.setVisibility(true);
      }else{
        this.view.flxMain.isVisible = true;
        this.view.MobProductDetail.setVisibility(false);
      }
    },
    initGettersSetters: function() {

    },

    onNavigate:function(objList){
      var objDetails = objList;
      this.setInfoToForm(objDetails);
    },
    setInfoToForm:function(objDetails){
      _productDetailsinfo.push(objDetails);
      objDetails = objDetails ? objDetails : _productDetailsinfo[0];
      if(_isMobilePWA){
        this.view.lblProductNameMoble.text = objDetails[0].lblProductName.text;
        this.view.lblProductTypeMobile.text = objDetails[0].lblProductName.text;
        this.view.lblProductDescriptionMobile.text = objDetails[0].lblProductDescription.text;
        this.view.lblProductName.text = objDetails[0].lblProductName.text;
        this.view.lblQuantityMobile.text = objDetails[0].lblProductName.text;
        this.view.lblPriceMobile.text = objDetails[0].lblEAPrice.text;
      } else if(!_isNativeMobile){
        this.view.lblProductName.text = objDetails[0].lblProductName.text;
        this.view.lblProductType.text = objDetails[0].lblProductName.text;
        this.view.rchTxtProductDescrption.text = objDetails[0].lblProductDescription.text;
        this.view.lblProductName.text = objDetails[0].lblProductName.text;
        this.view.lblQuantity.text = objDetails[0].lblProductName.text;
        this.view.lblPrice.text = objDetails[0].lblEAPrice.text;
      } if(_isNativeMobile){
        this.view.MobProductDetail.setInfoInForm(objDetails);
      }
    },
    onProductInfoClick:function(){
      this.view.productDescription.isVisible = true;
    },
    onBackClick:function(){
      if (!this.view.productDescription.isVisible) {
        var nft = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
        nft.navigate();
      } else if(this.view.productDescription.isVisible){
        this.view.productDescription.isVisible = false;
      }
    }
  };
});