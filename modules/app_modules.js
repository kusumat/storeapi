//Type your code here
function setApplicationProperties(params){
  var appProperties;
  if(typeof params =='object' && params!==null){
    appProperties={};
    if(typeof params["statusBarColor"]=='string'){
      appProperties["statusBarColor"]=params["statusBarColor"];
    }else{
      appProperties["statusBarColor"]= "13294b";
    }
    if(typeof params["statusBarForegroundColor"]=='string'){
      appProperties["statusBarForegroundColor"]=params["statusBarForegroundColor"];
    }else{
      appProperties["statusBarForegroundColor"]="ff0000";
    }
    if(typeof params["statusBarStyle"]=='number'){
    	appProperties["statusBarStyle"]= params["statusBarStyle"]
    }else{
      appProperties["statusBarStyle"]= constants.STATUS_BAR_STYLE_DEFAULT;
    }
    //appProperties["statusBarStyle"]= constants.STATUS_BAR_STYLE_LIGHT_CONTENT;

  }else{
    appProperties={
      "statusBarColor": "13294b",
      "statusBarForegroundColor": "ff0000",
      //"statusBarStyle": constants.STATUS_BAR_STYLE_LIGHT_CONTENT,
      "statusBarStyle":constants.STATUS_BAR_STYLE_DEFAULT
    };
  }
  if(kony.os.deviceInfo().name=="android" || kony.os.deviceInfo().name.toLowerCase()=="iphone"){
    kony.application.setApplicationProperties(appProperties);
  }
}