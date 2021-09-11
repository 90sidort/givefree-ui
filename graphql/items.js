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
  query GET_ITEMS($input: ItemSearchInput!) {
    items: getItems(input: $input) {
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

export const GET_TAKEN = gql`
  query GET_TAKEN($input: ItemSearchInput!) {
    getTaken(input: $input) {
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
    }
  }
`;

export const GET_GIVEN = gql`
  query GET_GIVEN($input: ItemSearchInput!) {
    getGiven(input: $input) {
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
    }
  }
`;

export const GET_ITEMS = gql`
  query GET_ITEMS($input: ItemSearchInput!) {
    getItems(input: $input) {
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
  query COUNT_ITEMS($input: ItemCountInput!) {
    countItems(input: $input)
  }
`;
