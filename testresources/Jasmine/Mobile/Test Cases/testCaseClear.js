it("storeDSLocalAPI/testCaseClear", async function() {
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0h1d89c21a9a34b"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","Button0h1d89c21a9a34b"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var mylength = kony.store.length();
	frmLocalStoreAPI.LabelOutput.text = mylength;
	// :End User Injected Code Snippet {243f467b-6170-9cde-ae02-2a5a6b283abf}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(0);
});