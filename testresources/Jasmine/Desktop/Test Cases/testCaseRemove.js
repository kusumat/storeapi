it("storeDSLocalAPI/testCaseRemove", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["Form2","Button0e7b511b66fb847"]);
	voltmx.automation.button.click(["Form2","Button0e7b511b66fb847"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = toString(abc);
	// :End User Injected Code Snippet {505fc4dd-14fb-807f-0662-79ec8deae7a4}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual('[object Undefined]');
});