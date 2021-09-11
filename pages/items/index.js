import { useRouter } from "next/dist/client/router";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";

export default function Item() {
  const {
    query: { page },
  } = useRouter();
  const currentPage = page ? parseInt(page) : 1;
  const status = "ONGOING";
  const taken = undefined;
  return (
    <div>
      <Pagination page={currentPage} status={status} taken={taken} />
      <Items page={currentPage} status={status} taken={taken} />
      <Pagination page={currentPage} status={status} taken={taken} />
    </div>
  );
}
