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
export const itemNameInput = 'input[data-test="itemNameInput"]';
export const itemFileInput = 'input[data-test="itemFileInput"]';
export const itemStateSelect = 'select[data-test="itemStateSelect"]';
export const itemCategorySelect = 'select[data-test="itemCategorySelect"]';
export const itemStatusSelect = 'select[data-test="itemStatusSelect"]';
export const itemDescriptionTextarea =
  'textarea[data-test="itemDescriptionTextarea"]';
export const resetItemBttn = 'button[data-test="resetItemBttn"]';
export const addItemBttn = 'button[data-test="addItemBttn"]';
export const imagePlaceholder = 'img[data-test="imagePlaceholder"]';
export const pngExample = "png_example.png";
export const errorUnauthorized = "Unauthorized! You need to log in!";
export const errorName = "is not between 4 and 400 characters long!";
export const errorDesc = "Description has to be between 5 and 2000 characters!";
export const itemDetailsImage = 'img[data-test="itemDetailsImage"]';
export const updateItemBttn = 'button[data-test="updateItemButton"]';
export const confirmBttn = 'a[data-test="confirmBttn"]';
export const possibleTakersH3 = 'h3[data-test="possibleTakersH3"]';
export const noTakerPar = 'p[data-test="noTakers"]';
export const acceptUserOffer = 'button[data-test="acceptUserOffer"]';
export const givenToPar = 'p[data-test="givenToPar"]';

export const addToWishlistReq = idItem => ({
  operationName: "ADD_ITEM_TO_WISHLIST",
  variables: {
    itemId: idItem
  },
  query:
    "mutation ADD_ITEM_TO_WISHLIST($itemId: Int!) {\n  addToWishlist(itemId: $itemId)\n}\n"
});
export const addItemReq = {
  operationName: "ADD_ITEM",
  variables: {
    item: {
      name: "newTestItem",
      state: "GOOD",
      category: "OTHER",
      status: "ONGOING",
      giverId: 11123,
      description: ""
    },
    file: ""
  },
  query:
    "mutation ADD_ITEM($item: ItemInput!, $file: FileUpload) {\n  addItem(item: $item, file: $file) {\n    name\n    id\n    description\n    category\n    images {\n      url\n      alt\n      __typename\n    }\n    __typename\n  }\n}\n"
};
