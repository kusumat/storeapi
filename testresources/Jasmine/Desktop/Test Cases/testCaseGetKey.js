it("storeDSLocalAPI/testCaseGetKey", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey4"]);
	voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey4"],"0");
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
	// :User Injected Code Snippet [// - [3 lines]]
	var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
	var keyName = kony.store.key(index);
	frmLocalStoreAPI.LabelOutput.text = keyName;
	// :End User Injected Code Snippet {d26e0a7c-574a-1341-2cd2-9e77da644db1}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual("key1");
});