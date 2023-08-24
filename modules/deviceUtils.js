//Type your code here
_isNativeMobile = false,
  _isNativeTab = false,
  _isMobilePWA = false,
  _isTabletPWA = false,
  _isDesktopPWA = false,
  _productDetailsinfo = [];

function checkDevcie(){
  var mediaWidth = kony.os.deviceInfo().deviceWidth;
  var deviceInfo = kony.os.deviceInfo();
  var os = deviceInfo.name /*android and iOS*/;
  if(os === "iPhone"){
    this._isNativeMobile = true;
  }else if(os === "iPad"){
    this._isNativeMobile = true;
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
}



function  setDefaultValues(){
  // alert("in device utils");
  _isNativeMobile = false;
  _isNativeTab = false;
  _isMobilePWA = false;
  _isTabletPWA = false;
  _isDesktopPWA= false;
  checkDevcie();
}