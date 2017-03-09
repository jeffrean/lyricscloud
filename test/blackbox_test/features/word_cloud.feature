Feature: word cloud
	In order to have a word cloud
	As a user
	I need to be see the word cloud

Scenario: Contains at most 250 words
	Given I have a "word_cloud"
	Then the "word_cloud" should have at most 250 words

Scenario: Word redirects to song list page
	Given I have a "word_cloud"
	When I click on a word
	Then I should be on the "song_list_page"