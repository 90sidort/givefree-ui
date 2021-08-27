import { useMutation } from "@apollo/client";
import { ADD_ITEM_TO_WISHLIST, GET_WISHLIST } from "../graphql/wishlist";

export default function AddToWishlist({ id }) {
  const [addToWishlist, { data, error, loading }] = useMutation(
    ADD_ITEM_TO_WISHLIST,
    {
      variables: { itemId: id },
      refetchQueries: [{ query: GET_WISHLIST, variables: { userId: 11122 } }],
    }
  );
  return (
    <button disabled={loading} type="button" onClick={addToWishlist}>
      + Add{loading && "ing"} to wishlist
    </button>
  );
}
