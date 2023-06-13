define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxCloseAppInfo **/
    AS_FlexContainer_a792af38ed1140eda671b08d84c19c83: function AS_FlexContainer_a792af38ed1140eda671b08d84c19c83(eventobject) {
        var self = this;
        this.closeAppInfo();
    },
    /** onClick defined for flxImgCapture **/
    AS_FlexContainer_h89fa3b8a05443738036f8b51153e0ea: function AS_FlexContainer_h89fa3b8a05443738036f8b51153e0ea(eventobject) {
        var self = this;
        this.captureScreenshot();
    },
    /** onClick defined for flxInfo **/
    AS_FlexContainer_ebd07132fbcc4ffaa90470b16c484777: function AS_FlexContainer_ebd07132fbcc4ffaa90470b16c484777(eventobject) {
        var self = this;
        this.showAppInfo();
    },
    /** onClick defined for flxGallery **/
    AS_FlexContainer_f3c3964929384e1ca7d6ce759bef9636: function AS_FlexContainer_f3c3964929384e1ca7d6ce759bef9636(eventobject) {
        var self = this;
        this.selectImageFromGallery();
    },
    /** onClick defined for flxBack **/
    AS_FlexContainer_f4592489303f474fb90860fd7ca1c2be: function AS_FlexContainer_f4592489303f474fb90860fd7ca1c2be(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmDashBoard");
        ntf.navigate();
    },
    /** init defined for frmMlCamera **/
    AS_Form_a5ef769a369341bc8abe3de579ed73d7: function AS_Form_a5ef769a369341bc8abe3de579ed73d7(eventobject) {
        var self = this;
        this.onFormInit();
    },
    /** postShow defined for frmMlCamera **/
    AS_Form_ec8331c27f7e4837988842ee82c2f377: function AS_Form_ec8331c27f7e4837988842ee82c2f377(eventobject) {
        var self = this;
        this.onFormPostShow();
    }
});