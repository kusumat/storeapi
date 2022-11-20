it("testCaseBackToHome", async function() {
	await kony.automation.playback.waitFor(["frmLocalStoreAPI","Button0eb5d24fd2a0d40"]);
	kony.automation.button.click(["frmLocalStoreAPI","Button0eb5d24fd2a0d40"]);
});