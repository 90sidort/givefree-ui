import { useRouter } from "next/dist/client/router";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";

export default function Given() {
  const {
    query: { page },
  } = useRouter();
  const currentPage = page ? parseInt(page) : 1;
  const status = "GIVEN";
  const takerId = 11122;
  const taken = false;
  return (
    <div>
      <Pagination
        page={currentPage}
        status={status}
        takerId={takerId}
        taken={taken}
      />
      <Items page={currentPage} status={status} taken={taken} />
      <Pagination
        page={currentPage}
        status={status}
        takerId={takerId}
        taken={taken}
      />
    </div>
  );
}
