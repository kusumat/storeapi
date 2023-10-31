define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.setDocumentListData();
      this.view.sgmDataMentions.onRowClick = this.openLink;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);           
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
		this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
		this.view.lblTitle2.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblDesc2.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';  
        this.view.sgmDataMentions.rowTemplate = 'flxtmpSgmYellowMarkBlueListMobile';
      }
      else {
		this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMedium';
		this.view.lblTitle12skin = 'sknLblGrayishDark115';
        this.view.lblDesc2.skin = 'sknLblSubtitleDarkGrayRegMedium'; 
        this.view.sgmDataMentions.rowTemplate = 'flxtmpSgmYellowMarkBlueList';
      }
      this.view.forceLayout();
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     

    setDocumentListData:function() {
      var dataRows = [];
      var row = {};
      row = {"lblemptySpace":" ",
             "lblNameItemList":"Explanation of State Hearing Procedures",
             "hyperlink":"http://www.odjfs.state.oh.us/forms/num/JFS04059/pdf/"};
      dataRows.push(row);
      row = {"lblemptySpace":" ",
             "lblNameItemList":"Explanation of Administrative Disqualification Hearing Procedures",
             "hyperlink":"http://www.odjfs.state.oh.us/forms/num/JFS04058/pdf/"};
      dataRows.push(row);
      this.view.sgmDataMentions.data = dataRows;
    },

    openLink:function() {
      var selectedRow = this.view.sgmDataMentions.selectedRowItems[0];
      var hyperlink = selectedRow.hyperlink;
      kony.application.openURL(hyperlink);
    }

  };
});