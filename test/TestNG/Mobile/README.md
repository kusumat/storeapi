#TestAutomationSampleTests

This is a Java project created to demonstrate how to write test automation scripts for a mobile app built with [voltmx Visualizer](http://community.voltmx.com/documentation/design-develop) using the [TestNG framework](http://testng.org).

The test scripts in this project are meant for for the Visualiser project  [TestAutomationSampleApp].

##Page Object Pattern

This project makes use of the [Page Object Pattern](https://martinfowler.com/bliki/PageObject.html). Page Object is a design pattern by which the logic required to test an app and the logic required to interact with the UI elements of the app are separated into different objects.

It is a well accepted best practice of the industry and like many design patterns it aims to improve code maintenance and reduce duplication of code.

The way it works is that all the test scripts that need to interact with a specific screen don't interact with the screen directly, but through its corresponding page object -without the need to know what the right selectors for the UI elements are or how to interact with them.

The end result is si that ff the layout of a screen ever changes or the type of a specific UI element changes, but the functionality of the screen remains the same, the only thing affected is its corresponding page object. The test scripts are shielded from these changes by the page object abstraction layer.

Read more about the Page Object Pattern here:

[Page Object, by Martin Fowler](https://martinfowler.com/bliki/PageObject.html)

[Test Design Considerations by Selenium](http://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern)

[The Page Object Pattern](http://www.assertselenium.com/automation-design-practices/page-object-pattern/)


##Structure

This project consists of two major packages:

1. The Page Objects
2. The Test Scripts

## The Page Objects

Found in package:

    com.voltmx.appiumtests.forms

The classes under this package define the Page Objects that implement the logic needed to select specific UI elements and interact with them -e.g.:

    //To select a radio button that chooses an option for option "Foo".
    public void selectRadioButtonFoo()
    
    //To click on a button to do action "Bar".
    public void clickOnButtonBar

Even though according to the Page Object pattern there could be page objects defined for parts of a screen, all the classes in this package are in 1:1 correspondence with the forms found in the Visualizer app it aims to test -except for the BaseForm class wich is a common parent to all the page objects and serves to avoid some code duplication.

    com.voltmx.appiumtests.forms
    |
    |--BaseForm
    |--CountrySelection
    |--FrmLogin

###Class FrmLogin

Log into the application using guest login.

    guestLogin()
	
Verify whether the controls are displayed or not.

    isDisplayed()
 
###Class CountrySelection

Used to perform selection of Buttons.

    nextClick()

Used for verifying whether the the Controls are displaying or not.

    isDisplayed()
	

##The Test Scripts

Found in package

    com.voltmx.appiumtests.tests

The classes under this package define test suites. Each class in this package defines a test suite and each method in a class with the @Test annotation equates to a test case.

The class BaseTest is a parent for all test suites and serves to avoid some code duplication.

    com.voltmx.appiumtests.tests
    |
    |--BaseTest
    |--FrmLoginTest
    |--CountrySelectionTest


###Class FrmLoginTest

In this we are calling LoginTest class to use the locators.

    setUpPage() 

Used for app login using guest login.

    testLogin()  

###Class CountrySelectionTest

In this we are calling GridselectionTest class to use the locators.

    setUpPage() 

Used for navigating from country selection to login screen.

    testNext()



## Frameworks
The Frameworks used in this are PageFactory and TestNG.

###Pageobject Factory

  The objective of using PageobjectFactory is as follows:
  1.Easy to maintain
  2.Easy Readability of scripts
  3.Re-usability of code
  4.Reliability

Factory class can be used to make using Page Objects simpler and easier.

Page Factory is an inbuilt page object model concept for Selenium WebDriver but it is very optimized.

Here as well we follow the concept of separation of Page Object repository and Test methods.
Additionally with the help of PageFactory class we use annotations @FindBy to find WebElement. 
We use initElements method to initialize web elements

The *@FindBy* annotation can accept tagName, partialLinkText, name, linkText, id, css, className, xpath as attributes.
 
* TestNG: TestNG is an open source automated testing framework; where NG means Next Generation.
  This is used by Annotations. The different annotations are as @BeforeSuite,@BeforeTest,@AfterTest,@Aftersuite,@Test..etc


## How to build it

This is a Maven project. So you can build it by using:

    mvn clean package --DskipTests=true

If you're building on a Mac, use this instead:

    mvn clean package -DskipTests

A zip file while be generated in the **target** folder of the created project.


## Dependencies
The jars in pom.xml are used for this projcet are mentioned as below:

selenium jar files:
----------------------------
URL: http://docs.seleniumhq.org/download/maven.jsp


     <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>3.0.0</version>
     </dependency> 

TestNG Jar:
-----------
URL: http://testng.org/doc/maven.html

    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>6.8.8</version>
        <scope>test</scope>
    </dependency>


Java-client Jar:
-----------------
URL: https://search.maven.org/remotecontent?filepath=io/appium/java-client/4.1.2/java-client-4.1.2.pom

    <dependency>
        <groupId>io.appium</groupId>
        <artifactId>java-client</artifactId>
        <version>4.1.2</version>
    </dependency>

## To-Do



## Limitations of Appium in AWS DeviceFarm

In [AWS Device Farm](http://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html) each @Test annotated method is run in parallel in a completely different Appium server and in total isolation of other tests. As a result there are certain limitations when it comes to executing TestNG test scripts:

* Ignores the testng.xml descriptor. Any order of execution or precedence defined here is ignored.
* Ignores @Test(dependsOnGroups), @Test(dependsOnMethods), @Test(groups), @Test(priority) and any other annotations that attempt to establish an order of execution among tests.

You can however use the @BeforeTest annotation to do any navigation or set-up necessary prior to each test. Think of this as a way to set the preconditions of your tests.

##In a Real App

This project is just an example of how your scripts can be writen. Bear in mind that the app we aim to test here is just a [kitchen sink](http://stackoverflow.com/questions/33779296/what-is-exact-meaning-of-kitchen-sink-in-programming) concept and there were no user stories or acceptance criteria to define it. That is why each class in the *com.voltmx.appiumtests.tests* package is 1:1 with the forms in the Visualiser app.

However, in a real app the number of screens will most likely not be the same as the number of test suites you'll need. To illustrate, let's say roughly each user story equates to a test suite, and every acceptance criteria translates into a test case.

    X Screens =~ X Visualiser forms =~ X Page Objects
    Y User stories =~ Y Test suites =~ Y Test classes.
    Z Acceptance criteria =~ Z Test cases =~ Z @Test annotated methods in the Y test classes.

Where X, Y, Z are all integer numbers.
