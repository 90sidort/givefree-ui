import Link from "next/link";

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
    giver: { id: giverId },
  } = item;
  return (
    <ItemStyles>
      {images?.length > 0 ? (
        images.map((image, i) => {
          return <img key={i} src={image.url} alt={image.alt} />;
        })
      ) : (
        <img
          src={"http://localhost:4000/placeholder.jpg"}
          alt={"placeholder"}
        />
      )}
      <TitleStyles>
        <Link href={`/item/${id}`}>{name}</Link>
      </TitleStyles>
      <CatTag>{category}</CatTag>
      {description && <p>{description}</p>}
      {status !== "GIVEN" && (
        <div className="buttonList">
          {giverId === userid && (
            <Link href={{ pathname: "update", query: { id: id } }}>Edit</Link>
          )}
          {giverId !== userid && <AddToWishlist id={id} />}
          {giverId === userid && <DeleteItem id={id}>Delete</DeleteItem>}
        </div>
      )}
    </ItemStyles>
  );
}
