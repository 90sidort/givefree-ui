import { useRouter } from "next/dist/client/router";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";

export default function Taken() {
  const {
    query: { page },
  } = useRouter();
  const currentPage = page ? parseInt(page) : 1;
  return (
    <div>
      <Pagination page={currentPage} status="GIVEN" takerId={11122} />
      <Items page={currentPage} status="GIVEN" />
      <Pagination page={currentPage} status="GIVEN" takerId={11122} />
    </div>
  );
}
