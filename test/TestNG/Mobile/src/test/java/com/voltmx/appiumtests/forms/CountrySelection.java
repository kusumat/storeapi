/**************************************************************
Project Name			:	Test Automation Sample
Package Name			:	com.voltmx.appiumtests.Forms
Class Name				:	Login
Purpose of the Class	:	To maintain the repository for the locators
 **************************************************************/

package com.voltmx.appiumtests.forms;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.FindBy;

public class CountrySelection extends BaseForm {

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

	public CountrySelection(RemoteWebDriver driver) {
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

	public void nextClick() {
		this.btnSignUp.click();
	}

	/**
	 * isDisplayed() is boolean method i.e, it returns true or false. Basically
	 * this method is used to find whether the element is being displayed.
	 */
	public boolean isDisplayed() {
		return (this.btnSignUp.isDisplayed());
	}

}
