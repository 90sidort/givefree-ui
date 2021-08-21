import { useQuery } from "@apollo/client";

import { GET_ITEMS } from "../graphql/items";
import ItemCard from "./ItemCard";
import { ItemsList } from "./styles/Items";

export default function Items() {
  const { data, error, loading } = useQuery(GET_ITEMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {`${error.message}`}</p>;
  return (
    <div>
      <ItemsList>
        {data.getItems.map((item, i) => {
          return <ItemCard key={i} item={item} />;
        })}
      </ItemsList>
    </div>
  );
}
