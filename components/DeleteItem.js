import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import { DELETE_ITEM } from "../graphql/items";
import Modal from "./Modal";

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteItem));
}

export default function DeleteItem({ id, children }) {
  const [showModal, setShowModal] = useState(false);
  const numId = parseInt(id, 10);
  const [deleteItem, { loading }] = useMutation(DELETE_ITEM, {
    variables: { id: numId },
    update,
  });
  return (
    <>
      <button
        type="button"
        disabled={loading}
        onClick={() => setShowModal(true)}
        data-test="deleteItemButton"
      >
        {children}
      </button>
      <Modal
        show={showModal}
        title="Are you sure?"
        confirm="Delete"
        onClose={() => setShowModal(false)}
        onConfirm={() => deleteItem().catch((err) => console.log(err))}
      >
        Item will be irreversibly deleted!
      </Modal>
    </>
  );
}
