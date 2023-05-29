it("storeDSLocalAPI/testCaseRemoveItem", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey3"]);
	voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey3"],"key1");
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gc3081eb4adb47"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var key = kony.store.getItem("key1");
	frmLocalStoreAPI.LabelOutput.text = toString(key);
	// :End User Injected Code Snippet {57688ec8-5297-6fe6-a406-f9c9d415ef1b}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('[object Undefined]');
});