function AS_Button_i8f3481c38f8441f9c0c3014e74094f5(eventobject) {
    kony.ds.save(["John", "Joe", "Jack"], "friends", {
            dsmode: "session"
        })
        //alert("Saved an array of friends into ds")
    Form2.lblResult.text = "Saved an array of friends into ds";
}