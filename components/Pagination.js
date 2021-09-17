import { useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { perPage } from "../config";

import { COUNT_ITEMS } from "../graphql/items";
import { findLink } from "../lib/findLink";
import Load from "./Load";
import Modal from "./Modal";
import PaginationStyles from "./styles/PaginationStyles";

export default function Pagination({ page, takerId, view }) {
  const [showModal, setShowModal] = useState(false);
  const { data, error, loading } = useQuery(COUNT_ITEMS, {
    variables: { input: { takerId, view } },
    onError: () => setShowModal(true),
  });
  const links = findLink(page);
  const pageCount = Math.ceil(data?.countItems / perPage);
  return (
    <>
      {loading && <Load />}
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
        <p>{`${data?.countItems} items total`}</p>
        <Link href={links.next}>
          <a aria-disabled={page >= pageCount}>{`Next >`}</a>
        </Link>
      </PaginationStyles>
      <Modal
        show={showModal}
        title="Error!"
        onClose={() => setShowModal(false)}
      >
        {`${error?.message}`}
      </Modal>
    </>
  );
}
