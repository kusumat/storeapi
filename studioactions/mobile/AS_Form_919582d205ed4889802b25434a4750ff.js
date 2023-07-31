function AS_Form_919582d205ed4889802b25434a4750ff(eventobject) {
    frmBrwrShowProgressIndicator.browser.requestURLConfig = {
        "URL": "https://www.google.co.in",
        "requestMethod": constants.BROWSER_REQUEST_METHOD_GET
    }
    if (frmBrwrShowProgressIndicator.lbl.text == "CB-084: set showProgressIndicator false in preShow") {
        frmBrwrShowProgressIndicator.browser.showProgressIndicator = false;
    } else if (frmBrwrShowProgressIndicator.lbl.text == "CB-085: set showProgressIndicator true in preShow") {
        frmBrwrShowProgressIndicator.browser.showProgressIndicator = true;
    } else if (frmBrwrShowProgressIndicator.lbl.text == "CB-090: set null to showProgressIndicator") {
        frmBrwrShowProgressIndicator.browser.showProgressIndicator = null;
    } else if (frmBrwrShowProgressIndicator.lbl.text == "CB-091: set object to  showProgressIndicator ") {
        var object = new Object();
        frmBrwrShowProgressIndicator.browser.showProgressIndicator = object;
    }
}