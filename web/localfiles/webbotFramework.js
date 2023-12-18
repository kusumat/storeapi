//Type your code here.
let version = {
verShareWebbotFramework: "2.0"
};

var kv_callback = {
  scope: null, // assign "this"
  formId: null, // for integrity testing
  cbResetIdle: null,
  cbMinimizeChat: null,
  cbStopChat: null,
  cbUIStopChat: null,
};

// TODO: This is invoked when the JS is loaded.
initChatFramework({ state: "construct", timestamp: Date().split(" ")[4], src: "web-javascript" });

// TODO: Check-point event message. -- both pre-appInit and any type the widget is constructed.
function initChatFramework(event) {
  console.log(">> HTML-CHAT >> " + "Chat iFrame HTML initChatFramework! " + JSON.stringify(event));
  eventStackForwarding(event);
}

// TODO: Helper function to promote generic event to the Kony App from HTML/JS (i.e., iFrame).
function eventStackForwarding(event) {
//  console.log(">> HTML-CHAT >> " + "Chat iFrame HTML eventStackForwarding! " + JSON.stringify(event));
  if (typeof(window.parent.gblEventStackHandler) == "function") {
    window.parent.gblEventStackHandler(event);
  }
}

function callbackResetIdle() {
  if (typeof(kv_callback.scope) !== "undefined") {
    let scope = kv_callback.scope;
    if (typeof(kv_callback.cbResetIdle) == "function") {
      kv_callback.cbResetIdle();
    }
  }
}

function callbackMinimizeChat(objSender) {
  // store.dispatch({type: 'DIRECT_LINE/DISCONNECT'});
  if ((typeof(store) !== "undefined") && (store !== null)) {
    console.log(">>>> HTML-CHAT - callbackMinimizeChat: " + objSender.toString());
  } else {
    console.log(">>>> CRITICAL HTML-CHAT - callbackMinimizeChat: " + objSender.toString());
    window.close();
  }
  if (typeof(kv_callback.scope) !== "undefined") {
    let scope = kv_callback.scope;
    if (typeof(kv_callback.cbMinimizeChat) == "function") {
      kv_callback.cbMinimizeChat();
    }
  } else {
//     window.close();
    sendEventRepairIframe(objSender);
  }
}

function callbackStopChat(objSender) {
  if ((typeof(store) !== "undefined") && (store !== null)) {
    console.log(">>>> HTML-CHAT - callbackStopChat: " + objSender.toString() + " dispatch a disconnect msg");
    store.dispatch({type: 'DIRECT_LINE/DISCONNECT'});
  } else {
    console.log(">>>> CRITICAL HTML-CHAT - callbackStopChat: " + objSender.toString() + " store not created, uable to dispatch disconnect");
  }
//   if (confirm('Do you want to end your conversation with Shari? \n\nIf not, cancel this and you can minimize the chat session, instead.')) {
//   }
  if (typeof(kv_callback.scope) !== "undefined") {
    let scope = kv_callback.scope;
    if (typeof(kv_callback.cbStopChat) == "function") {
      kv_callback.cbStopChat();
    }
  } else {
//     window.close();
    sendEventRepairIframe(objSender);
  }
}

function sendEventRepairIframe(self) {
  //         // does not work in iframe ---> window.close();
  // 		var chatIframe = window.parent.document.getElementById("frameheader");//('iframe_callback');
  // 		chatIframe.parentNode.removeChild(window.parent.document.getElementById("frameheader")); //('iframe_callback'));
  var eventRepair = {
    state: "kvrepairiframe",
    src: "#webchat",
  };
  eventRepair.timestamp = Date().split(" ")[4];
  eventStackForwarding(eventRepair);
}

function onloadConsoleLog(event) 
{
  console.log(">> HTML-CHAT >> " + "HTML is onload! " + event.srcElement.readyState.toString());
  // alert("HTML is onload! \n\n" + event.srcElement.readyState.toString());
}

function onreadystatechangeConsoleLog(event) {
  console.log(">> HTML-CHAT >> " + "HTML is onreadystatechange! " + event.srcElement.readyState.toString());
  // alert("HTML is onreadystatechange! \n\n" + event.srcElement.readyState.toString());
  window.parent.gblInitChatOnLoad(event);
  
}