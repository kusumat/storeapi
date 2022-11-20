it("storeDSLocalAPI/testCaseSave", async function() {
	await voltmx.automation.playback.waitFor(["Form2","btnsave"]);
	voltmx.automation.button.click(["Form2","btnsave"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = abc.toString();
	// :End User Injected Code Snippet {71d14c67-b33a-c5bf-4a32-abd0e6082647}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual("John,Joe,Jack");
});