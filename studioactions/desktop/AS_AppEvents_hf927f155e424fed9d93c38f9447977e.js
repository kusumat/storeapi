function AS_AppEvents_hf927f155e424fed9d93c38f9447977e(eventobject) {
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