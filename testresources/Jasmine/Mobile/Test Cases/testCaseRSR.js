it("storeDSLocalAPI/testCaseRSR", async function() {
	await voltmx.automation.playback.waitFor(["Form1","Button0aeb7d2c3e78c4b"]);
	voltmx.automation.button.click(["Form1","Button0aeb7d2c3e78c4b"]);
});