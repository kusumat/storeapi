function AS_AppEvents_ha444147b4a247b08e5f0285e63ace8e(eventobject) {
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