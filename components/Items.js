import { useQuery } from "@apollo/client";
import { perPage } from "../config";

import { GET_ITEMS, GET_TAKEN } from "../graphql/items";
import ItemCard from "./ItemCard";
import { ItemsList } from "./styles/Items";

export default function Items({ page, status }) {
  const executeQuery = status === "ONGOING" ? GET_ITEMS : GET_TAKEN;
  const dataName = status === "ONGOING" ? "getItems" : "getTaken";
  const { data, error, loading } = useQuery(executeQuery, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
      userId: 11122,
      status,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {`${error.message}`}</p>;
  return (
    <div>
      <ItemsList>
        {data[`${dataName}`].map((item, i) => {
          return <ItemCard key={i} item={item} />;
        })}
      </ItemsList>
    </div>
  );
}
