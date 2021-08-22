import { useMutation } from "@apollo/client";

import { DELETE_ITEM } from "../graphql/items";

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteItem));
}

export default function DeleteItem({ id, children }) {
  const numId = parseInt(id);
  const [deleteItem, { loading }] = useMutation(DELETE_ITEM, {
    variables: { id: numId },
    update: update,
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm("Sure you wanna delete?")) {
          deleteItem().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
