define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxBack **/
    AS_FlexContainer_d32d7eb2d9464ffcbd9546ba490244cb: function AS_FlexContainer_d32d7eb2d9464ffcbd9546ba490244cb(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmDashBoard");
        ntf.navigate();
    },
    /** onClick defined for btnReset **/
    AS_Button_b1caab9fedae454e96e9294ae1d57137: function AS_Button_b1caab9fedae454e96e9294ae1d57137(eventobject) {
        var self = this;
        this.setCroppingLayout();
    },
    /** onClick defined for btnSave **/
    AS_Button_gd84452706df4c67890885c799811414: function AS_Button_gd84452706df4c67890885c799811414(eventobject) {
        var self = this;
        this.cropImageAndProceed();
    },
    /** onTouchMove defined for flxCropperRoot **/
    AS_FlexContainer_da6a15f9fff54e40a7263dad9c010fa0: function AS_FlexContainer_da6a15f9fff54e40a7263dad9c010fa0(eventobject, x, y) {
        var self = this;
        return self.redrawSelectorRegion.call(this, eventobject, x, y);
    },
    /** onClick defined for flxCrop **/
    AS_FlexContainer_h388cfdb73c84c82a9a7dcfcab6e767e: function AS_FlexContainer_h388cfdb73c84c82a9a7dcfcab6e767e(eventobject) {
        var self = this;
        return self.enableCropping.call(this);
    },
    /** onClick defined for flxProceed **/
    AS_FlexContainer_c7fabf2058de49c5830ec0f1a66b44fd: function AS_FlexContainer_c7fabf2058de49c5830ec0f1a66b44fd(eventobject) {
        var self = this;
        this.processImage();
    },
    /** onClick defined for flxCamera **/
    AS_FlexContainer_ea0f37d7b3b44f46b36480b6416c5499: function AS_FlexContainer_ea0f37d7b3b44f46b36480b6416c5499(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMlCamera");
        ntf.navigate();
    },
    /** onClick defined for flxGallery **/
    AS_FlexContainer_i8c3a59ba521442c9bf256e9aa72e3c5: function AS_FlexContainer_i8c3a59ba521442c9bf256e9aa72e3c5(eventobject) {
        var self = this;
        this.selectImageFromGallery();
    },
    /** onClick defined for flxCapture **/
    AS_FlexContainer_i871a52c8f234775a5dc7a510d0135fd: function AS_FlexContainer_i871a52c8f234775a5dc7a510d0135fd(eventobject) {
        var self = this;
        this.captureScreenshot();
    },
    /** init defined for frmImageSelected **/
    AS_Form_b2aa650087db4a4888b6f6b035a53b4a: function AS_Form_b2aa650087db4a4888b6f6b035a53b4a(eventobject) {
        var self = this;
        this.onFormInit();
    },
    /** postShow defined for frmImageSelected **/
    AS_Form_c9958d7be477480fb43c6988f6ef2d06: function AS_Form_c9958d7be477480fb43c6988f6ef2d06(eventobject) {
        var self = this;
        return self.onFormPostShow.call(this);
    }
});