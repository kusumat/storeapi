it("storeDSLocalAPI/testCaseLoadLocalStoreAPI", async function() {
	await voltmx.automation.playback.waitFor(["Form1","Button0ff527fee83e045"]);
	voltmx.automation.button.click(["Form1","Button0ff527fee83e045"]);
});