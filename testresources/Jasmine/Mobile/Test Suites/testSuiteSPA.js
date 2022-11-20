define([], function() {
	describe("storeDSLocalAPI/Test Suites/testSuiteSPA", function() {
		it("storeDSLocalAPI/testCaseLoadLocalStoreAPI", async function() {
			await voltmx.automation.playback.waitFor(["Form1","Button0ff527fee83e045"]);
			voltmx.automation.button.click(["Form1","Button0ff527fee83e045"]);
		});
		
		it("storeDSLocalAPI/testCaseClear", async function() {
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0h1d89c21a9a34b"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","Button0h1d89c21a9a34b"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var mylength = kony.store.length();
			frmLocalStoreAPI.LabelOutput.text = mylength;
			// :End User Injected Code Snippet {243f467b-6170-9cde-ae02-2a5a6b283abf}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(0);
		});
		
		it("storeDSLocalAPI/testCaseSetItemNegativeScenario", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0d14f334d265d41"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","Button0d14f334d265d41"]);
			// :User Injected Code Snippet [// - [2 lines]]
			 var key = kony.store.getItem("key1");
			 frmLocalStoreAPI.LabelOutput.text = key;
			// :End User Injected Code Snippet {2aaeb80c-097c-b7c9-ec5d-10aca83f4efc}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(null);
		});
		
		it("storeDSLocalAPI/testCaseSetItem", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey1"]);
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey1"],"key1");
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtValue1"],"10");
			voltmx.automation.button.click(["frmLocalStoreAPI","Button0d14f334d265d41"]);
			// :User Injected Code Snippet [// - [2 lines]]
			 var key = kony.store.getItem("key1");
			 frmLocalStoreAPI.LabelOutput.text = key;
			// :End User Injected Code Snippet {bf4bc738-70bc-8f66-d755-7bf203e2de78}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual("10");
		});
		
		it("storeDSLocalAPI/testCaseGetItemNegativeScenario", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0gb96c8be60be4e"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gb96c8be60be4e"]);
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","txtValue2"], "text")).toEqual("");
		});
		
		it("storeDSLocalAPI/testCaseGetItemNegativeScenario1", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey2"]);
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey2"],"key2");
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gb96c8be60be4e"]);
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","txtValue2"], "text")).toEqual("");
		});
		
		it("storeDSLocalAPI/testCaseGetItem", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey2"]);
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey2"],"key1");
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gb96c8be60be4e"]);
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","txtValue2"], "text")).toEqual("10");
		});
		
		it("storeDSLocalAPI/testCaseGetKeyNegativeScenario", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
			// :User Injected Code Snippet [// - [3 lines]]
			var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
			var keyName = kony.store.key(index);
			frmLocalStoreAPI.LabelOutput.text = keyName;
			// :End User Injected Code Snippet {8da26bd5-3c9e-5dc4-62f5-2cff9469a856}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(null);
		});
		
		it("storeDSLocalAPI/testCaseGetKeyNegativeScenario1", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey4"]);
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey4"],"3");
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
			// :User Injected Code Snippet [// - [3 lines]]
			var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
			var keyName = kony.store.key(index);
			frmLocalStoreAPI.LabelOutput.text = keyName;
			// :End User Injected Code Snippet {d1a361c8-f00c-9e6b-51f4-710c7b99d5b9}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(null);
			await voltmx.automation.playback.wait(2000);
		});
		
		it("storeDSLocalAPI/testCaseGetKey", async function() {
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey4"],"0");
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
			// :User Injected Code Snippet [// - [3 lines]]
			var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
			var keyName = kony.store.key(index);
			frmLocalStoreAPI.LabelOutput.text = keyName;
			// :End User Injected Code Snippet {140c1ce5-64c0-071c-ff2c-1e4823a270b4}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual("key1");
		});
		
		it("storeDSLocalAPI/testCaseGetLength", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var mylength = kony.store.length();
			frmLocalStoreAPI.LabelOutput.text = mylength;
			// :End User Injected Code Snippet {c2dd98d2-289b-629e-18dd-02c2fc369dae}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(1);
		});
		
		it("storeDSLocalAPI/testCaseRemoveItemNegativeScenario", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0gc3081eb4adb47"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gc3081eb4adb47"]);
		});
		
		it("storeDSLocalAPI/testCaseRemoveItemNegativeScenario1", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey3"]);
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey3"],"key2");
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gc3081eb4adb47"]);
		});
		
		it("storeDSLocalAPI/testCaseRemoveItem", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey3"]);
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey3"],"key1");
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gc3081eb4adb47"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var key = kony.store.getItem("key1");
			frmLocalStoreAPI.LabelOutput.text = key;
			// :End User Injected Code Snippet {d43d61ef-0b1e-823c-75fa-b074c87f602e}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(null);
		});
		
		it("storeDSLocalAPI/testCaseLengthAfterRemoveItem", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var mylength = kony.store.length();
			frmLocalStoreAPI.LabelOutput.text = mylength;
			// :End User Injected Code Snippet {2acc99bd-dd08-4a45-41ad-bdd37b6f21c2}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual(0);
		});
		
		it("storeDSLocalAPI/testCaseBackToHome", async function() {
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0eb5d24fd2a0d40"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","Button0eb5d24fd2a0d40"]);
		});
		
		it("storeDSLocalAPI/testCaseRSR", async function() {
			await voltmx.automation.playback.waitFor(["Form1","Button0aeb7d2c3e78c4b"]);
			voltmx.automation.button.click(["Form1","Button0aeb7d2c3e78c4b"]);
		});
		
		it("storeDSLocalAPI/testCaseReadBeforeSave", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["Form2","btn"]);
			voltmx.automation.button.click(["Form2","btn"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = abc;
			// :End User Injected Code Snippet {4409d68f-56dd-6a50-208b-a2bc937144fd}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(null);
		});
		
		it("storeDSLocalAPI/testCaseSave", async function() {
			await voltmx.automation.playback.waitFor(["Form2","btnsave"]);
			voltmx.automation.button.click(["Form2","btnsave"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = abc;
			// :End User Injected Code Snippet {16977e06-35f0-2f91-3f90-64af3ccf651e}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(["John","Joe","Jack"]);
		});
		
		it("storeDSLocalAPI/testCaseRead", async function() {
			await voltmx.automation.playback.waitFor(["Form2","btn"]);
			voltmx.automation.button.click(["Form2","btn"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = abc;
			// :End User Injected Code Snippet {0464d6bb-fc9a-ee46-ed56-4473061dfd66}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(["John","Joe","Jack"]);
		});
		
		it("storeDSLocalAPI/testCaseRemove", async function() {
			await voltmx.automation.playback.waitFor(["Form2","Button0e7b511b66fb847"]);
			voltmx.automation.button.click(["Form2","Button0e7b511b66fb847"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = abc;
			// :End User Injected Code Snippet {2e97f3a9-cac7-ec81-2380-f107728f7e41}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(null);
		});
		
		it("storeDSLocalAPI/testCaseReadAfterRemove", async function() {
			await voltmx.automation.playback.waitFor(["Form2","btn"]);
			voltmx.automation.button.click(["Form2","btn"]);
			// :User Injected Code Snippet [// - [3 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = abc;
			
			// :End User Injected Code Snippet {430432ac-f973-0142-cb26-855746b64953}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual(null);
		});
	});
});