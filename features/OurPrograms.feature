@Regression
Feature: Our Programs

  @OurPrograms @smoke @test
  Scenario: Verify user can open Our Programs attributes and add new pages successfully
    Given User is to be redirected to the homepage screen
    When User navigates to the Our Programs page
    Then Our Programs page should load successfully
    When User clicks the Attributes button on Our Programs page
    Then Our Program Attributes page should load successfully
    When User returns to the Our Programs page
    Then Our Programs page should load successfully
    When User clicks the Add New button on Our Programs page
    Then Program Detail page should load successfully
    When User returns to the Our Programs page
     When User clicks the Industries button on Our Programs page
    # Then Industries page should load successfully