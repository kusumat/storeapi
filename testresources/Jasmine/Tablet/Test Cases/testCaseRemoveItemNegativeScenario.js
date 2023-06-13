it("storeDSLocalAPI/testCaseRemoveItemNegativeScenario", async function() {
	await voltmx.automation.playback.wait(1000);
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0gc3081eb4adb47"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gc3081eb4adb47"]);
});