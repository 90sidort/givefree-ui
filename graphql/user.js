import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation SIGN_IN($username: String!, $password: String!) {
    signinUser(password: $password, username: $username)
  }
`;

export const ME = gql`
  query ME {
    me {
      username
      id
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signout
  }
`;
