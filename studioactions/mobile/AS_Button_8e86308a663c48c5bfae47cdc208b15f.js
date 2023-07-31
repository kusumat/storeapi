function AS_Button_8e86308a663c48c5bfae47cdc208b15f(eventobject) {
    frmBrwrShowProgressIndicator.destroy();
    frmBrwrShowProgressIndicator.lbl.text = "CB-087: set showProgressIndicator true in postShow";
    frmBrwrShowProgressIndicator.btn.isVisible = true;
    frmBrwrShowProgressIndicator.btn.text = "reload";
    frmBrwrShowProgressIndicator.show();
}