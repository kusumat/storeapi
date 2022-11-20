it("storeDSLocalAPI/testCaseGetLength", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var mylength = kony.store.length();
	frmLocalStoreAPI.LabelOutput.text = mylength.toString();
	// :End User Injected Code Snippet {4ac90cc9-11a4-4dd9-a5da-4b932ef763b3}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('1');
});