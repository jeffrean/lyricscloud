Feature: lyrics page ui
	In order to know which the lyrics of the song I selected
	As a user
	I need the lyrics of the song that I selected

Scenario: Lyrics Page should have a title
	Given I am on "http://localhost:8000/SongLyrics.html"
	Then there should be a "lyrics_title"

Scenario: Lyrics Page should have a "song_lyrics"
	Given I am on "http://localhost:8000/SongLyrics.html"
	Then there should be a "song_lyrics"

Scenario: Lyrics Page should have a "back_song_word_button"
	Given I am on "http://localhost:8000/SongLyrics.html"
	Then there should be a "back_lyrics_word_button"

Scenario: Lyrics Page should have a "back_song_word_button"
	Given I am on "http://localhost:8000/SongLyrics.html"
	Then there should be a "back_lyrics_song_button"