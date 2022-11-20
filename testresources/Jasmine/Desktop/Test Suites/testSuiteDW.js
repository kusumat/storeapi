define([], function() {
	describe("storeDSLocalAPI/Test Suites/testSuiteDW", function() {
		it("storeDSLocalAPI/testCaseLoadLocalStoreAPI", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["Form1","Button0ff527fee83e045"]);
			voltmx.automation.button.click(["Form1","Button0ff527fee83e045"]);
		});
		
		it("storeDSLocalAPI/testCaseClear", async function() {
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0h1d89c21a9a34b"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","Button0h1d89c21a9a34b"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var mylength = kony.store.length();
			frmLocalStoreAPI.LabelOutput.text = mylength.toString();
			// :End User Injected Code Snippet {03a46981-dfe7-f161-b31e-12d5e85cd1ad}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('0');
		});
		
		it("storeDSLocalAPI/testCaseSetItemNegativeScenario", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","Button0d14f334d265d41"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","Button0d14f334d265d41"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var key = kony.store.getItem("key1");
			frmLocalStoreAPI.LabelOutput.text = toString(key);
			// :End User Injected Code Snippet {df528f2c-c54b-fe58-17bc-834188540ad8}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('[object Undefined]');
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
			// :End User Injected Code Snippet {2a3eedb7-a5cc-2381-4e7c-213dbefc59e3}
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
		
		it("storeDSLocalAPI/testCaseGetKeyNegativeScenaio", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
			// :User Injected Code Snippet [// - [3 lines]]
			var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
			var keyName = kony.store.key(index);
			frmLocalStoreAPI.LabelOutput.text =toString(keyName);
			// :End User Injected Code Snippet {bff34069-9598-582a-fdc1-466f5d9714a5}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('[object Undefined]');
		});
		
		it("storeDSLocalAPI/testCaseGetKeyNegativeScenario1", async function() {
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey4"]);
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey4"],"3");
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
			// :User Injected Code Snippet [// - [3 lines]]
			var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
			var keyName = kony.store.key(index);
			frmLocalStoreAPI.LabelOutput.text = toString(keyName);
			// :End User Injected Code Snippet {a7865e7e-600f-3ddd-3728-52b84fded753}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('[object Undefined]');
		});
		
		it("storeDSLocalAPI/testCaseGetKey", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","txtKey4"]);
			voltmx.automation.textbox.enterText(["frmLocalStoreAPI","txtKey4"],"0");
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0f3db85a7389143"]);
			// :User Injected Code Snippet [// - [3 lines]]
			var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
			var keyName = kony.store.key(index);
			frmLocalStoreAPI.LabelOutput.text = keyName;
			// :End User Injected Code Snippet {d26e0a7c-574a-1341-2cd2-9e77da644db1}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual("key1");
		});
		
		it("storeDSLocalAPI/testCaseGetLength", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var mylength = kony.store.length();
			frmLocalStoreAPI.LabelOutput.text = mylength.toString();
			// :End User Injected Code Snippet {4ac90cc9-11a4-4dd9-a5da-4b932ef763b3}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('1');
		});
		
		it("storeDSLocalAPI/testCaseRemoveItemNegativeScenario", async function() {
			await voltmx.automation.playback.wait(1000);
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0gc3081eb4adb47"]);
		});
		
		it("storeDSLocalAPI/testCaseRemoveItemNegativeScenario1", async function() {
			await voltmx.automation.playback.wait(1000);
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
			frmLocalStoreAPI.LabelOutput.text = toString(key);
			// :End User Injected Code Snippet {57688ec8-5297-6fe6-a406-f9c9d415ef1b}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('[object Undefined]');
		});
		
		it("storeDSLocalAPI/testCaseLengthAfterRemoveItem", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
			voltmx.automation.button.click(["frmLocalStoreAPI","CopyButton0id5ad5828ede4c"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var mylength = kony.store.length();
			frmLocalStoreAPI.LabelOutput.text = mylength.toString();
			// :End User Injected Code Snippet {cfe60b0a-02b5-e8a4-bf89-cfdf7cda5504}
			expect(voltmx.automation.widget.getWidgetProperty(["frmLocalStoreAPI","LabelOutput"], "text")).toEqual('0');
		});
		
		it("testCaseBackToHome", async function() {
			await kony.automation.playback.waitFor(["frmLocalStoreAPI","Button0eb5d24fd2a0d40"]);
			kony.automation.button.click(["frmLocalStoreAPI","Button0eb5d24fd2a0d40"]);
		});
		
		it("storeDSLocalAPI/testCaseRSR", async function() {
			await voltmx.automation.playback.waitFor(["Form1","Button0aeb7d2c3e78c4b"]);
			voltmx.automation.button.click(["Form1","Button0aeb7d2c3e78c4b"]);
		});
		
		it("storeDSLocalAPI/testCaseReadBeforeSave", async function() {
			voltmx.automation.button.click(["Form2","btn"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = toString(abc);
			// :End User Injected Code Snippet {86c2ddf3-2817-8727-4960-a9f3e855c095}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual('[object Undefined]');
		});
		
		it("storeDSLocalAPI/testCaseSave", async function() {
			await voltmx.automation.playback.waitFor(["Form2","btnsave"]);
			voltmx.automation.button.click(["Form2","btnsave"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = abc.toString();
			// :End User Injected Code Snippet {71d14c67-b33a-c5bf-4a32-abd0e6082647}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual("John,Joe,Jack");
		});
		
		it("storeDSLocalAPI/testCaseRead", async function() {
			await voltmx.automation.playback.waitFor(["Form2","btn"]);
			voltmx.automation.button.click(["Form2","btn"]);
			// :User Injected Code Snippet [// - [3 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = abc.toString();
			
			// :End User Injected Code Snippet {2feb485e-ab40-8b74-52c9-2cce777125e2}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual("John,Joe,Jack");
		});
		
		it("storeDSLocalAPI/testCaseRemove", async function() {
			await voltmx.automation.playback.wait(1000);
			await voltmx.automation.playback.waitFor(["Form2","Button0e7b511b66fb847"]);
			voltmx.automation.button.click(["Form2","Button0e7b511b66fb847"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = toString(abc);
			// :End User Injected Code Snippet {505fc4dd-14fb-807f-0662-79ec8deae7a4}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual('[object Undefined]');
		});
		
		it("storeDSLocalAPI/testCaseReadAfterRemove", async function() {
			voltmx.automation.button.click(["Form2","btn"]);
			// :User Injected Code Snippet [// - [2 lines]]
			var abc= kony.ds.read("friends");
			Form2.LabelResult.text = toString(abc);
			// :End User Injected Code Snippet {4d41812a-39f5-bedb-da04-9300d3466a68}
			expect(voltmx.automation.widget.getWidgetProperty(["Form2","LabelResult"], "text")).toEqual('[object Undefined]');
		});
	});
});