import { useMutation } from "@apollo/client";

import { ME, SIGN_OUT } from "../graphql/user";

export default function Signout({ children }) {
  const [signout, { data }] = useMutation(SIGN_OUT, {
    refetchQueries: [{ query: ME }],
  });
  return (
    <button type="button" onClick={signout}>
      Sign out
    </button>
  );
}
