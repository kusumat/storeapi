function AS_AppEvents_f3acb245b3fb43238acd45c259faddc4(eventobject) {
    var self = this;
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
    document.documentElement.lang = "en";
    gblInitChatFramework.call(this, null);
}