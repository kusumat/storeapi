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