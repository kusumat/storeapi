it("storeDSLocalAPI/testCaseGetKey", async function() {
	voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey4"],"0");
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
	// :User Injected Code Snippet [// - [3 lines]]
	var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
	var keyName = kony.store.key(index);
	frmLocalStoreAPI.LabelOutput.text = keyName;
	// :End User Injected Code Snippet {140c1ce5-64c0-071c-ff2c-1e4823a270b4}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual("key1");
});