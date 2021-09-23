import Router from "next/router";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ME, SIGN_OUT } from "../graphql/user";
import Modal from "./Modal";

export default function Signout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [signout, { data, error }] = useMutation(SIGN_OUT, {
    refetchQueries: [{ query: ME }],
    onError: () => setShowModal(true),
  });
  const handleSignout = async () => {
    await signout();
    Router.push({
      pathname: `/signin`,
    });
  };
  return (
    <>
      <button type="button" onClick={handleSignout} data-test="signoutButton">
        Sign out
      </button>
      <Modal
        show={showModal}
        title="Error!"
        onClose={() => setShowModal(false)}
      >
        {`${error?.message}`}
      </Modal>
    </>
  );
}
