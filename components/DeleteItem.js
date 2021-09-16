import { useMutation } from "@apollo/client";
import { useState } from "react";

import { DELETE_ITEM } from "../graphql/items";
import Modal from "./Modal";

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteItem));
}

export default function DeleteItem({ id, children }) {
  const [showModal, setShowModal] = useState(false);
  const numId = parseInt(id);
  const [deleteItem, { loading }] = useMutation(DELETE_ITEM, {
    variables: { id: numId },
    update: update,
  });
  return (
    <>
      <button
        type="button"
        disabled={loading}
        onClick={() => setShowModal(true)}
      >
        {children}
      </button>
      <Modal
        show={showModal}
        title="Are you sure?"
        confirm="Delete"
        onClose={() => setShowModal(false)}
        onConfirm={() => deleteItem().catch((err) => alert(err.message))}
      >
        Item will be irreversibly deleted!
      </Modal>
    </>
  );
}
