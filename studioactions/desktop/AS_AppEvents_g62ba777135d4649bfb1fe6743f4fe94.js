function AS_AppEvents_g62ba777135d4649bfb1fe6743f4fe94(eventobject) {
    console.log("### >>> Inside Post AppInit");
    console.log("### >>> PostInit of App -- invoking the function: " + "loadFabricURL");
    loadFabricURL.call(this);
}