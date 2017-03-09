Feature: word cloud page ui
	In order to know which artist I have selected
	As a user
	I need a "word_cloud_title"

Scenario: Word Cloud Page should have a title
	Given I am on "http://localhost:8000/wordcloud.html?artist=Adele"
	Then the "word_cloud_title" should be "Adele"

Scenario: Word Cloud Page should have a "word_cloud"
	Given I am on "http://localhost:8000/wordcloud.html?artist=Adele"
	Then there should be a "word_cloud"

Scenario: Word Cloud Page should have a "search_bar"
	Given I am on "http://localhost:8000/wordcloud.html?artist=Adele"
	Then there should be a "search_bar"

Scenario: Word Cloud Page should have a "search_button"
	Given I am on "http://localhost:8000/wordcloud.html?artist=Adele"
	Then there should be a "search_button"

Scenario: Word Cloud Page should have a "add_button"
	Given I am on "http://localhost:8000/wordcloud.html?artist=Adele"
	Then there should be a "add_button"

Scenario: Word Cloud Page should have a "share_button"
	Given I am on "http://localhost:8000/wordcloud.html?artist=Adele"
	Then there should be a "share_button"