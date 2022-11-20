it("storeDSLocalAPI/testCaseClear", async function() {
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0h1d89c21a9a34b"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","Button0h1d89c21a9a34b"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var mylength = kony.store.length();
	frmLocalStoreAPI.LabelOutput.text = mylength.toString();
	// :End User Injected Code Snippet {03a46981-dfe7-f161-b31e-12d5e85cd1ad}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('0');
});