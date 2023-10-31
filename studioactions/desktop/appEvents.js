define({
    /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_f1352131daa745c0a701bf7f05cd3f2b: function AS_AppEvents_f1352131daa745c0a701bf7f05cd3f2b(eventobject) {
        var self = this;
        return appServiceCallBack.call(this, eventobject);
    },
    AS_AppEvents_a326a8e35eaa455a860f88ebbc34f587: function AS_AppEvents_a326a8e35eaa455a860f88ebbc34f587(eventobject) {
        var self = this;
        console.log("#### >>>> Inside Post App Init");
        loadFabricURL.call(this);
    },
    AS_AppEvents_f3acb245b3fb43238acd45c259faddc4: function AS_AppEvents_f3acb245b3fb43238acd45c259faddc4(eventobject) {
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
});