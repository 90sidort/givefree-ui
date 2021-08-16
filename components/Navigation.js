import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/item">Items</Link>
      <Link href="/give">Give</Link>
      <Link href="/take">Take</Link>
      <Link href="/history">History</Link>
      <Link href="/account">Account</Link>
    </nav>
  );
}
