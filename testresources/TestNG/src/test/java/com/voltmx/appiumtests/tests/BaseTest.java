/**************************************************************
Project Name			:	Test Automation Sample
Package Name			:	com.voltmx.appiumtests.Tests
Class Name				:	BaseTest
Purpose of the Class	:	To maintain desired capabilities, 
 							communiting with Appium server. 
 **************************************************************/
package com.voltmx.appiumtests.tests;

import io.appium.java_client.android.AndroidDriver;
//import io.appium.java_client.ios.IOSDriver;

import java.net.URL;

import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeTest;
import io.appium.java_client.AppiumDriver;

public abstract class BaseTest {

  /**
	 * A base constructor that sets the page's driver
	 * 
	 * The page structure is being used within this test in order to separate
	 * the page actions from the tests.
	 * 
	 * @BeforeTest block will be before the @Test is going to execute.
	 * 
	 * @AfterTest block will be executed after all the Test's are executed.
	 * 
	 * @AfterSuite will be executed after all the tests executed, the mechanisms
	 *             like Closing DB connection, Quitting from the app are written
	 *             in this section.
	 */
  public static String platformName;
  public static AndroidDriver androiddriver;
  //public static IOSDriver iosdriver;
  public static AppiumDriver driver; // AppiumDriver class contains all
  // methods shared by iOS and Android

  @BeforeSuite
  // To Launch App on device.
  public void beforeSuite() throws Exception {

    System.out.println("initializing is starting..........");

    DesiredCapabilities capabilities = new DesiredCapabilities();
    //capabilities.setCapability("unicodeKeyboard", true);
	capabilities.setCapability("resetKeyboard", true);
    // The commented section is used when try to work in local Environment.

    /*
		 * capabilities.setCapability("deviceName", "4d002205f1d230af");
		 * capabilities.setCapability("platformVersion","5.0.1");
		 * capabilities.setCapability("platformName", "Android" );
		 * capabilities.setCapability("appPackage", "com.engie.SampleTest");
		 * capabilities.setCapability("appActivity",
		 * "com.engie.SampleTest.SampleTest");
		 */
    /*
    if (iosdriver == null) {

      // Comm with Appium server
      iosdriver = new IOSDriver(new URL("http://127.0.0.1:4723/wd/hub"),capabilities);
    }*/

    //System.out.println("Getting platform name from capabilities.........."+ iosdriver.getCapabilities().getPlatform().toString());
    /**
		 * getPlatform() is used to know the platform on which the app is
		 * running
		 */
    platformName = "Android";//iosdriver.getCapabilities().getPlatform().toString();

    if ("MAC".equalsIgnoreCase(platformName)) {
      System.out.println("Inside platform MAC............");
      //driver = iosdriver;
    } else {
      if (driver != null) {
        driver.quit();
        driver = null;
      }
      if (androiddriver != null) {
        androiddriver.quit();
        androiddriver = null;
      }
      /* if (iosdriver != null) {
        iosdriver.quit();
        iosdriver = null;
      }*/
      capabilities.setCapability("automationName", "UIAutomator2");
      System.out.println("Inside platform ANDROID............");
      androiddriver = new AndroidDriver(new URL("http://127.0.0.1:4723/wd/hub"), capabilities);
      driver = androiddriver;
    }
  }

  @BeforeClass
  public void navigateTo() {

  }

  @BeforeTest
  public abstract void setUpPage();

  @AfterTest
  public void afterTest() {

  }

  @AfterSuite
  // App close
  public void tearDownAppium() {
    if (driver != null)
      driver.quit();
    if (androiddriver != null)
      androiddriver.quit();
    /*if (iosdriver != null)
      iosdriver.quit();*/
  }

}
