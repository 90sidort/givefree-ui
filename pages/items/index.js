import { useRouter } from "next/dist/client/router";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";

export default function Item() {
  const {
    query: { page },
  } = useRouter();
  console.log(page);
  const currentPage = page ? parseInt(page) : 1;
  return (
    <div>
      <Pagination page={currentPage} />
      <Items page={currentPage} />
      <Pagination page={currentPage} />
    </div>
  );
}
