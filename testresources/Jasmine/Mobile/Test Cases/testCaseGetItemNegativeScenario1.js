it("storeDSLocalAPI/testCaseGetItemNegativeScenario1", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey2"]);
	voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey2"],"key2");
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gb96c8be60be4e"]);
	expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","txtValue2"], "text")).toEqual("");
});