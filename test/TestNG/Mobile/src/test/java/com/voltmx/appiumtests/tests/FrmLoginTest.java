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
import com.voltmx.appiumtests.forms.FrmLogin;

public class FrmLoginTest extends BaseTest {

	private FrmLogin frmLogin;
	private CountrySelection CountrySelection;

	/**
	 * Creates FrmLogin page
	 *
	 * @Override we are overriding the abstract methods (setUpPage()), and and
	 *           customizing the implementation in the inherited classes.
	 *
	 * @Test annotation is used for writing the test scripts. We can execute the
	 *       required tests only with the help of Group test mechanism, which is
	 *       offered by testNG.
	 *
	 */

	/*@BeforeTest
	@Override
	public void setUpPage() {
		CountrySelection = new CountrySelection(driver);
		if(CountrySelection.isDisplayed()){
			CountrySelection.nextClick();
		}
		frmLogin = new FrmLogin(driver);
	}*/

	@BeforeClass
	@Override
	public void navigateTo() {

	}

	@Test(groups = "Login")
	public void testLogin() throws InterruptedException {
			System.out.println("Login Starts");
			if(frmLogin.isDisplayed()){
				frmLogin.loginIn("suresh.jallipalli@hcl.com","voltMX@1234");
			}
			System.out.println("Login Ends");
	}

}
