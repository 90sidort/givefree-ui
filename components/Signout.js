import Router from "next/router";
import { useMutation } from "@apollo/client";

import { ME, SIGN_OUT } from "../graphql/user";

export default function Signout({ children }) {
  const [signout, { data }] = useMutation(SIGN_OUT, {
    refetchQueries: [{ query: ME }],
  });
  const handleSignout = async () => {
    await signout();
    Router.push({
      pathname: `/signin`,
    });
  };
  return (
    <button type="button" onClick={handleSignout} data-test="signoutButton">
      Sign out
    </button>
  );
}
