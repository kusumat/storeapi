it("ShoppingPOC/TestLogin", async function() {
	await voltmx.automation.playback.waitFor(["frmLogin","Login","tbxUsername"]);
	voltmx.automation.textbox.enterText(["frmLogin","Login","tbxUsername"],"suresh.jallipalli@hcl.com");
	voltmx.automation.textbox.enterText(["frmLogin","Login","tbxPassword"],"voltMX@1234");
	voltmx.automation.button.click(["frmLogin","Login","btnLogin"]);
	await voltmx.automation.playback.wait(1000);
});