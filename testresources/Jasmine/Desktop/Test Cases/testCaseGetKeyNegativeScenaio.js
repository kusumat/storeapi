it("storeDSLocalAPI/testCaseGetKeyNegativeScenaio", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
	// :User Injected Code Snippet [// - [3 lines]]
	var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
	var keyName = kony.store.key(index);
	frmLocalStoreAPI.LabelOutput.text =toString(keyName);
	// :End User Injected Code Snippet {bff34069-9598-582a-fdc1-466f5d9714a5}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('[object Undefined]');
});