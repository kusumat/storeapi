define({ 

  //Type your controller code here 
  deviceWidthInDP:null,
  deviceHeightInDP:null,

  deviceWidthInPx:null,
  deviceHeightInPx:null,

  imageWidthInPx:null,
  imageHeightInPx:null,
  imageClassifier:null,

  blankSpaceHeightInDp:0,
  blankSpaceWidthInDP:0,

  _point0:{},
  _point2:{},
  _proximity:20,

  onNavigate:function(params){
    this.setFormProperties();
    if(typeof params=='object' && params!==null){
      this.view.imgSelectedImage.base64=params["image_base64"];
    }
    this.setLayout();
  },
  setFormProperties:function(){
    var param={};
    //param["statusBarColor"]="13294b";
    param["statusBarColor"]="000000";
    param["statusBarForegroundColor"]="ff0000";
    param["statusBarStyle"]=constants.STATUS_BAR_STYLE_LIGHT_CONTENT;
    setApplicationProperties(param);
  },
  setCroppingLayout:function(){
    this.deviceWidthInPx=kony.os.deviceInfo().deviceWidth;
    this.deviceHeightInPx=kony.os.deviceInfo().deviceHeight;
    var topFlexHeight=Number(this.deviceHeightInDP*40/100);
    var leftFlexWidth=Number(this.deviceWidthInDP*30/100);
    //alert("device width in px: "+this.deviceWidthInPx+", image width in px: "+this.imageWidthInPx);
    var newHeightOfImageInPx;
    var newWidthofImageInPx;
    if(this.imageWidthInPx >= this.deviceWidthInPx){
      newHeightOfImageInPx=(this.imageHeightInPx/this.imageWidthInPx)*this.deviceWidthInPx;
      newWidthofImageInPx=this.deviceWidthInPx;
    }else{
      newHeightOfImageInPx=this.imageHeightInPx;
      newWidthofImageInPx=this.imageWidthInPx;
    }
    //var newHeightOfImageInPx=(this.imageHeightInPx/this.imageWidthInPx)*this.deviceWidthInPx;
    var blankSpaceHeightInPX=this.deviceHeightInPx-newHeightOfImageInPx;
    this.blankSpaceHeightInDp=(this.deviceHeightInDP/this.deviceHeightInPx)*blankSpaceHeightInPX;
    topFlexHeight=(topFlexHeight < this.blankSpaceHeightInDp/2)?this.blankSpaceHeightInDp/2:topFlexHeight;

    var bankSpaceWidthInPX=this.deviceWidthInPx-newWidthofImageInPx;
    this.blankSpaceWidthInDP=(this.deviceWidthInDP/this.deviceWidthInPx)*bankSpaceWidthInPX;
    leftFlexWidth=(leftFlexWidth < this.blankSpaceWidthInDP/2)?this.blankSpaceWidthInDP/2:leftFlexWidth;

    this.view.flxLeft.top=topFlexHeight;
    this.view.flxLeft.bottom=topFlexHeight;
    this.view.flxLeft.width=leftFlexWidth;

    this.view.flxTopBox.height=topFlexHeight;

    this.view.flxRight.top=topFlexHeight;
    this.view.flxRight.bottom=topFlexHeight;
    this.view.flxRight.width=leftFlexWidth;

    this.view.flxBottom.height=topFlexHeight;

    this.view.flxCenter.left=leftFlexWidth;
    this.view.flxCenter.top=topFlexHeight;
    this.view.flxCenter.right=leftFlexWidth;
    this.view.flxCenter.bottom=topFlexHeight;

    this.initializePoint();
  },

  initializePoint:function(){
    debugger;
    var x0=parseInt(this.view.flxCenter.left);
    var y0=parseInt(this.view.flxCenter.top);
    var x1=parseInt(this.view.flxCenter.right);
    var y1=parseInt(this.view.flxCenter.bottom);
    x1=this.deviceWidthInDP-x1;
    y1=this.deviceHeightInDP-y1;
    x1=Math.round(x1);
    y1=Math.round(y1);
    this._point0["x"]=x0;//this._proximity;
    this._point0["y"]=y0;//-this._proximity;

    this._point2["x"]=x1;//+this._proximity;
    this._point2["y"]=y1;//+this._proximity;
  },

  onFormPostShow:function(){
    debugger;
    kony.application.showLoadingScreen("","",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
    this.deviceWidthInDP = this.view.frame.width;
    this.deviceHeightInDP = this.view.frame.height;
    var imageRawbytes = kony.convertToRawBytes(this.view.imgSelectedImage.base64);
    var imageObj = kony.image.createImage(imageRawbytes);
    this.imageWidthInPx = imageObj.getImageWidth();
    this.imageHeightInPx = imageObj.getImageHeight();
    this.setCroppingLayout();
    kony.application.dismissLoadingScreen();
  },
  redrawSelectorRegion:function(eventObject,x,y){
    x=Math.round(x);
    y=Math.round(y);
    if(y > 60 && 
       y > this.blankSpaceHeightInDp/2 &&
       y > (this._point0["y"]-this._proximity) && 
       y < (this._point0["y"]+this._proximity) &&
       x > this._point0["x"] &&
       x < this._point2["x"]){
      // For Line1
      kony.print("*********************************");
      kony.print("Pinched on line1");
      if(this._point2["y"]-y > 70){
        kony.print("Pinched coordinate: "+x+", "+y);
        this.view.flxCenter.top = y;
        this._point0["y"]=y;
        this.view.flxTopBox.height=y;
        this.view.flxLeft.top=y;
        this.view.flxRight.top=y;
      }else{
        kony.print("Box height can't be less than 70dp");
      }
    }else if(x > 30 &&
             x > this.blankSpaceWidthInDP/2 &&
             x > (this._point0["x"]-this._proximity) && 
             x < (this._point0["x"]+this._proximity) &&
             y > this._point0["y"] && 
             y < this._point2["y"]
            ){
      //For Line0
      kony.print("Pinched on line 0");
      if(this._point2["x"]-x > 70){
        this.view.flxCenter.left = x;
        this._point0["x"]=x;
        this.view.flxLeft.width=x;
      }else{
        kony.print("Minimum box widht is 70dp");
      }
    }else if(x < this.deviceWidthInDP - 30 &&
             x < this.deviceWidthInDP - this.blankSpaceWidthInDP/2 &&
             x > (this._point2["x"]-this._proximity) && 
             x < (this._point2["x"]+this._proximity) &&
             y > this._point0["y"] && y < this._point2["y"]){
      kony.print("Pinched on line2");
      if(x-this._point0["x"] > 70){
        var newRightValue=(this.deviceWidthInDP-x);
        kony.print("New right value: "+newRightValue);
        //this.view.flxCenter.right = (this._screenWidth-x) +"dp";
        this.view.flxCenter.right = newRightValue;
        this.view.flxRight.width=newRightValue;
        this._point2["x"]=x;
      }else{
        kony.print("Minimum box width is 70dp");
      }
    }else if(y+60<this.deviceHeightInDP && 
             y+this.blankSpaceHeightInDp/2 < this.deviceHeightInDP &&
             y > (this._point2["y"]-this._proximity) && 
             y < (this._point2["y"]+this._proximity) &&
             x > this._point0["x"] && 
             x < this._point2["x"]){
      // In case of 4th Quad
      kony.print("Pinched on line3");
      kony.print("Pinched coordinate: "+x+", "+y);
      if(y-this._point0["y"] > 70){
        var newBottomValue=this.deviceHeightInDP - y;
        kony.print("New bottom value: "+newBottomValue);
        this.view.flxCenter.bottom = newBottomValue;
        this.view.flxBottom.height=newBottomValue;
        this.view.flxLeft.bottom=newBottomValue;
        this.view.flxRight.bottom=newBottomValue;
        this._point2["y"]=y;
      }else{
        kony.print("Minimum box height is 70dp");
      }
    }
  },
  enableCropping:function(){
    this.view.flxOperations.setVisibility(false);
    this.view.flxCropperRoot.setVisibility(true);
  },
  disableCropping:function(){
    this.view.flxOperations.setVisibility(true);
    this.view.flxCropperRoot.setVisibility(false);
  },
  setLayout:function(){
    this.disableCropping();
    this.view.flxResultRoot.setVisibility(false);
  },
  cropImageAndProceed:function(){
    try{
      var imageRawbytes = kony.convertToRawBytes(this.view.imgSelectedImage.base64);
      var imgObj = kony.image.createImage(imageRawbytes);

      var w=imgObj.getImageWidth();
      var h=imgObj.getImageHeight();
      var imageWidthFactor=w/this.deviceWidthInDP;
      var imageHeightFactor=h/this.deviceHeightInDP;
      var x=this._point0["x"];
      var y=this._point0["y"];

      //x=(x)*imageWidthFactor;
      //y=(y)*imageHeightFactor;

      x=(x-this.blankSpaceWidthInDP/2)*imageWidthFactor;
      y=(y-this.blankSpaceHeightInDp/4)*imageHeightFactor;


      x = Math.round(x);
      y = Math.round(y);

      var width = (this.deviceWidthInDP-Number(this.view.flxLeft.width)-Number(this.view.flxRight.width)+this.blankSpaceWidthInDP/2)*
          imageWidthFactor;
      var height = (this.deviceHeightInDP-Number(this.view.flxTopBox.height)-Number(this.view.flxBottom.height)+this.blankSpaceHeightInDp/2)*
          imageHeightFactor;
      width = Math.round(width);
      height = Math.round(height);
      imgObj.cropToRect([x,y,width,height]);
      //this.view.imgSelectedImage.rawBytes=imgObj.getImageAsRawBytes();
      var rawBytes=imgObj.getImageAsRawBytes();
      this.view.imgSelectedImage.base64=kony.convertToBase64(rawBytes);
      this.view.flxCropperRoot.setVisibility(false);
      this.processImage();
    }catch(excp){
      alert(JSON.stringify(excp));
    }
  },
  processImage:function(){
    if(typeof this.imageClassifier == 'object' && this.imageClassifier!==null){
      kony.print("inside imageClassifier recognizeImage ");
      if(typeof this.view.imgSelectedImage.base64 == 'string'){
        try{
          var rawBytes = kony.convertToRawBytes(this.view.imgSelectedImage.base64);
          kony.application.showLoadingScreen("","Identifying Object",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
          this.imageClassifier.recognizeImage(rawBytes);
        }catch(excp){
          kony.application.dismissLoadingScreen();
          alert(JSON.stringify(excp));
        }
      }else{
        alert("Image base64 not available!");
      }
    }
  },
  onFormInit:function(){
    this.initializeImageClassifier();
  },
  imageClassificationSuccess:function(resultArray){
    kony.print("onSuccess_imageClassifier called resultArray = " + resultArray);
    kony.application.dismissLoadingScreen();
    this.view.flxResultRoot.setVisibility(true);
    this.view.flxOperations.setVisibility(false);
    var size = resultArray.length;
    var title="NA",confidence=0.0;
    for(i = size-1 ; i >= 0 ;i--){
      //kony.print(resultArray[i].title+"--------->"+ resultArray[i].confidence);
      //alert(resultArray[i].title+ "--------->"+ resultArray[i].confidence);
      if(resultArray[i].confidence > confidence){
        title=resultArray[i].title;
        confidence=resultArray[i].confidence;
      }
    }
    this.view.lblObjectType.text=title;
    this.view.lblConfidanceVal.text=(Math.round(10000*confidence))/100+" %";
  },

  imageClassificationFailure:function(errorCode,errorMessage){
    kony.application.dismissLoadingScreen();
    kony.print("onFailure_imageClassifier called");
    alert("error" + errorMessage);
  },
  initializeImageClassifier : function(){
    var config = {};
    config.modelType = kony.ml.MODEL_TYPE_QUANTIZED;
    config.onSuccess = this.imageClassificationSuccess;
    config.onFailure = this.imageClassificationSuccess;
    config.modelPathSource = kony.ml.MODEL_SOURCE_TYPE_BUNDLED;
    if(kony.os.deviceInfo().name.toLowerCase()=='iphone'){
      config.modelPath =  "ObjectDetector";
      config["modelInputSize"] = {"width": 299 ,"height": 299};
    }else if(kony.os.deviceInfo().name.toLowerCase()=='android'){
      config.modelPath =  "model";
      config.labelPath = "label";
    }
    this.imageClassifier =  new kony.ml.ImageClassifier(config);
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
      if(kony.os.deviceInfo().name.toLowerCase()=='iphone'){
        mimeType=permStatus;
      }
      if(mimeType=='image/png' || mimeType=='image/jpeg' || mimeType=='image/jpg'){
        var params={};
        kony.application.showLoadingScreen("","",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
        this.setLayout();
        this.setCroppingLayout();
        var base64=kony.convertToBase64(imageRawByte);
        this.view.imgSelectedImage.base64=base64;
        kony.application.dismissLoadingScreen();
      }else{
        alert("Only png, jpg and jpeg file format supported");
      }
    }else{
    }
  },
  captureScreenshot:function(){
    var imageObject=kony.image.createImageFromSnapShot(this.view.flxRoot);
    imageObject.writeToMediaGallery();
    alert("Screenshot saved to Gallery!");
  }
});