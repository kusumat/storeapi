/**************************************************************
Project Name			:	Test Automation Sample
Package Name			:	com.voltmx.appiumtests.Forms
Class Name				:	Login
Purpose of the Class	:	To maintain the repository for the locators
 **************************************************************/

package com.voltmx.appiumtests.forms;

import io.appium.java_client.remote.HideKeyboardStrategy;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import io.appium.java_client.MobileElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.FindBy;
import io.appium.java_client.pagefactory.AndroidFindAll;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.support.ui.ExpectedConditions;
import io.appium.java_client.AppiumDriver;

public class FrmShoppingList extends BaseForm {

  /**
	 * The page structure is being used within this test in order to separate
	 * the page actions from the tests
	 *
	 * Locators are saved with the help of @FindBy annotation, and can be used
	 * in the corresponding tests by extending the FrmHome class.
	 *
	 * LoginIn() method is used to Login into the application. we can pass the
	 * user name, and password.
	 */



  // Locators_PreLogin Screen
  /**
	 * @FindBy is just an alternate way of finding elements. It is better used
	 *         to support the PageObject pattern.
	 */


  //@AndroidFindBy(id = "com.hcl.voltmx.technohub:id/btnLogin")
  @AndroidFindBy(uiAutomator = "new UiSelector().text(\"My Regular List(10)\")")
  private MobileElement segList;

  
  public FrmShoppingList(AppiumDriver driver) {
    super(driver); // super() is used to invoke immediate parent class
    // constructor.
  }

  public void onClickList() {
    segList.click();
  }

  /**
	 * isDisplayed() is boolean method i.e, it returns true or false. Basically
	 * this method is used to find whether the element is being displayed.
	 */
  public boolean isDisplayed() {
    return (segList.isDisplayed()); //&& this.btnLogin.isDisplayed());
  }

}
