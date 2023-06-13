define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxCameraRoot **/
    AS_FlexContainer_bf6b49e81b844b06bc3a0c3f08bb5094: function AS_FlexContainer_bf6b49e81b844b06bc3a0c3f08bb5094(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMlCamera");
        ntf.navigate();
    },
    /** onClick defined for flxGalleryRoot **/
    AS_FlexContainer_bdc82f2042a7474bb791718b6c495b61: function AS_FlexContainer_bdc82f2042a7474bb791718b6c495b61(eventobject) {
        var self = this;
        return self.selectImageFromGallery.call(this);
    },
    /** postShow defined for frmDashBoard **/
    AS_Form_hd0b5ee69ac6476789360994679ceee8: function AS_Form_hd0b5ee69ac6476789360994679ceee8(eventobject) {
        var self = this;
        return self.onFormPostshow.call(this);
    },
    /** onDeviceBack defined for frmDashBoard **/
    ACTION_SEQUENCE_AS_e6056f2506d84db4ab8868b21c86e6d6: function ACTION_SEQUENCE_AS_e6056f2506d84db4ab8868b21c86e6d6(eventobject) {
        var self = this;
        kony.application.exit();
    }
});