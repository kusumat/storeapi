function AS_Form_31720139c64846f697b4e852d6f0f9fc(eventobject) {
    frmBrwrEnableJavaScript.browser.requestURLConfig = {
        "URL": "https://www.google.co.in",
        "requestMethod": constants.BROWSER_REQUEST_METHOD_GET
    }
    if (frmBrwrEnableJavaScript.lbl.text == "CB-073: enableJavaScript to true in preShow") {
        frmBrwrEnableJavaScript.browser.settings = {
            "enableJavaScript": true
        };
    } else if (frmBrwrEnableJavaScript.lbl.text == "CB-074: enableJavaScript to false in preShow") {
        frmBrwrEnableJavaScript.browser.settings = {
            "enableJavaScript": false
        };
    }
}