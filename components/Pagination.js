import { useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { perPage } from "../config";

import { COUNT_ITEMS } from "../graphql/items";
import { findLink } from "../lib/findLink";
import DisplayError from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";

export default function Pagination({ page, takerId, view }) {
  const { error, loading, data } = useQuery(COUNT_ITEMS, {
    variables: { input: { takerId, view } },
  });
  const links = findLink(page);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { countItems } = data;
  const pageCount = Math.ceil(countItems / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>GiveFree! - Page {page}</title>
      </Head>
      <Link href={links.prev}>
        <a aria-disabled={page <= 1}>{`< Prev`}</a>
      </Link>
      <p>
        Page {page} of {`${pageCount}`}
      </p>
      <p>{`${countItems} items total`}</p>
      <Link href={links.next}>
        <a aria-disabled={page >= pageCount}>{`Next >`}</a>
      </Link>
    </PaginationStyles>
  );
}
