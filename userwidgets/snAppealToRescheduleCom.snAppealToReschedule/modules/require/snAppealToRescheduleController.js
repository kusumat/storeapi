define(function() {

  var selectedAppealsMap;  

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) { 
      this.initSegmentWidget();
      this.view.sgmDataCheck.onRowClick = this.getAppealIds;
      this.view.sgmDataCheck.data = [];
       amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
		this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.sgmDataCheck.rowTemplate = 'flxtmpSgmItemListStatusCheckMobile';
      }
      else {
      	this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.sgmDataCheck.rowTemplate = 'flxtmpSgmItemListStatusCheck';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     

    initGettersSetters: function() {
    },

    initSegmentWidget:function() {
      this.view.sgmDataCheck.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;  
    },

    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType:function(){
      if(gblDocumentTypes !== null && gblDocumentTypes !== undefined){
        for (var i = 0; i < gblDocumentTypes.length; i++) {
          var obj = gblDocumentTypes[i];
          if(obj.documentTypeCd == "Reschedule Request"){
            gblDocumentTypeId = obj.documentTypeId; 
          }
        }
      }      
      operationName ="getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocType";
      var data={"appealId":gblSelectedAppealId,"hatsUserId":testHatsUserId,"docType":gblDocumentTypeId};
      var headers={};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess, this.getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure);
    },

    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeSuccess:function(response){
      if(response !== null && response !== undefined) {
        if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
          response.errorMessage = apiErrors.errServerAppealsAndDispositions;
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
            if(response.associatedAppealsWithDispositions !== null && response.associatedAppealsWithDispositions !== undefined) {
              gblRescheduleHearingAppealsList = response.associatedAppealsWithDispositions;
            }
          }
        }
      }
    },

    reset:function(){
      this.view.sgmDataCheck.data = [];
    },
    getListOfAssociatedAppealsByAppealIdAndHatsUserIdAndDocTypeFailure:function(error){
      alert("No appeals and dispositions found for the input document type.");
      var ntf = new kony.mvc.Navigation("frmAppealDetails");
      ntf.navigate();
    },

    setComponentDataForQuickLinksFlows: function () {
      this.selectedAppealsMap = selectedAppeals;
      var data = [];
      selectedAppeals.forEach(function (value, key, map) {
        var row = {
          "btnUnChecked": {"isVisible": false},
          "btnChecked": {"isVisible": true},
          "imgUnChecked": "ncchecked.png", 
          "lblTypeTitle": value.portalProgramDesc,
          "lblTextStatus": value.portalIssueCd,
          "lblPersonName": value.obPersonName,
          "lblNumberGroup": value.appealNbr,
          "imgHashtagIcon": "hashtag_white_1.png",
          "lblUILine": "Separator",
          "appealId": value.appealId,
          "dispositionDate": value.dispositionDate,
          "appealNumber": value.appealNbr
        };
         data.push(row);      
      });
      this.view.sgmDataCheck.data = data;
      this.view.forceLayout();
    },

    setComponentData:function(gblRescheduleHearingAppealsList) {

      var dataRows = [];
      var rowIndices = [];
      this.selectedAppealsMap = new Map(selectedAppeals);
      for(var i = 0; i < gblRescheduleHearingAppealsList.length; i++) {
        var detail = gblRescheduleHearingAppealsList[0].associatedAppealsAndDispositions;
        for(var j = 0; j < detail.length; j++){   
          var image_name="ncunchecked.png";
          var btnUnselect = true;
          var btnSelect = false;
          if (selectedAppeals.has(detail[j].appealNbr)) {
            btnUnselect = false;
            btnSelect = true;
            image_name="ncchecked.png";
          }
          var detailRow = {
            "btnUnChecked": {"isVisible": btnUnselect},
            "btnChecked": {"isVisible": btnSelect},
            "imgUnChecked": image_name, 
            "lblTypeTitle": detail[j].portalProgramDesc,
            "lblTextStatus": detail[j].portalIssueCd,
            "lblPersonName": detail[j].obPersonName,
            "lblNumberGroup": detail[j].appealNbr,
            "imgHashtagIcon": "hashtag_white_1.png",
            "lblUILine": "Separator",
            "appealId": detail[i].appealId,
            "dispositionDate": detail[j].dispositionDate,
            "appealNumber": detail[j].appealNbr
          };
          dataRows.push(detailRow);
        }
      }

      for (var ind in dataRows) {
        rowIndices.push(ind);
      }

      this.view.sgmDataCheck.data = dataRows;
      this.view.sgmDataCheck.selectedRowIndex = [0, 1];
      // 	  this.view.sgmDataCheck.selectedRowIndices = [0, [0, 1, 2]];
      this.view.flxMainContainer.forceLayout();
    },


    setARData: function (detail) {

      this.view.sgmDataCheck.onRowClick = this.getAppealIds;
      this.selectedAppealsMap = new Map(selectedAppeals);
      var dataRows = [];
      var rowIndices = [];
      for(var j = 0; j < detail.length; j++) {   
        var image_name="ncunchecked.png";
        var btnUnselect = true;
        var btnSelect = false;        
        if (selectedAppeals.has(detail[j].appealNbr)) {
          btnUnselect = false;
          btnSelect = true;
          image_name="ncchecked.png";
        }
        var detailRow = {
          "btnUnChecked": {"isVisible": btnUnselect},
          "btnChecked": {"isVisible": btnSelect},
          "imgUnChecked": image_name, 
          "lblTypeTitle": detail[j].portalProgramDesc,
          "lblTextStatus": detail[j].portalIssueCd,
          "lblPersonName": detail[j].obPersonName,
          "lblNumberGroup": detail[j].appealNbr,
          "imgHashtagIcon": "hashtag_white_1.png",
          "lblUILine": "Separator",
          "appealId": detail[j].appealId,
          "appealNumber": detail[j].appealNbr
        };
         dataRows.push(detailRow);
      }


      for (var ind in dataRows) {
        rowIndices.push(ind);
      }

      this.view.sgmDataCheck.data = dataRows;
      //this.view.sgmDataCheck.selectedRowIndex = [0, 1];
      // 	  this.view.sgmDataCheck.selectedRowIndices = [0, [0, 1, 2]];
      this.view.flxMainContainer.forceLayout();
    },

    setARDataCofirm: function (detail) {
      this.view.sgmDataCheck.onRowClick = this.getAppealIdsConfirm;
      var dataRows = [];
      var rowIndices = [];
      for(var j = 0; j < detail.length; j++){   
        if (selectedAppeals.has(detail[j].appealNbr)) {

          var detailRow = {
            "lblTypeTitle": detail[j].portalProgramDesc,
            "lblTextStatus": detail[j].portalIssueCd,
            "lblPersonName": detail[j].obPersonName,
            "lblNumberGroup": detail[j].appealNbr,
            "imgHashtagIcon": "hashtag_white_1.png",
            "lblUILine": "-Line-",
            "appealId": detail[j].appealId,
            "appealNumber": detail[j].appealNbr
          };
          dataRows.push(detailRow);
        }
      }


      for (var ind in dataRows) {
        rowIndices.push(ind);
      }

      this.view.sgmDataCheck.data = dataRows;
      this.view.sgmDataCheck.selectedRowIndex = [0, 1];
      // 	  this.view.sgmDataCheck.selectedRowIndices = [0, [0, 1, 2]];
      this.view.flxMainContainer.forceLayout();
    },

    getAppealIds: function (seguiWidget, sectionNumber, rowNumber, selectedState) {

      var data = this.view.sgmDataCheck.data[rowNumber];
  
      if(data.btnUnChecked.isVisible === true ) {
        var data1 = selectedAppeals2.get(data.appealNumber);

        selectedAppeals.set(data.appealNumber, data1);
        data.btnUnChecked.isVisible = false;
        data.btnChecked.isVisible = true; 
        data.imgUnChecked="ncchecked.png";
      }
      else{
        //selectedAppeals.delete(data.appealNumber);
        data.btnUnChecked.isVisible = true;
        data.btnChecked.isVisible = false; 
        data.imgUnChecked="ncunchecked.png";
        selectedAppeals.delete(data.appealNumber);
      }

      this.view.sgmDataCheck.setDataAt(data, rowNumber, sectionNumber);

      /*selectedAppeals.clear();
      var appealIds = [];
      var dataRows = this.view.sgmDataCheck.selectedRowItems;
      for(var i = 0; i < dataRows.length; i++) {
        gblHasAppealIds = true;
        var row = dataRows[i];
        appealIds.push(row.appealId);
//         alert(row.appealId);
		selectedAppeals.set(row.appealNumber, null);
      }
      rescheduleHearingRequest.appealIds = appealIds;*/
    },
    getAppealIdsConfirm: function (seguiWidget, sectionNumber, rowNumber, selectedState) {
    }
  };

});