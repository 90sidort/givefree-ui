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
  query GET_ITEM($id: Int!) {
    getItem(id: $id) {
      name
      id
      state
      status
      category
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

export const GET_ITEMS_SEARCH = gql`
  query GET_ITEMS($name: String, $description: String) {
    items: getItems(name: $name, description: $description) {
      name
      id
      images {
        url
        alt
      }
    }
  }
`;

export const GET_ITEMS = gql`
  query GET_ITEMS(
    $skip: Int
    $first: Int
    $name: String
    $description: String
  ) {
    getItems(
      skip: $skip
      first: $first
      name: $name
      description: $description
    ) {
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
        name
        id
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

export const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export const COUNT_ITEMS = gql`
  query COUNT_ITEMS {
    countItems
  }
`;
