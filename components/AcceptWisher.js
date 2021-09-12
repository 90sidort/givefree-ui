import { useMutation } from "@apollo/client";
import { GET_GIVING } from "../graphql/items";
import { GET_WISHERS, GIVE_ITEM } from "../graphql/wishlist";
import { WishlistButtonStyles } from "./styles/WishlistStyles";

export default function AcceptWisher({ wisherId, itemId }) {
  const [acceptWisher, { loading, error, data }] = useMutation(GIVE_ITEM, {
    variables: { userId: wisherId, itemId },
    refetchQueries: [
      { query: GET_WISHERS, variables: { itemId } },
      { query: GET_GIVING, variables: { input: { view: "giving" } } },
    ],
  });
  console.log(itemId);
  return (
    <WishlistButtonStyles
      type="button"
      onClick={acceptWisher}
      disabled={loading}
    >
      &#10003;
    </WishlistButtonStyles>
  );
}
