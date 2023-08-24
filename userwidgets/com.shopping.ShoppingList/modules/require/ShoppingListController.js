define(function() {
  return {
    _isNativeMobile : false,
    _isNativeTab : false,
    _isMobilePWA : false,
    _isTabletPWA : false,
    _isDesktopPWA : false,
    tempListHeaderController:null,
    constructor: function() {
      this.view.preShow = this.onPreShow.bind(this);
      this.view.postShow = this.onPostShow.bind(this);   
      this.view.onBreakpointChange = this.onPreShow.bind(this);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    onPreShow: function() {
      kony.print("onPreShow");
      var mediaWidth = kony.os.deviceInfo().deviceWidth;
      var deviceInfo = kony.os.deviceInfo();
      var os = deviceInfo.name /*android and iOS*/;
      this.setDefaultValues();
      if(os === "iPhone"){
        this._isNativeMobile = true;
      }else if(os === "iPad"){
        this._isNativeTab = true;
      }
      else if(os === "android"){
        this._isNativeMobile = true;
      }
      else if(os === "androidtablet"){
        this._isNativeTab = true;
      }
      else if(os === "thinclient"){
        if (mediaWidth <= 640) {
          this._isMobilePWA = true;
        } else if (mediaWidth <= 1024) {
          this._isTabletPWA = true;
        } else {
          this._isDesktopPWA = true;
        }
      }
      this.checkDevice();
    },
    setDefaultValues:function(){
      this._isNativeMobile = false;
      this._isNativeTab = false;
      this._isMobilePWA = false;
      this._isTabletPWA = false;
      this._isDesktopPWA= false;
    },
    checkDevice:function(){
      if( this._isNativeMobile || this._isNativeTab || this._isMobilePWA || this._isTabletPWA ){
        this.setSegmentData();
      } else{
        this.setDWSegData();
      }
    },
    onPostShow: function() {
      kony.print("onPostShow");
      kony.application.dismissLoadingScreen();
    },
    setDWSegData : function(){
      var StoreUtil = require('com/shopping/Login/StoreUtil');
      var masterData =[];
      var listData = StoreUtil.getShoppingListData();
      var rowHeader = {"lblName": {"text": "My Shopping List"}};
      var rowsData = [];
      for(var list=0; list < listData.length ; list++){
        var groupCount1 = listData[list].productCount;
        var groupCount2 = listData[list+1] ? listData[list+1].productCount : "";
        var groupCount3 = listData[list+2] ? listData[list+2].productCount :"";
        var rowData =  
            {
              "imgListIndicator": {
                "text": ""
              },
              "imgIndicator2": {
                "text": listData[list+1] ? "" : ""
              },
              "imgIndicator3": {
                "text": listData[list+2] ? "" : ""
              },
              "lblRow1": {
                "text": listData[list].listName  +"(" +groupCount1 +")",
              },
              "lblRow2": {
                "text": listData[list+1] ? listData[list+1].listName   +"(" +groupCount2 +")" : "",
              },
              "lblRow3": {
                "text": listData[list+2] ? listData[list+2].listName  +"(" +groupCount3 +")" : "",
              },
              "lblRow1Id":{
                "text": listData[list].listId,
              },
              "lblRow2Id":{
                "text": listData[list+1] ? listData[list+1].listId : "",
              },
              "lblRow3Id":{
                "text": listData[list+2] ? listData[list+2].listId : "",
              },
              "flxRow1":{
                "onClick":this.segmentDesktopCallback.bind(this)
              },
              "flxRow2":{
                "onClick":this.segmentDesktopCallback.bind(this)
              },
              "flxRow3":{
                "onClick":this.segmentDesktopCallback.bind(this)
              },

            };

        rowsData.push(rowData);
        list = list+2;
      }
      masterData.push([rowHeader,rowsData]);
      this.setDesktopWidgetData();
      this.view.segShoppingList.setData(masterData);
    },
    setDesktopWidgetData:function(){
      this.view.segShoppingList.widgetDataMap = {
        "lblRow1" : "lblRow1",
        "lblRow2": "lblRow2",
        "lblRow3" : "lblRow3",
        "lblName" : "lblName",
        "imgIndicator2" : "imgIndicator2",
        "imgListIndicator" : "imgListIndicator",
        "imgIndicator3": "imgIndicator3",
        "flxRow1":"flxRow1",
        "flxRow2":"flxRow2",
        "flxRow3":"flxRow3"
      };
    },
    setWidgetData:function(){
      this.view.segShoppingList.widgetDataMap = {
        "lblLists" : "lblLists",
        "lblName": "lblName",
        "imgListIndicator":"imgListIndicator"
      };
    },
    setSegmentData:function(){
      var StoreUtil = require('com/shopping/Login/StoreUtil');
      var masterData =[];
      var listData = StoreUtil.getShoppingListData();
      var rowHeader = {"lblName": {"text": "My Shopping List"}};
      var rowsData = [];
      for(var list=0; list < listData.length ; list++){
        var groupCount = listData[list].productCount;
        var rowData = 
            {
              "imgListIndicator": {
                "text": ""
              },
              "lblId": {
                "text": listData[list].listId
              },
              "lblLists": {
                "text": listData[list].listName +"(" +groupCount +")"
              }
            };
        rowsData.push(rowData);
      }
      masterData.push([rowHeader,rowsData]);
      this.setWidgetData();
      this.view.segShoppingList.setData(masterData);
      this.view.segShoppingList.onRowClick = this.segmentCallback;
    },
    segmentCallback:function(){
      kony.application.showLoadingScreen("sknBlockUI","Loading Products.........",
                                           constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                           true,
                                           true,
                                           null);
      var segData = this.view.segShoppingList.selectedRowItems[0];
      var lblName = segData.lblLists.text;
      kony.print("segData" +JSON.stringify(segData.lblLists) +"and it is : " +lblName);
      this.navigateToCreateOrder(lblName);
    },
    segmentDesktopCallback:function(flxDetails){
      kony.application.destroyForm("frmCreateOrder");
      kony.application.showLoadingScreen("sknBlockUI","Loading Products.........",
                                           constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                           true,
                                           true,
                                           null);
      var flxName = flxDetails.id;
      var lblRowName = "lblRow" +flxName.charAt(flxName.length-1);
      var lblName = flxDetails[lblRowName].text;
      kony.print("lblName" +JSON.stringify(lblName) +"and it is : " +lblName);
      this.navigateToCreateOrder(flxName.charAt(flxName.length-1));
    },
    navigateToCreateOrder:function(lblName){
      kony.print("the label clicked is :" +lblName);
      var nft = new kony.mvc.Navigation("frmCreateOrder");
      nft.navigate(lblName);
    },
  };
});