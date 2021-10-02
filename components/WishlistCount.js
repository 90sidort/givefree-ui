import React from "react";
import { WishlistCountStyles } from "./styles/WishlistStyles";

export default function WishlistCount({ count }) {
  return (
    <WishlistCountStyles data-test="wishlistCount">{count}</WishlistCountStyles>
  );
}
