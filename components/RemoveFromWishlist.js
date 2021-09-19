import { useMutation } from "@apollo/client";
import { GET_ITEM } from "../graphql/items";

import { GET_WISHLIST, REMOVE_FROM_WISHLIST } from "../graphql/wishlist";
import { WishlistButtonStyles } from "./styles/WishlistStyles";
import { useUser } from "./User";

export default function RemoveFromWishlist({ itemId }) {
  const userData = useUser();
  const [removeFromWishlist, { loading, error, data }] = useMutation(
    REMOVE_FROM_WISHLIST,
    {
      variables: { itemId },
      refetchQueries: [
        { query: GET_WISHLIST, variables: { userId: userData?.me?.id } },
        { query: GET_ITEM, variables: { id: itemId } },
      ],
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
