import Link from "next/link";

import Navigation from "./Navigation";
import HeaderStyles from "./styles/HeaderStyles";
import LogoStyles from "./styles/LogoStyles";
import Wishlist from "./Wishlist";

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <LogoStyles>
          <Link href="/">Give Free</Link>
        </LogoStyles>
        <Navigation />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Wishlist />
    </HeaderStyles>
  );
}
