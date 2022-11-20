it("storeDSLocalAPI/testCaseGetKeyNegativeScenario1", async function() {
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey4"]);
	voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey4"],"3");
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
	// :User Injected Code Snippet [// - [3 lines]]
	var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
	var keyName = kony.store.key(index);
	frmLocalStoreAPI.LabelOutput.text = toString(keyName);
	// :End User Injected Code Snippet {a7865e7e-600f-3ddd-3728-52b84fded753}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('[object Undefined]');
});