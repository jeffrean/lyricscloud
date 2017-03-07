#features/artist_search_bar.feature
Feature: search_bar
	In order to search for an artist
	As a user
	I need to be able to type an artist into a search bar


Scenario: Search bar should be empty
	Given I am on "localhost:8000"
	Then "search_bar" should be empty