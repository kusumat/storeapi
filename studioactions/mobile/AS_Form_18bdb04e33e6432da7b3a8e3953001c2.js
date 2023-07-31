function AS_Form_18bdb04e33e6432da7b3a8e3953001c2(eventobject) {
    frmBrwrClearCanvasBeforeLoading.browser.requestURLConfig = {
        "URL": "https://www.google.co.in",
        "requestMethod": constants.BROWSER_REQUEST_METHOD_GET
    }
    if (frmBrwrClearCanvasBeforeLoading.lbl.text == "CB-097: set clearCanvasBeforeLaoding to false in preShow") {
        frmBrwrClearCanvasBeforeLoading.browser.clearCanvasBeforeLoading = false;
    } else if (frmBrwrClearCanvasBeforeLoading.lbl.text == "CB-098: set clearCanvasBeforeLaoding to true in preShow") {
        frmBrwrClearCanvasBeforeLoading.browser.clearCanvasBeforeLoading = true;
    }
}