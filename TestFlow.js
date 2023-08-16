it("TestFlow", async function() {
	await voltmx.automation.playback.waitFor(["frmLogin","Login","tbxUsername"]);
	voltmx.automation.textbox.enterText(["frmLogin","Login","tbxUsername"],"suresh.jallipalli@hcl.com");
	voltmx.automation.textbox.enterText(["frmLogin","Login","tbxPassword"],"voltMX@1234");
	voltmx.automation.button.click(["frmLogin","Login","btnLogin"]);
	await voltmx.automation.playback.waitFor(["frmShoppingList","ShoppingList","segShoppingList"]);
	voltmx.automation.segmentedui.click(["frmShoppingList","ShoppingList","segShoppingList[0,0]"]);
	await voltmx.automation.playback.waitFor(["frmCreateOrder","CreateOrder","segOrderList"]);
	voltmx.automation.segmentedui.click(["frmCreateOrder","CreateOrder","segOrderList[0,0]"]);
	await voltmx.automation.playback.waitFor(["frmProductDetails","MobProductDetail","btnMobAddOrder"]);
	voltmx.automation.button.click(["frmProductDetails","MobProductDetail","btnMobAddOrder"]);
	voltmx.automation.widget.touch(["frmProductDetails","MobileHeader","imgMore"], null,null,[3,24]);
	voltmx.automation.widget.touch(["frmProductDetails","MobileHeader","imgMenuPrevious"], null,null,[13,16]);
	await voltmx.automation.playback.waitFor(["frmCreateOrder","MobileHeader","imgMore"]);
	voltmx.automation.widget.touch(["frmCreateOrder","MobileHeader","imgMore"], null,null,[9,24]);
	await voltmx.automation.playback.waitFor(["frmCreateOrder","Search","lblClose"]);
	voltmx.automation.widget.touch(["frmCreateOrder","CreateOrder","Search","lblClose"], null,null,[9,8]);
	voltmx.automation.widget.touch(["frmCreateOrder","MobileHeader","imgMenuPrevious"], null,null,[14,13]);
});