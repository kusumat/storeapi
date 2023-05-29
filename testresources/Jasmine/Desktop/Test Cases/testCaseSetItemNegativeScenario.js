it("storeDSLocalAPI/testCaseSetItemNegativeScenario", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0d14f334d265d41"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","Button0d14f334d265d41"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var key = kony.store.getItem("key1");
	frmLocalStoreAPI.LabelOutput.text = toString(key);
	// :End User Injected Code Snippet {df528f2c-c54b-fe58-17bc-834188540ad8}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('[object Undefined]');
});