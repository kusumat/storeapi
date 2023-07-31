function AS_Button_928584c5a8664eeebed24ed18efccb8a(eventobject) {
    frmBrwrShowProgressIndicator.destroy();
    frmBrwrShowProgressIndicator.lbl.text = "CB-086: set showProgressIndicator false in postShow";
    frmBrwrShowProgressIndicator.btn.isVisible = true;
    frmBrwrShowProgressIndicator.btn.text = "reload";
    frmBrwrShowProgressIndicator.show();
}