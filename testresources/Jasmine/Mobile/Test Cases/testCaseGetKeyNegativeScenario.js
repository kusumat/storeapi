it("storeDSLocalAPI/testCaseGetKeyNegativeScenario", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
	// :User Injected Code Snippet [// - [3 lines]]
	var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
	var keyName = kony.store.key(index);
	frmLocalStoreAPI.LabelOutput.text = keyName;
	// :End User Injected Code Snippet {8da26bd5-3c9e-5dc4-62f5-2cff9469a856}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(null);
});