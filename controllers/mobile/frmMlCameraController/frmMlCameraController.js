define({ 

  //Type your controller code here 
  imageClassifier:null,
  onFormInit:function(){
	var height;
    if(kony.os.deviceInfo().name.toLowerCase()=="android"){
      height="50%";
    }else{
      height="100%";
    }
    var mlCamera = new kony.ui.MLCamera({
      "height": height,
      "id": "mlCamera",
      "isVisible": true,
      "left": "0dp",
      "top": "0dp",
      "width": "100%",
      "zIndex": 1
    }, { // layout
    },{   // psp 
    }); 
    this.view.flxRoot.add(mlCamera);

  },
  onNavigate:function(){
    this.setFormProperties();
    this.setFormLayout();
  },
  onFormPostShow:function(){
    var config = {};
    config.modelType = kony.ml.MODEL_TYPE_QUANTIZED;
    config.onSuccess = this.imageClassificationSuccess;
    config.onFailure = this.imageClassificationFailure;
    config.modelPathSource = kony.ml.MODEL_SOURCE_TYPE_BUNDLED;
    if(kony.os.deviceInfo().name.toLowerCase()=='iphone'){
      config["modelInputSize"] = {"width": 299 ,"height": 299};
      config.modelPath =  "ObjectDetector";
    }else if(kony.os.deviceInfo().name.toLowerCase()=='android'){
      config.modelPath =  "model";
      config.labelPath = "label";
    }
    this.imageClassifier =  new kony.ml.ImageClassifier(config);
    this.view.mlCamera.setImageClassifier(this.imageClassifier);
    this.view.mlCamera.startDetection();
    //this.view.mlCamera.stopDetection();
  },
  startOjectDetection:function(){
    //alert("starting");
    //this.view.mlCamera.startDetection();
  },
  imageClassificationSuccess:function(resultArray){
    //alert(resultArray);
     if(resultArray !== null && resultArray.length>0){
       // resultArray is sorted in descending order ,hence 0th item will be highest confidence
          this.view.lblObjectType.text= resultArray[0].title; 
          this.view.lblConfidanceVal.text = (resultArray[0].confidence * 100).toFixed(2) + "%";
             if(this.view.flxResultBox.isVisible===false){
               this.view.flxResultBox.setVisibility(true);
             }
      }
  },
  imageClassificationFailure:function(errorCode){
    alert("errorCode: "+errorCode);
  },
  setFormLayout:function(){
   this.view.flxResultBox.setVisibility(false);
    this.closeAppInfo();
    //this.showFormFooter();
  },
  closeAppInfo:function(){
    this.view.flxAppInfo.setVisibility(false);
    this.view.flxCloseAppInfo.setVisibility(false);
    this.showFormFooter();
    //this.view.mlCamera.startDetection();
  },
  showAppInfo:function(){
    this.hideFormFooter();
    //this.view.mlCamera.stopDetection();
    this.view.flxResultBox.setVisibility(false);
    this.view.flxAppInfo.setVisibility(true);
    this.view.flxCloseAppInfo.setVisibility(true);
  },
  showFormFooter:function(){
    this.view.flxFooter.setVisibility(true);
    this.view.flxCaptureRoot.setVisibility(true);
  },
  hideFormFooter:function(){
    this.view.flxFooter.setVisibility(false);
    this.view.flxCaptureRoot.setVisibility(false);
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
      kony.application.showLoadingScreen("","",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
      var base64=kony.convertToBase64(imageRawByte);
      params["image_base64"]=base64;
      kony.application.dismissLoadingScreen();
      var navObj=new kony.mvc.Navigation("frmImageSelected");
      navObj.navigate(params);
    }else{
    }
  },
  setFormProperties:function(){
    var param={};
    //param["statusBarColor"]="13294b";
    param["statusBarColor"]="000000";
    param["statusBarForegroundColor"]="ff0000";
    param["statusBarStyle"]=constants.STATUS_BAR_STYLE_LIGHT_CONTENT;
    setApplicationProperties(param);
  },
  captureScreenshot:function(){
    var imageObject=kony.image.createImageFromSnapShot(this.view.flxRoot);
    imageObject.writeToMediaGallery();
    // alert(imageFile);
  }
});