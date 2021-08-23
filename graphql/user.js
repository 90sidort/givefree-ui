import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation SIGN_IN($username: String!, $password: String!) {
    signinUser(password: $password, username: $username)
  }
`;
