function AS_Button_043062905c9f4e8f93ca340fc5c5fd18(eventobject) {
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