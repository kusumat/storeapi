define(function() {

        return {
          testSettings: {
            showDataFrame: false
          },
           
        kv_callbackHook: {
            scope: null, // e.g., this,
            formId: "", // e.g., kony.application.getCurrentForm(),
          	cbResetIdle: null, // e.g., SEND_MESSAGE is dispatched in webchat
            cbMinimizeChat: null, // e.g., this.closeChat,
            cbStopChat: null, // e.g., this.stopChatConversation,
            cbUIStopChat: null // e.g., _cbUIStopChat 
          },

          botframework: {
            webchat: null
          },
          
          getWebchat: function () {
            if ((typeof(this.botframework.webchat) === "undefined") || (this.botframework.webchat === null)) {
              this.setupWebchat();
            }
            return this.botframework.webchat;
          },
          
          setupWebchat: function () {
            try {
              this.botframework.webchat = window.document.querySelectorAll("#iframe_browserMockBot")[0].contentWindow;
            } catch (exChat) {
              console.log("EXCEPTION searching for the webchat framework. " + exChat.toString());
              alert("EXCEPTION searching for the webchat framework. \n\n" + exChat.toString());
            }
          },


          constructor: function(baseConfig, layoutConfig, pspConfig) {
            this.view.browserMockBot.enableJsInterface = true;            this.initGettersSetters();
          	this.initActions();
            this.view.isVisible = false;
            this.view.zIndex = 10;
            this.view.browserMockBot.isVisible = false;
            this.view.dataFrame.removeAll();
            this.view.dataFrame.addAll([{top: this.valueToFloatString(this.view.top,3), left: this.valueToFloatString(this.view.left,3), width: this.view.width, height: this.view.height}]);
            // TODO: Treat the unhide-button from puUpdateInformation[Com] as the dismiss menu that shows the button
            amplify.subscribe("hideChatbutton", this, this.minimizeChatFrame);

            amplify.subscribe("onBreakpointChange", this, this.onBreakpointChange, 1);
            
            amplify.subscribe("repairChatIframe", this, this.onRepairIframe);
          },
          //Logic for getters/setters of custom properties
          initGettersSetters: function() {
            this.view.info = { isStartMoving: false };
            this.view.onTouchStart = this.onTouchStart;
            this.view.onTouchMove = this.onTouchMove;
            this.view.onTouchEnd = this.onTouchEnd;
          },
          initActions() {
          },
          
          onRepairIframe: function() {
            kony.print(">>># notified - repairChatIframe" + " => reload the HTML.");
            this.minimizeChatFrame();
          },
                    
        onTouchStart: function(event, x, y) {
          if (!this.view.info.isStartMoving) {
            this.view.info = { isStartMoving: true };
            kony.print(">>>>> onTouchStart: "); // + "x: " + x + " y: " + y + " event: " + JSON.stringify(event));
            this.view.dataFrame.removeAll();
            this.view.dataFrame.addAll([{top: this.valueToFloatString(this.view.top,3), left: this.valueToFloatString(this.view.left,3), width: this.view.width, height: this.view.height}]);
            this.view.parent.forceLayout();
          }
        },
      
        onTouchMove: function(event, x, y) {
          kony.print(">>>>> onTouchMove: "); // + "x: " + x + " y: " + y + " event: " + JSON.stringify(event));
          if (this.view.info.isStartMoving) {
            this.view.top = y;
            this.view.left = x;
          }
        },
      
        onTouchEnd: function(event, x, y) {
          kony.print(">>>>> onTouchEnd: "); // + "x: " + x + " y: " + y + " event: " + JSON.stringify(event));
          if (this.view.info.isStartMoving) {
            this.view.info = { isStartMoving: false };
            this.view.top = y;
            this.view.left = x;
            this.view.dataFrame.addAll([{top: this.valueToFloatString(this.view.top,3), left: this.valueToFloatString(this.view.left,3), width: this.view.width, height: this.view.height}]);
            this.view.parent.forceLayout();
          }
        },
      
        // Triggered by: amplify.publish("hideChatbutton");
        minimizeChatFrame: function() {
          kony.print(">>># notified - hideChatbutton" + " => minimizeChatFrame.");
          if (this.isConversationOpen()) {
            this.minimizeChatConversation();
          }
        },
            
        isConversationOpen() {
          return this.view.isVisible;
        },
          
        closeChat: function() {
          kony.print("**** CLICK ===> iframe browser ===> closeChat");
          this.view.isVisible = false;
          this.view.browserMockBot.isVisible = true;
          this.view.dataFrame.isVisible = false;
          this.view.zIndex = 10;
        },
      
          openChat: function(_cbUIStopChat) {
            // TODO: Avoid any racing
            // this.view.browserMockBot.reload();
            this.setupWebchat(); // this.botframework.webchat = window.document.querySelectorAll("#iframe_browserMockBot")[0].contentWindow;
            kony.print("**** CLICK ===> iframe browser ===> openChat");
            this.view.isVisible = true;
            this.view.browserMockBot.isVisible = true;
            this.view.zIndex = 10;
            kony.print(">>> openChat ... " + JSON.stringify(globalChatConfig));
            this.kv_callbackHook = {
              scope: this,
              formId: kony.application.getCurrentForm(),
              cbResetIdle: resetChatIdle, // (fn in globals.js)
              cbMinimizeChat: this.minimizeChatConversation,
              cbStopChat: this.stopChatConversation,
              cbUIStopChat: _cbUIStopChat 
            };
            if (typeof(globalChatConfig) !== "undefined" && globalChatConfig.secureToken !== null && globalChatConfig.secureToken !== "") {
              // TODO: FIREFOX issue SHARE-102
				let webchat = this.getWebchat(); // this.botframework.webchat; // window.document.querySelectorAll("#iframe_browserMockBot")[0].contentWindow;
                if ((typeof(webchat) !== "undefined") && (webchat !== null)) {
                webchat.kv_callback = this.kv_callbackHook;
                if (globalChatConfig.secureToken !== null && globalChatConfig.secureToken !== "SKIP-TOKEN") {
                  if (typeof(webchat.startChatConversation) !== "function") {
                    console.log(">>>> CRITICAL " + "flow-existing-token 'webchat.startChatConversation' is missing.");
                    this.closeChat();
                    invalidateGlobalSecureToken();
                    return;
                  }
                  webchat.startChatConversation(getGlobalSecureToken(), false);
                  setChatIdle(this.stopChatConversation);
                } else {
                  this.view.browserMockBot.reload();
                  webchat.showStyling();              
                  webchat.kv_callback = this.kv_callbackHook;
                  this.view.dataFrame.isVisible = this.testSettings.showDataFrame;
                }
              } else {
                // "Close it back down."  Firefox bug and comm errors
                this.minimizeChatConversation();
              }
            } else {
              // NOTICE the generateSecureToken (in globals.js) will "startChatConversation" when the response completes.
              generateSecureToken(this.startChatConversation);
            }
          },


          startChatConversation: function(httpStatus, isNewConversation) {
            // TODO: FIREFOX issue SHARE-102
            let webchat = this.getWebchat(); // this.botframework.webchat; // window.document.querySelectorAll("#iframe_browserMockBot")[0].contentWindow;
            if ((typeof(webchat) !== "undefined") && (webchat !== null)) {
              webchat.kv_callback = this.kv_callbackHook;
              if (globalChatConfig.secureToken !== null && globalChatConfig.secureToken !== "SKIP-TOKEN") {
                if (typeof(webchat.startChatConversation) !== "function") {
                    console.log(">>>> CRITICAL " + "flow-new-token 'webchat.startChatConversation' is missing.");
                    this.closeChat();
                    invalidateGlobalSecureToken();
                    return;
                }
                webchat.startChatConversation(getGlobalSecureToken(), isNewConversation);
                setChatIdle(this.stopChatConversation);
              }
            } else {
			  kony.print("**** UNABLE TO FIND THE webchat iFRAME IN THE DOM.");
                // "Close it back down."  Firefox bug and comm errors
              this.minimizeChatConversation();
            }
          },

          stopChatConversation: function() {
            let webchat = this.getWebchat(); // this.botframework.webchat; // window.document.querySelectorAll("#iframe_browserMockBot")[0].contentWindow;
            if ((typeof(webchat) !== "undefined") && (webchat !== null)){
              if (typeof(webchat.disconnectDirectline) === "function") {
//                 webchat.disconnectDirectline();
              }
              // TODO: This appears to work in CONSOLE
              /*
              	window.document.querySelectorAll("#iframe_browserMockBot")[0].contentDocument.querySelector('ul').innerHTML
              */
              // TODO: Replaced by a dispatch msg in webchatframework.js
              var history = window.document.querySelectorAll("#iframe_browserMockBot")[0].contentDocument;
              history.querySelector('ul').innerHTML = "<ul></ul>";
            }
            this.minimizeChatConversation();
            this.view.browserMockBot.reload();
            invalidateGlobalSecureToken(); // Also, stop the timer :)
          },

          minimizeChatConversation: function() {
            if ((typeof(this.kv_callbackHook) !== "undefined") && (typeof(this.kv_callbackHook.cbUIStopChat) === "function")) {
              this.kv_callbackHook.cbUIStopChat();
            }            
          },
          
          valueToFloatString: function( v, digits ) {
			var vStr = v.toString();
            var vFloat = parseFloat(vStr);
            var vPrecise = vFloat.toFixed(digits);
            return vPrecise.toString();
          },

        onBreakpointChange: function(form, width) {
          try{
// this does not work
//          kony.print(">>> onBreakpoint -- form is: " + JSON.stringify(form));
            kony.print(">>> CHATBOT FRAME " + "reached onBreakpointChange width = " + width);
            kony.print(">>> DEVICE SCREEN: (w x h) " + kony.os.deviceInfo().screenWidth + " x " + kony.os.deviceInfo().screenHeight);
            kony.print(">>> CHATBOT FRAME: (top, left) (" +  this.view.top + ", " + this.view.left + ")");
            kony.print(">>> CHATBOT FRAME: (w x h) " + this.view.width + " x " + this.view.height);
          
          	this.view.zIndex = 10;
          	this.view.browserMockBot.zIndex = 10;

            if (isBreakpointLargeDesktop(width)) {
              kony.print(">>> CHATBOT FRAME " + "LargeDesktop");
            } else if (isBreakpointDesktop(width)) {
              kony.print(">>> CHATBOT FRAME " + "Desktop");
            } else if (isBreakpointTabletLandscape(width)) {
              kony.print(">>> CHATBOT FRAME " + "Tablet (landscape)");
            } else if (isBreakpointTabletPortrait(width)) {
              kony.print(">>> CHATBOT FRAME " + "Tablet (portrait)");            
            } else if (isBreakpointMobileLandscape(width)) {
              kony.print(">>> CHATBOT FRAME " + "Mobile (landscape)");
            } else if (isBreakpointMobile(width)) {
              kony.print(">>> CHATBOT FRAME " + "Mobile");
// TODO: RJ 12-23 - remove chat widget calculations and allow the overlay to manage its adjustments
            }
          }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
        },
          
          customMethodReload: function(p) {
            // TODO: No longer used, but it can be handy for creating a custom method of a userwidget.
            kony.print(">>>> CLICK ===> iframe browser ===> customMethodReload");
            this.view.browserMockBot.reload();
          }


        };
});
