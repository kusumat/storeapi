function AS_FlexContainer_if6f0262583641c3ad7715e3eb92328e(eventobject) {
    function MOVE_ACTION____c2b09502a04e4bbbaf907b83a837056b_Callback() {}
    self.view.hamburgerMenu.animate(kony.ui.createAnimation({
        "100": {
            "centerX": "80%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "duration": 0.25,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "iterationCount": 1
    }, {
        "animationEnd": MOVE_ACTION____c2b09502a04e4bbbaf907b83a837056b_Callback
    });
}