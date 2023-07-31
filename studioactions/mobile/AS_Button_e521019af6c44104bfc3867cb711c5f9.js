function AS_Button_e521019af6c44104bfc3867cb711c5f9(eventobject) {
    frmAnimate.browser.animate(kony.ui.createAnimation({
        0: {
            width: "100%",
            height: "30%",
            "stepConfig": {}
        },
        100: {
            width: "50%",
            height: "60%",
            "stepConfig": {}
        },
    }), {
        delay: .4,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: .6
    }, {
        animationEnd: function() {}
    })
}