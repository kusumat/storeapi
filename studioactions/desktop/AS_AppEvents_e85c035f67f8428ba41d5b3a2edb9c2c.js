function AS_AppEvents_e85c035f67f8428ba41d5b3a2edb9c2c(eventobject) {
    console.log("### >>> Inside Post AppInit");
    console.log("### >>> PostInit of App -- invoking the function: " + "loadFabricURL");
    loadFabricURL.call(this);
}