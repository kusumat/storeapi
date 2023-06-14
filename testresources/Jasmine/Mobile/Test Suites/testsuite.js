define(["SampleManju/Test Cases/TestName_data"], function() {
	describe("SampleManju/Test Suites/testsuite", function() {
		it("SampleManju/TestName", async function() {
			var _data = testcaseData_1686725986039.dataset;
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["Form1","Button0d60ae207feee44"]);
			voltmx.automation.button.click(["Form1","Button0d60ae207feee44"]);
		});
	});
});