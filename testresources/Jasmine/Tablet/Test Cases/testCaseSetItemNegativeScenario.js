it("storeDSLocalAPI/testCaseSetItemNegativeScenario", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0d14f334d265d41"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","Button0d14f334d265d41"]);
	// :User Injected Code Snippet [// - [2 lines]]
	 var key = kony.store.getItem("key1");
	 frmLocalStoreAPI.LabelOutput.text = key;
	// :End User Injected Code Snippet {2aaeb80c-097c-b7c9-ec5d-10aca83f4efc}
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(null);
});