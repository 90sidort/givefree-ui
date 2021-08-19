import Link from "next/link";
import CatTag from "./styles/CatTag";

import ItemStyles from "./styles/ItemStyles";
import TitleStyles from "./styles/Title";

export default function SingleItem({ item }) {
  const { name, images, id, category, description } = item;
  return (
    <ItemStyles>
      {images?.length > 0 &&
        images.map((image, i) => {
          return <img key={i} src={image.url} alt={image.alt} />;
        })}
      <TitleStyles>
        <Link href={`/item/${id}`}>{name}</Link>
      </TitleStyles>
      <CatTag>{category}</CatTag>
      {description && <p>{description}</p>}
    </ItemStyles>
  );
}
