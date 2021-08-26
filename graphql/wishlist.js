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
