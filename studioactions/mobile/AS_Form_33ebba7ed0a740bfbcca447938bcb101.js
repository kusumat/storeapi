function AS_Form_33ebba7ed0a740bfbcca447938bcb101(eventobject) {
    if (frmBrwrEnableJavaScript.lbl.text == "CB-075: enableJavaScript to true in postShow") {
        frmBrwrEnableJavaScript.browser.settings = {
            "enableJavaScript": true
        };
    } else if (frmBrwrEnableJavaScript.lbl.text == "CB-076: enableJavaScript to false in postShow") {
        frmBrwrEnableJavaScript.browser.settings = {
            "enableJavaScript": false
        };
    }
}