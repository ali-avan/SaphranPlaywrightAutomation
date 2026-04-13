@Regression
Feature: Add Part

  @AddPart @regression @test
  Scenario: Verify user can Add Part with a new program assignment and Update the Forecast with the new part successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Add Part page
    And User fills the General Information section for Add Part using "generalInformation"
    And User clicks the General Information Save button
    And User clicks the Edit Volumes button
    And User configures the Volumes assignment filters
    And User selects the volume program row and enters Parts Per value
    And User clicks the Add Selection button
    And User clicks the Close button for Volumes section
    And User selects Selling Division in Our Attributes section
    And User enters Copy Price in Unit Price Contract Details section
    And User clicks the Select Row checkbox in Unit Price Contract Details section
    And User selects Tech Class Tier 1 and Product Class Tier 1 in Classification Information section
    And User clicks the Update FC button
    And User searches the saved Opportunity ID in In-Process and Recently Completed Parts section
    Then In-Process and Recently Completed Parts section should show the saved Opportunity ID part as Active
    And User opens the part page from the saved Opportunity ID search result
    Then Add Part General Information should contain the entered values
    And Add Part Program Assignments should contain the entered values
    And Add Part Our Attributes should contain the entered values
    And Add Part Classification Information should contain the entered values
 

  @AddPartHomePage @regression @test
  Scenario: Verify user able to land successfully on Add part page from home page
    Given User is to be redirected to the homepage screen
    When User navigates to the Add Part page
    And User fills the General Information section for Add Part using "generalInformation_a"
    And User clicks the General Information Save button
    And User clicks the Edit Volumes button
    And  User redirects to homepage by clicking on Saphran logo
    And User searches the saved Opportunity ID in In-Process and Recently Completed Parts section
    And User opens the part page from the saved Opportunity ID search result
    Then Verify user able to land successfully on Add part page from home page

  @AccountManagement @smoke @test
  Scenario: Verify user able to land successfully on Account Management page from Part Management menu
    Given User is to be redirected to the homepage screen
    When User navigates to the Account Management page
    Then Verify user able to land successfully on Account Management page
     When User navigates to the Create Vehicle Set page
    Then Verify user able to land successfully on Create Vehicle Set page
