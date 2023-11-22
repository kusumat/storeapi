define(function() {

        return {
          constructor: function(baseConfig, layoutConfig, pspConfig) {
            kony.print("pu chatbutton has been constructed.");
            this.disablePopupChatbutton();
//             this.view.info = { onClickFn: this.view.onTouchEnd };
//             this.disableChatbutton();
            this.initGettersSetters();
            this.view.ButtonRoundFloatWithShadow.zIndex = 10;
            this.view.zIndex = 10;


            amplify.subscribe("showingHamburgerMenu", this, this.onShowingHamburgerMenu);
            amplify.subscribe("dismissingHamburgerMenu", this, this.onDismissingHamburgerMenu);
            // TOOD: Treat the drop-down menu the same as the hamburger menu.
            // TODO: On desktop, the CB is not encroaching on the menu, so no need to hide.
            amplify.subscribe("showingDropdownMenu", this, this.onShowingDropdownMenu);
            amplify.subscribe("dismissingDropdownMenu", this, this.onDismissingHamburgerMenu);  
            // TODO: Treat the unhide-button from puUpdateInformation[Com] as the dismiss menu that shows the button
            // SEE ALSO "unhidePopupChatbutton"
            amplify.subscribe("unhidePopupChatbutton", this, this.unhidePopupChatbutton);  
            amplify.subscribe("hidePopupChatbutton", this, this.hidePopupChatbutton);
//             // easy-peasy way to get the "event" to enable this button
            //mehmet amplify.subscribe("enableChatbutton", this, this.enablePopupChatbutton);
            //mehmet amplify.subscribe("disableChatbutton", this, this.disablePopupChatbutton);
          },
          //Logic for getters/setters of custom properties
          initGettersSetters: function() {

          },
          
        // Triggered by: amplify.publish("showingHamburgerMenu");
        onShowingHamburgerMenu: function() {
          kony.print(">>># notified - showingHamburgerMenu");

			// TODO: (disabled)           
          this.view.isVisible = false;
        },
      
        // Triggered by: amplify.publish("dismissingHamburgerMenu");
        onDismissingHamburgerMenu: function() {
          kony.print(">>># notified - dismissingHamburgerMenu");
          this.view.isVisible = true;
        },
            
        // Triggered by: amplify.publish("dismissingDropdownMenu");
        onShowingDropdownMenu: function() {
          // NOTE - no need to test the breakpoint-size, as the dropdown is only on "large"
          kony.print(">>># notified - onShowingDropdownMenu" + " no action taken to hide CHAT on desktop");
          this.view.isVisible = true;
        },
          
        enablePopupChatbutton: function() {
          kony.print(">>># notified - enablePopupChatbutton");
			this._enablePopupChatbutton(true);          
        },
          
        disablePopupChatbutton: function() {
          kony.print(">>># notified - disablePopupChatbutton");
			//mehmet this._enablePopupChatbutton(false);          
        },
          
        _enablePopupChatbutton: function(enableTF) {
          kony.print(">>># notified cbController - " + (enableTF ? "enablePopupChatbutton" : "disablePopupChatbutton"));
          this.view.setEnabled(enableTF);
          if (enableTF) {
            this.view.ButtonRoundFloatWithShadow.skin = "sknBtnChatbotNormal";
          } else {
            this.view.ButtonRoundFloatWithShadow.skin = "sknBtnChatbotBlockedUI";
          }
        },
          
        // Triggered by: amplify.publish("unhideChatbutton");
        hidePopupChatbutton: function() {
          kony.print(">>># notified - hidePopupChatbutton" + " BTW looking for my parent.");
          this.view.isVisible = false;
          if (typeof(this.parent) !== "undefined") {
            this.parent.isVisible = false;
          }
        },
            
        // Triggered by: amplify.publish("unhideChatbutton");
        unhidePopupChatbutton: function() {
          kony.print(">>># notified - unhidePopupChatbutton");
          this.view.isVisible = true;
          if (typeof(this.parent) !== "undefined") {
            this.parent.isVisible = true;
          }
        },
            
    };
});
