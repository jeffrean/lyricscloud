Feature: word cloud title
	In order to know which artist I selected
	As a user
	I need to be see the artist in the title

Scenario: In the "word_cloud_page", the title should be the artist
	Given I am on "localhost:8000/wordcloud.html?artist=adele"
	Then the "word_cloud_title" should be "adele"