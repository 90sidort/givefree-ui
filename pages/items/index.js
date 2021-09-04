import { useRouter } from "next/dist/client/router";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";

export default function Item() {
  const {
    query: { page },
  } = useRouter();
  const currentPage = page ? parseInt(page) : 1;
  return (
    <div>
      <Pagination page={currentPage} status="ONGOING" />
      <Items page={currentPage} status="ONGOING" />
      <Pagination page={currentPage} status="ONGOING" />
    </div>
  );
}
