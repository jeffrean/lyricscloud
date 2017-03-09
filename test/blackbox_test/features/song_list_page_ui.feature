Feature: song list page ui
	In order to know which songs contain the word I selected
	As a user
	I need a list of song titles that contain the word I selected

Scenario: Song List Page should have a title
	Given I am on "http://localhost:8000/SongList.html"
	Then there should be a "song_list_title"

Scenario: Song List Page should have a "song_list"
	Given I am on "http://localhost:8000/SongList.html"
	Then there should be a "song_list"

Scenario: Song List Page should have a "back_song_word_button"
	Given I am on "http://localhost:8000/SongList.html"
	Then there should be a "back_song_word_button"