Feature: add word button
	In order to add an artist to the word cloud
	As a user
	I need to be able to click a button to add an artist

Scenario: Button should not be clickable if we do not have an artist
	Given I am on "http://localhost:8000/wordcloud.html?artists=adele"
	And the "search_bar" is empty
	Then the "add_button" should not be clickable

Scenario: Button should clickable if we have an artist
	Given I am on "http://localhost:8000/wordcloud.html?artists=adele"
	When I type "taylor swift" into the "search_bar"
	Then the "add_button" should be clickable

Scenario: Title should update when adding an artist
	Given I am on "http://localhost:8000/wordcloud.html?artists=adele"
	When I type "taylor swift" into the "search_bar"
	And click "search_button"
	Then the "word_cloud_title" should be "Adele, Taylor Swift"

Scenario: Word cloud should update when an adding an artist
	Given I am on "http://localhost:8000/wordcloud.html?artists=adele"
	When I type "taylor swift" into the "search_bar"
	And click "search_button"
	Then the "word_cloud" should be updated