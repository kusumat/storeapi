var frm;
define(function() {
  var frm; 	
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.buttonMaintenanceMsgClose.onClick = this.dismiss;
      this.view.flxMessageHeadingContainer.accessibilityConfig = {
        "a11yLabel" : "",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.flxContainerNoticeMessage.accessibilityConfig = {
        "a11yIndex" : 1,
        "a11yHidden" : false
      };
      this.view.richTextMsg.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      this.view.accessibilityConfig = {
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);   
    },
        
    onBreakpointChange: function(form, width){
      try {
        if(width <= gblBreakPoint) {
          this.view.height = '115px'; 
          this.view.FlexScrollGroup0fNotices.height = "88px";
        }
        else {
          this.view.height = '90px';       
          this.view.FlexScrollGroup0fNotices.height = "63px";
        }

      }
      catch(err) {
      kony.print("onBreakpointChange Exception:"+err);
      }
    }, 
    dismiss:function(event){
//       this.view.parent.flxMainContainerScoll.flxContentScroll.isVisible = true;
      this.view.isVisible = false;
      var mainheight = 0;
      gblMaintenanceMsgClosed = true;
      var screenheight = kony.os.deviceInfo().screenHeight;
      var pForm =  kony.application.getCurrentForm();
      if (currentFrm.Name.startsWith('frmHomeScreen')){
        var headerSize = (pForm.changeLanguaje) ? pForm.changeLanguaje.frame.height : 0;
        mainheight =  headerSize + pForm.mainNavigation.frame.height + pForm.navHeaderBar.frame.height;
        pForm.flxContentScroll.height = (screenheight-mainheight)+'px';                  
      }
      if (currentFrm.Name.startsWith('frmAppellantDash')){
        mainheight = pForm.mainHeaderScreens.frame.height + pForm.subNavigationHeaders.frame.height;
        pForm.flxContainerForm.height = (screenheight-mainheight)+'px';
      }
      if (currentFrm.Name.startsWith('frmAuthorizedRepDashSearch')){
        mainheight = pForm.mainHeaderScreens.frame.height + pForm.subNavigationHeaders.frame.height;
        pForm.flxContainerForm.height = (screenheight-mainheight)+'px';
      }
      else {
        if (currentFrm.Name.startsWith('frmAuthorizedRepDash')){
          mainheight = pForm.mainHeaderScreens.frame.height + pForm.subNavigationHeaders.frame.height;
          pForm.flxContainerForm.height = (screenheight-mainheight)+'px';
        }
      } 
      return;
    },   
    
    checkforMaintMsg:function(frm){     
      this.frm = frm;
      this.frm.view.noticeMessage.isVisible = false;
      this.view.isVisible = false;
      operationName =  "retrieveMaintenanceActivityMessages";
      var user_role= "PRE-LOGIN"; 
      if (gblPortalUserRole.length > 0) 
        user_role = gblPortalUserRole;
      var data= {"portalUserType": user_role};
      var headers= {};
      var serviceName = "appellantServices";
      try {

        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        integrationObj.invokeOperation(operationName, headers, data, 
                                       this.getMaintenanceMessageSuccess, 
                                       this.getMaintenanceMessageFailure);
      } catch (exApi) {
        alert(exApi);
      }
    },  

   getMaintenanceMessageSuccess:function(response) {
    kony.print("inside getMaintenanceMessageSuccess: "+JSON.stringify(response));
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.exceptionNavigation;
        response.userAction = apiActions.actionWait;
        navigateToErrorPage(response);  
      }
      else
      {
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.errorStatus = response.errorStatus;
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }   
        else 
        {
          if(response.errmsg !== null && response.errmsg !== undefined && response.errmsg !== "") {
            //alert("There was a problem getting demographic information: " + response.errmsg);
          }
          else if(response.maintenanceMessageList !== null && response.maintenanceMessageList !== undefined) {
                let msgList=''; 
            	maintenanceMessageList = response.maintenanceMessageList; 
                response.maintenanceMessageList.forEach((element, index) => {
                  let tempMsg = element.messageText.replace(/(\r\n|\n|\r)/gm, '');
                  if(tempMsg.length > 100)
                    tempMsg = tempMsg.substring(0,100)+" ...(see more)";
                  msgList = msgList+"<li><input id='ButtonMsgMore' aria-label='' type='button' style='text-align: left; color:#000000; background-color:#ef1217; white-space: pre-wrap; overflow-wrap: break-word; padding: 0px;' value='"+tempMsg+"' onclick='showMaintMsg("+index+")'></li>";
                });
                    
                if (msgList !== "") {
                  this.view.richTextMsg.text = "<p><ul type=disc style='padding-left:20px'>"+msgList+"</ul></p>";
                }
                else{
                  this.view.richTextMsg.text = msgList;
                }
                if (gblMaintenanceMsgClosed === false) {
                  if(response.maintenanceMessageList.length > 0){
                    this.view.isVisible = true;
                    this.frm.view.noticeMessage.height = '90px';
                    this.frm.view.noticeMessage.isVisible = true;

                    var mainheight = 0;
                    var screenheight = kony.os.deviceInfo().screenHeight;
                    var pForm =  kony.application.getCurrentForm();


                    if (currentFrm.Name.startsWith('frmHomeScreen')){
                      var headerSize = (pForm.changeLanguaje) ? pForm.changeLanguaje.frame.height : 0;
                      mainheight =  headerSize + pForm.mainNavigation.frame.height + pForm.navHeaderBar.frame.height;
                      pForm.flxContentScroll.height = (screenheight-mainheight-90)+'px';                  
                    }
                    if (currentFrm.Name.startsWith('frmAppellantDash')){
                      mainheight = pForm.mainHeaderScreens.frame.height + pForm.subNavigationHeaders.frame.height;
                      pForm.flxContainerForm.height = (screenheight-mainheight-90)+'px';
                    }
                    if (currentFrm.Name.startsWith('frmAuthorizedRepDashSearch')){                 
                      mainheight = pForm.mainHeaderScreens.frame.height + pForm.subNavigationHeaders.frame.height;
                      pForm.flxContainerForm.height = (screenheight-mainheight-90)+'px';                    
                    }
                    else {
                      if (currentFrm.Name.startsWith('frmAuthorizedRepDash')){
                        mainheight = pForm.mainHeaderScreens.frame.height + pForm.subNavigationHeaders.frame.height;
                        pForm.flxContainerForm.height = (screenheight-mainheight-90)+'px';
                      } 
                    }
                  }
                }
                else { 
                  this.view.isVisible = false;
                  this.frm.view.noticeMessage.height = '0px';
                  this.frm.view.noticeMessage.isVisible = false;
                }

                this.view.forceLayout();	
                this.frm.view.forceLayout(); 
                this.view.forceLayout();  
          }
        }
      }
    }

  },

  getMaintenanceMessageFailure:function(error) {
    var callSpecificMsg = "Unable to access maintenance messages.";
    currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
    currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
    currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
    currentFrm.view.puInformationDialog.isVisible = true; 
    currentFrm.view.forceLayout();
  }

  };
});