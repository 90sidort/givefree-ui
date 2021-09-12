import { useQuery } from "@apollo/client";

import { GET_WISHERS } from "../graphql/user";
import { WishlistItemStyles, WishlistStyles } from "./styles/WishlistStyles";
import { useUser } from "./User";
import DisplayError from "./ErrorMessage";
import Supreme from "./styles/Supreme";
import CloseButtonStyles from "./styles/CloseButtonStyles";
import { useWishlist } from "../lib/WishlistState";

function WisherItem({ wisher, i }) {
  return (
    <WishlistItemStyles key={i}>
      <div>
        <h3>{wisher.username}</h3>
      </div>
      {/* <RemoveFromWishlist itemId={item.id} /> */}
    </WishlistItemStyles>
  );
}

export default function Wisherlist() {
  const {
    wisherlistOpen,
    closeWisherlist,
    setWisherlistCount,
    currentItem,
  } = useWishlist();
  const { data, loading, error } = useQuery(GET_WISHERS, {
    variables: { itemId: currentItem },
  });
  if (!data) return null;
  if (data?.getWishers?.length > 0)
    setWisherlistCount(data?.getWishers?.length);
  return (
    <WishlistStyles open={wisherlistOpen}>
      <DisplayError error={error} />
      {loading && <p>Loading...</p>}
      <header>
        {/* <Supreme>{me?.me?.username}'s wishlist</Supreme> */}
        <CloseButtonStyles onClick={closeWisherlist}>&times;</CloseButtonStyles>
      </header>
      <ul>
        {data.getWishers.length > 0 ? (
          data.getWishers.map((wisher, i) => (
            <WisherItem wisher={wisher} i={i} key={i} />
          ))
        ) : (
          <p>Your wishlist is empty!</p>
        )}
      </ul>
    </WishlistStyles>
  );
}
