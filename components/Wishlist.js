import { useQuery } from "@apollo/client";

import { GET_WISHLIST } from "../graphql/wishlist";
import { WishlistItemStyles, WishlistStyles } from "./styles/WishlistStyles";
import { useUser } from "./User";
import DisplayError from "./ErrorMessage";
import Supreme from "./styles/Supreme";

function WishlistItem({ item, i }) {
  return (
    <WishlistItemStyles key={i}>
      {item.images.length > 0 ? (
        item.images.map((image, i) => {
          return <img key={i} src={image.url} alt={image.alt} width="100" />;
        })
      ) : (
        <img
          width="100"
          src={"http://localhost:4000/placeholder.jpg"}
          alt={"placeholder"}
        />
      )}
      <div>
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <p>{item.state}</p>
      </div>
    </WishlistItemStyles>
  );
}

export default function Wishlist() {
  const me = useUser();
  const { data, loading, error } = useQuery(GET_WISHLIST, {
    variables: { userId: 11122 },
  });
  if (!me || !data) return null;
  return (
    <WishlistStyles open>
      <DisplayError error={error} />
      {loading && <p>Loading...</p>}
      <header>
        <Supreme>{me.me.username}'s wishlist</Supreme>
      </header>
      <ul>
        {data.getWishlist.length > 0 ? (
          data.getWishlist.map((wish, i) => <WishlistItem item={wish} i={i} />)
        ) : (
          <p>Your wishlist is empty!</p>
        )}
      </ul>
    </WishlistStyles>
  );
}
