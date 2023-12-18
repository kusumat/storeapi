define({ 

  onNavigate:function(params){
    gblSettings(this);
    this.view.mainHeaderScreens.setComponentData(undefined);
    this.view.onBreakpointChange = this.onBreakpointChange; 
    this.view.postShow = this.onPostShow;
	this.view.preShow = this.preShow;
    let errGenericPrefix = "We are having Technical Issues at the moment.";
    let actionGeneric = "Please try again later.";
    var currentdate = new Date();
    this.view.snTechnicalDifficulty.textTimeStamp = currentdate;
    this.view.snTechnicalDifficulty.isVisibleAction = false;
    this.view.snTechnicalDifficulty.textLblDesc1 = "generic description - onnavigate.";
    this.view.snTechnicalDifficulty.textLblSuggestedAction = actionGeneric;
    if ((typeof(params.errorStatus) !== "undefined") && (params.errorStatus !== null)) {
      
      this.view.snTechnicalDifficulty.textLblDesc1 = "";
      let errorMessage = "";
      for(var i = 0; i < params.errorStatus.length; i++) {
        if (i === 0)
        {          
          if (params.errorStatus[i].errorMessage !== undefined) {
          errorMessage += params.errorStatus[i].errorMessage;
          }
          else
            {
              errorMessage += params.errorStatus[i].errorCode;
            }           
        }
        else
        {
          //errorMessage +=  "\n\n" + params.errorStatus[i].errorMessage;
        }        
      }
      
      var words = errorMessage.split(" ");
      errorMessage = "";
      for (i = 0; i < words.length; i++)
      {
        if (words[i].length > 32)
        {
          errorMessage += " "+ words[i].replace(/[/^//]/g, " /");
        }
        else
        {
          errorMessage += " "+ words[i];
        }
      }
      if (params.operationName !== undefined && params.operationName !== null)
          {
            words = params.operationName.split( " ");
            //params.operationName = "";
            for (i = 0; i < words.length; i++)
            {
              if (words[i].length > 32)
              {
                //params.operationName += " "+ words[i].replace(/([a-z])([A-Z])/g, '$1 $2');
              }
              else
              {
                //params.operationName += " "+ words[i];
              }
            }
            //errorMessage +=  "\n\nProcess Flow: " + params.currentFlow;
            //errorMessage +=  "\n\n\nCurrent Form: " + params.currentForm;
            //errorMessage +=  "\nOperation Name: " + params.operationName;
          }
      var screenWidth = kony.os.deviceInfo().screenWidth;
      if(screenWidth <= gblBreakPoint) {
//       if (window.navigator.userAgent.includes("Apple") || window.navigator.userAgent.includes("Android")){
        this.view.snTechnicalDifficulty.lblDescSkin = CopysknLbBlackTiny80;
        this.view.snTechnicalDifficulty.lblSuggestedSkin = CopysknLbBlackTiny80;
      }
      else {
        this.view.snTechnicalDifficulty.lblDescSkin = sknLblBlackRegular;
        this.view.snTechnicalDifficulty.lblSuggestedSkin = sknLblBlackRegular;       
      }

      this.view.snTechnicalDifficulty.textLblDesc1 =  errorMessage;
    } 
    else 
    {
      if ((typeof(params.errorMessage) !== "undefined") && (params.errorMessage !== null)) {
        this.view.snTechnicalDifficulty.textLblDesc1 = errGenericPrefix + " " + params.errorMessage+"";
      } 
      else 
      {
        this.view.snTechnicalDifficulty.textLblDesc1 = errGenericPrefix + " " +  actionGeneric;
      }
    }

    if ((typeof(params.userAction) !== "undefined") && (params.userAction !== null)) {
      let suggestedAction = params.userAction + "\n" + apiActions.actionCallSupport;
      this.view.snTechnicalDifficulty.textLblSuggestedAction = suggestedAction;
      this.view.snTechnicalDifficulty.isVisibleAction = true;
    }

    
 	try{
      operationName = "logError";
      var headers = {};
      var serviceName = "appellantServices";
      var inputParams = {};
      if(params.errorStatus[1])
          inputParams.errorLogText = params.errorStatus[1].errorMessage;
      else
          inputParams.errorLogText = params.errorStatus[0].errorMessage;
      inputParams.flowName = params.currentFlow;
      inputParams.formName = params.currentForm;
      inputParams.operationName = params.operationName;
      inputParams.portalUserType = gblPortalUserRole;
      inputParams.userAction = params.userAction;
      inputParams.userId = testHatsUserId;
      inputParams.sessionId = '';
	  if(navigator && window.screen)
    	inputParams.deviceType = navigator.userAgent + " maxTouchPoints " +navigator.maxTouchPoints + " screenWidth "+ window.screen.width+ " screenHeight "+ window.screen.height;

      kony.print("inside inputParams verifyLogon (loginFieldsController): " + JSON.stringify(inputParams));
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, inputParams);
    }
    catch(err){}
 

    console.log("Tech Difficulties - " + "Only status handled is 500 Server is down.");
    console.log("Tech Difficulties - " + "Check Authentication Provider: OBLDAPSSL or the Web Services: mobile.jfs.ohio.gov");
    console.log("Tech Difficulties - Description: " + this.view.snTechnicalDifficulty.textLblDesc1);
    console.log("Tech Difficulties - Suggested Action: " + this.view.snTechnicalDifficulty.textLblSuggestedAction);
  },
  preShow: function(eventobject){
	voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },  
  onPostShow: function() {
    //this.onOrientation();
  },

  onBreakpointChange: function(form, width){
    try{
    amplify.publish("authorizedDash", form, width);

    heightAdjust = 0;
    if(width <= gblBreakPoint){ 
      this.view.mainHeaderScreens.height ='130px'; 
      heightAdjust = (130/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";
    }
    else{
      this.view.mainHeaderScreens.height ='100px';   
      heightAdjust = (100/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";     
    }   
    this.view.flxGroupContent.height = kony.os.deviceInfo().screenHeight + 'px';

    //this.onOrientation();
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },  

  onOrientation: function() {
    if (kony.os.getDeviceCurrentOrientation() === constants.DEVICE_ORIENTATION_PORTRAIT) {
      this.view.snTechnicalDifficulty.heightFlxMainContainer = "50%";
    } else {
      // constants.DEVICE_ORIENTATION_LANDSCAPE:
      this.view.snTechnicalDifficulty.heightFlxMainContainer = "96%";
    }
  }

});