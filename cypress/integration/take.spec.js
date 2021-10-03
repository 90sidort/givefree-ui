import {
  waitStandard,
  prevPageButton,
  nextPageButton,
  navGive,
  sectionWishlist,
  modalElement,
  closeModal,
  modalContent,
  navTake,
} from "../support/variables/general";

import {
  itemDetailsName,
  itemCard,
  itemDescription,
  catTag,
  itemLink,
  addToWishlistBttn,
  editItemButton,
  giveItemButton,
  deleteItemButton,
  wishlistCounter,
  wishlistItemTitle,
  removeFormWishlist,
  closeWishBttn,
  emailParagraph,
} from "../support/variables/item";

import { addToWishlistReq } from "../support/variables/queries";

import { validUsername, validPassword } from "../support/variables/sign";

describe("Tests for take item functionalities", () => {
  before(() => {
    cy.mockDB().then(() => {
      cy.wait(500);
    });
  });
  it("Should display items and link to their descriptions(without signin)", () => {
    cy.visit("/");
    cy.get(itemCard, { timeout: waitStandard }).should("have.length", 16);
    cy.get(addToWishlistBttn, { timeout: waitStandard }).should("not.exist");
    cy.get(itemDescription, { timeout: waitStandard })
      .eq(3)
      .invoke("text")
      .should("include", "...");
    cy.get(catTag, { timeout: waitStandard })
      .eq(3)
      .invoke("text")
      .should("include", "COAT");
    cy.get(itemLink).eq(3).invoke("text").should("include", "Programmable");
    cy.get(itemLink).eq(3).click();
    cy.url().should("include", "/item/11189");
    cy.get(itemDetailsName, { timeout: waitStandard })
      .should("be.visible")
      .invoke("text")
      .should("include", "Programmable");
  });
  it("Should be able to change pages back and forth (without signin)", () => {
    cy.visit("/");
    cy.checkPageBttn("true", "false");
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.url().should("include", "/items/2");
    cy.checkPageBttn("false", "false");
    cy.get(prevPageButton, { timeout: waitStandard }).eq(0).click();
    cy.url().should("include", "/items/1");
    cy.checkPageBttn("true", "false");
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.url().should("include", "/items/2");
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.url().should("include", "/items/6");
    cy.checkPageBttn("false", "true");
  });
  it("Should display items with options for logged users", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.visit("/");
    cy.get(addToWishlistBttn, { timeout: waitStandard })
      .should("be.visible")
      .should("have.length", 11);
    cy.get(editItemButton, { timeout: waitStandard })
      .should("be.visible")
      .should("have.length", 5);
    cy.get(giveItemButton, { timeout: waitStandard })
      .should("be.visible")
      .should("have.length", 5);
    cy.get(deleteItemButton, { timeout: waitStandard })
      .should("be.visible")
      .should("have.length", 5);
    cy.get(itemLink).eq(3).invoke("text").should("include", "Programmable");
    cy.get(itemLink).eq(3).click();
    cy.url().should("include", "/item/11189");
    cy.get(itemDetailsName, { timeout: waitStandard })
      .should("be.visible")
      .invoke("text")
      .should("include", "Programmable");
  });
  it("Should be able to change pages back and forth (logged))", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.visit("/");
    cy.checkPageBttn("true", "false");
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.url().should("include", "/items/2");
    cy.checkPageBttn("false", "false");
    cy.get(prevPageButton, { timeout: waitStandard }).eq(0).click();
    cy.url().should("include", "/items/1");
    cy.checkPageBttn("true", "false");
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.url().should("include", "/items/2");
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.get(nextPageButton, { timeout: waitStandard }).eq(0).click();
    cy.url().should("include", "/items/6");
    cy.checkPageBttn("false", "true");
  });
  it("Should show different details for items in/ not in wishlist", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.visit("/");
    cy.get(itemLink, { timeout: waitStandard }).eq(0).click();
    cy.get(itemDetailsName, { timeout: waitStandard })
      .invoke("text")
      .should("include", "customer loyalty");
    cy.get(addToWishlistBttn, { timeout: waitStandard }).should("be.visible");
    cy.get(emailParagraph, { timeout: waitStandard }).should("not.exist");
    cy.get(navTake, { timeout: waitStandard }).click();
    cy.get(itemLink, { timeout: waitStandard }).eq(1).click();
    cy.get(addToWishlistBttn, { timeout: waitStandard }).should("not.exist");
    cy.get(emailParagraph, { timeout: waitStandard }).should("be.visible");
  });
  it("Should be able to add item to wishlist from details", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.visit("/");
    cy.get(itemLink, { timeout: waitStandard }).eq(2).click();
    cy.get(itemDetailsName, { timeout: waitStandard })
      .invoke("text")
      .should("include", "adapter");
    cy.get(addToWishlistBttn, { timeout: waitStandard }).should("be.visible");
    cy.get(emailParagraph, { timeout: waitStandard }).should("not.exist");
    cy.get(addToWishlistBttn, { timeout: waitStandard }).click();
    cy.get(addToWishlistBttn, { timeout: waitStandard }).should("not.exist");
    cy.get(emailParagraph, { timeout: waitStandard }).should("be.visible");
  });
  it("Should be able to open and close wishlist", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.get(sectionWishlist, { timeout: waitStandard }).click();
    cy.get(wishlistItemTitle("discrete"), { timeout: waitStandard }).should(
      "be.visible"
    );
    cy.get(closeWishBttn, { timeout: waitStandard }).click({ force: true });
    cy.get(wishlistItemTitle("discrete"), { timeout: waitStandard }).should(
      "not.be.visible"
    );
  });
  it("Should be able to add item to wishlist", () => {
    cy.intercept("POST", "**/graphql").as("request");
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.visit("/");
    cy.get(addToWishlistBttn, { timeout: waitStandard }).eq(0).click();
    cy.wait("@request").then((interception) => {
      expect(interception.response.body.data.addToWishlist).to.eq(true);
    });
    cy.get(wishlistCounter, { timeout: waitStandard }).should("have.text", "9");
    cy.get(sectionWishlist, { timeout: waitStandard }).click();
    cy.get(wishlistItemTitle("customer loyalty"), {
      timeout: waitStandard,
    }).should("exist");
  });
  it("Should not be able to add the same item again to wishlist", () => {
    cy.intercept("POST", "**/graphql").as("request");
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.visit("/");
    cy.get(addToWishlistBttn, { timeout: waitStandard }).eq(1).click();
    cy.get(modalContent, { timeout: waitStandard })
      .scrollIntoView()
      .should("be.visible")
      .invoke("text")
      .should("include", "User already added this item to wishlist");
    cy.get(closeModal, { timeout: waitStandard }).click();
    cy.get(modalElement, { timeout: waitStandard }).should("not.exist");
  });
  it("Should be able to remove item from wishlist", () => {
    cy.loginNoUI(validUsername, validPassword);
    cy.get(navGive, { timeout: waitStandard }).should("be.visible");
    cy.get(wishlistCounter, { timeout: waitStandard }).then((countOne) => {
      const originalCount = countOne[0].innerText;
      cy.get(sectionWishlist, { timeout: waitStandard }).click();
      cy.get(wishlistItemTitle("discrete"), { timeout: waitStandard }).should(
        "exist"
      );
      cy.get(removeFormWishlist, { timeout: waitStandard }).eq(0).click();
      cy.get(wishlistItemTitle("discrete"), { timeout: waitStandard }).should(
        "not.exist"
      );
      cy.get(wishlistCounter, { timeout: waitStandard }).then((countTwo) => {
        const changedCount = countTwo[0].innerText;
        expect(changedCount).to.not.eq(originalCount);
      });
    });
  });
  it("Should not be able to add more than 10 items to wishlist", () => {
    cy.mockDB().then(() => {
      cy.wait(500);
      cy.loginNoUI(validUsername, validPassword).then(() => {
        cy.request({
          method: "POST",
          url: "http://localhost:4000/graphql",
          body: addToWishlistReq(1118),
        }).then(() => {
          cy.request({
            method: "POST",
            url: "http://localhost:4000/graphql",
            body: addToWishlistReq(1115),
          }).then(() => {
            cy.request({
              method: "POST",
              url: "http://localhost:4000/graphql",
              body: addToWishlistReq(1112),
            }).then(() => {
              cy.get(navGive, { timeout: waitStandard }).should("be.visible");
              cy.visit("/");
              cy.get(addToWishlistBttn, { timeout: waitStandard })
                .eq(0)
                .click();
              cy.get(modalContent, { timeout: waitStandard })
                .scrollIntoView()
                .should("be.visible")
                .invoke("text")
                .should(
                  "include",
                  "Can not have more than 10 items on wishlist!"
                );
              cy.get(closeModal, { timeout: waitStandard }).click();
              cy.get(modalElement, { timeout: waitStandard }).should(
                "not.exist"
              );
            });
          });
        });
      });
    });
  });
});
