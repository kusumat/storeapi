define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** verificationCallback defined for recaptcha **/
    AS_UWI_cdbb4b480dbf49ffab31d82642737255: function AS_UWI_cdbb4b480dbf49ffab31d82642737255(result) {
        var self = this;
        return self.verificationCallback.call(this, result);
    },
    /** errorCallback defined for recaptcha **/
    AS_UWI_h86112f5aaa5437ba081bfc015d44e95: function AS_UWI_h86112f5aaa5437ba081bfc015d44e95(error) {
        var self = this;
        return self.errorCallback.call(this, error);
    }
});