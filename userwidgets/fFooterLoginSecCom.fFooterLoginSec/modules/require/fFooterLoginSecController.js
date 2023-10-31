define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.setFooterLinks();
		},
        setFooterLinks:function() {
          this.view.lblTextRow23.onTouchEnd = this.openLink;
          this.view.lblTextRow22.onTouchEnd = this.openLink;
          this.view.lblTextRow21.onTouchEnd = this.openLink;
          this.view.lblTextRow13.onTouchEnd = this.openLink;
          this.view.lblTextRow12.onTouchEnd = this.openLink;
          this.view.lblTextRow11.onTouchEnd = this.openLink;
        },
        openLink:function(eventoject) {
          kony.print("eventoject: "+JSON.stringify(eventoject.text));
          var hyperLinkClicked = eventoject.text;
          var tempURL = "";
          if(hyperLinkClicked.length !== 0 && hyperLinkClicked !== undefined && hyperLinkClicked !== null) {
            if(hyperLinkClicked === "Home") {
              tempURL = "http://jfs.ohio.gov/ols/bsh/index.stm";
            } else if(hyperLinkClicked === "Privacy Notice") {
              tempURL = "http://jfs.ohio.gov/ocomm_root/privacy.stm";
            } else if(hyperLinkClicked === "Information Center") {
              tempURL = "https://benefits.ohio.gov";
            } else if(hyperLinkClicked === "Contact Us") {
              tempURL = "https://jfs.ohio.gov/ocomm_root/ContactUs.stm";
            } else if(hyperLinkClicked === "Forms") {
              tempURL = "http://www.odjfs.state.oh.us/forms/";
            } else if(hyperLinkClicked === "Ohio.gov") {
              tempURL = "https://ohio.gov/wps/portal/gov/site/home/";
            }
          }
          if(tempURL.length !== 0 && tempURL !== undefined && tempURL !== null) {
          	kony.application.openURL(tempURL);  
          }
          
        },
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});