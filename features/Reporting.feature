@Regression
Feature: Reporting

  @Reporting @smoke @test
  Scenario: Verify user can open reporting pages successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Reports and Analysis page from Reporting menu
    Then Reports and Analysis reporting page should load successfully
    When User clicks New Query on Reports and Analysis page
    Then New Query should load successfully on Reports and Analysis page
    When User navigates to the Report Export page from Reporting menu
    Then Report Export page should load successfully
    When User navigates to the Report Management page from Reporting menu
    Then Report Management page should load successfully
