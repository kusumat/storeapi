var appealList = null;
let cardWidth = '50%';

define({ 
  emptyDashVar:null,
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

  onNavigate:function(params){
    showLoadingIndicator();
    currentFlow = "Not Started";
    this.view.forceLayout();
    gblSettings(this);
    this.emptyDashVar=this.view.emptyDash;
    kony.application.destroyForm("frmGeneralAppealDetails");
    this.setParentSize(this.view.flxMainContainer);
    this.view.preShow = this.preShow;
    this.settingUpEventsActions();
    this.view.mainHeaderScreens.btnDownArrowOnTouchEnd = this.displayProfileMenu;
    this.view.puProfileMenu.sgmProfileMenu.onRowClick = this.selectProfileMenuItem;
    this.view.btnRequestHearing.setVisibility(true); 
    this.view.noticeMessage.checkforMaintMsg(this);
    this.view.subNavigationHeaders.isVisibleBackSubH = (gblIsARUser === true) || (gblIsTPMUser === true);
    if(gblIsARUser){
      this.view.subNavigationHeaders.flxBtnBackSubheaderVisible();
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
      this.view.mainHeaderScreens.welcomeText = "Welcome";
      this.view.subNavigationHeaders.subHeaderBackOnClick = this.goToARDash;
      this.view.subNavigationHeaders.btnArrowLeftNavBackOnClick = this.goToARDash;
    }
    if(gblIsTPMUser === true){
      this.view.btnRequestHearing.setVisibility(false); 
      this.view.flxContainerInnerHeader.setVisibility(false);
      this.view.subNavigationHeaders.subHeaderBackOnClick = this.goToARDash;
      this.view.subNavigationHeaders.btnArrowLeftNavBackOnClick = this.goToARDash;
    }
    
    this.getAppellantDemographicInfo();
    if (dashboardPage === "" || dashboardPage === "frmAuthorizedRepDash")
      {
       this.view.postShow = this.postShowOps;
     }
    else
    {
      this.view.postShow = null;
      this.view.flxScrollContainerRow1.removeAll();
    }
    
    dashboardPage = this.view.id;
    this.view.resourcesList.setParentView(this.view);
    this.view.onBreakpointChange = this.onBreakpointChange;
  },

  onBreakpointChange: function(form, width){
    try{
    amplify.publish("authorizedDash", form, width);
    this.view.navFooterBarPostLogin.breakPointChange(width);
    this.view.noticeMessage.onBreakpointChange(this, width);
    
    this.view.subNavigationHeaders.height = "35px";
    heightAdjust = 0;
    if(width <= gblBreakPoint){ 
      cardWidth = '100%';
      this.view.mainHeaderScreens.height ='130px'; 
      
      this.view.flxContainerInnerHeader.height = "100px";
      heightAdjust = (165/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";
    }
    else{
      cardWidth = '50%';
      this.view.mainHeaderScreens.height ='100px';   
      this.view.flxContainerInnerHeader.height = "65px";
      heightAdjust = (135/kony.os.deviceInfo().screenHeight) *100;
      this.view.flxContainerForm.height = 100 - heightAdjust + "%";     
    }   
    
    this.view.flxGroupContent.height = kony.os.deviceInfo().screenHeight + "px";
      								   
    this.view.flxContainerBody.height = 100 - ((parseInt(this.view.flxContainerInnerHeader.height.replace("px", ""))/
                                                parseInt(this.view.flxGroupContent.height.replace("px", ""))) *100) + "%";        
                                                                                                                                       
    this.stateCfg.chatSpec = pickChatSpec(_DEFAULT);
    this.populateCards();
    this.view.forceLayout(); 
    }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
  },  
  preShow: function(eventobject){
	voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },

  postShowOps:function() {
    this.view.flxScrollContainerRow1.removeAll();
    this.view.forceLayout();
    showLoadingIndicator();
  },  

  getAppellantDemographicInfo:function() {
    operationName =  "getAppellantDemographicsByAppellantId";
    var data= {"appellantId": gblAppellantId};
    var headers= {};
    var serviceName = "appellantServices";
    try {

      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, 
                                     this.getAppellantDemographicInfoSuccess, 
                                     this.getAppellantDemographicInfoFailure);
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
      logout();
    }
  },

  getAppellantDemographicInfoSuccess:function(response) {
    kony.print("inside getAppellantDemographicInfoSuccess: "+JSON.stringify(response));
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
            gblDemographicInfo.AppellantFirstName = undefined;
            this.view.mainHeaderScreens.setComponentData(undefined);
            alert("There was a problem getting demographic information: " + response.errmsg);
          }
          else if(response.AppellantDemographicDetails !== null && response.AppellantDemographicDetails !== undefined) {
            var details = response.AppellantDemographicDetails[0]; 
            var firstName = details.AppellantFirstName; 
            gblDemographicInfo = details;
            this.view.mainHeaderScreens.setComponentData(firstName);
          }
        }
      }
    }
    if(gblIsARUser){
      this.getAppealsByAppellantIdAndHatsUserId();
      this.view.mainHeaderScreens.setComponentData(gblARDemographicInfo.firstName);
    }
    else
      this.getDistinctAppellants();
  },

  getAppellantDemographicInfoFailure:function(error) {
    dismissLoadingIndicator();
    var callSpecificMsg = "Unable to access demographic info.";
    currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
    currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
    currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
    currentFrm.view.puInformationDialog.isVisible = true; 
    currentFrm.view.forceLayout();
  },  

  getAppealsByAppellantIdAndHatsUserId:function() {
    operationName =  "getAppealsByAppellantIdAndHatsUserId";
    var data= {"appellantId": gblAppellantId,"hatsUserId": testHatsUserId};
    var headers= {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
    integrationObj.invokeOperation(operationName, headers, data, 
                                   this.getAppealsByAppellantIdAndHatsUserIdSuccess, this.getAppealsByAppellantIdAndHatsUserIdFailure);
  },

  getAppealsByAppellantIdAndHatsUserIdSuccess:function(response) {
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errServerAppeals;
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
          if(response.appealDetailsByAppellant !== null && response.appealDetailsByAppellant !== undefined) {
            appealList = response.appealDetailsByAppellant;
          }
          this.getUpdatesSectionData();
        }
      }
    }
  },

  getAppealsByAppellantIdAndHatsUserIdFailure:function(error) {
    dismissLoadingIndicator();
    alert("Unable to access Appeals Info");  
  }, 

  getDistinctAppellants:function() {
    appealList = [];
    operationName =  "getDistinctAppellantsByHatsUserId";
    var data= {"hatsUserId": testHatsUserId};
    var headers= {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
    integrationObj.invokeOperation(operationName, headers, data, 
                                   this.getDistinctAppellantsSuccess, this.getDistinctAppellantsFailure);
  },

  getDistinctAppellantsSuccess:function(response) {
    if(response !== null && response !== undefined) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errInfoAccessAppellant;
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

          if(response.distinctAppellantsByHatsUserId !== null && response.distinctAppellantsByHatsUserId !== undefined) {
            var appellant = response.distinctAppellantsByHatsUserId[0];
            gblAppellantId = appellant.appellantId;
            if(appellant.appealListByAppellant !== null && appellant.appealListByAppellant !== undefined) {
              appealList = appellant.appealListByAppellant;
            }
          }
        }
      }
    }
    this.getUpdatesSectionData();
  },

  getDistinctAppellantsFailure:function(error) {
    dismissLoadingIndicator();
    alert("Unable to access Appellant Info");  
  },

  getUpdatesSectionData:function() {
    var appealGroupIdArray = [];
    if(appealList !== null && appealList !== undefined &&  appealList.length > 0) {
      var appealGroups = [];
      for(var i = 0; i < appealList.length; i++) {
        var appealGroupId = appealList[i].appealGroupId;
        if(appealGroups.indexOf(appealGroupId) === -1) {
          appealGroups.push(appealGroupId);
        }
      }
      appealGroupIdArray = appealGroups;
    }

    var appealGroupIds = appealGroupIdArray.join(",");
    gblNotificationsList = [];
    operationName =  "getUpdatesByAppealGroupIdsAndHatsUserId";
    var data= {"appealGroupIds": appealGroupIds, "hatsUserId": testHatsUserId};
    var headers= {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
    integrationObj.invokeOperation(operationName, headers, data, 
                                   this.getUpdatesSectionDataSuccess, this.getUpdatesSectionDataFailure);
  },

  getUpdatesSectionDataSuccess:function(response) {
    kony.print("inside getUpdatesSectionDataSuccess: "+JSON.stringify(response));
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errInfoUpdates;
      response.userAction = null;
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
        if(response !== null && response !== undefined && response.documentsUpdateMsg !== undefined) {
          gblNotificationsList = response.documentsUpdateMsg;
        }
        this.view.updatesList.setUpdatesSectionData(gblNotificationsList);
        this.view.forceLayout();
        this.populateCards();
      }
    }
  },


  getUpdatesSectionDataFailure:function(error) {
    kony.print("inside getUpdatesSectionDataFailure: "+JSON.stringify(error));
    this.view.updatesList.setUpdatesSectionData(gblNotificationsList);
    this.view.forceLayout();
    this.populateCards();
  },  

  populateCards:function() {
    if(appealList !== null && appealList !== undefined &&  appealList.length > 0) {
      var appealGroups = [];
      for(var i = 0; i < appealList.length; i++) {
        var appealGroupId = appealList[i].appealGroupId; 
        if(appealGroups.indexOf(appealGroupId) === -1) {
          appealGroups.push(appealGroupId);  
        }
      }

      const grouped = this.groupBy(appealList);
      var groups = [];

      for(i = 0; i < appealGroups.length; i++) {
        var group = grouped.get(appealGroups[i]); 
        groups.push(group);
      }

      var groupTitle = "";
      var status = "";
      var appeals = [];
      var displayNew = false;
      var portalStatus = "";
	  try{
      this.view.flxScrollContainerRow1.removeAll();
      }catch(err){
        kony.print(err);
      }
      for(i = 0; i < groups.length; i++) {
        var flxAppealGroupRow;
        if(cardWidth ==='50%')
          flxAppealGroupRow = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "id": "flxAppealGroupRow"+i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1
          }, {}, {});
        else
          flxAppealGroupRow = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "id": "flxAppealGroupRow"+i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1
          }, {}, {});          


        flxAppealGroupRow.setDefaultUnit(kony.flex.DP);
        var flxAppealGroupsLeftColumn = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "id": "flxAppealGroupsLeftColumn"+i,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "left": "0dp",
          "isModalContainer": false,
          "skin": "slFbox",
          "top": "0dp",
          "width": cardWidth,
          "zIndex": 1
        }, {}, {});
        flxAppealGroupsLeftColumn.setDefaultUnit(kony.flex.DP);
        var flxAppealGroupsRightColumn = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "id": "flxAppealGroupsRightColumn"+i,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "left": "0dp",
          "isModalContainer": false,
          "skin": "slFbox",
          "top": "0dp",
          "width": cardWidth,
          "zIndex": 1
        }, {}, {});
        flxAppealGroupsRightColumn.setDefaultUnit(kony.flex.DP);

        //add the hearing groups
        //set up the left side
        var snStateHearingListBadge = new snStateHearingListBadgeCom.snStateHearingListBadge({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "centerX": "50%",
          "clipBounds": false,
          "id": "snStateHearingListBadge" + i,
          "isVisible": true,
          "layoutType": kony.flex.FLOW_VERTICAL,
          "masterType": constants.MASTER_TYPE_USERWIDGET,
          "isModalContainer": false,
          "skin": "slFbox",
          "top": "0px",
          "width": "100%"
        }, {}, {});
        appeals = groups[i];
        groupTitle = appeals[0].appealTypeDescription; 
        status = appeals[0].hearingDate; 
        portalStatus = appeals[0].portalStatus;
        displayNew = portalStatus.toLowerCase() === "received" ? true : false;
        snStateHearingListBadge.isVisibleBadgeNew = displayNew;
        snStateHearingListBadge.setSubComponentData(appeals, groupTitle, status, displayNew);
        flxAppealGroupsLeftColumn.add(snStateHearingListBadge);
        flxAppealGroupRow.add(flxAppealGroupsLeftColumn);

        if(i + 1 < groups.length) {
          i += 1;
          //set up the right side
          var snStateHearingSatusBadge = new snStateHearingListBadgeCom.snStateHearingListBadge({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": false,
            "id": "snStateHearingSatusBadge" + i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "width": "100%"
          }, {}, {});
          appeals = groups[i];
          groupTitle = appeals[0].appealTypeDescription;
          status = appeals[0].hearingDate;
          portalStatus = appeals[0].portalStatus;
          displayNew = portalStatus.toLowerCase() === "received" ? true : false;          
          //displayNew = status.toLowerCase() === "not scheduled" ? true : false;
          snStateHearingSatusBadge.isVisibleBadgeNew = displayNew;
          snStateHearingSatusBadge.setSubComponentData(appeals, groupTitle, status, displayNew);
          flxAppealGroupsRightColumn.add(snStateHearingSatusBadge);         
          flxAppealGroupRow.add(flxAppealGroupsRightColumn);  
        }
        this.view.flxScrollContainerRow1.add(flxAppealGroupRow);        
      }
    }
    else {
      if(this.emptyDashVar!=null && this.emptyDashVar !=undefined )
	      this.view.flxScrollContainerRow1.add(this.emptyDashVar);
    
      if(cardWidth === '100%') {
        this.view.emptyDash.centerY = '40%';
        this.view.emptyDash.width = '90%'; 
      }
      else {
        this.view.emptyDash.centerY = '30%';
        this.view.emptyDash.width = '60%'; 
      }
    }
    this.view.forceLayout();
    dismissLoadingIndicator();
  },  

  displayAuthorizedRepAppealDetail:function() {
    var selectedRows = this.view.sgmDataDouble.selectedRowItems[0];
    gblSelectedAppealId = selectedRows.appealId; 
    gblSelectedDispositionId = selectedRows.dispositionId;
    var ntf = new kony.mvc.Navigation("frmGeneralAppealDetails");
    ntf.navigate();      
  }, 

  groupBy:function(list) {
    const map = new Map();
    for(var i = 0; i < list.length; i++) {
      var item = list[i];
      const key = item.appealGroupId;
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    }
    return map;
  },

  displayProfileMenu:function() {
    displayProfileMenu(this.view);
  },

  selectProfileMenuItem:function() {
    selectProfileMenuItem(this.view);
  },  

  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_10-25-18
  //----------------------------------------------------------------------------
  settingUpEventsActions:function(){
    try{
      this.view.btnRequestHearing.onClick = this.toHearingRequest;
    }catch(err){
      kony.print("Shomething went wrong while settingUp");
    }
  },
  //----------------------------------------------------------------------------
  //Created by:CruzAmbrocio
  //Date_10-25-18
  //----------------------------------------------------------------------------
  toHearingRequest:function(){
    try{
      resetFlow();
      kony.print("Going to Hearing request");

      var form = "frmHearingRequestStep1";
      if(gblIsARUser)
        form = "frmARHearingRequestStep1";
      var ntf = new kony.mvc.Navigation(form);
      ntf.navigate();
    }catch(err){
      kony.print("Shomething happend wrong");
    }
  },

  goToARDash:function() {
    var ntf = new kony.mvc.Navigation("frmAuthorizedRepDash");
    var params = {"isCancelled":true};
    ntf.navigate(params);
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