it("storeDSLocalAPI/testCaseRemove", async function() {
	await voltmx.automation.playback.waitFor(["Form2","Button0e7b511b66fb847"]);
	voltmx.automation.button.click(["Form2","Button0e7b511b66fb847"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = abc;
	// :End User Injected Code Snippet {2e97f3a9-cac7-ec81-2380-f107728f7e41}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(null);
});