import Link from "next/link";
import { useWishlist } from "../lib/WishlistState";

import AddToWishlist from "./AddToWishlist";
import DeleteItem from "./DeleteItem";
import CatTag from "./styles/CatTag";
import { ItemStyles } from "./styles/ItemStyles";
import TitleStyles from "./styles/Title";

export default function ItemCard({ item, userid }) {
  const {
    name,
    images,
    id,
    category,
    description,
    status,
    giver: { id: giverId }
  } = item;
  const { openWisherlist, wishlistCount } = useWishlist();
  return (
    <ItemStyles data-test="itemCard">
      {images?.length > 0 ? (
        images.map((image, i) => {
          return <img key={i} src={image.url} alt={image.alt} />;
        })
      ) : (
        <img
          src={"http://localhost:4000/placeholder.jpg"}
          alt="placeholder"
          data-test="imagePlaceholder"
        />
      )}
      <TitleStyles>
        <Link href={`/item/${id}`}>
          <a data-test="itemLink">{name}</a>
        </Link>
      </TitleStyles>
      <CatTag data-test="categoryTag">{category}</CatTag>
      {description && (
        <p data-test="itemDescription">
          {description.length > 80
            ? `${description.slice(0, 80)}...`
            : description}
        </p>
      )}
      {status !== "GIVEN" && (
        <div className="buttonList">
          {giverId === userid && (
            <Link href={{ pathname: "/update", query: { id: id } }}>
              <a data-test="editItemButton">Edit</a>
            </Link>
          )}
          {giverId !== userid && userid && <AddToWishlist id={id} />}
          {giverId === userid && status === "ONGOING" && (
            <button
              type="button"
              onClick={() => openWisherlist(id)}
              id={id}
              data-test="giveItemButton"
            >
              Give
            </button>
          )}
          {giverId === userid && <DeleteItem id={id}>Delete</DeleteItem>}
        </div>
      )}
    </ItemStyles>
  );
}
