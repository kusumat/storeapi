function AS_AppEvents_d62fe39ebb9c4a4eb2c82b1f3655b5e6(eventobject) {
    kony.application.setApplicationBehaviors({
        disableForceRepaint: true
    });
    // kony.application.setApplicationBehaviors({disableForceRepaint: true}); 
    console.log("#### >>> just now invoked " + "patchIosDisableForceRepaint" + " before ANYTHING else ... ");
    console.log("### >>> Inside Pre Appinit" + " patchIosDisableForceRepaint and initChatFramework");
    event = {
        state: "preappinit",
        timestamp: Date().split(" ")[4],
        src: "Pre AppInit"
    };
    gblInitChatFramework.call(this, null);
}