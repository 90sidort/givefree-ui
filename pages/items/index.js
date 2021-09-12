import { useRouter } from "next/dist/client/router";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";

export default function Item() {
  const {
    query: { page },
  } = useRouter();
  const currentPage = page ? parseInt(page) : 1;
  const view = "items";
  return (
    <div>
      <Pagination page={currentPage} view={view} />
      <Items page={currentPage} view={view} />
      <Pagination page={currentPage} view={view} />
    </div>
  );
}
