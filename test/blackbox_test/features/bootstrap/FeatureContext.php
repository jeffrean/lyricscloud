# features/bootstrap/FeatureContext.php
<?php

use Behat\Behat\Context\BehatContext,
	Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
	Behat\Gherkin\Node\TableNode;

use Behat\Mink\Mink,
    Behat\Mink\Session,
    Behat\Mink\Driver\Selenium2Driver;

use Selenium\Client as SeleniumClient;

class FeatureContext extends BehatContext
{
	private $driver = null;

	public function __construct()
	{
		$driver = new \Behat\Mink\Driver\Selenium2Driver('firefox');
		$driver->start();
	}

	/**
	 * @Given /^I am on "([^"]*)"$/
	 */
	public function iAmOn($arg1)
	{
		$driver.visit('localhost:8000');
		if($driver->WindowName() != "Word Cloud")
			throw new PendingException();
	}

	/**
	 * @Then /^"([^"]*)" should be empty$/
	 */
	public function shouldBeEmpty($arg1)
	{
		//throw new PendingException();
	}
}