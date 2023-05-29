it("storeDSLocalAPI/testCaseReadBeforeSave", async function() {
	voltmx.automation.button.click(["Form2","btn"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = toString(abc);
	// :End User Injected Code Snippet {86c2ddf3-2817-8727-4960-a9f3e855c095}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual('[object Undefined]');
});