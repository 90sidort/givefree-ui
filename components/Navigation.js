import Link from "next/link";
import { useWishlist } from "../lib/WishlistState";
import Signout from "./Signout";
import NavStyles from "./styles/NavStyles";

import { useUser } from "./User";
import WishlistCount from "./WishlistCount";

export default function Navigation() {
  const data = useUser();
  const { openWishlist, wishlistCount } = useWishlist();
  return (
    <NavStyles>
      <Link href="/items">Take</Link>
      {data?.me && (
        <>
          <Link href="/give">Give</Link>
          <Link href="/taken">Taken</Link>
          <Link href="/given">Given</Link>
          <button type="button" onClick={openWishlist}>
            Wishlist
            <WishlistCount count={wishlistCount} />
          </button>
          <Link href="/account">Account</Link>
          <Signout />
        </>
      )}
      {!data?.me && <Link href="/signin">Sign in</Link>}
    </NavStyles>
  );
}
