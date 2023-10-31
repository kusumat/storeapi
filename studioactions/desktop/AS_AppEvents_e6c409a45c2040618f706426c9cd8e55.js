function AS_AppEvents_e6c409a45c2040618f706426c9cd8e55(eventobject) {
    kony.application.setApplicationBehaviors({
        disableForceRepaint: true
    });
    console.log("#### >>> just now invoked " + "patchIosDisableForceRepaint" + " before ANYTHING else ... ");
    console.log("#### >>> Inside Pre Appinit" + " patchIosDisableForceRepaint and initChatFramework");
    eventChatInit = {
        state: "preappinit",
        timestamp: Date().split(" ")[4],
        src: "Pre AppInit"
    };
    gblInitChatFramework.call(this, null);
}