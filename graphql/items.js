import gql from "graphql-tag";

export const ADD_ITEM = gql`
  mutation ADD_ITEM($item: ItemInput!, $file: FileUpload) {
    addItem(item: $item, file: $file) {
      name
      id
      description
      category
      images {
        url
        alt
      }
    }
  }
`;

export const GET_ITEM = gql`
  query GET_ITEM($id: Int) {
    getItems(id: $id) {
      name
      id
      state
      status
      category
      description
      images {
        url
        alt
      }
      giver {
        username
        id
      }
    }
  }
`;

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

export const UPDATE_ITEM = gql`
  mutation UPDATE_ITEM($id: Int!, $item: ItemInputUpdate!) {
    updateItem(id: $id, item: $item) {
      name
      id
    }
  }
`;
