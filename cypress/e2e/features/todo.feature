Feature: Todo App functionality

  Scenario: Add a Todo
    Given I visit the Todo Application
    When I add "Send email" as Todo item
    Then I should see "Send email" in the Todo list
