define([], function() {
	describe("ShoppingPOC/Test Suites/SampleSuite", function() {
		it("LoginFlow", async function() {
		  await voltmx.automation.playback.waitFor(["frmLogin","Login","tbxUsername"]);
		  voltmx.automation.textbox.enterText(["frmLogin","Login","tbxUsername"],"suresh.jallipalli@hcl.com");
		  voltmx.automation.textbox.enterText(["frmLogin","Login","tbxPassword"],"voltMX@1234");
		  voltmx.automation.button.click(["frmLogin","Login","btnLogin"]);
		  await voltmx.automation.playback.wait(1000);
		  await voltmx.automation.playback.waitFor(["frmShoppingList","ShoppingList","segShoppingList"]);
		});
		
		it("ForwardFlow", async function() {
		  await voltmx.automation.playback.waitFor(["frmShoppingList","ShoppingList","segShoppingList"]);
		  await voltmx.automation.playback.wait(1000);
		  voltmx.automation.segmentedui.click(["frmShoppingList","ShoppingList","segShoppingList[0,0]"]);
		  await voltmx.automation.playback.wait(1000);
		  await voltmx.automation.playback.waitFor(["frmCreateOrder","CreateOrder","segOrderList"]);
		  await voltmx.automation.playback.wait(1000);
		  voltmx.automation.segmentedui.click(["frmCreateOrder","CreateOrder","segOrderList[0,0]"]);
		  await voltmx.automation.playback.wait(1000);
		  await voltmx.automation.playback.waitFor(["frmProductDetails","MobProductDetail","segProductInformation"]);
		  await voltmx.automation.playback.wait(1000);
		  voltmx.automation.segmentedui.click(["frmProductDetails","MobProductDetail","segProductInformation[0,0]"]);
		  await voltmx.automation.playback.wait(1000);
		  await voltmx.automation.playback.waitFor(["frmProductDescription","productDescription","rchTxtProductDescrption"]);
		});
		
		it("BackFlow", async function() {
		  await voltmx.automation.playback.waitFor(["frmProductDescription","MobileHeader","imgMenuPrevious"]);
		  await voltmx.automation.playback.wait(1000);
		  voltmx.automation.widget.touch(["frmProductDescription","MobileHeader","imgMenuPrevious"], null,null,[9,15]);
		  await voltmx.automation.playback.wait(1000);
		  await voltmx.automation.playback.waitFor(["frmProductDetails","MobileHeader","imgMenuPrevious"]);
		  await voltmx.automation.playback.wait(1000);
		  voltmx.automation.widget.touch(["frmProductDetails","MobileHeader","imgMenuPrevious"], null,null,[9,15]);
		  await voltmx.automation.playback.wait(1000);
		  await voltmx.automation.playback.waitFor(["frmCreateOrder","MobileHeader","imgMenuPrevious"]);
		  await voltmx.automation.playback.wait(1000);
		  voltmx.automation.widget.touch(["frmCreateOrder","MobileHeader","imgMenuPrevious"], null,null,[9,15]);
		  await voltmx.automation.playback.wait(1000);
		  await voltmx.automation.playback.waitFor(["frmShoppingList","ShoppingList","segShoppingList"]);
		});
	});
});