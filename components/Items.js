import { useQuery } from "@apollo/client";
import { perPage } from "../config";

import { GET_GIVEN, GET_GIVING, GET_ITEMS, GET_TAKEN } from "../graphql/items";
import ItemCard from "./ItemCard";
import { ItemsList } from "./styles/Items";
import { useUser } from "./User";

export default function Items({ page, view }) {
  const userData = useUser();
  let executeQuery;
  let dataName;
  if (view === "items") {
    executeQuery = GET_ITEMS;
    dataName = "getItems";
  }
  if (view === "taken") {
    executeQuery = GET_TAKEN;
    dataName = "getTaken";
  }
  if (view === "given") {
    executeQuery = GET_GIVEN;
    dataName = "getGiven";
  }
  if (view === "giving") {
    executeQuery = GET_GIVING;
    dataName = "getGiving";
  }
  const { data, error, loading } = useQuery(executeQuery, {
    variables: {
      input: {
        skip: page * perPage - perPage,
        first: perPage,
        userId: 11122,
        view,
      },
    },
  });
  return (
    <div>
      {data &&
        (data[`${dataName}`].length > 0 ? (
          <ItemsList>
            {data[`${dataName}`].map((item, i) => {
              return <ItemCard key={i} item={item} userid={userData?.me?.id} />;
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
