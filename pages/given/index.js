import React from "react";
import { useRouter } from "next/dist/client/router";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";
import { useUser } from "../../components/User";

export default function Given() {
  const userData = useUser();
  const {
    query: { page },
  } = useRouter();
  const currentPage = page ? parseInt(page, 10) : 1;
  const takerId = userData?.me?.id;
  const view = "given";
  return (
    <div>
      <Pagination page={currentPage} takerId={takerId} view={view} />
      <Items page={currentPage} view={view} />
      <Pagination page={currentPage} takerId={takerId} view={view} />
    </div>
  );
}
