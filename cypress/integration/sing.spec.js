import { navTake } from "../support/variables/general";
import { validPassword, validUsername } from "../support/variables/sign";

describe("Test for signin/ signup view", () => {
  it("Should be able to log in with correct credentials", () => {
    cy.loginUI(validUsername, validPassword);
    cy.get(navTake, { timeout: 30000 }).should("be.visible");
  });
});
