function AS_Button_91bf77ea49c64133b8683d316e367745(eventobject) {
    if (frmBrwrShowProgressIndicator.lbl.text == "CB-088: set showProgressIndicator false dynamically") {
        frmBrwrShowProgressIndicator.browser.showProgressIndicator = false;
        frmBrwrShowProgressIndicator.browser.reload();
    } else if (frmBrwrShowProgressIndicator.lbl.text == "CB-089: set showProgressIndicator true dynamically") {
        frmBrwrShowProgressIndicator.browser.showProgressIndicator = true;
        frmBrwrShowProgressIndicator.browser.reload();
    } else if (frmBrwrShowProgressIndicator.lbl.text == "CB-086: set showProgressIndicator false in postShow") {
        frmBrwrShowProgressIndicator.browser.reload();
    } else if (frmBrwrShowProgressIndicator.lbl.text == "CB-087: set showProgressIndicator true in postShow") {
        frmBrwrShowProgressIndicator.browser.reload();
    }
}