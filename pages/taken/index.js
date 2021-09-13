import { useRouter } from "next/dist/client/router";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";
import { useUser } from "../../components/User";

export default function Taken() {
  const userData = useUser();
  const {
    query: { page },
  } = useRouter();
  const currentPage = page ? parseInt(page) : 1;
  const takerId = userData?.me?.id;
  const view = "taken";
  return (
    <div>
      <Pagination page={currentPage} takerId={takerId} view={view} />
      <Items page={currentPage} view={view} />
      <Pagination page={currentPage} takerId={takerId} view={view} />
    </div>
  );
}
