define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.sgmDataStateHearing.onRowClick = this.displayAppealDetail;
      this.view.btnQuickActions.onClick = this.navWithdraw;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    setSectionData:function(appealDetails, title, message) {
      this.view.lblTitleSectionCard.text = title; 
      this.view.lblStatusMessage.text = message;
      var portalStatus = appealDetails[0].portalStatus;
      var dataRows = [];
      for(var i = 0; i < appealDetails.length; i++) {
        var detail = appealDetails[i];
        var detailRow = {"imgArrowRight":"arrow_right_1.png", 
                         "lblTypeTitle":detail.portalProgramDesc,
                         "lblTextStatus":detail.portalIssueCode,
                         "lblAgentName":detail.obPersonName,
                         "lblNumberGroup":detail.appealNumber,
                         "imgHashtagIcon":"hashtag_white_1.png",
                         "lblUILine":"-Line-",
                         "appealId":detail.appealId,
                         "dispositionId":detail.dispositionId
                        };
        dataRows.push(detailRow);
      }
      var appealText = appealDetails.length == 1 ? "Appeal" : "Appeals";
      this.view.lblStatusText.text = dataRows.length + " " + portalStatus + " " + appealText;
      this.view.sgmDataStateHearing.data = dataRows;
      this.view.flxContainerItemGroupHearing.forceLayout();
    },

    displayAppealDetail:function() {
      var selectedRows = this.view.sgmDataStateHearing.selectedRowItems[0];
      gblSelectedAppealId = selectedRows.appealId; 
      gblSelectedDispositionId = selectedRows.dispositionId;
      gblAppealNumber = selectedRows.appealNumber;
      gblPortalProgramDesc = selectedRows.lblTypeTitle;
      gblPortalIssueCode = selectedRows.lblTextStatus;
      gblObPersonName = selectedRows.lblAgentName;
      var ntf = new kony.mvc.Navigation("frmAppealDetails");
      ntf.navigate();      
    },
    
    navWithdraw: function(){
      var dataRows = this.view.sgmDataStateHearing.data;
      var appealList = [];
      for(var i = 0; i < dataRows.length; i++) {
        var appealId = dataRows[i].appealId;
        appealList.push(appealId);
      }
      withdrawRequest.appealIds = appealList;
      var ntf = new kony.mvc.Navigation("frmWithdrawHearingStep1");
      ntf.navigate();
    }    


  };
});