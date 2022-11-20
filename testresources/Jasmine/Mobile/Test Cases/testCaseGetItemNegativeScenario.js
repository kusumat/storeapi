it("storeDSLocalAPI/testCaseGetItemNegativeScenario", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0gb96c8be60be4e"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gb96c8be60be4e"]);
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","txtValue2"], "text")).toEqual("");
});