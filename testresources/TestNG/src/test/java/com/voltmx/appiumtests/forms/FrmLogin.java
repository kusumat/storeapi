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

public class FrmLogin extends BaseForm {

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
  @AndroidFindBy(uiAutomator = "new UiSelector().text(\"Sign In\")")
  private MobileElement btnLogin;

  //@AndroidFindBy(id = "com.hcl.voltmx.technohub:id/tbxUsername")
  @AndroidFindBy(uiAutomator = "new UiSelector().text(\"Username\")")
  private MobileElement tbxUsername;

  //@AndroidFindBy(id = "com.hcl.voltmx.technohub:id/tbxPassword")
  @AndroidFindBy(uiAutomator = "new UiSelector().text(\"Password\")")
  private MobileElement tbxPassword;
  
  //public By loginButton = By.id("btnLogin");
  //public MobileElement btnLogin = null;

  /*@FindBy(name = "Sign In")
	public WebElement btnLogin;

	private WebElement username;

	private WebElement password;

	private void initiaizeElements(){
		System.out.println("textBoxClass for the platform .."+platformName+".. is ... "+textBoxClass);
		List<WebElement> textBoxList = driver.findElements(By.className(textBoxClass));
		this.username = textBoxList.get(0);
		this.password = textBoxList.get(1);
	}
*/
  public FrmLogin(AppiumDriver driver) {
    super(driver); // super() is used to invoke immediate parent class
    // constructor.
  }

  public void loginIn(String userName, String password) {
    //this.initiaizeElements();
    tbxUsername.sendKeys(userName);
    /*if ("MAC".equalsIgnoreCase(platformName)) {
      //iosdriver.hideKeyboard(HideKeyboardStrategy.PRESS_KEY, "Done");
    } else {
      androiddriver.hideKeyboard();
    }*/
    tbxPassword.sendKeys(password);
    /*if ("MAC".equalsIgnoreCase(platformName)) {
      //iosdriver.hideKeyboard(HideKeyboardStrategy.PRESS_KEY, "Done");
    } else {
      androiddriver.hideKeyboard();
    }*/
    btnLogin.click();
    
  }


  /**
	 * isDisplayed() is boolean method i.e, it returns true or false. Basically
	 * this method is used to find whether the element is being displayed.
	 */
  public boolean isDisplayed() {
    //System.out.println("Page Source"+driver.getPageSource());
    //WebDriverWait wait = new WebDriverWait(driver, 100);
	//WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("btnLogin")));
   /* List<WebElement> els6 = driver.findElementsByXPath("//*");
    System.out.println("Total Elements::"+els6.size());
     for (WebElement webElement : els6) {
        System.out.println("Element::"+webElement.getText());
    }*/
    //this.btnLogin = driver.findElement(By.id("btnLogin"));
    //this.btnLogin = driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.hcl.voltmx.technohub:id/btnLogin']"));
    //driver.findElement(By.xpath("//android.widget.TextView[@resource-id='the whole id filed:id/id value']"))
    return (btnLogin.isDisplayed()); //&& this.btnLogin.isDisplayed());
  }

}
