Feature: search bar
	In order to search for an artist
	As a user
	I need to be able to type an artist into a search bar

Scenario: Search bar should be empty on the search page
	Given I am on "http://localhost:8000/"
	Then "search_bar" should be empty

Scenario: Search bar should be editable
	Given I am on "http://localhost:8000/"
	Then "search_bar" should be ediable

Scenario: Suggestions should not appear if a user types less than three characters
	Given I am on "http://localhost:8000/"
	When I type "ade"
	Then the suggestions should not be visable

Scenario: Suggestions should appear if a user types more then three characters
	Given I am on "http://localhost:8000/"
	When I type "adel"
	Then the suggestions should be visable

Scenario: Suggestions should have at least three artist ("adel")
	Given I have suggestions
	Then there should be at least three suggestions

Scenario: Artists in the suggetions should have names and images
	Given I have suggestions
	Then there should be a name and image for each artist

Scenario: Suggestions should complete the search box
	Given I have suggestions
	When I click on a suggestion
	Then the "search_bar" should be updated to the artist I clicked