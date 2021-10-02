import React from "react";
import SingleItem from "../../components/SingleItem";

export default function SingleItemPage({ query: { id } }) {
  return <SingleItem id={id} />;
}
