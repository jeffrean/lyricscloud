Feature: share button
	In order to be able to share a word cloud to facebook
	As a user
	I need to be able to click a button to share to facebook

Scenario: Upon clicking the "share_button", the user is redirected to Facebook
	Given I have a "word_cloud"
	When I click on the "share_button"
	Then I should be redirected to "facebook.com"

Scenario: The share post should contain image of the word cloud and the list of artists
	Given I share on facebook
	Then the post should have an image and the list of artists

Scenario: Logins should be handled by facebook
	Given I share on facebook
	And I am not logged in
	Then facebook should ask me to log in