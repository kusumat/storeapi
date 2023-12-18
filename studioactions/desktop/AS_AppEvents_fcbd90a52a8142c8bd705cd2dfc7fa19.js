function AS_AppEvents_fcbd90a52a8142c8bd705cd2dfc7fa19(eventobject) {
    console.log("### >>> Inside Post AppInit");
    console.log("### >>> PostInit of App -- invoking the function: " + "loadFabricURL");
    loadFabricURL.call(this);
}