it("storeDSLocalAPI/testCaseBackToHome", async function() {
	await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0eb5d24fd2a0d40"]);
	voltmx.automation.button.click(["frmLocalStoreAPI","Button0eb5d24fd2a0d40"]);
});