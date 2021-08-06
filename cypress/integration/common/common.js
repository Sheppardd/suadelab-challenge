import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given("I navigate to the app", () => {
  cy.visit("/");
});

Given("I navigate to {string}", (path) => {
  cy.visit(path);
});

Given("I reload the page", () => {
  cy.reload();
});

Given("I go to the {string} view", (viewName) => {
  cy.visit(viewName.toLowerCase());
});

Given("I click on {string} button", (buttonName) => {
  cy.contains("button.app-button", buttonName).click();
});

And("I click on {string} button", (buttonName) => {
  cy.contains("button.app-button", buttonName).click();
});

Then("I see {string} in the URL", (partialURL) => {
  cy.url().should("include", partialURL);
});
