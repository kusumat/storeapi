define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.setFooterLinks();
		},
        setFooterLinks:function() {
          this.view.lblCol1.onTouchEnd = this.openLink;
          this.view.lblCol2.onTouchEnd = this.openLink;
          this.view.lblCol3.onTouchEnd = this.openLink;
          this.view.lblCol4.onTouchEnd = this.openLink;
          this.view.lblCol5.onTouchEnd = this.openLink;
          this.view.lblCol6.onTouchEnd = this.openLink;
        },
        openLink:function(eventoject) {
          kony.print("eventoject: "+JSON.stringify(eventoject.text));
          var hyperLinkClicked = eventoject.text;
          var tempURL = "";
          if(hyperLinkClicked.length !== 0 && hyperLinkClicked !== undefined && hyperLinkClicked !== null) {
            if(hyperLinkClicked === "Home") {
              tempURL = "http://jfs.ohio.gov/ols/bsh/index.stm";
            } else if(hyperLinkClicked === "Privacy") {
              tempURL = "http://jfs.ohio.gov/ocomm_root/privacy.stm";
            } else if(hyperLinkClicked === "Information") {
              tempURL = "https://benefits.ohio.gov";
            } else if(hyperLinkClicked === "Contact") {
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