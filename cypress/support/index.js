import "./commands/commands";

// Dnt fail tests on certain exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  if (
    err.message.includes("Target container is not a DOM element") ||
    err.message.includes("User not logged in!")
  ) {
    return false;
  }
});
