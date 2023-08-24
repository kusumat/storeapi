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