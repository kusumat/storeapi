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

import com.voltmx.appiumtests.forms.FrmLogin;
import com.voltmx.appiumtests.forms.FrmShoppingList;
import io.appium.java_client.AppiumDriver;

public class FrmLoginTest extends BaseTest {

  private FrmLogin frmLogin;
  private FrmShoppingList frmList;

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

  @BeforeTest
  @Override
  public void setUpPage() {
    frmLogin = new FrmLogin(driver);
  }

  @BeforeClass
  @Override
  public void navigateTo() {

  }

  @Test(groups = "Login")
  public void testLogin() throws InterruptedException {
    System.out.println("Login Starts");
    if(frmLogin.isDisplayed()){
      frmLogin.loginIn("suresh.jallipalli@hcl.com","VoltMX@1234");
      frmList = new FrmShoppingList(driver);
      frmList.onClickList();
    }
    System.out.println("Login Ends");
  }

}
