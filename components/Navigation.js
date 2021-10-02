import React from "react";
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
      <Link href="/items">
        <button type="button" data-test="sectionTake">
          Take
        </button>
      </Link>
      {data?.me && (
        <>
          <Link href="/give">
            <button type="button" data-test="sectionGive">
              Give
            </button>
          </Link>
          <button
            type="button"
            onClick={openWishlist}
            data-test="sectionWishlist"
          >
            Taking
            <WishlistCount count={wishlistCount} />
          </button>
          <Link href="/giving">
            <button type="button" data-test="sectionGiving">
              Giving
            </button>
          </Link>
          <Link href="/taken">
            <button type="button" data-test="sectionTaken">
              Taken
            </button>
          </Link>
          <Link href="/given">
            <button type="button" data-test="sectionGiven">
              Given
            </button>
          </Link>
          <Link href="/account">
            <button type="button" data-test="sectionAccount">
              Account
            </button>
          </Link>
          <Signout />
        </>
      )}
      {!data?.me && (
        <Link href="/signin">
          <button type="button" data-test="sectionSign">
            Sign in
          </button>
        </Link>
      )}
    </NavStyles>
  );
}
