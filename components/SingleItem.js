import { useQuery } from "@apollo/client";
import Head from "next/head";

import { GET_ITEM } from "../graphql/items";
import DisplayError from "./ErrorMessage";
import { SingleItemStyles } from "./styles/ItemStyles";

export default function SingleItem({ id }) {
  let item;
  const searchId = parseInt(id);
  const { data, loading, error } = useQuery(GET_ITEM, {
    variables: { id: searchId },
  });
  if (data) {
    const { getItems } = data;
    item = getItems[0];
  }
  if (loading) return <p>Loading...</p>;
  if (error) <DisplayError error={error} />;
  return (
    <SingleItemStyles>
      <Head>
        <title>Give Free! | {item.name ? item.name : "Item details"}</title>
      </Head>
      {item &&
        item.images.length > 0 &&
        item.images.map((image, i) => {
          return <img key={i} src={image.url} alt={image.alt} />;
        })}
      {item && (
        <div className="details">
          <h2>{`${item.category} > ${item.name}`}</h2>
          <h4>{`From: ${item.giver.username}`}</h4>
          <h5>{`State: ${item.state}`}</h5>
          {item.description && <p>{item.description}</p>}
        </div>
      )}
    </SingleItemStyles>
  );
}
