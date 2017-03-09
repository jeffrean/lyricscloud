Feature: artist search page ui
	In order to search for an artist
	As a user
	I need a "search_bar" and a "search_button".

Scenario: Artist Search Page should have a search bar
	Given I am on "http://localhost:8000/"
	Then there should be a "search_bar"

Scenario: Artist Search Page should have a search button
	Given I am on "http://localhost:8000"
	Then there should be a "search_button"