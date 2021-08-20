import Link from "next/link";
import NavStyles from "./styles/NavStyles";

export default function Navigation() {
  return (
    <NavStyles>
      <Link href="/item">Items</Link>
      <Link href="/give">Give</Link>
      <Link href="/take">Take</Link>
      <Link href="/history">History</Link>
      <Link href="/account">Account</Link>
    </NavStyles>
  );
}
