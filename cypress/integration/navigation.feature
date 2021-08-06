Feature: Navigation functionality

  Background: Start point: http://localhost:3000
    Given I navigate to the app

  Scenario: User gets redirected to default view (Dashboard) if no view specified
    Given I navigate to "http://localhost:3000"
    Then I see "dashboard" in the URL

  Scenario: I stay in the same view on reload
    Given I go to the "People" view
    And I reload the page
    Then I see "people" in the URL
