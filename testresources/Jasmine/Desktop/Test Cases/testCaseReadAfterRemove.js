it("storeDSLocalAPI/testCaseReadAfterRemove", async function() {
	voltmx.automation.button.click(["Form2","btn"]);
	// :User Injected Code Snippet [// - [2 lines]]
	var abc= kony.ds.read("friends");
	Form2.LabelResult.text = toString(abc);
	// :End User Injected Code Snippet {4d41812a-39f5-bedb-da04-9300d3466a68}
	expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual('[object Undefined]');
});