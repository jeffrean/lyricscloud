Feature: Song list
	In order to know which songs contain a word
	As a user
	I need to be see a list of song titles ranked by frequency

Scenario: List contains all songs that contain chosen word
	Given I have a "word_cloud"
	And I have an artist
	Then there should be a "song_list"

Scenario: Song list are sorted by frequency
	Given I have a "song_list"
	Then the song list should be sorted

Scenario: Frequency should be next to the song title
	Given I have a "song_list"
	Then the frequency should also be listed

Scenario:Clicking the song title should redirect a user to the lyrics page
	Given I have a "song_list"
	When I click on a song
	Then I should be on the songs lyrics page