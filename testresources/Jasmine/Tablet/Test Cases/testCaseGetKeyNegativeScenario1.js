it("storeDSLocalAPI/testCaseGetKeyNegativeScenario1", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey4"]);
	voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey4"],"3");
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
	// :User Injected Code Snippet [// - [3 lines]]
	var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
	var keyName = kony.store.key(index);
	frmLocalStoreAPI.LabelOutput.text = keyName;
	// :End User Injected Code Snippet {d1a361c8-f00c-9e6b-51f4-710c7b99d5b9}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(null);
	await voltmx.automation.playback.wait(2000);
});