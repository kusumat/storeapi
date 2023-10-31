define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
	  this.setLinks();
      this.view.flxStillQuestionHeadingContainer.accessibilityConfig = {
        "a11yLabel" : "",
        "a11yARIA":{"role":"heading", "aria-level":"1"},
        "a11yIndex" : 0,
        "a11yHidden" : false
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    setLinks: function(){
      this.view.btnRegistration.onClick = this.navigateTo.bind(this, 'frmRegistration');
      this.view.btnBeforeHearing.onClick = this.navigateTo.bind(this, 'frmBeforeHearing');
      this.view.btnDuringHearing.onClick = this.navigateTo.bind(this, 'frmDuringHearing');
      this.view.btnAfterHearing.onClick = this.navigateTo.bind(this, 'frmAfterHearing');
      this.view.btnFAQ.onClick = this.navigateTo.bind(this, 'frmFAQ');
      this.view.btnContact.onClick = this.navigateTo.bind(this, 'frmConnectToHearing');
      this.view.btnRegistrationMobile.onClick = this.navigateTo.bind(this, 'frmRegistration');
      this.view.btnBeforeHearingMobile.onClick = this.navigateTo.bind(this, 'frmBeforeHearing');
      this.view.btnDuringHearingMobile.onClick = this.navigateTo.bind(this, 'frmDuringHearing');
      this.view.btnAfterHearingMobile.onClick = this.navigateTo.bind(this, 'frmAfterHearing');
      this.view.btnFAQMobile.onClick = this.navigateTo.bind(this, 'frmFAQ');
      this.view.btnContactMobile.onClick = this.navigateTo.bind(this, 'frmConnectToHearing');
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    navigateTo:function(form, self){
      var x = new kony.mvc.Navigation(form);
      x.navigate();
    },
    breakPointChange:function(widthVal){
      if(widthVal < 1024 && widthVal >= 900 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '5%';

        this.view.btnRegistration.skin = 'sknBtnQuickLinkYellow100';  
        this.view.btnBeforeHearing.skin = 'sknBtnQuickLinkRed100';
        this.view.btnContact.skin = 'sknBtnQuickLinkGray100';
        this.view.btnDuringHearing.skin ='sknBtnQuickLinkRed100';
        this.view.btnAfterHearing.skin ='sknBtnQuickLinkGray100';
        this.view.btnFAQ.skin = 'sknBtnQuickLinkYellow100';
        
        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.left = '10%';

        this.view.flxContentSquare2.height= '240px';
        this.view.flxContentSquare2.width = '410px';
        
        this.view.imgPostitImage.right= '2.5%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.flxContentSquare2.isVisible = true;
        this.view.flxContentSquareMobile.isVisible = false;

        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        
        this.view.lblBulletPoint1.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rchTxtBulletPointA.skin = 'richTextBlackNormalOpenSansReg16px';
        this.view.rchTxtBulletPointA.text = 'If you are unable to login to SHARE, you can still request a State Hearing <a style="color: #000000; font-size: 16px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank"><u>here</u> </a> or contact us at 866 635-3748.';
    //    this.view.lblBulletPoint2.skin = 'lblFont000000OpenSansRegular16px';
    //    this.view.rchTxtBulletPointB.skin = 'richTextBlackLink16px';
    //    this.view.rchTxtBulletPointB.text = '<a style="color: #000000; font-size: 16px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank">The Request a Hearing link from the ODJFS site.</a> <br><br>';

      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '15px';


        this.view.btnRegistration.skin = 'sknBtnQuickLinkYellow90';
        this.view.btnBeforeHearing.skin = 'sknBtnQuickLinkRed90';
        this.view.btnContact.skin = 'sknBtnQuickLinkGray90';
        this.view.btnDuringHearing.skin ='sknBtnQuickLinkRed90';
        this.view.btnAfterHearing.skin ='sknBtnQuickLinkGray90';
        this.view.btnFAQ.skin = 'sknBtnQuickLinkYellow90';
        
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '5%';

        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.left = '10%';

        this.view.imgPostitImage.right= '2.5%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';

        this.view.flxContentSquare2.height= '185px';
        this.view.flxContentSquare2.width = '340px';
        
        this.view.flxContentSquare2.isVisible = true;
        this.view.flxContentSquareMobile.isVisible = false;

        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        
        this.view.lblBulletPoint1.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rchTxtBulletPointA.skin = 'richTextBlackNormalOpenSansReg16px';
        this.view.rchTxtBulletPointA.text = 'If you are unable to login to SHARE, you can still request a State Hearing <a style="color: #000000; font-size: 16px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank"><u>here</u> </a> or contact us at 866 635-3748.';
   //     this.view.lblBulletPoint2.skin = 'lblFont000000OpenSansRegular16px';
   //     this.view.rchTxtBulletPointB.skin = 'richTextBlackLink16px';
   //     this.view.rchTxtBulletPointB.text = '<a style="color: #000000; font-size: 16px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank">The Request a Hearing link from the ODJFS site.</a> <br><br>';

      } if(widthVal <= 768 && widthVal >= 720 ){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '5px';
        
        this.view.btnRegistration.skin = 'sknBtnQuickLinkYellow90';
        this.view.btnBeforeHearing.skin = 'sknBtnQuickLinkRed90';
        this.view.btnContact.skin = 'sknBtnQuickLinkGray90';
        this.view.btnDuringHearing.skin ='sknBtnQuickLinkRed90';
        this.view.btnAfterHearing.skin ='sknBtnQuickLinkGray90';
        this.view.btnFAQ.skin = 'sknBtnQuickLinkYellow90';

        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '5%';

        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.left = '10%';

        this.view.imgPostitImage.right= '2.5%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';

        this.view.flxContentSquare2.height= '170px';
        this.view.flxContentSquare2.width = '325px';
        
        this.view.flxContentSquare2.isVisible = true;
        this.view.flxContentSquareMobile.isVisible = false;
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        
        this.view.lblBulletPoint1.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rchTxtBulletPointA.skin = 'richTextBlackNormalOpenSansReg16px';
        this.view.rchTxtBulletPointA.text = 'If you are unable to login to SHARE, you can still request a State Hearing <a style="color: #000000; font-size: 16px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank"><u>here</u> </a> or contact us at 866 635-3748.';
    //    this.view.lblBulletPoint2.skin = 'lblFont000000OpenSansRegular16px';
   //     this.view.rchTxtBulletPointB.skin = 'richTextBlackLink16px';
   //     this.view.rchTxtBulletPointB.text = '<a style="color: #000000; font-size: 16px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank">The Request a Hearing link from the ODJFS site.</a> <br><br>';

      } if(widthVal <= 720 ){
        this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxSquare1.width = '100%';
        this.view.flxContentSquare1.top = '0px';
        this.view.flxContentSquare1.width = '100%';
        this.view.flxContentSquare1.right = '0px';
        
        this.view.btnRegistration.skin = 'sknBtnQuickLinkYellow90';
        this.view.btnBeforeHearing.skin = 'sknBtnQuickLinkRed90';
        this.view.btnContact.skin = 'sknBtnQuickLinkGray90';
        this.view.btnDuringHearing.skin ='sknBtnQuickLinkRed90';
        this.view.btnAfterHearing.skin ='sknBtnQuickLinkGray90';
        this.view.btnFAQ.skin = 'sknBtnQuickLinkYellow90';

        this.view.flxSquare2.width = '100%';
        this.view.flxContentSquare2.top = '0px';
        this.view.flxContentSquare2.width = '90%';
        this.view.flxContentSquareMobile.width = '90%';
        this.view.flxContentSquare2.left = '0px';

        this.view.imgPostitImage.right= '5%';
        this.view.imgPostitImage.width= '90%';
        this.view.imgPostitImage.height = '375px';
        
        this.view.flxContentSquare2.isVisible = false;
        this.view.flxContentSquareMobile.isVisible = true;
        
        this.view.lblAccessShare.text = 'ADDITIONAL\nINFORMATION';

        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        
        this.view.lblBulletPoint1.skin = 'lblFont000000OpenSansRegular16px';
        this.view.rchTxtBulletPointA.skin = 'richTextBlackNormalOpenSansReg16px';
        this.view.rchTxtBulletPointA.text = 'If you are unable to login to SHARE, you can still request a State Hearing <a style="color: #000000; font-size: 16px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank"><u>here</u> </a> or contact us at 866 635-3748.';
   //     this.view.lblBulletPoint2.skin = 'lblFont000000OpenSansRegular16px';
    //    this.view.rchTxtBulletPointB.skin = 'richTextBlackLink16px';
    //    this.view.rchTxtBulletPointB.text = '<a style="color: #000000; font-size: 16px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank">The Request a Hearing link from the ODJFS site.</a> <br><br>';

      } if(widthVal > 1024){
        this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
        this.view.flxSquare1.width = '50%';
        this.view.flxContentSquare1.top = '30px';
        this.view.flxContentSquare1.width = '90%';
        this.view.flxContentSquare1.right = '5%';
        
        this.view.btnRegistration.skin = 'sknBtnQuickLinkYellow100';
		this.view.btnBeforeHearing.skin = 'sknBtnQuickLinkRed100';
        this.view.btnContact.skin = 'sknBtnQuickLinkGray100';
        this.view.btnDuringHearing.skin ='sknBtnQuickLinkRed100';
        this.view.btnAfterHearing.skin ='sknBtnQuickLinkGray100';
        this.view.btnFAQ.skin = 'sknBtnQuickLinkYellow100';
        
        this.view.flxSquare2.width = '50%';
        this.view.flxContentSquare2.top = '30px';
        this.view.flxContentSquare2.left = '10%';

        this.view.imgPostitImage.right= '2.5%';
        this.view.imgPostitImage.width= '95%';
        this.view.imgPostitImage.height = '375px';

        this.view.flxContentSquare2.isVisible = true;
        this.view.flxContentSquareMobile.isVisible = false;

        this.view.flxContentSquare2.height= '265px';
        this.view.flxContentSquare2.width = '440px';
        
         this.view.lblAccessShare.text = 'ADDITIONAL INFORMATION';
        
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold38px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular24px';
        this.view.lblBulletPoint1.skin = 'lblFont000000OpenSansRegular24px';
        this.view.rchTxtBulletPointA.skin = 'richTextNormalBlack24px';
        this.view.rchTxtBulletPointA.text = 'If you are unable to login to SHARE, you can still request a State Hearing <a style="color: #000000; font-size: 24px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank"><u>here</u> </a> or contact us at 866 635-3748.';
       // this.view.lblBulletPoint2.skin = 'lblFont000000OpenSansRegular24px';
      //  this.view.rchTxtBulletPointB.skin = 'richTextBlackLink24px';
      //  this.view.rchTxtBulletPointB.text = '<a style="color: #000000; font-size: 24px; cursor:pointer" href=" https://secure.jfs.ohio.gov/ols/RequestHearing/" target="_blank">The Request a Hearing link from the ODJFS site.</a> <br><br>';
        
      }
      if (currentFrm.viewId === "frmHomeScreen") {
        this.view.flxCntnrBulletPoints.isVisible = true;
      }else{
        this.view.flxCntnrBulletPoints.isVisible = false;
      }
      
      this.view.forceLayout();
    }

  };
});