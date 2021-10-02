import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import { perPage } from "../config";
import { GET_GIVEN, GET_GIVING, GET_ITEMS, GET_TAKEN } from "../graphql/items";
import ItemCard from "./ItemCard";
import Load from "./Load";
import Modal from "./Modal";
import { ItemsList } from "./styles/Items";
import { useUser } from "./User";

export default function Items({ page, view }) {
  const [showModal, setShowModal] = useState(false);
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
        userId: userData?.me?.id,
        view,
      },
    },
    onError: () => {
      setShowModal(true);
    },
  });
  return (
    <div>
      {loading && <Load />}
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
      <Modal
        show={showModal}
        title="Error!"
        onClose={() => setShowModal(false)}
      >
        {`${error?.message}`}
      </Modal>
    </div>
  );
}
