import gql from "graphql-tag";

export const GET_ITEMS = gql`
  query GET_ITEMS {
    getItems {
      name
      id
      state
      status
      description
      category
      images {
        url
        alt
      }
    }
  }
`;
