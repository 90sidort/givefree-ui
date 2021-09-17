import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  ADD_ITEM_TO_WISHLIST,
  GET_WISHERS,
  GET_WISHLIST,
} from "../graphql/wishlist";
import Modal from "./Modal";
import { useUser } from "./User";

export default function AddToWishlist({ id }) {
  const [showModal, setShowModal] = useState(false);
  const userData = useUser();
  const [addToWishlist, { data, error, loading }] = useMutation(
    ADD_ITEM_TO_WISHLIST,
    {
      variables: { itemId: id },
      refetchQueries: [
        { query: GET_WISHLIST, variables: { userId: userData?.me?.id } },
        { query: GET_WISHERS, variables: { itemId: id } },
      ],
      onError: (error) => {
        setShowModal(true);
      },
    }
  );
  return (
    <>
      <button disabled={loading} type="button" onClick={addToWishlist}>
        + Add{loading && "ing"} to wishlist
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
