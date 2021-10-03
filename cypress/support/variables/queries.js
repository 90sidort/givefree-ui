export const addToWishlistReq = (idItem) => ({
  operationName: "ADD_ITEM_TO_WISHLIST",
  variables: {
    itemId: idItem,
  },
  query:
    "mutation ADD_ITEM_TO_WISHLIST($itemId: Int!) {\n  addToWishlist(itemId: $itemId)\n}\n",
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
      description: "",
    },
    file: "",
  },
  query:
    "mutation ADD_ITEM($item: ItemInput!, $file: FileUpload) {\n  addItem(item: $item, file: $file) {\n    name\n    id\n    description\n    category\n    images {\n      url\n      alt\n      __typename\n    }\n    __typename\n  }\n}\n",
};
export const giveItemReq = {
  operationName: "GIVE_ITEM",
  variables: {
    userId: 11123,
    itemId: 11195,
  },
  query:
    "mutation GIVE_ITEM($userId: Int!, $itemId: Int!) {\n  giveItem(userId: $userId, itemId: $itemId) {\n    id\n    __typename\n  }\n}\n",
};
export const signoutReq = {
  operationName: "SIGN_OUT",
  variables: {},
  query: "mutation SIGN_OUT {\n  signout\n}\n",
};
