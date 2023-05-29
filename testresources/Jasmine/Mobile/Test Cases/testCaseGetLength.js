it("storeDSLocalAPI/testCaseGetLength", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var mylength = kony.store.length();
	frmLocalStoreAPI.LabelOutput.text = mylength;
	// :End User Injected Code Snippet {c2dd98d2-289b-629e-18dd-02c2fc369dae}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(1);
});