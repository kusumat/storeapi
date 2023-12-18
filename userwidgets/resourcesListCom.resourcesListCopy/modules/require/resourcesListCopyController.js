define(function() {
  
  var parentView;

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.sgmDataResources.onRowClick = this.openLink;
      this.view.flxCntnrResourceHeading.accessibilityConfig = {
        "a11yLabel" : "Resource Section",
        "a11yARIA":{"role":"heading", "aria-level":"2"},
        "a11yHidden" : false 
      };
      this.setSgmDataResources();
    },
    setSgmDataResources:function(){
      const data = this.view.sgmDataResources.data;
      const ObjData = [];
      for (var x in data){
        const UpdateSegmentRow = {
          "btnArrowRight":{"onClick": this.openLink},          
          "lblTypeTitle":data[x].lblTypeTitle,
        };
        UpdateSegmentRow.btnArrowRight.accessibilityConfig = {
          "a11yLabel" : data[x].lblTypeTitle,
          "a11yIndex": 0,
          "a11yHidden" : false
        };
        ObjData.push(UpdateSegmentRow);
      }
      this.view.sgmDataResources.setData(ObjData);
    },
    openLink:function() {
      var documentData = policyDocument.pdf;
      var selectedRow = "";
      for(var i=0; i<this.view.sgmDataResources.selectedRowItems.length; i++){
        selectedRow = this.view.sgmDataResources.selectedRowItems[i];
        if(selectedRow.lblTypeTitle === "Policy Changes") {
          kony.application.openURL("http://codes.ohio.gov/orc/5101.35");
        }      
        if(selectedRow.lblTypeTitle === "Hearing Tips") {
          kony.application.openURL("http://emanuals.jfs.ohio.gov/Legal/StateHearings/");
        }      
        if(selectedRow.lblTypeTitle === "State Hearing Site") {
          kony.application.openURL("http://jfs.ohio.gov/ols/bsh/index.stm");
        }      
        if(selectedRow.lblTypeTitle === "Legal Aid Information") {
          kony.application.openURL("https://www.ohiolegalhelp.org/");
        } 
        if(selectedRow.lblTypeTitle === "Support") {
          this.displaySupportInfo();
        } 
        if(selectedRow.lblTypeTitle === "Terms of Service") {
          displayPDF(documentData, selectedRow.lblTypeTitle);
        } 
        if(selectedRow.lblTypeTitle === "Registration") {
          kony.application.openURL(Deeplink_Path + "frmRegistration");
        } 
        if(selectedRow.lblTypeTitle === "Before a Hearing") {
          kony.application.openURL(Deeplink_Path + "frmBeforeHearing");
        } 
        if(selectedRow.lblTypeTitle === "Connect to a Hearing") {
          kony.application.openURL(Deeplink_Path + "frmConnectToHearing");
        } 
        if(selectedRow.lblTypeTitle === "During a Hearing") {
          kony.application.openURL(Deeplink_Path + "frmDuringHearing");
        } 
        if(selectedRow.lblTypeTitle === "After a Hearing") {
          kony.application.openURL(Deeplink_Path + "frmAfterHearing");
        } 
        if(selectedRow.lblTypeTitle === "FAQ") {
          kony.application.openURL(Deeplink_Path + "frmFAQ");
        } 
        if(selectedRow.lblTypeTitle === "Hearing Decisions and Administrative Appeals") {
          kony.application.openURL("http://www.odjfs.state.oh.us/HearingsAppeals/");
        }
        if(selectedRow.lblTypeTitle === "Apply for Benefits") {
          kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/index.jsp");
        }
        if(selectedRow.lblTypeTitle === "Contact") {
         kony.application.openURL(Deeplink_Path + "frmContact");
        }
      }
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    
    setParentView: function(parentView) {
      this.parentView = parentView;
    },

    displaySupportInfo:function() {
      focusElement = document.querySelector('[aria-label="Support "]');     
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '220px';
      currentFrm.view.puInformationDialog.lblTitleText = "Bureau of State Hearings";
      currentFrm.view.puInformationDialog.lblDescText = "Phone: " + gblBHSPhone + "\n\nEmail: " + gblBHSEmail + "\n\n" + gblBHSNote;
      currentFrm.view.puInformationDialog.isVisible = true; 
      addEventListener('keydown',this.preventTabMsg);
      currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
      currentFrm.view.forceLayout();
    },    
};
});