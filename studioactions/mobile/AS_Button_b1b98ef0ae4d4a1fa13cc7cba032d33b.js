function AS_Button_b1b98ef0ae4d4a1fa13cc7cba032d33b(eventobject) {
    var browser = new kony.ui.CordovaBrowser({
        "detectTelNumber": true,
        "enableZoom": false,
        "height": "90%",
        "id": "browser",
        "isVisible": false,
        "left": "0dp",
        "top": "0dp",
        "width": "100%",
        "zIndex": 1,
        "requestURLConfig": {
            "URL": "detTel.html",
            "requestMethod": constants.BROWSER_REQUEST_METHOD_GET
        }
    }, {
        "containerHeightReference": constants.CONTAINER_HEIGHT_BY_FORM_REFERENCE,
        "containerWeight": 100,
        "margin": [0, 0, 0, 0],
        "marginInPixel": false
    }, {});
    frmCB070.add(browser);
}