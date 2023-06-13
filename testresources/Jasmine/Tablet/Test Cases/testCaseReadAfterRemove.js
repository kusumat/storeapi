it("storeDSLocalAPI/testCaseReadAfterRemove", async function() {
	await voltmx.automation.playback.waitFor(["Form2","btn"]);
	voltmx.automation.button.click(["Form2","btn"]);
	// :User Injected Code Snippet [// - [3 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = abc;
	
	// :End User Injected Code Snippet {430432ac-f973-0142-cb26-855746b64953}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(null);
});