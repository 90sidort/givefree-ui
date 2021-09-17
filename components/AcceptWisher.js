import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_GIVEN, GET_GIVING } from "../graphql/items";
import { GET_WISHERS, GIVE_ITEM } from "../graphql/wishlist";
import Modal from "./Modal";
import { WishlistButtonStyles } from "./styles/WishlistStyles";

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.giveItem));
}

export default function AcceptWisher({ wisherId, itemId }) {
  const [showModal, setShowModal] = useState(false);
  const [acceptWisher, { loading, error, data }] = useMutation(GIVE_ITEM, {
    variables: { userId: wisherId, itemId },
    refetchQueries: [
      { query: GET_WISHERS, variables: { itemId } },
      { query: GET_GIVING, variables: { input: { view: "giving" } } },
      { query: GET_GIVEN, variables: { input: { view: "given" } } },
    ],
    onError: () => setShowModal(true),
    update: update,
  });
  return (
    <>
      <WishlistButtonStyles
        type="button"
        onClick={acceptWisher}
        disabled={loading}
      >
        &#10003;
      </WishlistButtonStyles>
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
