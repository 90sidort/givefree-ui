import Link from "next/link";

import Navigation from "./Navigation";
import Search from "./Search";
import HeaderStyles from "./styles/HeaderStyles";
import LogoStyles from "./styles/LogoStyles";
import Wishlist from "./Wishlist";
import Wisherlist from "./Wisherlist";

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
        <Search />
      </div>
      <Wishlist />
      <Wisherlist />
    </HeaderStyles>
  );
}
