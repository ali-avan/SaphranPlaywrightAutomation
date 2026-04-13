@Regression
Feature: Part Search

  @PartSearch @smoke @test
  Scenario: Verify user can search active Ford parts successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Part Search page
    Then Part Search page should load successfully
    When User selects Active in Search Within section on Part Search page
    And User selects Ford in Customer Search dropdown on Part Search page
    And User clicks Search button on Part Search page
    Then Part Search results should load successfully
