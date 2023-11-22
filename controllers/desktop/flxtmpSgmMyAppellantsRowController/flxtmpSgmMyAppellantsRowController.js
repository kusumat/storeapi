define({ 

 //Type your controller code here 
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_11-07-18
  //----------------------------------------------------------------------------
  onNavigate:function(){
    //gblSettings(this);
    this.settingUpEventsActions();
  },
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_11-07-18
  //----------------------------------------------------------------------------
  settingUpEventsActions:function(){

      this.view.btnShowDetails.onClick = this.shoHideDetailsMyAppelantsList;

  },
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_11-07-18
  //----------------------------------------------------------------------------
  /**
   * @function
   *
   */
  shoHideDetailsMyAppelantsList:function(){
    var isVisibleDetails = this.view.flxContainerExpandView.isVisible;
    if(isVisibleDetails === false){
      this.view.btnShowDetails.text = "Hide Details";
      this.view.flxContainerExpandView.isVisible = true;
    }else if(isVisibleDetails === true){
      this.view.btnShowDetails.text = "Show Details";
      this.view.flxContainerExpandView.isVisible = false;
    }
  },
 });