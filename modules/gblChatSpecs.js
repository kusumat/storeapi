// BOILERPLATE for this chat-bot with RWD design.

  /** -- use in the onClick as a shorthand
  let frameSpec = this.stateStore.chatSpec.frame.open | close;
  let overlaySpec = this.stateStore.chatSpec.overlay.open | close;
  let buttonSpec = this.stateStore.chatSpec.button.open | close;
 
  DON'T FORGET TO SET IN THE INIALIZATION AND UPDATE IN THE onBreakpointChange() SUBSCRIPTION
  .
  .
    for example:  
    	this.stateStore.chatSpec = this.chatBpSpecs.bpLarge;
  .
  .
  */

/* 
 stateStore: {
	parent: null,
    paddingPx: 0, // 'px'
    chatSpec: {},
  },
*/

 /*
 
 		w A R N I N G ...
        
        	USE THE COLLECTION THAT FOLLOWS THESE INDIVIDUAL SPECS.
 
 */

  let chatBpSpecDefault = {
    bpSmall: {
      overlay: {
        open: { t: "15.0%", l: "4.0%", w: "90.0%", h: "80.0%" },
        close: { t: "87.0%", l: "81.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "88%" },
        close: { t: "0%", l: "0%", w: "100%", h: "88%" },
      },
    },
    bpMedium: {
      overlay: {
        open: { t: "17.5%", l: "42.0%", w: "54.0%", h: "78.0%" },
        close: { t: "88.0%", l: "88.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "88%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpLarge: {
      overlay: {
        open: { t: "18.5%", l: "54.0%", w: "40.0%", h: "76.0%" },
        close: { t: "87.0%", l: "88.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "88%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
  };


  let chatBpSpecARReqHearingSteps = {
    bpSmall: {
      overlay: {
        open: { t: "15.0%", l: "4.0%", w: "90.0%", h: "70.0%" },
        close: { t: "77.0%", l: "81.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "80.0%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0.0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "88%" },
      },
    },
    bpMedium: {
      overlay: {
        open: { t: "17.5%", l: "42.0%", w: "54.0%", h: "70.0%" },
        close: { t: "78.0%", l: "88.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "80%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpLarge: {
      overlay: {
        open: { t: "18.5%", l: "54.0%", w: "40.0%", h: "76.0%" },
        close: { t: "87.0%", l: "88.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "88%" },
        close: { t: "0%", l: "0%", w: "100%", h: "88%" },
      },
    },
  };

  let chatBpSpecDashboard = {
    bpSmall: {
      overlay: {
        open: { t: "14.0%", l: "4.0%", w: "90.0%", h: "80.0%" },
        close: { t: "82.5%", l: "81.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "86.0%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpMedium: {
      overlay: {
        open: { t: "14.0%", l: "42.0%", w: "54.0%", h: "80.0%" },
        close: { t: "79.5%", l: "88.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "82.0%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpLarge: {
      overlay: {
        open: { t: "18.5%", l: "54.5%", w: "40.0%", h: "76.0%" },
        close: { t: "87.0%", l: "89.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "86%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
  };

  let chatBpSpecPopup = {
    bpSmall: {
      overlay: {
        open: { t: "15.0%", l: "4.0%", w: "90.0%", h: "80.0%" },
        close: { t: "87.0%", l: "81.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpMedium: {
      overlay: {
        open: { t: "10%", l: "40.0%", w: "50.0%", h: "66.0%" },
        close: { t: "70.5%", l: "82.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "92%", l: "84%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "88%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpLarge: {
      overlay: {
        open: { t: "8%", l: "54%", w: "37.0%", h: "68.0%" },
        close: { t: "70.5%", l: "85.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "92%", l: "84%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
  };

  let chatBpSpecPopupLogin = {
    bpSmall: {
      overlay: {
        open: { t: "15.0%", l: "4.0%", w: "90.0%", h: "80.0%" },
        close: { t: "87.0%", l: "81.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpMedium: {
      overlay: {
        open: { t: "10%", l: "40.0%", w: "50.0%", h: "66.0%" },
        close: { t: "70.5%", l: "82.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "92%", l: "84%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "88%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpLarge: {
      overlay: {
        open: { t: "8%", l: "54%", w: "37.0%", h: "68.0%" },
        close: { t: "70.5%", l: "85.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "92%", l: "84%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
  };

  let chatBpSpecDetails = {
    bpSmall: {
      overlay: {
        open: { t: "15.0%", l: "4.0%", w: "90.0%", h: "80.0%" },
        close: { t: "81.5%", l: "79.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "83.0%", l: "83.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpMedium: {
      overlay: {
        open: { t: "18%", l: "44%", w: "47.5%", h: "76%" },
        close: { t: "80.5%", l: "84.5%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "83%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
    bpLarge: {
      overlay: {
        open: { t: "18%", l: "56.5%", w: "38.0%", h: "76.0%" },
        close: { t: "86.0%", l: "88.5%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "86%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "80%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
  };

  let chatBpSpecUpload = {
    bpSmall: {
      overlay: {
        open: { t: "15.0%", l: "4.0%", w: "90.0%", h: "80.0%" },
        close: { t: "87.0%", l: "81.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "88%" },
        close: { t: "0%", l: "0%", w: "100%", h: "88%" },
      },
    },
    bpMedium: {
      overlay: {
        open: { t: "17.5%", l: "42.0%", w: "54.0%", h: "78.0%" },
        close: { t: "88.0%", l: "88.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90%", l: "84.5%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "88%" },
        close: { t: "0%", l: "0%", w: "100%", h: "88%" },
      },
    },
    bpLarge: {
      overlay: {
        open: { t: "30.0%", l: "65.0%", w: "31.0%", h: "50.0%" },
        close: { t: "75.0%", l: "90.0%", w: "55px", h: "55px" },
      },
      button: {
        open: { t: "90.0%", l: "80.0%", w: "55px", h: "55px" },
        close: { t: "0%", l: "0%", w: "55px", h: "55px" },
      },
      frame: {
        open: { t: "0%", l: "0%", w: "100%", h: "88%" },
        close: { t: "0%", l: "0%", w: "100%", h: "80%" },
      },
    },
  };


  let _DEFAULT = 0;
  let _DASHBOARD = 1;
  let _POPUP = 2;
  let _POPUP_LOGIN = 3;
  let _DETAILS = 4;
  let _UPLOAD = 5;
  let _ARHEARING_STEPS = 6;

  let chatBpSpecsCollection = [
    chatBpSpecDefault,
    chatBpSpecDashboard,
    chatBpSpecPopup,
    chatBpSpecPopupLogin,
    chatBpSpecDetails,
    chatBpSpecUpload,
    chatBpSpecARReqHearingSteps,
  ];
    

//#undef HELPER_CHATBOT

// HELPER FUNCTIONS
  function peekAtCoords(name, vu) {
//#ifdef HELPER_CHATBOT
    if ((typeof(vu) != "undefined") && (vu !== null)) {
      let h = vu.height;
      let w = vu.width;
      let t = vu.top;
      let l = vu.left;
      let peekCoords = { peekCoords: { left: l, top: t, height: h, width: w } };
      kony.print("???? peek at " + name + " >>> " + JSON.stringify(peekCoords));
    } else {
      kony.print("???? peek at " + name + " >>> " + "UNDEFINED");
    }  
//#else
    return;
//#endif
  }

  function pickChatSpec(_CHATSPEC_GROUP) {
	let bpWidth = kony.application.getCurrentBreakpoint();
    var initChatSpec  = null;
    if (isBreakpointLargeDesktop(bpWidth) || isBreakpointDesktop(bpWidth)) {
      kony.print(">> group#" + _CHATSPEC_GROUP + " width: " + bpWidth + " is .bpLarge");
      initChatSpec = chatBpSpecsCollection[_CHATSPEC_GROUP].bpLarge;
    } 
//     else if (isBreakpointTabletPortrait(bpWidth) || isBreakpointTabletLandscape(bpWidth) || isBreakpointMobileLandscape(bpWidth)) {
//       kony.print(">> group#" + _CHATSPEC_GROUP + " width: " + bpWidth + " is .bpMedium");
//       initChatSpec = chatBpSpecsCollection[_CHATSPEC_GROUP].bpMedium;
//     } 
    else { // if (isBreakpointMobile(bpWidth)) 
      kony.print(">> group#" + _CHATSPEC_GROUP + " width: " + bpWidth + " is .bpSmall");
      initChatSpec = chatBpSpecsCollection[_CHATSPEC_GROUP].bpSmall;
    }
	
    return initChatSpec;
  }





