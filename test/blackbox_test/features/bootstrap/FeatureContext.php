<?php

use Behat\Behat\Context\BehatContext,
	Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
	Behat\Gherkin\Node\TableNode;

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;

class FeatureContext extends BehatContext
{
	private $driver;
	private $host = 'http://localhost:4444/wd/hub';

	private function name_translation($name)
	{
		if(strcmp($name, "search_bar") == 0)
		{
			return "project-search";
		}
		if(strcmp($name, "search_button") == 0)
		{
			return "project-button";
		}
		if(strcmp($name, "add_button") == 0)
		{
			return "addTOCloud-button";
		}
		if(strcmp($name, "word_cloud_title") == 0)
		{
			return "header";
		}
	}

	public function __construct()
	{
		// start Firefox with 5 second timeout
		$capabilities = DesiredCapabilities::firefox();
		$this->driver = RemoteWebDriver::create($this->host, $capabilities, 5000);
	}

	/**
	 * @Given /^I am on "([^"]*)"$/
	 */
	public function iAmOn($arg1)
	{
		$this->driver->get($arg1);
		if($this->driver->getTitle() == "Problem loading page")
			throw new PendingException();
	}

	/**
	 * @Given /^the "([^"]*)" is empty$/
	 */
	public function theIsEmpty($arg1)
	{
		$id_name = $this->name_translation($arg1);
		$input = $this->driver->findElement(
			WebDriverBy::id($id_name)
		);
		if(is_null($input))
			throw new PendingException();
		if($input->getText() != '')
			throw new PendingException();
	}

	/**
	 * @Then /^the "([^"]*)" should not be clickable$/
	 */
	public function theShouldNotBeClickable($arg1)
	{
		$url = $this->driver->getCurrentUrl();
		$id_name = $this->name_translation($arg1);
		$button = $this->driver->findElement(
			WebDriverBy::id($id_name)
		);
		$button->click();
		$url_new = $this->driver->getCurrentUrl();
		if(strcmp($url, $url_new) != 0)
			throw new PendingException();
	}

	/**
	 * @When /^I type "([^"]*)" into the "([^"]*)"$/
	 */
	public function iTypeIntoThe($arg1, $arg2)
	{
		$id_name = $this->name_translation($arg2);
		$textbox = $this->driver->findElement(
			WebDriverBy::id($id_name)
		);
		$textbox->sendKeys($arg1);
		/*if(strcmp($textbox->getText(), $arg1) != 0)
			throw new PendingException();*/
	}

	/**
	 * @Then /^the "([^"]*)" should be clickable$/
	 */
	public function theShouldBeClickable($arg1)
	{
		$id_name = $this->name_translation($arg1);
		$button = $this->driver->findElement(
			WebDriverBy::id($id_name)
		);
		$button->click();
	}

	/**
	 * @Given /^click "([^"]*)"$/
	 */
	public function click($arg1)
	{
		//$url = $this->driver->getCurrentUrl();
		$id_name = $this->name_translation($arg1);
		$button = $this->driver->findElement(
			WebDriverBy::id($id_name)
		);
		$button->click();
	}

	/**
	 * @Then /^the "([^"]*)" should be "([^"]*)"$/
	 */
	public function theShouldBe($arg1, $arg2)
	{
		$id_name = $this->name_translation($arg1);
		$elem = $this->driver->findElement(
			WebDriverBy::id($id_name)
		);
		if(strcmp($elem->getText(), $arg2) != 0)
			throw new PendingException();
	}

	/**
	 * @Then /^the "([^"]*)" should be updated$/
	 */
	public function theShouldBeUpdated($arg1)
	{
		//throw new PendingException();
	}

	/**
	 * @Then /^"([^"]*)" should be empty$/
	 */
	public function shouldBeEmpty($arg1)
	{
		//throw new PendingException();
	}

	/**
	 * @Then /^"([^"]*)" should be ediable$/
	 */
	public function shouldBeEdiable($arg1)
	{
		//throw new PendingException();
	}

	/**
	* @When /^I type "([^"]*)"$/
	*/
	public function iType($arg1)
	{
		throw new PendingException();
	}

	/**
	* @Then /^the suggestions should not be visable$/
	*/
	public function theSuggestionsShouldNotBeVisable()
	{
	throw new PendingException();
	}

	/**
	* @Then /^the suggestions should be visable$/
	*/
	public function theSuggestionsShouldBeVisable()
	{
	throw new PendingException();
	}

	/**
	* @Given /^I have suggestions$/
	*/
	public function iHaveSuggestions()
	{
	throw new PendingException();
	}

	/**
	* @Then /^there should be at least three suggestions$/
	*/
	public function thereShouldBeAtLeastThreeSuggestions()
	{
	throw new PendingException();
	}

	/**
	* @Then /^there should be a name and image for each artist$/
	*/
	public function thereShouldBeANameAndImageForEachArtist()
	{
	throw new PendingException();
	}

	/**
	* @When /^I click on a suggestion$/
	*/
	public function iClickOnASuggestion()
	{
	throw new PendingException();
	}

	/**
	* @Then /^the "([^"]*)" should be updated to the artist I clicked$/
	*/
	public function theShouldBeUpdatedToTheArtistIClicked($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Then /^there should be a "([^"]*)"$/
	*/
	public function thereShouldBeA($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Given /^I have an artist on the "([^"]*)"$/
	*/
	public function iHaveAnArtistOnThe($arg1)
	{
	throw new PendingException();
	}

	/**
	* @When /^I click the "([^"]*)"$/
	*/
	public function iClickThe($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Then /^I should be on the "([^"]*)"$/
	*/
	public function iShouldBeOnThe($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Given /^I am on the "([^"]*)"$/
	*/
	public function iAmOnThe($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Then /^the title should be the "([^"]*)"$/
	*/
	public function theTitleShouldBeThe($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Given /^I have a "([^"]*)"$/
	*/
	public function iHaveA($arg1)
	{
	throw new PendingException();
	}

	/**
	* @When /^I click on the "([^"]*)"$/
	*/
	public function iClickOnThe($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Then /^I should be redirected to "([^"]*)"$/
	*/
	public function iShouldBeRedirectedTo($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Given /^I share on facebook$/
	*/
	public function iShareOnFacebook()
	{
	throw new PendingException();
	}

	/**
	* @Then /^the post should have an image and the list of artists$/
	*/
	public function thePostShouldHaveAnImageAndTheListOfArtists()
	{
	throw new PendingException();
	}

	/**
	* @Given /^I am not logged in$/
	*/
	public function iAmNotLoggedIn()
	{
	throw new PendingException();
	}

	/**
	* @Then /^facebook should ask me to log in$/
	*/
	public function facebookShouldAskMeToLogIn()
	{
	throw new PendingException();
	}

	/**
	* @Then /^the "([^"]*)" should have the most freqently used words$/
	*/
	public function theShouldHaveTheMostFreqentlyUsedWords($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Then /^the "([^"]*)" should have at most (\d+) words$/
	*/
	public function theShouldHaveAtMostWords($arg1, $arg2)
	{
	throw new PendingException();
	}

	/**
	* @Then /^each word on the "([^"]*)" should be horizontal$/
	*/
	public function eachWordOnTheShouldBeHorizontal($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Then /^the "([^"]*)" should be rectangular$/
	*/
	public function theShouldBeRectangular($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Then /^each word on the "([^"]*)" should be colorful$/
	*/
	public function eachWordOnTheShouldBeColorful($arg1)
	{
	throw new PendingException();
	}

	/**
	* @Then /^each word on the "([^"]*)" should be sized porportionally to frequency$/
	*/
	public function eachWordOnTheShouldBeSizedPorportionallyToFrequency($arg1)
	{
	throw new PendingException();
	}

	/**
	* @When /^I click on a word$/
	*/
	public function iClickOnAWord()
	{
	throw new PendingException();
	}
}