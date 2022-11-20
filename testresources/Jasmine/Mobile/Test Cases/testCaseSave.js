it("storeDSLocalAPI/testCaseSave", async function() {
	await voltmx.automation.playback.waitFor(["Form2","btnsave"]);
	voltmx.automation.button.click(["Form2","btnsave"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = abc;
	// :End User Injected Code Snippet {16977e06-35f0-2f91-3f90-64af3ccf651e}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(["John","Joe","Jack"]);
});