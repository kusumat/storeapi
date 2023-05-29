it("storeDSLocalAPI/testCaseSetItem", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey1"]);
	voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey1"],"key1");
	voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtValue1"],"10");
	voltmx.automation.button.click(["frmLocalStoreAPI","Button0d14f334d265d41"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var key = kony.store.getItem("key1");
	frmLocalStoreAPI.LabelOutput.text = key;
	// :End User Injected Code Snippet {2a3eedb7-a5cc-2381-4e7c-213dbefc59e3}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual("10");
});