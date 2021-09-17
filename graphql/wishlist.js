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

export const GIVE_ITEM = gql`
  mutation GIVE_ITEM($userId: Int!, $itemId: Int!) {
    giveItem(userId: $userId, itemId: $itemId) {
      id
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation REMOVE_FROM_WISHLIST($itemId: Int!) {
    removeFromWishlist(itemId: $itemId)
  }
`;

export const GET_WISHERS = gql`
  query GET_WISHERS($itemId: Int) {
    getWishers(itemId: $itemId) {
      id
      username
    }
  }
`;
