Feature: People view functionality

  Background: Start point: http://localhost:3000/people
    Given I go to the "People" view

  Scenario: Search by name
    Given I search "Bowen Wade"
    Then I see the id "5d5d7ad6f71cdf10262b55cb"

  Scenario: Search by age
    Given I search "23"
    Then I don't see any "28"

  Scenario: Search by eye color
    Given I search "brown"
    Then I don't see any "blue"

  Scenario: Serch by Preference
    Given I search "bird"
    Then I don't see any "dog"
    
  Scenario: Sort by Name
    Given I sort by "Name"
    Then The first row is "Adrian Burch"

  Scenario: Sort by Eye Color
    Given I sort by "Eye Color"
    Then The first row is "blue"

  Scenario: Edit user
    Given I click on "Edit Users" button
    And I fill the "ID" field with "5d5d7ad6c455d0b7efb19a01"
    Then I see "Jeanette Long" in the name input
    And I fill the "Age" field with "39"
    Given I click on "save" button
    And I search "Jeanette Long"
    Then I see the first row age is "39"
