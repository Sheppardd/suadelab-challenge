Feature: Dashboard view functionality

  Background: Start point: http://localhost:3000/dashboard
    Given I go to the "Dashboard" view

    Scenario: Check if both tables are rendered
    Then I see two chart components rendered
