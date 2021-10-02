import React from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";

import { GET_WISHLIST } from "../graphql/wishlist";
import { WishlistItemStyles, WishlistStyles } from "./styles/WishlistStyles";
import { useUser } from "./User";
import DisplayError from "./ErrorMessage";
import Supreme from "./styles/Supreme";
import { useWishlist } from "../lib/WishlistState";
import CloseButtonStyles from "./styles/CloseButtonStyles";
import RemoveFromWishlist from "./RemoveFromWishlist";

function WishlistItem({ item, i }) {
  return (
    <WishlistItemStyles key={i}>
      {item.images.length > 0 ? (
        item.images.map((image, id) => {
          return <img key={id} src={image.url} alt={image.alt} width="100" />;
        })
      ) : (
        <img
          width="100"
          src="http://localhost:4000/placeholder.jpg"
          alt="placeholder"
        />
      )}
      <div>
        <h3 data-test={`itemTitle_${item.name}`}>
          <Link href={`/item/${item.id}`}>{item.name}</Link>
        </h3>
        <p>{item.category}</p>
        <p>{item.state}</p>
      </div>
      <RemoveFromWishlist itemId={item.id} />
    </WishlistItemStyles>
  );
}

export default function Wishlist() {
  const me = useUser();
  const { wishlistOpen, closeWishlist, setWishlistCount } = useWishlist();
  const { data, loading, error } = useQuery(GET_WISHLIST, {
    variables: { userId: me?.me?.id },
    skip: me?.me?.id === undefined,
  });
  if (!me || !data) return null;
  if (data?.getWishlist?.length > 0)
    setWishlistCount(data?.getWishlist?.length);
  return (
    <WishlistStyles open={wishlistOpen}>
      <DisplayError error={error} />
      {loading && <p>Loading...</p>}
      <header>
        <Supreme>
          {me?.me?.username}
          's wishlist
        </Supreme>
        <CloseButtonStyles onClick={closeWishlist} data-test="closeWishBttn">
          &times;
        </CloseButtonStyles>
      </header>
      <ul>
        {data.getWishlist.length > 0 ? (
          data.getWishlist.map((wish, i) => (
            <WishlistItem item={wish} i={i} key={i} />
          ))
        ) : (
          <p>Your wishlist is empty!</p>
        )}
      </ul>
    </WishlistStyles>
  );
}
