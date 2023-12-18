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
    if(gblIsARUser){
      gblARHearingFrom = "frmAuthorizedRepDash";
      this.view.subNavigationHeaders.isVisibleBackSubH = true;
    }

	this.view.preShow = this.preShow;        
    this.view.subNavigationHeaders.subHeaderBackOnClick = this.goToARDashSearch;
    this.view.subNavigationHeaders.btnArrowLeftNavBackOnClick = this.goToARDashSearch;
    
//     this.view.subNavigationHeaders.btnMyAppealsOnClick = this.goToARDashSearch;
//     this.view.subNavigationHeaders.btnMyAppellantsOnClick = this.goToARDashSearch;
//     this.view.subNavigationHeaders.btnMyAppealDetailsOnClick = this.goToARDashSearch;
//     this.view.subNavigationHeaders.btnHearingInfoOnClick = this.goToARDashSearch;
//     this.view.subNavigationHeaders.btnComplianceOnClick = this.goToARDashSearch;
//     this.view.subNavigationHeaders.btnParticipantsOnClick = this.goToARDashSearch;
//     this.view.subNavigationHeaders.btnSearchOnClick = this.goToARDashSearch;
    
    
    gblSettings(this);
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
    this.view.btnRequestHearing.setVisibility(true);     
    this.view.lblSubTiitleSugest.setVisibility(gblIsTPMUser !== true);
    this.view.lblSubTiitleSugestDesc.setVisibility(gblIsTPMUser !== true);
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
  },
  onDone: function (txtBox) {
    let txtBoxId = txtBox.id;
    this.searchKey();

  },
  preShow: function(eventobject){
	voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
  },  
  goToARDashSearch:function() {
    var ntf = new kony.mvc.Navigation("frmAuthorizedRepDashSearch");
    var params = {"isCancelled":true};
    ntf.navigate(params);
  },  
  onBreakpointChange: function(form, width){
    try{
    switch (gblARSearchTab) {
      case "Appellants":
        this.view.subNavigationHeaders.btnMyAppellantstext = "Appellants";
        break;
      case "Compliance":
        this.view.subNavigationHeaders.btnMyAppellantstext = "Compliances";
        break;
      case "CompletedHearings":
        this.view.subNavigationHeaders.btnMyAppellantstext = "Completed";
        break;          
      case "HearingSchedules":
        this.view.subNavigationHeaders.btnMyAppellantstext = "Hearings";
        break;        
    }
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
      cardWidth = '100%';
    }   
    
    this.view.mainPaginationForm.setComponentData(this, loadAppellants);
      
    amplify.publish("authorizedDash", form, width);                                                                                                                                    
    if(width <= gblBreakPoint){ 
      this.view.subNavigationHeaders.flxContainerSerchFilterWidth = '50%';
      this.view.mainHeaderScreens.height ='130px'; 
      
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
    this.view.mainPaginationForm.updatePageRow(1,1);
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

  populateCards:function(appellantList) {
    var appellants = appellantList;
    if (gblARSearchTab === "Appellants"){
      this.view.flxContainerCol1.removeAll();
      for(var i = 0; i < appellants.length; i++) {
        var snListAppellantBadge;
        if(mobileFlag === true)
          snListAppellantBadge = new snListAppellantBadgeCom.snListAppellantBadgeMobile({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": false,
            "id": "snListAppellantBadge" + i,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "height": "139px",
            "width": "100%"
          }, {}, {});   
        else 
          snListAppellantBadge = new snListAppellantBadgeCom.snListAppellantBadge({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": true,
            "id": "snListAppellantBadge" + i,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "width": "100%"
          }, {}, {});   
        snListAppellantBadge.flxContainerBadgeIsVisible = false;
        snListAppellantBadge.setComponentData(appellants[i]);
        this.view.flxContainerCol1.add(snListAppellantBadge);      
      }    
    }
    if (gblARSearchTab === "Compliance"){
      this.view.flxContainerCol1.removeAll();
      for(var i = 0; i < appellants.length; i++) {
        var snListComplianceBadge;
        if(mobileFlag === true)
          snListComplianceBadge = new snListComplianceBadgeCom.snListComplianceBadgeMobile({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": true,
            "id": "snListComplianceBadge" + i,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "height": "139px",
            "width": "100%"
          }, {}, {});   
        else 
          snListComplianceBadge = new snListComplianceBadgeCom.snListComplianceBadge({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": true,
            "id": "snListComplianceBadge" + i,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "width": "100%"
          }, {}, {});   
        snListComplianceBadge.flxContainerBadgeIsVisible = false;
        snListComplianceBadge.setComponentData(appellants[i]);
        this.view.flxContainerCol1.add(snListComplianceBadge);    
      }    
    }
    if (gblARSearchTab === "HearingSchedules"){
      this.populateAppealCards(appellants);
    }
    if (gblARSearchTab === "CompletedHearings"){
      this.view.flxContainerCol1.removeAll();
      for(var i = 0; i < appellants.length; i++) {
        var snListCompletedHearingsBadge;
        if(mobileFlag === true)
          snListCompletedHearingsBadge = new snListCompletedHearingsBadgeCom.snListCompletedHearingsBadgeMobile({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": false,
            "id": "snListCompletedHearingsBadge" + i,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "height": "230px",
            "width": "100%"
          }, {}, {});   
        else 
          snListCompletedHearingsBadge = new snListCompletedHearingsBadgeCom.snListCompletedHearingsBadge({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": false,
            "id": "snListCompletedHearingsBadge" + i,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "width": "100%"
          }, {}, {});   
        snListCompletedHearingsBadge.flxContainerBadgeIsVisible = false;
        snListCompletedHearingsBadge.setComponentData(appellants[i]);
        this.view.flxContainerCol1.add(snListCompletedHearingsBadge);    
      }    
    }
  },
  populateAppealCards:function(appealList) {
    if(appealList !== null && appealList !== undefined &&  appealList.length > 0) {
      var appealGroups = [];
      for(var i = 0; i < appealList.length; i++) {
        var appealGroupId = appealList[i].appealGrpId; 
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

      this.view.flxContainerCol1.removeAll();

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
        if(mobileFlag === true){
          var snListStateHearingBadge = new snListStateHearingBadgeCom.snListStateHearingBadgeMobile({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": true,
            "id": "snListStateHearingBadge" + i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "width": "100%"
          }, {}, {});
        }
        else
        {
          var snListStateHearingBadge = new snListStateHearingBadgeCom.snListStateHearingBadge({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "centerX": "50%",
            "clipBounds": true,
            "id": "snListStateHearingBadge" + i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0px",
            "width": "100%"
          }, {}, {});
        }
        appeals = groups[i];
        var time = "";
        groupTitle = appeals[0].appealTypeDesc; 
        if (appeals[0].hearingTime.substr(0,2) === 12) {
          time = appeals[0].hearingTime + " pm";
        }
        else{
          time = appeals[0].hearingTime < "11:59" ? appeals[0].hearingTime + " am" : appeals[0].hearingTime.substr(0,2)-12+":"+appeals[0].hearingTime.substr(3,2) + " pm";
        }
        status = appeals[0].hearingDate + " " + time; 
        portalStatus = appeals[0].portalStatus;
        appellantName = appeals[0].appellantFirstName +" "+ appeals[0].appellantLastName;
        displayNew = portalStatus.toLowerCase() === "received" ? true : false;
        snListStateHearingBadge.isVisibleBadgeNew = displayNew;
        snListStateHearingBadge.setSubComponentData(appeals, groupTitle, appellantName, status, displayNew);
        flxAppealGroupsLeftColumn.add(snListStateHearingBadge);
        flxAppealGroupRow.add(flxAppealGroupsLeftColumn);

        if(i + 1 < groups.length) {
          i += 1;
          //set up the right side
          if(mobileFlag === true){
            var snStateHearingSatusBadge = new snListStateHearingBadgeCom.snListStateHearingBadgeMobile({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "centerX": "50%",
              "clipBounds": true,
              "id": "snStateHearingSatusBadge" + i,
              "isVisible": true,
              "layoutType": kony.flex.FLOW_VERTICAL,
              "masterType": constants.MASTER_TYPE_USERWIDGET,
              "isModalContainer": false,
              "skin": "slFbox",
              "top": "0px",
              "width": "100%"
            }, {}, {});
          }
          else
          {
            var snStateHearingSatusBadge = new snListStateHearingBadgeCom.snListStateHearingBadge({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "centerX": "50%",
              "clipBounds": true,
              "id": "snStateHearingSatusBadge" + i,
              "isVisible": true,
              "layoutType": kony.flex.FLOW_VERTICAL,
              "masterType": constants.MASTER_TYPE_USERWIDGET,
              "isModalContainer": false,
              "skin": "slFbox",
              "top": "0px",
              "width": "100%"
            }, {}, {});
          }
          appeals = groups[i];
          groupTitle = appeals[0].appealTypeDesc;
          if (appeals[0].hearingTime.substr(0,2) === 12) {
            time = appeals[0].hearingTime + " pm";
          }
          else{
            time = appeals[0].hearingTime < "11:59" ? appeals[0].hearingTime + " am" : appeals[0].hearingTime.substr(0,2)-12+":"+appeals[0].hearingTime.substr(3,2) + " pm";
          }
          status = appeals[0].hearingDate + " " + time; 
          portalStatus = appeals[0].portalStatus;
          appellantName = appeals[0].appellantFirstName +" "+ appeals[0].appellantLastName;
          displayNew = portalStatus.toLowerCase() === "received" ? true : false;          
          //displayNew = status.toLowerCase() === "not scheduled" ? true : false;
          snStateHearingSatusBadge.isVisibleBadgeNew = displayNew;
          snStateHearingSatusBadge.setSubComponentData(appeals, groupTitle, appellantName, status, displayNew);
          flxAppealGroupsRightColumn.add(snStateHearingSatusBadge);         
          flxAppealGroupRow.add(flxAppealGroupsRightColumn);  
        }
        this.view.flxContainerCol1.add(flxAppealGroupRow);        
      }
    }
    else {
      this.view.flxScrollContainerRow1.add(this.view.emptyDash);
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
  groupBy:function(list) {
    const map = new Map();
    for(var i = 0; i < list.length; i++) {
      var item = list[i];
      const key = item.appealGrpId;
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    }
    return map;
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