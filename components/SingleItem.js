import { useQuery } from "@apollo/client";
import Head from "next/head";

import { GET_ITEM } from "../graphql/items";
import AddToWishlist from "./AddToWishlist";
import DisplayError from "./ErrorMessage";
import Load from "./Load";
import { SingleItemStyles } from "./styles/ItemStyles";
import { useUser } from "./User";

export default function SingleItem({ id }) {
  const user = useUser();
  let item;
  let alreadyWished = false;
  const searchId = parseInt(id);
  const { data, loading, error } = useQuery(GET_ITEM, {
    variables: { id: searchId },
    onError: () => true
  });
  if (data) {
    const { getItem } = data;
    item = getItem;
    item.wishers.forEach(wisher => {
      if (wisher.id === user?.me?.id) alreadyWished = true;
    });
  }
  return (
    <>
      {loading && <Load />}
      {error && <DisplayError error={error} />}
      {data && (
        <SingleItemStyles>
          <Head>
            <title>Give Free! | {item.name ? item.name : "Item details"}</title>
          </Head>
          {item &&
            item.images.length > 0 &&
            item.images.map((image, i) => {
              return (
                <img
                  key={i}
                  src={image.url}
                  alt={image.alt}
                  width="50%"
                  height="50%"
                  data-test="itemDetailsImage"
                />
              );
            })}
          {item && (
            <div className="details">
              <h2 data-test="itemDetailsName">{`${item.category} > ${item.name}`}</h2>
              <h4>{`From: ${item.giver.username}`}</h4>
              <h5>{`State: ${item.state}`}</h5>
              {item.description && <p>{item.description}</p>}
              {item.giver.id !== user?.me?.id &&
                user?.me?.id &&
                item.status === "ONGOING" &&
                !alreadyWished && <AddToWishlist id={id} />}
              {alreadyWished && (
                <p data-test="emailParagraph">{`Email: ${item.giver.email}`}</p>
              )}
              {item?.taker?.username && (
                <p data-test="givenToPar">{`Given to: ${item.taker.username}`}</p>
              )}
            </div>
          )}
        </SingleItemStyles>
      )}
    </>
  );
}
