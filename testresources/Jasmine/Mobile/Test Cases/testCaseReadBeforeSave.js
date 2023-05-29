it("storeDSLocalAPI/testCaseReadBeforeSave", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["Form2","btn"]);
	voltmx.automation.button.click(["Form2","btn"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = abc;
	// :End User Injected Code Snippet {4409d68f-56dd-6a50-208b-a2bc937144fd}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(null);
});