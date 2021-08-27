import Link from "next/link";

import AddToWishlist from "./AddToWishlist";
import DeleteItem from "./DeleteItem";
import CatTag from "./styles/CatTag";
import { ItemStyles } from "./styles/ItemStyles";
import TitleStyles from "./styles/Title";

export default function ItemCard({ item }) {
  const { name, images, id, category, description } = item;
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
      <div className="buttonList">
        <Link href={{ pathname: "update", query: { id: id } }}>Edit</Link>
        <AddToWishlist id={id} />
        <DeleteItem id={id}>Delete</DeleteItem>
      </div>
    </ItemStyles>
  );
}
