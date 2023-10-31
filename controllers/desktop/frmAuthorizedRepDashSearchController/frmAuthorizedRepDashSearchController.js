// var activeAppellantList=[];
// let mobileFlag=false;
// var loadAppellants = true;
define({ 

  stateCfg: { 
    // See also: "chatBpSpecs" in gblChatSpecs.js
    parentContainer: null,
    chatSpec: {},

  },

  setParentSize: function(flxContainer) {
    this.stateCfg.parentContainer = flxContainer;
    this.stateCfg.parentSize = { height: flxContainer.frame.height, width: flxContainer.frame.width };
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
  },

  //Type your controller code here 
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_11-07-18
  //----------------------------------------------------------------------------
  onNavigate:function(params){
    gblSettings(this);
    gblARHearingFrom = "frmAuthorizedRepDashSearch";
    currentFlow = "Not Started";
    this.setParentSize(this.view.flxMainContainer);
    this.settingUpEventsActions();
    this.getInitialARDemographicInfo();
    dashboardPage = this.view.id;
    this.view.subNavigationHeaders.txtBoxSearchFieldonKeyUp = this.onDone.bind(this);
    //this.view.subNavigationHeaders.txtBoxSearchFieldOnDone = this.searchKey;
    //this.view.subNavigationHeaders.txtBoxSearchFieldTextOnDone = this.onDone.bind(this);
    this.view.noticeMessage.checkforMaintMsg(this);
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.view.btnRequestHearing.setVisibility(gblIsTPMUser !== true);     
    this.view.lblSubTiitleSugest.setVisibility(gblIsTPMUser !== true);
    this.view.lblSubTiitleSugestDesc.setVisibility(gblIsTPMUser !== true);
    this.view.flxContainerInnerHeaderButtons.setVisibility(gblIsTPMUser !== true);
    this.view.flxContainerInnerHeader.setVisibility(gblIsTPMUser !== true);
	this.view.preShow = this.preShow;    
    if (this.view.flxContainerCol1.snARSearch === undefined){
      if(gblIsTPMUser === true){
        snARSearch = new snARSearchCom.snARSearchTPM({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "centerX": "50%",
          "clipBounds": false,
          "id": "snARSearch",
          "isVisible": true,
          "layoutType": kony.flex.ALIGN_CHILD_BOTTOM_TO_TOP,
          "masterType": constants.MASTER_TYPE_USERWIDGET,
          "isModalContainer": false,
          "skin": "CopysknFlxWhiteBgRounder",
          "top": "5px",
          "width": "95%"
        }, {}, {});   
      }
      else
      {
        snARSearch = new snARSearchCom.snARSearch({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "centerX": "50%",
          "clipBounds": false,
          "id": "snARSearch",
          "isVisible": true,
          "layoutType": kony.flex.ALIGN_CHILD_BOTTOM_TO_TOP,
          "masterType": constants.MASTER_TYPE_USERWIDGET,
          "isModalContainer": false,
          "skin": "CopysknFlxWhiteBgRounder",
          "top": "5px",
          "width": "95%"
        }, {}, {});  
      }
      this.view.lblSubTiitleSugest.accessibilityConfig = {
        "a11yLabel": this.view.lblSubTiitleSugest.Text,
        "a11yIndex": 0,
        "a11yHidden": false
      };
      this.view.lblSubTiitleSugestDesc.accessibilityConfig = {
        "a11yLabel": this.view.lblSubTiitleSugestDesc.Text,
        "a11yIndex": 0,
        "a11yHidden": false
      };

      this.view.flxContainerCol1.addAt(snARSearch, 0);   
    }
    
    if(gblIsTPMUser === true){
      this.view.btnRequestHearing.setVisibility(false); 
      this.view.flxContainerInnerHeader.setVisibility(false);
    }

    loadAppellants = true;
    if(params !== null && params !== undefined) {
      if(params.isCancelled !== null && params.isCancelled !== undefined) {
        if(params.isCancelled === true) {
          loadAppellants = false;
        }
      }
    }
    this.view.resourcesList.setParentView(this.view);
    this.view.onBreakpointChange = this.onBreakpointChange;   
    this.view.fContinueButton.btnContinueOnClick = this.getDistinctAppellants;
    this.view.snARSearch.setComponentData("");
  },
  onDone: function (txtBox) {
    let txtBoxId = txtBox.id;
    this.searchKey();

  },
  preShow: function(eventobject){
	voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },
  getDistinctAppellants: function() {
    this.view.snARSearch.getComponentData();
    var data= {"hatsUserId": testHatsUserId};
    var headers= {};
    var serviceName = "appellantServices";
    switch (gblARSearchTab) {
      case "Appellants":
        operationName =  "getDistinctAppellantsByHatsUserIdAndCaseInfo";
        data= {"hatsUserId": testHatsUserId,
               "applNbr": this.view.snARSearch.textAppealNumber, 
               "caseNbr":  this.view.snARSearch.textCaseNumber,
               "firstName":  this.view.snARSearch.textFirstName,
               "lastName":  this.view.snARSearch.textLastName
              }
        ;
        callBackFunction = this.getDistinctAppellantsSuccess;

        break;
      case "HearingSchedules":
        operationName =  "retrieveScheduledAppealsByUserIdAndHearingDates";
        
        if (gblHearingStartDate === ""){
          callSpecificMsg = name + "Hearing start date is required for this search option.";
          currentFrm.view.puInformationDialog.flxContainerInfoHeight = '175px';
          currentFrm.view.puInformationDialog.lblTitleText = "Search Hearing Schedules";
          currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
          currentFrm.view.puInformationDialog.isVisible = true; 
          addEventListener('keydown',this.preventTabMsg);
          currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
          currentFrm.view.forceLayout(); 
          return;
        }
        if (gblHearingEndDate !== "") {
          var startdt = gblHearingStartDate.substr(6,4)+gblHearingStartDate.substr(0,2)+gblHearingStartDate.substr(3,2);
          var enddt = gblHearingEndDate.substr(6,4)+gblHearingEndDate.substr(0,2)+gblHearingEndDate.substr(3,2);
          if (startdt > enddt){
            callSpecificMsg = name + "Hearing end date must be greater than or equal to hearing start date.";
            currentFrm.view.puInformationDialog.flxContainerInfoHeight = '175px';
            currentFrm.view.puInformationDialog.lblTitleText = "Search Hearing Schedules";
            currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
            currentFrm.view.puInformationDialog.isVisible = true; 
            addEventListener('keydown',this.preventTabMsg);
            currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
            currentFrm.view.forceLayout(); 
            return;
          }
        }
        data= {"hatsUserId": testHatsUserId,"hearingStartDate": gblHearingStartDate, "hearingEndDate":  gblHearingEndDate};
        callBackFunction = this.retrieveScheduledAppealsSuccess;
        break;
      case "Compliance":
        operationName =  "retrieveComplianceDetails";
        data= {"hatsUserId": testHatsUserId,"complianceDueDate": gblARComplianceDate, "includeReceivedStatus":  gblARReceivedStatus};
        callBackFunction = this.retrieveComplianceDetailsSuccess;
        break;
      case "CompletedHearings":
       operationName =  "getCompletedAppealsByHatsUserId";
        data= {"hatsUserId": testHatsUserId,
               "applNbr": this.view.snARSearch.textAppealNumberCompleted, 
               "caseNbr":  this.view.snARSearch.textCaseNumberCompleted,
               "firstName":  this.view.snARSearch.textFirstNameCompleted,
               "lastName":  this.view.snARSearch.textLastNameCompleted
              }
        ;
        callBackFunction = this.getCompletedAppealsSuccess;
        break;
      default:
        operationName =  "getDistinctAppellantsByHatsUserId";
        break;
    }

    try {
      showLoadingIndicator();
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
      integrationObj.invokeOperation(operationName, headers, data, callBackFunction, this.getDistinctAppellantsFailure);
    } catch (exApi) {
      dismissLoadingIndicator();
      var callSpecificMsg = "An unexpected error occurred while connecting to the network.\n\n" + 
          "Check your network, close this browser session and try again.\n" + 
          "If the issue persists, then call the Support Line.";
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '175px';
      currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
      currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
      currentFrm.view.puInformationDialog.isVisible = true; 
      currentFrm.view.forceLayout();  
      currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
      currentFrm.view.forceLayout();
      logout();
    }
  },
  
  getDistinctAppellantsSuccess: function (response) {    
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errInfoAccessAppellant;
        response.userAction = apiActions.actionCheckNetwork;
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
          if (response.errmsg === "empty response received")
          {
            dismissLoadingIndicator();
            var callSpecificMsg = "There were no Appellants found based on search criteria.";
            currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
            currentFrm.view.puInformationDialog.lblTitleText = "Appellant Information Search";
            currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
            currentFrm.view.puInformationDialog.isVisible = true; 
            currentFrm.view.forceLayout();
            addEventListener('keydown',this.preventTabNav);           
            currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
            currentFrm.view.forceLayout(); 
            
            return;
          }
          if(response.distinctAppellantsByHatsUserId !== null && response.distinctAppellantsByHatsUserId !== undefined) {
            //do we have an appellant or an authorized representative?
            var appellant = response.distinctAppellantsByHatsUserId[0];
            //if(appellant.addressTypeCd !== undefined && (appellant.addressTypeCd === null || appellant.addressTypeCd === "null")) {
            if( (gblIsARUser === false && appellant.addressTypeCd === undefined) || (appellant.addressTypeCd === null || appellant.addressTypeCd === "null")) {
              //appellant
              gblAppellantId = appellant.appellantId;
              navigateToLandingPage("frmAppellantDash");
            }
            else {
              //authorized rep 
              gblIsARUser = true;
              gblAppellantList = response.distinctAppellantsByHatsUserId;
              try{
                kony.print("Going to Hearing request");
                ntf = new kony.mvc.Navigation("frmAuthorizedRepDash");
                ntf.navigate();
              }catch(err){
                kony.print("Something happened wrong");
              }
//               dashboardPage = "frmAuthorizedRepDash";
//               navigateToLandingPage("frmAuthorizedRepDash");
            }
          }
          else {
            if (gblPortalUserRole.startsWith('AR')){
              gblIsARUser = true;
              try{
                kony.print("Going to Hearing request");
                ntf = new kony.mvc.Navigation("frmAuthorizedRepDash");
                ntf.navigate();
              }catch(err){
                kony.print("Something happened wrong");
              }
//               dashboardPage = "frmAuthorizedRepDash";
//               navigateToLandingPage("frmAuthorizedRepDash");
            }
//             if (gblPortalUserRole.startsWith('APP')){
//               gblIsARUser = false;
//               gblIsTPMUser = false;
//               dashboardPage = "frmAppellantDash";
//               navigateToLandingPage("frmAppellantDash");
//             }
            if (gblPortalUserRole.startsWith('TPM')){
              gblIsARUser = true;
              gblIsTPMUser = true;
              try{
                ntf = new kony.mvc.Navigation("frmAuthorizedRepDash");
                ntf.navigate();
              }catch(err){
                kony.print("Something happened wrong");
              }
//               dashboardPage = "frmAuthorizedRepDash";
//               navigateToLandingPage("frmAuthorizedRepDash");
            }      
          }
          dismissLoadingIndicator();
        }
      }
    }
  },
  
  retrieveScheduledAppealsSuccess: function (response) {
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errInfoAccessAppellant;
        response.userAction = apiActions.actionCheckNetwork;
        navigateToErrorPage(response);  
      }
      else
      {
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.errorStatus = response.errorStatus;
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }   
        else {
          if (response.appellantHearingList === undefined)
          {
            dismissLoadingIndicator();
            var callSpecificMsg = "There were no scheduled hearings found based on search criteria.";
            currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
            currentFrm.view.puInformationDialog.lblTitleText = "Search Hearing Schedules";
            currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
            currentFrm.view.puInformationDialog.isVisible = true; 
            currentFrm.view.forceLayout();
            addEventListener('keydown',this.preventTabNav);
            currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
            currentFrm.view.forceLayout();
          }
          else {
            try{
              gblAppellantList = response.appellantHearingList;
              ntf = new kony.mvc.Navigation("frmAuthorizedRepDash");
              ntf.navigate();
            }catch(err){
              kony.print("Something happened wrong");
            }
          }
          dismissLoadingIndicator();
        }
      }
    }
  },
  retrieveComplianceDetailsSuccess: function (response) {
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errInfoAccessAppellant;
        response.userAction = apiActions.actionCheckNetwork;
        navigateToErrorPage(response);  
      }
      else
      {
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.errorStatus = response.errorStatus;
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }   
        else {
          if (response.complianceCount === "0")
          {
            dismissLoadingIndicator();
            var callSpecificMsg = "There were no Compliance Information found based on search criteria.";
            currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
            currentFrm.view.puInformationDialog.lblTitleText = "Compliance Information Search";
            currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
            currentFrm.view.puInformationDialog.isVisible = true; 
            currentFrm.view.forceLayout();
            addEventListener('keydown',this.preventTabNav);
            currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
            currentFrm.view.forceLayout();            
          }
          else {
            try{
              gblAppellantList = response.complianceList;
              
              gblAppellantList = gblAppellantList.sort(function(a, b) {
                if (a.complianceDueDate.substr(6, 4) === b.complianceDueDate.substr(6, 4)) {
                  if (a.complianceDueDate.substr(0, 2) === b.complianceDueDate.substr(0, 2)) {
                    return  a.complianceDueDate.substr(3, 2) - b.complianceDueDate.substr(3, 2);
                  }
                  return  a.complianceDueDate.substr(0, 2) - b.complianceDueDate.substr(0, 2);
                }
                return a.complianceDueDate.substr(6, 4) - b.complianceDueDate.substr(6, 4);
              });
              ntf = new kony.mvc.Navigation("frmAuthorizedRepDash");
              ntf.navigate();
            }catch(err){
              kony.print("Something happened wrong");
            }
          }
          dismissLoadingIndicator();
        }
      }
    }
  },

  getDistinctAppellantsFailure: function (error) {
    dismissLoadingIndicator();
    alert("Unable to access Appellant Info");  
  },
  
  getCompletedAppealsSuccess: function (response) {
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errInfoAccessAppellant;
        response.userAction = apiActions.actionCheckNetwork;
        navigateToErrorPage(response);  
      }
      else
      {
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.errorStatus = response.errorStatus;
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }   
        else {
          if (response.completedAppealsByHatsUserId[0].appealListByHatsUser === undefined)
          {
            dismissLoadingIndicator();
            var callSpecificMsg = "There were no Completed Appeals found based on search criteria.";
            currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
            currentFrm.view.puInformationDialog.lblTitleText = "Completed Appeals Search";
            currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
            currentFrm.view.puInformationDialog.isVisible = true; 
            currentFrm.view.forceLayout();
            addEventListener('keydown',this.preventTabNav);
            currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
            currentFrm.view.forceLayout();            
          }
          else {
            try{
              gblAppellantList = response.completedAppealsByHatsUserId[0].appealListByHatsUser;
              ntf = new kony.mvc.Navigation("frmAuthorizedRepDash");
              ntf.navigate();
            }catch(err){
              kony.print("Something happened wrong");
            }
          }
          dismissLoadingIndicator();
        }
      }
    }
  },
  onBreakpointChange: function(form, width){
    try{
    this.view.navFooterBarPostLogin.breakPointChange(width);
    this.view.noticeMessage.onBreakpointChange(this, width);
    
    this.view.subNavigationHeaders.height = "35px";
    heightAdjust = 0;
    if(width <= gblBreakPoint){ 
      mobileFlag = true;
      cardWidth = '100%';
    }
    else{
      mobileFlag = false;
      cardWidth = '50%';
    }   
         
    amplify.publish("authorizedDash", form, width);                                                                                                                                    
    if(width <= gblBreakPoint){ 
      this.view.subNavigationHeaders.flxContainerSerchFilterWidth = '50%';
      this.view.mainHeaderScreens.height ='130px'; 
      
      this.view.btnRequestHearing.setVisibility(gblIsTPMUser !== true);     
      this.view.lblSubTiitleSugest.setVisibility(gblIsTPMUser !== true);
      this.view.lblSubTiitleSugestDesc.setVisibility(gblIsTPMUser !== true);
      this.view.flxContainerInnerHeaderButtons.setVisibility(gblIsTPMUser !== true);
      this.view.flxContainerInnerHeader.setVisibility(gblIsTPMUser !== true);
      
      this.view.flxContainerInnerHeader.height = "120px";
      heightAdjust = (165/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";
    }
    else{
      this.view.subNavigationHeaders.flxContainerSerchFilterWidth = '17%';
      this.view.mainHeaderScreens.height ='100px';   
      this.view.flxContainerInnerHeader.height = "65px";
      heightAdjust = (135/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";     
    }        
    
    this.view.flxGroupContent.height = kony.os.deviceInfo().screenHeight + "px";
      								   
    this.view.flxContainerBody.height = 100 - ((parseInt(this.view.flxContainerInnerHeader.height.replace("px", ""))/
                                                parseInt(this.view.flxGroupContent.height.replace("px", ""))) *100) + "%";  
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);    
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },
  
  getInitialARDemographicInfo:function() {
    operationName =  "retrieveContactDemographicsByUserIdAndPortalUserType";
    
    var data= {"hatsUserId": testHatsUserId, "portalUserType":"AR" };
    if(gblIsTPMUser === true)
      data= {"hatsUserId": testHatsUserId, "portalUserType":"TPM" };
    var headers= {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, 
                                     this.getInitialARDemographicInfoSuccess, 
                                     this.getInitialARDemographicInfoFailure);
  },

  getInitialARDemographicInfoSuccess:function(response) {
      if(response !== null && response !== undefined) {
        if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
          response.errorMessage = apiErrors.errServerDemographics;
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
              gblARDemographicInfo.firstName = undefined;
              this.view.mainHeaderScreens.setComponentData(undefined);
              alert("There was a problem getting demographic information: " + response.errmsg);
            }
            else if(response.ContactDemographicsDTO !== null && response.ContactDemographicsDTO !== undefined) {
              var details = response.ContactDemographicsDTO[0]; 
              var firstName = details.firstName; 
              gblARDemographicInfo = details;
              this.view.mainHeaderScreens.setComponentData(firstName);
            }
          }
        }
      }
  },
    
  getInitialARDemographicInfoFailure:function(error) {
    var callSpecificMsg = "Unable to access demographic info.";
    currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
    currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
    currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
    currentFrm.view.puInformationDialog.isVisible = true; 
    currentFrm.view.forceLayout();
    addEventListener('keydown',this.preventTabNav);
    currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
    currentFrm.view.forceLayout();
  },      
  
  searchKey:function(event){
    var evt  = window.event;
    //if (evt.keyCode === 13) {

    if(this.view.subNavigationHeaders.txtBoxSearchFieldText.trim() === "")
      this.activeAppellantList =gblAppellantList;
    else{
      var appellants = this.find_in_object(JSON.parse(JSON.stringify(gblAppellantList)), ''+this.view.subNavigationHeaders.txtBoxSearchFieldText);
      this.activeAppellantList =appellants;
    }
    //}
  },

  
  find_in_object: function(array, string) {
    for (i = 0; i < array.length; i++) 
      array[i].fullName = array[i].appellantFirstName + " " + array[i].appellantLastName;

    var result = [];
    for(var i = 0; i < array.length; i++) {
      var appellantName = array[i].fullName;
      if(appellantName.toLowerCase().includes(string.toLowerCase().trim())) {
        result.push(array[i]);
      }
    }
    return result;
  },

  setAppellentDemographics:function() {
    this.view.mainHeaderScreens.userNameText = gblDemographicInfo.AppellantFirstName; 
  },  
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_11-07-18
  //----------------------------------------------------------------------------
  settingUpEventsActions:function(){
    try{
      //this.view.preShow = this.settingProvicionalData;
      this.view.btnRequestHearing.onClick = this.toHearingRequest;
    }catch(err){
      kony.print("Shomething went wrong while settingUp");
    }
  },

  toHearingRequest:function(){
    try{
      kony.print("Going to Hearing request");
      var ntf = new kony.mvc.Navigation("frmARHearingRequestStep1");
      ntf.navigate();
    }catch(err){
      kony.print("Something happened wrong");
    }
  },  
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_11-07-18
  //----------------------------------------------------------------------------
  settingProvicionalData:function(){
    this.view.sgmListAppellants.widgetDataMap = {
    };
    var dataObj = [
      {
        id:" ",
        template:"tmpSgmMyAppellantsRow"
      },
      {
        id:" ",
        template:"tmpSgmMyAppellantsRow"
      },
      {
        id:" ",
        template:"tmpSgmMyAppellantsRow"
      },
      {
        id:" ",
        template:"tmpSgmMyAppellantsRow"
      },
      {
        id:" ",
        template:"tmpSgmMyAppellantsRH"
      },
      {
        id:" ",
        template:"tmpSgmMyAppellantsRH"
      }
    ];
    this.view.sgmListAppellants.setData(dataObj);
  },

  displayProfileMenu:function() {
    displayProfileMenu(this.view);
  },

  selectProfileMenuItem:function() {
    selectProfileMenuItem(this.view);
  },

  onEnableChat: function() {
    gblSetEnableChat(this, true);
  },

  onDisableChat: function() {
    //gblSetEnableChat(this, false);
  },

  onClickChat: function() {
    if (this.view.chatbotFAQiframe.isConversationOpen()) {
      kony.print("????? >>>> CLICK closeChat");
      this.view.chatbotFAQiframe.closeChat();
      // Overlay -- position & size
      let overlaySpec = this.stateCfg.chatSpec.overlay.close;
      this.view.flxOverlayChat.bottom = 50 +'dp';
      this.view.flxOverlayChat.right = 30 + 'dp';
      this.view.flxOverlayChat.height = overlaySpec.h;
      this.view.flxOverlayChat.width = overlaySpec.w;
      // Chat iFrame - visibility
      let frameSpec = this.stateCfg.chatSpec.frame.close;
      this.view.chatbotFAQiframe.setVisibility(false);
      // Button 
      let buttonSpec = this.stateCfg.chatSpec.button.close;
      this.view.chatbotButton.right = 30+'dp';
      this.view.chatbotButton.bottom = 50+'dp';
    } else {
      kony.print("????? >>>> CLICK openChat");
      this.view.chatbotFAQiframe.openChat(this.onClickChat);
      // Overlay -- position & size
      let overlaySpec = this.stateCfg.chatSpec.overlay.open;
      this.view.flxOverlayChat.bottom = 50 +'dp';
      this.view.flxOverlayChat.right = 30 + 'dp';
      this.view.flxOverlayChat.height = overlaySpec.h;
      this.view.flxOverlayChat.width = overlaySpec.w;
      // Chat iFrame - size and visibility
      let frameSpec = this.stateCfg.chatSpec.frame.open;
      this.view.chatbotFAQiframe.setVisibility(true);
      this.view.chatbotFAQiframe.height = frameSpec.h;
      this.view.chatbotFAQiframe.width = frameSpec.w;
      this.view.chatbotFAQiframe.right = 30+'dp';
      this.view.chatbotFAQiframe.bottom = 0+'dp';
      // Button 
      let buttonSpec = this.stateCfg.chatSpec.button.open;
      this.view.chatbotButton.right = 30+'dp';
      this.view.chatbotButton.bottom = 50+'dp';
    }
    this.view.forceLayout();
  },

});