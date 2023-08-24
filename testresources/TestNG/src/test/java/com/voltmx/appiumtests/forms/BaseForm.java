package com.voltmx.appiumtests.forms;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
//import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.PageFactory;

import com.voltmx.appiumtests.tests.BaseTest;

/**
 * A base for all the pages within the suite
 */
public abstract class BaseForm {

  /**
	 * The driver
	 */
  public static AndroidDriver androiddriver;
  //public static IOSDriver iosdriver;
  protected final AppiumDriver driver; // AppiumDriver class contains all
  // methods shared by iOS and Android

  /**
	 * A base constructor that sets the page's driver
	 * 
	 * The page structure is being used within this test in order to separate
	 * the page actions from the tests.
	 * 
	 * Please use the AppiumFieldDecorator class within the page factory. This
	 * way annotations like @AndroidFindBy within the page objects.
	 * 
	 * @param driver
	 * 
	 * @param driver
	 *            the appium driver created in the beforesuite method.
	 */
  protected BaseForm(AppiumDriver driver) {

    this.driver = driver;
    androiddriver = BaseTest.androiddriver;
    //iosdriver = BaseTest.iosdriver;
    /**
		 * getPlatform() is used to know the platform on which the app is
		 * running
		 */
    this.platformName = driver.getCapabilities().getPlatform().toString();

    if ("MAC".equalsIgnoreCase(platformName)) {
      System.out.println("Inside platform MAC............");
      textBoxClass = "UIATextField";
    } else {
      System.out.println("Inside platform ANDROID............");
      textBoxClass = "android.widget.EditText";
    }
    /**
		 * PageFactory.initElements() static method takes the driver instance of
		 * the given class and the class type, and returns a Page Object with
		 * its fields.
		 */
    PageFactory.initElements(new AppiumFieldDecorator(driver, 15,
                                                      TimeUnit.SECONDS), this); // default implicit waiting timeout
    
    // for all strategies

  }

  protected final String platformName;

  protected final String textBoxClass;
}