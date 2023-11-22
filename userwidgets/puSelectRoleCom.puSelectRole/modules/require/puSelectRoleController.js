define(function() {

  var currentRole = null;
  var returnPage = "";

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnContinue.onClick = this.btnContinue;
      this.view.btnOptionsRadio.onSelection = this.btnOptionRadioSelected;
      this.view.btnCancel.onClick = this.cancelInfo;
      amplify.subscribe("secondaryBreakpointTrigger", this, this.onBreakpointChange, 1); 
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.flxContainerRoles.width = '95%';
        this.view.lblTitle1.skin = 'sknLblBlackBold115Mobile';
      }
      else {
        this.view.flxContainerRoles.width = '45%';
        this.view.lblTitle1.skin = 'sknLblBlackBold115';   
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    

    setReturnPage:function(returnPage) {
      this.returnPage = returnPage;  
    },   
    initInfo:function() {
      this.view.btnOptionsRadio.selectedKey = gblPortalUserRole.toUpperCase();
      this.btnOptionRadioSelected();
    },   
    cancelInfo:function() {
      this.view.setVisibility(false);
    },
    btnOptionRadioSelected: function() {
      gblRepresentingOption = this.view.btnOptionsRadio.selectedKey;
    },
    btnContinue:function() {
      if(screen.width <= gblBreakPoint) {      
        displayHamburgerScreen();
      }
      
      this.view.setVisibility(false);
      var roleAssigned = false;
      gblIsTPMUser = false;
      gblIsARUser = false;
      for (i = 0; i < gblPortalUserTypeCodes.length; i++) {
            if (gblPortalUserTypeCodes[i][0] === this.view.btnOptionsRadio.selectedKey)
              {
                roleAssigned = true;
              }
        }
      if (roleAssigned === true)
      {     
        gblPortalUserRole = this.view.btnOptionsRadio.selectedKey;
        if (gblPortalUserRole === "APP") {
          kony.print("inside user is appellant: " + testHatsUserId);
          initializeAppellant();
        } else if (gblPortalUserRole === "AR" || gblPortalUserRole === "TPM") {
          kony.print("inside user is AR/TPM: " + testHatsUserId);
          gblIsARUser = true;
          if (gblPortalUserRole === "TPM")
            gblIsTPMUser = true;
          initializeAppellant();
        }
      }
      else
      {
        dismissLoadingIndicator();
        gblRepresentingOption = this.view.btnOptionsRadio.selectedKey;
        kony.print("its new user, going to show representing behalf screen");
        var ntf = new kony.mvc.Navigation("frmLoginProvideInfo");
        ntf.navigate();
      }
    },

  };
});