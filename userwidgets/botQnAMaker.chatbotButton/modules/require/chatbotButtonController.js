define(function() {

        return {
          constructor: function(baseConfig, layoutConfig, pspConfig) {
            kony.print("chatbutton has been constructed.");
            this.view.info = { onClickFn: this.view.onClick };
            //mehmet this.disableChatbutton();
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
            amplify.subscribe("unhideChatbutton", this, this.unhideChatbutton);  
            amplify.subscribe("hideChatbutton", this, this.hideChatbutton);
//             // easy-peasy way to get the "event" to enable this button
            amplify.subscribe("enableChatbutton", this, this.enableChatbutton);
            //mehmet amplify.subscribe("disableChatbutton", this, this.disableChatbutton);
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
            
        enableChatbutton: function() {
          kony.print(">>># notified - enableChatbutton");
			this._enableChatbutton(true);          
        },
          
        disableChatbutton: function() {
          kony.print(">>># notified - disableChatbutton");
			//mehmet this._enableChatbutton(false);          
        },
          
        _enableChatbutton: function(enableTF) {
          kony.print(">>># notified cbController - " + (enableTF ? "enableChatbutton" : "disableChatbutton"));
          this.view.setEnabled(enableTF);
          if(this.view.ButtonRoundFloatWithShadow){
          if (enableTF) {
            this.view.ButtonRoundFloatWithShadow.skin = "sknBtnChatbotNormal";
          } else {
            this.view.ButtonRoundFloatWithShadow.skin = "sknBtnChatbotBlockedUI";
          }
          }
        },
          
        // Triggered by: amplify.publish("hideChatbutton");
        hideChatbutton: function() {
          kony.print(">>># notified - hideChatbutton" + " BTW looking for my parent.");
          this.view.isVisible = false;
          if (typeof(this.parent) !== "undefined") {
            this.parent.isVisible = false;
          }
        },
            
        // Triggered by: amplify.publish("unhideChatbutton");
        unhideChatbutton: function() {
          kony.print(">>># notified - unhideChatbutton");
          this.view.isVisible = true;
          if (typeof(this.parent) !== "undefined") {
            this.parent.isVisible = true;
          }
        },
            
    };
});
