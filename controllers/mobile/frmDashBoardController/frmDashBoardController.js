define({ 

  //Type your controller code here 
  onNavigate:function(){
  },
  setUI:function(){
    this.view.flxBody.width=30+this.view.flxCameraRoot.frame.height;
    this.view.flxCameraRoot.shadowDepth=3;
    this.view.flxGalleryRoot.shadowDepth=3;
  },
  setFormProperties:function(){
    var param={};
    //param["statusBarColor"]="13294b";
    param["statusBarColor"]="333d48";
    param["statusBarForegroundColor"]="424242";
    param["statusBarStyle"]=constants.STATUS_BAR_STYLE_DEFAULT;
    setApplicationProperties(param);
  },
  onFormPostshow:function(){
    if(kony.os.deviceInfo().name.toLowerCase()=='android')
      this.setFormProperties();
    this.setUI();
  },
  selectImageFromGallery:function(){
    try{
      var querycontext={"mimetype":"image/*"};
      kony.phone.openMediaGallery(this.imageSelectionCallback.bind(this), querycontext);
    }catch(excp){
      alert(JSON.stringify(excp));
    }
  },
  imageSelectionCallback:function(imageRawByte,permStatus,mimeType){
    if(imageRawByte!==null){
      var params={};
      //alert("permStatus: "+permStatus+", mimeType: "+mimeType);
      if(kony.os.deviceInfo().name.toLowerCase()=='iphone'){
        mimeType=permStatus;
      }
      if(mimeType=='image/png' || mimeType=='image/jpeg' || mimeType=='image/jpg'){
        kony.application.showLoadingScreen("","",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
        try{
          var base64=kony.convertToBase64(imageRawByte);
          params["image_base64"]=base64;
          kony.application.dismissLoadingScreen();
          var navObj=new kony.mvc.Navigation("frmImageSelected");
          navObj.navigate(params);
        }catch(excp){
          alert(JSON.stringify(excp));
        }
      }else{
        alert("Only png, jpg and jpeg file format supported");
      }
    }else{
    }
  }
});