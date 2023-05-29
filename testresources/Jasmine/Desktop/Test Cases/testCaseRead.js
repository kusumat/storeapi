it("storeDSLocalAPI/testCaseRead", async function() {
	await voltmx.automation.playback.waitFor(["Form2","btn"]);
	voltmx.automation.button.click(["Form2","btn"]);
	// :User Injected Code Snippet [// - [3 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = abc.toString();
	
	// :End User Injected Code Snippet {2feb485e-ab40-8b74-52c9-2cce777125e2}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual("John,Joe,Jack");
});