import { useRouter } from "next/dist/client/router";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";

export default function Giving() {
  const {
    query: { page },
  } = useRouter();
  const currentPage = page ? parseInt(page) : 1;
  const takerId = 11122;
  const view = "giving";
  return (
    <div>
      <Pagination page={currentPage} takerId={takerId} view={view} />
      <Items page={currentPage} view={view} />
      <Pagination page={currentPage} takerId={takerId} view={view} />
    </div>
  );
}
