import gql from "graphql-tag";

export const GET_WISHLIST = gql`
  query GET_WISHLIST($userId: Int!) {
    getWishlist(userId: $userId) {
      id
      name
      category
      state
      images {
        url
        alt
      }
    }
  }
`;

export const ADD_ITEM_TO_WISHLIST = gql`
  mutation ADD_ITEM_TO_WISHLIST($itemId: Int!) {
    addToWishlist(itemId: $itemId)
  }
`;
