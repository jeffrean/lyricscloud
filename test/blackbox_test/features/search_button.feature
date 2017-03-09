Feature: search button
	In order to search for an artist
	As a user
	I need to be able to execute a search

Scenario: Search button is clickable
	Given I have an artist on the "search_bar"
	Then the "search_button" should be clickable

Scenario: Search button navigates to the "word_cloud_page"
	Given I have an artist on the "search_bar"
	When I click the "search_button"
	Then I should be on the "word_cloud_page"

Scenario: Search button generates a title
	Given I am on the "word_cloud_page"
	Then the title should be the "chosen_artist"

Scenario: Search button generates a word cloud
	Given I am on the "word_cloud_page"
	Then there should be a "word_cloud"