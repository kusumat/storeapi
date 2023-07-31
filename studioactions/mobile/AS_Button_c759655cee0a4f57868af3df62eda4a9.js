function AS_Button_c759655cee0a4f57868af3df62eda4a9(eventobject) {
    if (frmBrwrEnableJavaScript.lbl.text == "CB-078: enableJavaScript to true dynamically") {
        frmBrwrEnableJavaScript.browser.settings = {
            "enableJavaScript": true
        };
    } else if (frmBrwrEnableJavaScript.lbl.text == "CB-079: enableJavaScript to false dynamically") {
        frmBrwrEnableJavaScript.browser.settings = {
            "enableJavaScript": false
        };
    }
}