define({ 

  //Type your controller code here 
  onNavigate:function(){
    this.setFormProperties();
  },
  setFormProperties:function(){
    var param={};
    //param["statusBarColor"]="13294b";
    param["statusBarColor"]="4b88f1";
    param["statusBarForegroundColor"]="ff0000";
    param["statusBarStyle"]=constants.STATUS_BAR_STYLE_LIGHT_CONTENT;
    setApplicationProperties(param);
  },
  onFormPostshow:function(){
    kony.timer.schedule("timersplash", this. navigateToDashBoardForm.bind(this) , 1, false);
  },
  navigateToDashBoardForm:function(){
    try{
      var navObj=new kony.mvc.Navigation("frmDashBoard");
      navObj.navigate();
    }catch(excp){
      alert(JSON.stringify(excp));
    }
  }

});