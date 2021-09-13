import { useMutation } from "@apollo/client";
import { ADD_ITEM_TO_WISHLIST, GET_WISHLIST } from "../graphql/wishlist";
import { useUser } from "./User";

export default function AddToWishlist({ id }) {
  const userData = useUser();
  const [addToWishlist, { data, error, loading }] = useMutation(
    ADD_ITEM_TO_WISHLIST,
    {
      variables: { itemId: id },
      refetchQueries: [
        { query: GET_WISHLIST, variables: { userId: userData?.me?.id } },
      ],
    }
  );
  return (
    <button disabled={loading} type="button" onClick={addToWishlist}>
      + Add{loading && "ing"} to wishlist
    </button>
  );
}
