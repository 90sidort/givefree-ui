import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import { GET_ITEM } from "../graphql/items";
import {
  ADD_ITEM_TO_WISHLIST,
  GET_WISHERS,
  GET_WISHLIST,
} from "../graphql/wishlist";
import Modal from "./Modal";
import { useUser } from "./User";

export default function AddToWishlist({ id }) {
  const [showModal, setShowModal] = useState(false);
  const intId = parseInt(id, 10);
  const userData = useUser();
  const [addToWishlist, { error, loading }] = useMutation(
    ADD_ITEM_TO_WISHLIST,
    {
      variables: { itemId: intId },
      refetchQueries: [
        { query: GET_WISHLIST, variables: { userId: userData?.me?.id } },
        { query: GET_WISHERS, variables: { itemId: intId } },
        { query: GET_ITEM, variables: { id: intId } },
      ],
      onError: () => {
        setShowModal(true);
      },
    }
  );
  return (
    <>
      <button
        disabled={loading}
        type="button"
        onClick={addToWishlist}
        data-test="addToWishlistBttn"
      >
        + Add
        {loading && "ing "}
        to wishlist
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
