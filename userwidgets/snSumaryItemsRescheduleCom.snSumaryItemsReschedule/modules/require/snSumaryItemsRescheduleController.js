define(function() {

  var continueButton;
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      var checkBoxObject = [["I Agree", "I Agree", accessibilityConfig={"a11yHidden": false, "a11yLabel": "I Agree", "a11yHint": "", "a11yIndex": 0}]];
      this.view.CheckBoxAgreeChecks.masterData = checkBoxObject;
      this.view.CheckBoxAgreeChecks.onSelection = this.selection;
      this.view.lblTitle1.text = "Reschedule Summary";
      this.view.sgmDataOptionsSummary.onRowClick = this.navigateToEditPage;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    navigateToEditPage:function() {
      var selectedRow = this.view.sgmDataOptionsSummary.selectedRowItems[0];
      var editPage = selectedRow.editPage; 
      if(editPage !== "") {
        var params = {"isSummaryEdit":true};
        var ntf = new kony.mvc.Navigation(editPage);
        ntf.navigate(params);           
      }      
//       var selectedRow = this.view.sgmDataOptionsSummary.selectedRowItems[0];
//       var editPage = selectedRow.editPage; 
//       if(editPage !== "") {
//         var ntf = new kony.mvc.Navigation(editPage);
//         var params = {"isBack":true};
//         ntf.navigate(params);           
//       }
    },

    selection: function() {
      if(this.view.CheckBoxAgreeChecks.selectedKeys !== null)
       gblRescheduleAgree = true; //this.continueButton.btnContinueSetEnabled(true);
      else
       gblRescheduleAgree = false; //this.continueButton.btnContinueSetEnabled(false);
    },

    setComponentData: function(rescheduleHearingRequest, contButton) {
      this.continueButton = contButton;
      gblWithdrawAgree = false;
      this.view.CheckBoxAgreeChecks.selectedKeys = null;
      var data =[];
      var dataRow = {"imgIconItem": "calendar_day.png", "lblTextDesc": gblPortalReasons_value, "lblDateUpl": "", "imgBtnEdit": "edit.png","editPage": "frmRescheduleHearing22"}; 
      data.push(dataRow);  

      var eventList = rescheduleHearingRequest.eventDetails;
      var events = "";
      for(var i = 0; i < eventList.length; i++) {
        events += eventList[i].eventName + " - " + eventList[i].eventDate;
        if(i !== eventList.length -1) {
          events += ", ";
        }
      }
      if(events === "" || events === " - ") {
        events = "No Future Planned Events";
      }

      dataRow = {"imgIconItem": "wall_clock.png", "lblTextDesc": events,"imgBtnEdit": "edit.png","editPage": "frmRescheduleHearing3"};
      data.push(dataRow); 

      var interpreterReqInd = rescheduleHearingRequest.interptrReqInd;

      var message = ""; 

      if(interpreterReqInd === 'Y'){
        message = "Interpreter -"; 
        message = message+rescheduleHearingRequest.languageDesc;           
      }
      else {
        message = "No Interpreter -";
        message = message +"English";                     
      }

      dataRow = {"imgIconItem": "translate.png","lblTextTitleSec": "Interpreter","lblTextDesc": message,"imgBtnEdit": "edit.png","editPage": "frmRescheduleHearing3"};
      data.push(dataRow);

      //         dataRow = {"imgIconItem":"translate.png", "lblTextDesc":message, "lblDateUpl":"", "imgBtnEdit": "edit.png","editPage":"frmRescheduleHearing3"}; 
      //       	data.push(dataRow);

      dataRow = {"imgIconItem": "file_doc.png", "lblTextDesc": gblUploadedFileName === "" ? "No document uploaded":gblUploadedFileName, "lblDateUpl": "", "imgBtnEdit": "edit.png","editPage": "frmRescheduleHearing4"}; 
      data.push(dataRow);

      this.view.sgmDataOptionsSummary.data = data; 
      this.view.flxMainContainer.forceLayout();

    }};
});
