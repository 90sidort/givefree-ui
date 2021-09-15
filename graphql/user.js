import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation SIGN_IN($username: String!, $password: String!) {
    signinUser(password: $password, username: $username)
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $id: Int!
    $name: String
    $surname: String
    $active: Boolean
    $email: String
    $about: String
  ) {
    updateUser(
      id: $id
      name: $name
      surname: $surname
      active: $active
      email: $email
      about: $about
    ) {
      id
      name
      surname
      active
      email
      about
    }
  }
`;

export const ME = gql`
  query ME {
    me {
      username
      id
      name
      surname
      email
      about
      active
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signout
  }
`;

export const RESET_REQUEST = gql`
  mutation RESET_REQUEST($email: String!) {
    requestReset(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $email: String!
    $token: String!
    $password: String!
    $retype: String!
  ) {
    resetPassword(
      email: $email
      token: $token
      password: $password
      retype: $retype
    )
  }
`;

export const SIGN_UP = gql`
  mutation SIGN_UP(
    $username: String!
    $name: String!
    $surname: String!
    $password: String!
    $email: String!
    $retype: String!
    $about: String
  ) {
    signupUser(
      username: $username
      name: $name
      surname: $surname
      password: $password
      retype: $retype
      email: $email
      about: $about
    )
  }
`;
