function AS_Form_b238c3a4f217445d84a5b0e5220c1509(eventobject) {
    if (frmBrwrUserAgent.lbl.text == "CB-079: set userAgent in preShow") {
        frmBrwrUserAgent.browser.settings = {
            "userAgent": "kiran UA preShow"
        };
    } else if (frmBrwrUserAgent.lbl.text == "CB-082: set null for userAgent") {
        frmBrwrUserAgent.browser.settings = {
            "userAgent": null
        };
    } else if (frmBrwrUserAgent.lbl.text == "CB-083: set object for userAgent") {
        var obj = new Object();
        frmBrwrUserAgent.browser.settings = {
            "userAgent": obj
        };
    }
}