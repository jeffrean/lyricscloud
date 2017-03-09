Feature: word cloud
	In order to have a word cloud
	As a user
	I need to be see the word cloud

Scenario: Omit commonly used words
	Given I have a "word_cloud"
	Then there should be no commonly used words on the word cloud

Scenario: Contains the most frequently used words
	Given I have a "word_cloud"
	Then the "word_cloud" should have the most freqently used words

Scenario: Contains at most 250 words
	Given I have a "word_cloud"
	Then the "word_cloud" should have at most 250 words

Scenario: Horizontal words
	Given I have a "word_cloud"
	Then each word on the "word_cloud" should be horizontal

Scenario: Rectangular word cloud
	Given I have a "word_cloud"
	Then the "word_cloud" should be rectangular

Scenario: Word cloud is colorful
	Given I have a "word_cloud"
	Then each word on the "word_cloud" should be colorful

Scenario: Size is proportional to frequency
	Given I have a "word_cloud"
	Then each word on the "word_cloud" should be sized porportionally to frequency

Scenario: Word redirects to song list page
	Given I have a "word_cloud"
	When I click on a word
	Then I should be on the "song_list_page"