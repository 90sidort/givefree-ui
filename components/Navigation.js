import Link from "next/link";
import Signout from "./Signout";
import NavStyles from "./styles/NavStyles";

import { useUser } from "./User";

export default function Navigation() {
  const data = useUser();
  return (
    <NavStyles>
      <Link href="/items">Items</Link>
      {data?.me && (
        <>
          <Link href="/give">Give</Link>
          <Link href="/take">Take</Link>
          <Link href="/history">History</Link>
          <Link href="/account">Account</Link>
          <Signout />
        </>
      )}
      {!data?.me && <Link href="/signin">Sign in</Link>}
    </NavStyles>
  );
}
