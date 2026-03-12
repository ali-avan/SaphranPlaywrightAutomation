@Regression
Feature: Add Part

  @AddPart @smoke
  Scenario: Verify user can fill General Information for Add Part
    Given User is to be redirected to the homepage screen
    When User navigates to the Add Part page
    And User fills the General Information section for Add Part
    Then Add Part General Information should contain the entered values
