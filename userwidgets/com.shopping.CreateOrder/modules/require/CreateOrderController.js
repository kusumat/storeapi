define(function() {
  return {
    _listOffset : 0,
    _productList : null,
    _selRowData:[],
    _segRows:0,
    _isDataAdding : false,
    _rowClicked:0,
    _isSegDataRendered : false,
    constructor: function() {
      this.view.onBreakpointChange 		= this.setSegment.bind(this);
      this.view.segOrderList.onRowClick = this.navigateToProduct.bind(this);
      this.view.preShow 				= this.onPreShow.bind(this);
      this.view.postShow 				= this.onPostShow.bind(this);
    },
    onPreShow : function(){
      if(!this._isSegDataRendered){
        this.view.segOrderList.removeAll();
        this._segRows = 1000;
      }
    },
    initGettersSetters: function() {
    },
    onPostShow : function(){
      if(!this._isSegDataRendered){
        this._productList = getCreateOrderMock();
        this.setSegmentData();
      }
      kony.application.dismissLoadingScreen();
    },
    dismissLoadingScreen:function(){
      kony.application.dismissLoadingScreen();
    },
    setSegment:function(){
      this._listOffset = 0;
      this._productList = getCreateOrderMock();
      this.setSegmentData();
    },
    navigateToProduct: function(){
      var segInfo = this.view.segOrderList.selectedRowItems;
      var nextForm = new kony.mvc.Navigation("frmProductDetails");
      nextForm.navigate(segInfo);
    },
    showPopUp:function(){
      this.view.Search.isVisible = true;
    },
    showSortPopup:function(){
      this.view.flxMainSortPopup.isVisible = true;
    },
    setSegmentData:function(){
      var masterData =[];
      var rowsData = [];
      var orderData;
      var rowHeader;
      var rowData;
      orderData = this._productList.groups[0].listItems;
      rowHeader = {"lblHeaderName": {"text": this._productList.groups[0].groupName}};
      var orderDatalength = orderData.length;
      var pageOffset = this._listOffset + this._segRows;
      if(pageOffset > orderDatalength){
        pageOffset = orderDatalength;
      }
      for(var order = this._listOffset; order < pageOffset ; order++){
        rowData =                 
          {
          "imgCSMinus": {
            "text": ""
          },
          "imgCSPlus": {
            "text": ""
          },
          "imgCall": {
            "text": ""
          },
          "imgEAMinus": {
            "text": ""
          },
          "imgEAPlus": {
            "text": ""
          },
          "imgProducts": {
            "src": "frenchfries.jpg"
          },
          "lblCSPrice": {
            "text": "$60.71 CS "
          },
          "lblCSQuantity": {
            "text": "0"
          },
          "lblCWA": {
            "text": "CWA"
          },
          "lblCallForPrice": {
            "text": "Call for Price"
          },
          "lblEAPrice": {
            "text": "$6.07 EA "
          },
          "lblEAQuantity": {
            "text": "0"
          },
          "lblNumbering": {
            "text": ""+orderData[order].itemSequenceNumber
          },
          "lblProductDescription": {
            "text": orderData[order].product.displayDescriptionText
          },
          "lblProductName": {
            "text": orderData[order].product.manufaturerName +" | " +orderData[order].product.packSize +"/ " +orderData[order].product.pimClassCode + " " + orderData[order].product.priceUnitOfMeasure//"Molly’s Kitchen   |  1 LBA/5 LBA"
          },
          "lblRecently": {
            "text": "R"
          },
          "rchTextNoReturns": {
            "text": "<b>DWD</b>  Get it by 03/05. No returns/cancel."
          },
          "lblProductId":{
            "text":orderData[order].listId
          }
        };
        rowsData.push(rowData);
      }
      masterData.push([rowHeader,rowsData]);
      this.view.segOrderList.setData(masterData);
      this._isSegDataRendered = false;
    },

    segmentCallback:function(){
      var selRowData = this.view.segOrderList.selectedRowItems;
      kony.print("selected row :" +this.view.segOrderList.selectedRowItems);
      var nextForm = new kony.mvc.Navigation("frmProductDetails");
      nextForm.navigate(selRowData);
    },
    showProductPopup:function(){
      this._selRowData = this.view.segOrderList.selectedRowItems;
      this.view.Popup.isVisible = true;
    },
    setWidgetData:function(){
      this.view.segOrderList.widgetDataMap =  {
        "flxCSQuantity": "flxCSQuantity",
        "flxCall": "flxCall",
        "flxCreateOrder": "flxCreateOrder",
        "flxCreateOrderHeader": "flxCreateOrderHeader",
        "flxEAQuantity": "flxEAQuantity",
        "flxImgMore": "flxImgMore",
        "flxQuantityMain": "flxQuantityMain",
        "imgCall": "imgCall",
        "imgMore": "imgMore",
        "imgProducts": "imgProducts",
        "lblCSPrice": "lblCSPrice",
        "lblCSQuantity": "lblCSQuantity",
        "lblCallForPrice": "lblCallForPrice",
        "lblContract": "lblContract",
        "lblContractedProduct": "lblContractedProduct",
        "lblEAPrice": "lblEAPrice",
        "lblEAQuantity": "lblEAQuantity",
        "lblHeaderName": "lblHeaderName",
        "lblMore": "lblMore",
        "lblNumbering": "lblNumbering",
        "lblProductDescription": "lblProductDescription",
        "lblProductName": "lblProductName",
        "lblRecently": "lblRecently",
        "lblRecentlyOrdered": "lblRecentlyOrdered",
        "rchTextNoReturns": "rchTextNoReturns"
      };
    },
    checkPlatform : function(lblName){
      this.view.segOrderList.removeAll();
    }
  };
});