/**************************************************************
Project Name			:	Test Automation Sample
Package Name			:	com.voltmx.appiumtests.Test
Class Name				:	FrmHomeTest
Purpose of the Class	:	Validating the Login functionality.  

 **************************************************************/
package com.voltmx.appiumtests.tests;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import com.voltmx.appiumtests.forms.CountrySelection;

public class CountrySelectionTest extends BaseTest {

	private CountrySelection CountrySelection;

	/**
	 * Creates CountrySelection page
	 * 
	 * @Override we are overriding the abstract methods (setUpPage()), and and
	 *           customizing the implementation in the inherited classes.
	 * 
	 * @Test annotation is used for writing the test scripts. We can execute the
	 *       required tests only with the help of Group test mechanism, which is
	 *       offered by testNG.
	 * 
	 */

	@BeforeTest
	@Override
	public void setUpPage() {
		CountrySelection = new CountrySelection(driver);
	}

	@BeforeClass
	@Override
	public void navigateTo() {

	}

	@Test(groups = "CountrySelection")
	public void testNext() throws InterruptedException {
			System.out.println("CountrySelection Starts");
			if(CountrySelection.isDisplayed()){
				CountrySelection.nextClick();
			}		
			System.out.println("CountrySelection Ends");
	}

}
