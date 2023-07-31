function AS_Form_3018647490bc48969149825aabb50b43(eventobject) {
    if (frmBrwrZoomDensity.lbl.text == "CB-092: set zoomDensity to FAR in preShow") {
        frmBrwrZoomDensity.browser.zoomDensity = 0;
    } else if (frmBrwrZoomDensity.lbl.text == "CB-095: set null to zoomDensity") {
        frmBrwrZoomDensity.browser.zoomDensity = null;
    } else if (frmBrwrZoomDensity.lbl.text == "CB-096: set object to zoomDensity") {
        try {
            var object = new Object();
            frmBrwrZoomDensity.browser.zoomDensity = object;
        } catch (e) {
            alert(e)
        }
    }
}