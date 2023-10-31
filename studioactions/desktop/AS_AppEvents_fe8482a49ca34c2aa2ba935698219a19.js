function AS_AppEvents_fe8482a49ca34c2aa2ba935698219a19(eventobject) {
    console.log("### >>> Inside Post AppInit");
    console.log("### >>> PostInit of App -- invoking the function: " + "loadFabricURL");
    loadFabricURL.call(this);
}