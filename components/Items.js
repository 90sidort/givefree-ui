import { useQuery } from "@apollo/client";
import { perPage } from "../config";

import { GET_GIVEN, GET_ITEMS, GET_TAKEN } from "../graphql/items";
import ItemCard from "./ItemCard";
import { ItemsList } from "./styles/Items";

export default function Items({ page, status, taken }) {
  let executeQuery;
  let dataName;
  if (!taken) {
    executeQuery = GET_ITEMS;
    dataName = "getItems";
  }
  if (taken === true) {
    executeQuery = GET_TAKEN;
    dataName = "getTaken";
  }
  if (taken === false) {
    executeQuery = GET_GIVEN;
    dataName = "getGiven";
  }
  const { data, error, loading } = useQuery(executeQuery, {
    variables: {
      input: {
        skip: page * perPage - perPage,
        first: perPage,
        userId: 11122,
        taken,
        status,
      },
    },
  });
  return (
    <div>
      {data &&
        (data[`${dataName}`].length > 0 ? (
          <ItemsList>
            {data[`${dataName}`].map((item, i) => {
              return <ItemCard key={i} item={item} />;
            })}
          </ItemsList>
        ) : (
          <p>No items!</p>
        ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error {`${error.message}`}</p>}
    </div>
  );
}
