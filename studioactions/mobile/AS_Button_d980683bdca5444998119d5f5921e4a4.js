function AS_Button_d980683bdca5444998119d5f5921e4a4(eventobject) {
    if (frmBrwrZoomDensity.lbl.text == "CB-093: set zoomDensity to MEDIUM in postShow") {
        frmBrwrZoomDensity.browser.zoomDensity = 1;
        frmBrwrZoomDensity.browser.reload();
    } else if (frmBrwrZoomDensity.lbl.text == "CB-094: set zoomDensity to CLOSE dynamically") {
        frmBrwrZoomDensity.browser.zoomDensity = 2;
        frmBrwrZoomDensity.browser.reload();
    }
}