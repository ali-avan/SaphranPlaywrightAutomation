@Regression
Feature: Forecast Management

  @ForecastManagement @smoke @test
  Scenario: Verify user can open the Forecast Management smoke flow successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Forecast Management page
    Then Forecast Management page should load successfully
    When User opens IHS Vehicle from the Original list
    Then Forecast Detail page should load successfully
    When User clicks the Details button on Forecast Detail page
    Then View Forecast page should load successfully
    When User clicks the Filter button on View Forecast page
    Then Reports and Analysis page should load successfully
