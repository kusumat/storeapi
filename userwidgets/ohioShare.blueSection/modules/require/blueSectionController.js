define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          amplify.subscribe("secondaryBreakpointTrigger", this.breakPointChange, 1); 
          this.view.PrimaryButton.onClickNav = this.setClickNav;
 		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
        setClickNav:function(){
          var buttonText = this.view.PrimaryButton.buttonText.trim();
          if (buttonText === 'LOGIN'){
            this.navigateTo('frmLogin');
          }else if (buttonText === 'ACCESS APPEAL DECISION RECORDS'){
            this.openLink();
          }
        },
        openLink: function () {
          kony.application.openURL("http://www.odjfs.state.oh.us/HearingsAppeals/");
        },
        breakPointChange: function(width) {
          /*if (width > 1024) {
            console.log('Large one row text');
          } else if (width > 900) {
            console.log('laptop one row text');
          } else if (width > 768) {
            console.log('Ipad one row text');
          } else*/
          if (width <= 720) {
            // console.log('Mobile one row text');
            this.view.flxSkeleton.top = '10px';
            this.view.flxSkeleton.bottom = '10px';
            this.view.flxSkeleton.layoutType = kony.flex.FLOW_VERTICAL;
            this.view.flxSkeleton.forceLayout();
            this.view.flxSquare1.width = '100%';
            this.view.flxSquare2.left = '0%';
            this.view.flxSquare2.width = '100%';
            this.view.imgSectionImage.left = '10%';
            this.view.flxContent.right = '10%';
          } else {
            this.view.flxSkeleton.top = '50px';
            this.view.flxSkeleton.bottom = '50px';
            this.view.flxSkeleton.layoutType = kony.flex.FREE_FORM;
            this.view.flxSkeleton.forceLayout();
            this.view.flxSquare1.width = '50%';
            this.view.flxSquare2.left = '50%';
            this.view.flxSquare2.width = '50%';
            this.view.imgSectionImage.left = '12%';
            this.view.flxContent.right = '12%';
          }
          this.view.forceLayout();
        }
	};
});