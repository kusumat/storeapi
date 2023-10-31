define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnRegisterNowMobile **/
    AS_Button_a1ee299acd2847e0bd5a3310d03f88bb: function AS_Button_a1ee299acd2847e0bd5a3310d03f88bb(eventobject) {
        var self = this;
        kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/index.jsp");
    },
    /** onClick defined for btnLogin **/
    AS_Button_f0051ee2bb03484691f7d57f0ad6fe77: function AS_Button_f0051ee2bb03484691f7d57f0ad6fe77(eventobject) {
        var self = this;
        var x = new kony.mvc.Navigation('frmLogin');
        x.navigate();
    },
    /** onClick defined for btnRegisterNow **/
    AS_Button_g3e60622a5644a61af37b5b0d9227b6b: function AS_Button_g3e60622a5644a61af37b5b0d9227b6b(eventobject) {
        var self = this;
        kony.application.openURL("https://ssp.benefits.ohio.gov/apspssp/index.jsp");
    },
    /** onClick defined for btnBack **/
    AS_Button_gf190f7089594ba4b1e9c0a583b606e2: function AS_Button_gf190f7089594ba4b1e9c0a583b606e2(eventobject) {
        var self = this;
        var x = new kony.mvc.Navigation('frmHomeScreen');
        x.navigate();
    },
    /** onClick defined for btnContinue **/
    AS_Button_i9718c188e4c4814b35b5ac5b8382f9f: function AS_Button_i9718c188e4c4814b35b5ac5b8382f9f(eventobject) {
        var self = this;
        var x = new kony.mvc.Navigation('frmRequestHearingPrelogin');
        x.navigate();
    },
    /** onClick defined for btnContinueMobile **/
    AS_Button_jc82a6e1a5c3439593ab516bf125bc47: function AS_Button_jc82a6e1a5c3439593ab516bf125bc47(eventobject) {
        var self = this;
        var x = new kony.mvc.Navigation('frmRequestHearingPrelogin');
        x.navigate();
    }
});