import { useMutation } from "@apollo/client";
import { GET_WISHLIST, REMOVE_FROM_WISHLIST } from "../graphql/wishlist";
import { WishlistButtonStyles } from "./styles/WishlistStyles";

export default function RemoveFromWishlist({ itemId }) {
  const [removeFromWishlist, { loading, error, data }] = useMutation(
    REMOVE_FROM_WISHLIST,
    {
      variables: { itemId },
      refetchQueries: [{ query: GET_WISHLIST, variables: { userId: 11122 } }],
    }
  );
  return (
    <WishlistButtonStyles
      type="button"
      onClick={removeFromWishlist}
      disabled={loading}
    >
      x
    </WishlistButtonStyles>
  );
}
