export const itemDetailsName = 'h2[data-test="itemDetailsName"]';
export const itemCard = 'div[data-test="itemCard"]';
export const itemLink = 'a[data-test="itemLink"]';
export const catTag = 'span[data-test="categoryTag"]';
export const itemDescription = 'p[data-test="itemDescription"]';
export const addToWishlistBttn = 'button[data-test="addToWishlistBttn"]';
export const editItemButton = 'a[data-test="editItemButton"]';
export const giveItemButton = 'button[data-test="giveItemButton"]';
export const deleteItemButton = 'button[data-test="deleteItemButton"]';
export const wishlistCounter = 'div[data-test="wishlistCount"]';
export const removeFormWishlist = 'button[data-test="removeFormWishlist"]';
export const wishlistItemTitle = name => `h3[data-test="itemTitle_${name}"]`;
export const closeWisherBttn = 'button[data-test="closeWisherBttn"]';
export const closeWishBttn = 'button[data-test="closeWishBttn"]';
export const emailParagraph = 'p[data-test="emailParagraph"]';
export const addToWishlistReq = idItem => ({
  operationName: "ADD_ITEM_TO_WISHLIST",
  variables: {
    itemId: idItem
  },
  query:
    "mutation ADD_ITEM_TO_WISHLIST($itemId: Int!) {\n  addToWishlist(itemId: $itemId)\n}\n"
});
