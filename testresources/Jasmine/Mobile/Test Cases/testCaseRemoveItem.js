it("storeDSLocalAPI/testCaseRemoveItem", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey3"]);
	voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey3"],"key1");
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gc3081eb4adb47"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var key = kony.store.getItem("key1");
	frmLocalStoreAPI.LabelOutput.text = key;
	// :End User Injected Code Snippet {d43d61ef-0b1e-823c-75fa-b074c87f602e}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(null);
});