@Regression
Feature: System Admin

  @SystemAdminBasic @smoke @test
  Scenario: Verify user can open Calendars, Capital Assets, and Currency pages successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Calendars page from System Admin menu
    Then Calendars page should load successfully
    When User navigates to the Capital Assets page from System Admin menu
    Then Capital Assets page should load successfully
    When User clicks Add New Machine on Capital Assets page
    Then Machine Detail page should load successfully from Capital Assets
    When User navigates to the Currency page from System Admin menu
    Then Currency page should load successfully

  @SystemAdminCustomerAdmin @smoke @test
  Scenario: Verify user can open customer detail pages from Customer Admin successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Customer Admin page from System Admin menu
    Then Customer Admin page should load successfully
    When User opens an existing customer record from Customer Admin page
    Then Customer detail page should load successfully
    When User returns to the Customer Admin page
    Then Customer Admin page should load successfully
    When User clicks New Customer on Customer Admin page
    Then Customer detail page should load successfully

  @SystemAdminDataManagement @smoke @test
  Scenario: Verify user can open all data element pages from Data Management successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Data Management page from System Admin menu
    Then Data Management page should load successfully
    When User opens all data element pages from Data Management

  @SystemAdminAdditionalPages @smoke @test
  Scenario: Verify user can open Login Log, Logout User, Office Tools Trust, Part Attributes, and Projects pages successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Login Log page from System Admin menu
    Then Login Log page should load successfully
    When User navigates to the Logout User page from System Admin menu
    Then Logout User page should load successfully
    When User navigates to the Office Tools Trust page from System Admin menu
    Then Office Tools Trust page should load successfully
    When User navigates to the Part Attributes page from System Admin menu
    Then Part Attributes page should load successfully
    When User navigates to the Projects page from System Admin menu
    Then Projects page should load successfully

  @SystemAdminShipHistoryUpload @smoke @test
  Scenario: Verify user can open Ship History Upload related pages successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Ship History Upload page from System Admin menu
    Then Ship History Upload page should load successfully
    When User opens the first in-process alignment job from Ship History Upload page
    Then Ship History In-Process Alignment page should load successfully
    When User opens the Alias Check page from Ship History In-Process Alignment page
    Then Ship History Alias Check page should load successfully
    When User navigates back to the Ship History In-Process Alignment page
    Then Ship History In-Process Alignment page should load successfully
    When User opens the Suggestions page from Ship History In-Process Alignment page
    Then Ship History Suggestions page should load successfully
