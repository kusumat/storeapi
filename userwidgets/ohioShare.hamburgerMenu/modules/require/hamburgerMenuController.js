define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.buttonHamBurgerClose.onClick = this.dismiss;
      this.view.btnHearingDecision.onClick = this.openLinkHearingDecision;
      this.view.btnApplyBenefits.onClick = this.openLinkApplyBenefits;
      this.view.btnLegalAidInformation.onClick = this.openLinkLegalAidInformation;
      this.view.btnSupport.onClick = this.displaySupportInfo;
      this.setLinks();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    setLinks:function() {
      this.view.btnRegistration.onClick = this.navigateTo.bind(this, 'frmRegistration');
      this.view.btnBeforeHearing.onClick = this.navigateTo.bind(this, 'frmBeforeHearing');
      this.view.btnConnectHearing.onClick = this.navigateTo.bind(this, 'frmConnectToHearing');
      this.view.btnDuringHearing.onClick = this.navigateTo.bind(this, 'frmDuringHearing');
      this.view.btnAfterHearing.onClick = this.navigateTo.bind(this, 'frmAfterHearing');
      this.view.btnFAQ.onClick = this.navigateTo.bind(this, 'frmFAQ');
      this.view.btnContact.onClick = this.navigateTo.bind(this, 'frmContact');
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    
    openLinkHearingDecision:function() {
         kony.application.openURL("http://www.odjfs.state.oh.us/HearingsAppeals/");
    },
    
    openLinkApplyBenefits:function() {
         kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/index.jsp");
    },
    
    openLinkLegalAidInformation(){
      	kony.application.openURL("https://www.ohiolegalhelp.org");
    },
    
    
    navigateTo:function(form, self){
      this.view.loadingImage.isVisible = true;
      var x = new kony.mvc.Navigation(form);
      x.navigate();
      this.view.loadingImage.isVisible = false;
    },
    setCurrentPage:function(page){
//       const normalSkin = 'sknBtnFontFFFFFFSansProBold18px';
//       const selectedSkin = 'sknBtnBorderFontFFFFFFSansProBold18px';sknBtnBorderFontFFFFFFSansProBold16px
      this.view.loadingImage.isVisible = false;
      const normalSkin = 'sknBtnFontFFFFFFSansProBold16px';
      const selectedSkin = 'sknBtnFontFFFFFFBorderYellowSansProBold16px';
      
      const normalSkinTiny = 'sknBtnFontFFFFFFSansProBold12px';
      const selectedSkinTiny = 'sknBtnFontFFFFFFBorderYellowSansProBold12px';
      
      this.view.btnRegistration.skin = normalSkin;
      this.view.btnBeforeHearing.skin = normalSkin;
      this.view.btnConnectHearing.skin = normalSkin;
      this.view.btnDuringHearing.skin = normalSkin;
      this.view.btnAfterHearing.skin = normalSkin;
      this.view.btnFAQ.skin = normalSkin;
      
      this.view.btnHearingDecision.skin = normalSkinTiny;
      this.view.btnApplyBenefits.skin = normalSkinTiny;
      this.view.btnLegalAidInformation.skin = normalSkinTiny;
      this.view.btnSupport.skin = normalSkinTiny;
      this.view.btnContact.skin = normalSkinTiny;
      
      if (page === 'frmRegistration') {
        this.view.btnRegistration.skin = selectedSkin;
      } else if (page === 'frmBeforeHearing') {
        this.view.btnBeforeHearing.skin = selectedSkin;
      } else if (page === 'frmConnectToHearing') {
        this.view.btnConnectHearing.skin = selectedSkin;
      } else if (page === 'frmDuringHearing') {
        this.view.btnDuringHearing.skin = selectedSkin;
      } else if (page === 'frmAfterHearing') {
        this.view.btnAfterHearing.skin = selectedSkin;
      } else if (page === 'frmFAQ') {
        this.view.btnFAQ.skin = selectedSkin;
        
      }else if (page === '') {
        this.view.btnHearingDecision.skin = selectedSkinTiny;
      } else if (page === '') {
        this.view.btnApplyBenefits.skin = selectedSkinTiny;
      } else if (page === '') {
        this.view.btnLegalAidInformation.skin = selectedSkinTiny;
      } else if (page === '') {
        this.view.btnSupport.skin = selectedSkinTiny;
      } else if (page === 'frmContact') {
        this.view.btnContact.skin = selectedSkinTiny;
      }
    },

    adjustMenuSize: function() {
      this.view.forceLayout();
      var pForm =  kony.application.getCurrentForm();
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      var headerSize = (pForm.changeLanguaje) ? pForm.changeLanguaje.frame.height : 0;
      mainheight =  headerSize + pForm.mainNavigation.frame.height;
      this.view.height = (screenheight-mainheight)+'px';
      this.view.top = mainheight+'px';
      this.view.flxOptions.height = ((screenheight-mainheight)-110)+'px';
      this.view.forceLayout();
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    show:function(){
      this.view.isVisible = true;      
      var pForm =  kony.application.getCurrentForm();
      this.adjustMenuSize();
      this.moving("hamburgerMenu", "50%", 0.0, 0, false);   
	  //this.view.parent.flxMainContainerScoll.flxContentScroll.isVisible = false;
      //this.moving("hamburgerMenu", "50%", 0.5, 0, false);
	  this.view.forceLayout();
      currentFrm.view.forceLayout();
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    dismiss:function(){
//       this.view.parent.flxMainContainerScoll.flxContentScroll.isVisible = true;
      this.view.isVisible = false;
      
      this.moving("hamburgerMenu", "150%", 0.0, 0, true);
    },

    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    navigationTo:function(){
      var pForm =  kony.application.getCurrentForm();
      pForm.warningCompleted.isVisible=false;
      var x = new kony.mvc.Navigation("frmHome");
      x.navigate();

    },

    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    moving:function(widget, distanceT, time, delay, callBackFunc){
      var pForm =  kony.application.getCurrentForm();
      
      var self = this;
      try {
        pForm[widget].animate(
          kony.ui.createAnimation({
            "100":{
              "stepConfig":{"timingFunction":kony.anim.EASE},
              "centerX": distanceT
            }
          }),
          {
            "delay":delay, "iterationCount":1, "fillMode":kony.anim.FILL_MODE_FORWARDS, "duration":time, "direction": kony.anim.DIRECTION_ALTERNATE
          },
          {
            "animationEnd" : function(){
              if(callBackFunc){              
              } 
            }
          }
        );
      } catch (e) {
        kony.print("Somethig went wrong");
      }
      try {
        pForm.flxMainContainerScoll.flxContentScroll.isVisible = callBackFunc;
      }
      catch (e)
      {}
    },
    
    setParentView: function(parentView) {
    	this.parentView = parentView;
    }, 
    
    displaySupportInfo:function() {
      this.parentView.puInformationDialog.flxContainerInfoHeight = '220px';
      this.parentView.puInformationDialog.lblTitleText = "Bureau of State Hearings";
      this.parentView.puInformationDialog.lblDescText = "Phone: " + gblBHSPhone + "\n\nEmail: " + gblBHSEmail + "\n\n" + gblBHSNote;
      currentFrm.view.puInformationDialog.isVisible = true; 
      addEventListener('keydown',this.preventTabHam);
      currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
      currentFrm.view.forceLayout();
    },    
    preventTabHam: function(e){ 
      e = e || window.event; 
      if (currentFrm.view.puInformationDialog.isVisible === true){
        if (e.keyCode === 9)  // If tab key is pressed
        { 
          e.preventDefault(); // stop event from its action 
          currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
        } 
      }else{
        removeEventListener('keydown',this.preventTabHam);
      }
    },
  };
});