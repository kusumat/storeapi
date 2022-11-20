function AS_Button_d3fa31cfd8f542c3b3b4754bc58c21fc(eventobject) {
    kony.ds.save(["John", "Joe", "Jack"], "friends", {
        dsmode: "session"
    });
    //alert("Saved an array of friends into ds");
    Form2.lblResult.text = "Saved an array of friends into ds";
}