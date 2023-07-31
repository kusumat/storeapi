function AS_Button_f54d6c6dff9a4a6f8888fa5c384d6ac6(eventobject) {
    if (frmBrwrClearCanvasBeforeLoading.lbl.text == "CB-101: clearCanvasBeforeLoading to true  dynamically") {
        frmBrwrClearCanvasBeforeLoading.browser.clearCanvasBeforeLoading = true;
    }
    frmBrwrClearCanvasBeforeLoading.browser.reload();
}