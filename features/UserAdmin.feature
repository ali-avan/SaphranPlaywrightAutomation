@Regression
Feature: User Administration

  @DisabledUser @smoke
  Scenario: Verify that disabled user is not able to login by creating a new user with disabled status
    Given User is to be redirected to the homepage screen
    And User navigates to the User Administration page
    When User clicks on the New User button
    And User fills all mandatory User Administration fields
    Then User sets the user status as disabled
    And User clicks on the Save button
    And User verifies the success message for user creation
    And User navigates back the User Administration page
    When User searches with the created username
    And User clicks on the edit icon under actions column
    Then User sets the status as disabled on Edit user details page
    And User clicks on save all button
    And User navigates to the Login page
    Then Login with the disabled user
    And Verify user should not be able to login
