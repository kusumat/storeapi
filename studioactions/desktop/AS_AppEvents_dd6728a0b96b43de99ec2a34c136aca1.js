function AS_AppEvents_dd6728a0b96b43de99ec2a34c136aca1(eventobject) {
    kony.application.setApplicationBehaviors({
        disableForceRepaint: true
    });
    // kony.application.setApplicationBehaviors({disableForceRepaint: true}); 
    console.log("#### >>> just now invoked " + "patchIosDisableForceRepaint" + " before ANYTHING else ... ");
    console.log("### >>> Inside Pre Appinit" + " patchIosDisableForceRepaint and initChatFramework");
    gblInitChatFramework.call(this, null);
}