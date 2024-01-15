Feature: Todo App functionality

  Scenario: Add a Todo
    Given I visit the Todo Application
    When I add "Send email" as Todo item
    Then I should see "Send email" in the Todo list

  Scenario: Edit a Todo
    Given I have a Todo item "Send email"
    When I edit "Send email" to "Write blog"
    Then I should see "Write blog" in the Todo list
    And I should not see "Send email" in the Todo list