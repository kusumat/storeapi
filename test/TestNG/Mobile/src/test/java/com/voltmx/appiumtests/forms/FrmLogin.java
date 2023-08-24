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
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.FindBy;

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

	public FrmLogin(RemoteWebDriver driver) {
		super(driver); // super() is used to invoke immediate parent class
						// constructor.
	}

	// Locators_PreLogin Screen
	/**
	 * @FindBy is just an alternate way of finding elements. It is better used
	 *         to support the PageObject pattern.
	 */


	@FindBy(id = "btnSignUp")
	public WebElement btnSignUp;

	@FindBy(id = "tbxUsername")
	public WebElement tbxUsername;

	@FindBy(id = "tbxPassword")
	public WebElement tbxPassword;

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


	public void loginIn(String userName, String password) {
		//this.initiaizeElements();
		this.username.sendKeys(userName);
		if ("MAC".equalsIgnoreCase(platformName)) {
			iosdriver.hideKeyboard(HideKeyboardStrategy.PRESS_KEY, "Done");
		} else {
			androiddriver.hideKeyboard();
		}
		this.password.sendKeys(password);
		if ("MAC".equalsIgnoreCase(platformName)) {
			iosdriver.hideKeyboard(HideKeyboardStrategy.PRESS_KEY, "Done");
		} else {
			androiddriver.hideKeyboard();
		}
		this.btnSignUp.click();
	}

	public void guestLogin() {
		this.btnSignUp.click();
	}

	/**
	 * isDisplayed() is boolean method i.e, it returns true or false. Basically
	 * this method is used to find whether the element is being displayed.
	 */
	public boolean isDisplayed() {
		return (this.btnSignUp.isDisplayed()); //&& this.btnLogin.isDisplayed());
	}

}
