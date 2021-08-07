import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";

Then("I see two chart components rendered", () => {
  cy.get("div.vue-apexcharts").should("have.length", 2);
});
