define(function() {

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      if(gblDemographicInfo.AppellantFirstName !== undefined && gblDemographicInfo.AppellantFirstName !== "") {
        this.view.lblTitleUserName.text = gblDemographicInfo.AppellantFirstName;
      }
      else {
        if(gblARDemographicInfo.firstName !== undefined && gblARDemographicInfo.firstName !== "") {
          this.view.lblTitleUserName.text = gblARDemographicInfo.firstName;
        }
        else {
          this.view.lblTitleUserName.text = "";
        }
      }
      this.view.flxCtnrHeading.accessibilityConfig = {
        "a11yLabel" : "SHARE Banner",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false 
      };
      this.view.flxCntrAccountHeading.accessibilityConfig = {
        "a11yLabel" : "Account Menu",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
 	  this.view.flxCntnrResources.accessibilityConfig = {
        "a11yLabel" : "Resource Menu",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };


      if (gblIsTPMUser) {
        this.view.sgmDataResources.removeAt(0);
      }
      this.view.sgmDataResources.onRowClick = this.openLink;
      this.view.sgmDataResources2.onRowClick = this.openLink2;
      
      this.view.onresize = onBreakpointChange;
      this.setSgmDataResources();
      this.setSgmDataResources2();
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
      
    }, 
    
    setSgmDataResources:function(){
      const data = this.view.sgmDataResources.data;
      const ObjData = [];
      for (var x in data){
        const UpdateSegmentRow = {
          "btnArrowRight":{"onClick": this.openLink},
          "lblTypeTitle":data[x].lblTypeTitle,
        };
        UpdateSegmentRow.lblTypeTitle.accessibilityConfig = {
          "a11yHidden": false, 
          "a11yLabel": "", 
          "a11yHint": "", 
          "a11yIndex": 0 
        };
        UpdateSegmentRow.btnArrowRight.accessibilityConfig = {
          "a11yHidden": false, 
          "a11yLabel": "", 
          "a11yHint": "", 
          "a11yIndex": 0 
        };
        ObjData.push(UpdateSegmentRow);
      }
      this.view.sgmDataResources.setData(ObjData);
    },
    setSgmDataResources2:function(){
      const data = this.view.sgmDataResources2.data;
      const ObjData = [];
      for (var x in data){
        const UpdateSegmentRow = {
          "btnArrowRight":{"onClick": this.openLink},
          "lblTypeTitle":data[x].lblTypeTitle,
        };

        UpdateSegmentRow.lblTypeTitle.accessibilityConfig = {
          "a11yHidden": false, 
          "a11yLabel": "", 
          "a11yHint": "", 
          "a11yIndex": 0 
        };
        UpdateSegmentRow.btnArrowRight.accessibilityConfig = {
          "a11yHidden": false, 
          "a11yLabel": "", 
          "a11yHint": "", 
          "a11yIndex": 0 
        };
        
        ObjData.push(UpdateSegmentRow);
      }
      this.view.sgmDataResources2.setData(ObjData);
    },
    openLink:function() {
      var selectedRow = this.view.sgmDataResources.selectedRowItems[0];
      if(selectedRow.lblTypeTitle === "Update Personal Information")
        if(gblIsARUser){
          displayARUpdateInfoForm(currentFrm.view);
        }
        else{
           displayUpdateInfoForm(currentFrm.view);        
        }
	  if(selectedRow.lblTypeTitle === "Log Out")
        logout();
    },
    openLink2:function() {  
      var documentData = policyDocument.pdf;
      var selectedRow2 = "";
      for(var i=0; i<this.view.sgmDataResources2.selectedRowItems.length; i++){
        selectedRow2 = this.view.sgmDataResources2.selectedRowItems[i];
        if(selectedRow2.lblTypeTitle === "Policy Changes") {
          kony.application.openURL("http://codes.ohio.gov/orc/5101.35");
        }      
        if(selectedRow2.lblTypeTitle === "Hearing Tips") {
          kony.application.openURL("http://emanuals.jfs.ohio.gov/Legal/StateHearings/");
        }      
        if(selectedRow2.lblTypeTitle === "State Hearing Site") {
          kony.application.openURL("http://jfs.ohio.gov/ols/bsh/index.stm");
        }      
        if(selectedRow2.lblTypeTitle === "Legal Aid Information") {
          kony.application.openURL("https://www.ohiolegalhelp.org/");
        } 
        if(selectedRow2.lblTypeTitle === "Support") {
          this.displaySupportInfo();
        } 
        if(selectedRow2.lblTypeTitle === "Terms of Service") {
          displayPDF(documentData, selectedRow2.lblTypeTitle);
        }         
        if(selectedRow2.lblTypeTitle === "Registration") {
          kony.application.openURL(Deeplink_Path + "frmRegistration");
        } 
        if(selectedRow2.lblTypeTitle === "Before a Hearing") {
          kony.application.openURL(Deeplink_Path + "frmBeforeHearing");
        } 
        if(selectedRow2.lblTypeTitle === "Connect to a Hearing") {
          kony.application.openURL(Deeplink_Path + "frmConnectToHearing");
        } 
        if(selectedRow2.lblTypeTitle === "During a Hearing") {
          kony.application.openURL(Deeplink_Path + "frmDuringHearing");
        } 
        if(selectedRow2.lblTypeTitle === "After a Hearing") {
          kony.application.openURL(Deeplink_Path + "frmAfterHearing");
        } 
        if(selectedRow2.lblTypeTitle === "FAQ") {
          kony.application.openURL(Deeplink_Path + "frmFAQ");
        } 
        if(selectedRow2.lblTypeTitle === "Hearing Decisions and Administrative Appeals") {
          kony.application.openURL("http://www.odjfs.state.oh.us/HearingsAppeals/");
        }
        if(selectedRow2.lblTypeTitle === "Apply for Benefits") {
          kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/index.jsp");
        }
        if(selectedRow2.lblTypeTitle === "Contact") {
          kony.application.openURL(Deeplink_Path + "frmContact");
        }
      }
    },
    
    displaySupportInfo:function() {
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '220px';
      currentFrm.view.puInformationDialog.lblTitleText = "Bureau of State Hearings";
      currentFrm.view.puInformationDialog.lblDescText = "Phone: " + gblBHSPhone + "\n\nEmail: " + gblBHSEmail + "\n\n" + gblBHSNote;
      currentFrm.view.puInformationDialog.isVisible = true; 
      addEventListener('keydown',this.preventTabMsg);
      currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
      currentFrm.view.forceLayout();
    },    
    
    
    onBreakpointChange: function(form, width){
      try{
      amplify.publish("secondaryBreakpointTrigger", form, width);
      kony.print('breakpoint '+width );
      if(width <= 1024){
        this.view.imgMainLogoApp.left='0.5%';
        this.view.imgShareLogo.width= '38%'; 
      }  
      else {
        this.view.imgMainLogoApp.left='2.0%';
        this.view.imgShareLogo.width= '40%';
      }
      if (this.view.flxContainerHam !== undefined) {
         this.view.flxContainerHam.isVisible = false;
      }
      if(width <= gblBreakPoint) {
        this.view.flxContainerLoggedUser.isVisible = false;
        this.view.flxContainerHamburger.isVisible = true;
        this.view.imgMainLogoApp.left = '0%';
        this.view.imgShareLogo.isVisible = false;
        this.view.imgShareLogoMobile.isVisible = true;
        mainHeaderScreen.height = "15%";
      }
      else {
//         displayHamburgerScreen();
        
        mainHeaderScreen.height = "130px";
        mainHeaderScreen.buttonHamBurgerSkin = 'CopydefBtnNormalHam';
        mainHeaderScreen.flxContainerHamisVisible = false;
        currentFrm.view.flxContainerForm.isVisible = true;
        if (currentFrm.view.headerCancelRHearing === undefined) {
            currentFrm.view.subNavigationHeaders.isVisible = true;
        } else {
            currentFrm.view.headerCancelRHearing.isVisible = true;
        }
        
        this.view.flxContainerLoggedUser.isVisible = true; 
        this.view.flxContainerHamburger.isVisible = false;
        mainHeaderScreen.height = "9%";
        this.view.imgShareLogo.isVisible = true;
        this.view.imgShareLogoMobile.isVisible = false;
      	//issues calling from some forms e.g. AR Request A Hearing flow
        //using local method call instead
        mainHeaderScreen.buttonHamBurgerSkin ='CopydefBtnNormalHam';
        this.view.imgMainLogoApp.left = '2%';
      }
	}catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },   
    show:function(){
      var pForm =  kony.application.getCurrentForm();
    },   
    setComponentData:function(name) {
      this.view.lblTitleUserName.text = name;
      this.view.lblWelcomeName.text = name;

      if(gblIsTPMUser) {
        this.hideName();
      }
      this.view.forceLayout();
    },
    hideName:function(){
      this.view.lblWelcomeText.text = "Welcome";
      this.view.lblTextWelcomeUser.text = "Welcome";
      this.view.lblTextWelcomeUser.setVisibility(true);
      this.view.lblTitleUserName.text = "";
      this.view.lblWelcomeName.text = "";
      //this.view.forceLayout();
    },
    
  };
});