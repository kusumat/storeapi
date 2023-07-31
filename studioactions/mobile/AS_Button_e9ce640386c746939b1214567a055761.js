function AS_Button_e9ce640386c746939b1214567a055761(eventobject) {
    frmBrwrShowProgressIndicator.destroy();
    frmBrwrShowProgressIndicator.lbl.text = "CB-086: set showProgressIndicator false in postShow";
    frmBrwrShowProgressIndicator.btn.isVisible = true;
    frmBrwrShowProgressIndicator.btn.text = "reload";
    frmBrwrShowProgressIndicator.show();
}