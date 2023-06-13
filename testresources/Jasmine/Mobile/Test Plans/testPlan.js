//This is the entry point for automation. You can either:
//1.Require any one of the created test plans like this:
require([/*<test plan file>*/]);

// or
//2.  require the test suites(features) along with executing jasmine as below
//Nested require for test suites will ensure the order of test suite exectuion
require([/*<Test Suites/feature1>*/], function () {
    require([/*<Test Suites/feature2>*/], function () {
        //and so on
        require([/*<Test Suites/last feature>*/], function () {
            /*
            Uncomment the code in this block before executing if using option 2
            features.forEach(feature => {
                jasmineFeatureRunner(features, steps)(feature);
            });
            jasmine.getEnv().execute();  
            */
        });
    });
});

//Since this is file is to be manually edited, make sure to update 
//any changes (rename/delete) to the test suites/plans.