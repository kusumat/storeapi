it("storeDSLocalAPI/testCaseRead", async function() {
	await voltmx.automation.playback.waitFor(["Form2","btn"]);
	voltmx.automation.button.click(["Form2","btn"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = abc;
	// :End User Injected Code Snippet {0464d6bb-fc9a-ee46-ed56-4473061dfd66}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(["John","Joe","Jack"]);
});