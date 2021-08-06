import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";

Given("I search {string}", (searchTerm) => {
  cy.get("input.search-input").clear().type(`${searchTerm}\n`);
});

Given("I sort by {string}", (sortColumn) => {
  cy.get(".table").contains(sortColumn).click();
});

Then("I see the first row age is {string}", (age) => {
  cy.get("tbody").children().eq(0).children().eq(2).contains(age);
});

Then("I see the id {string}", (id) => {
  cy.get(".table").contains(id);
});

Then("I don't see any {string}", (matchTerm) => {
  cy.get(".table").contains(matchTerm).should("not.exist");
});

Then("The first row is {string}", (name) => {
  cy.get("tbody").children().eq(0).contains(name);
});

Then("I see {string} in the name input", (name) => {
  cy.get("div.form-field").eq(1).children().eq(1).should("have.value", name);
});

And("I fill the {string} field with {string}", (fieldLabel, fieldContent) => {
  cy.get("div.form-field").contains(fieldLabel).parent().children().eq(1).clear().type(fieldContent);
});
