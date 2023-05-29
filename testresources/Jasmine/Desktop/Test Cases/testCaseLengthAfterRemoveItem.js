it("storeDSLocalAPI/testCaseLengthAfterRemoveItem", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var mylength = kony.store.length();
	frmLocalStoreAPI.LabelOutput.text = mylength.toString();
	// :End User Injected Code Snippet {cfe60b0a-02b5-e8a4-bf89-cfdf7cda5504}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('0');
});