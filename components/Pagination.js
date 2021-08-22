import { useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { perPage } from "../config";

import { COUNT_ITEMS } from "../graphql/items";
import DisplayError from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(COUNT_ITEMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { countItems } = data;
  const pageCount = Math.ceil(countItems / perPage);
  console.log(page <= 1);
  return (
    <PaginationStyles>
      <Head>
        <title>GiveFree! - Page {page}</title>
      </Head>
      <Link href={`/items/${page - 1}`}>
        <a aria-disabled={page <= 1}>{`< Prev`}</a>
      </Link>
      <p>
        Page {page} of {`${pageCount}`}
      </p>
      <p>{`${countItems} items total`}</p>
      <Link href={`/items/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>{`Next >`}</a>
      </Link>
    </PaginationStyles>
  );
}
