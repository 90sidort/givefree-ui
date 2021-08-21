import UpdateItem from "../components/UpdateItem";

export default function Update({ query: { id } }) {
  return (
    <div>
      <UpdateItem id={id} />
    </div>
  );
}
