import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

Given('I visit the Todo Application', () => {
    visitLink();
});

When('I add {string} as Todo item', (text: string) => {
    addTodo(text);
});

Then('I should see {string} in the Todo list', (text: string) => {
    cy.get('ul').should('contain', text);
});

Given('I have a Todo item {string}', (text: string) => {
    visitLink()
    addTodo(text)
});

When('I edit {string} to {string}', (oldText: string, newText: string) => {
    cy.contains('li', oldText).click()
    editTodo(newText);
});

Then('I should not see {string} in the Todo list', (text: string) => {
    cy.get('ul').should('not.contain', text);
});

function visitLink() {
    cy.visit('http://localhost:8080/');
}

function addTodo(text: string) {
    cy.get('input[placeholder="Enter a todo"]').type(text);
    cy.get('button').contains('Add Todo').click();
}

function editTodo(newText: string) {
    cy.get('input[placeholder="Enter a todo"]').clear().type(newText);
    cy.get('button').contains('Edit Todo').click();
}
