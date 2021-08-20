import useForm from "../lib/useForm";
import FormStyles from "./styles/Form";

export default function CreateItem() {
  const { inputs, changeHandler, resetInitial } = useForm({
    name: "",
    image: "",
    state: "good",
    category: "other",
    giverId: 11122,
    description: "",
  });
  return (
    <FormStyles
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={changeHandler} />
        </label>
        <label htmlFor="state">
          State
          <select
            type="select"
            id="state"
            name="state"
            value={inputs.state}
            onChange={changeHandler}
          >
            <option value="new">New</option>
            <option value="good">Good</option>
            <option value="decent">Decent</option>
            <option value="broken">Broken</option>
          </select>
        </label>
        <label htmlFor="category">
          State
          <select
            type="select"
            id="category"
            name="category"
            value={inputs.category}
            onChange={changeHandler}
          >
            <option value="other">Other</option>
            <option value="t-shirt">T-shirt</option>
            <option value="sweatshirt">Sweatshirt</option>
            <option value="trousers">Trousers</option>
            <option value="hoodie">Hoodie</option>
            <option value="dress">Dress</option>
            <option value="polo">Polo</option>
            <option value="jacket">Jacket</option>
            <option value="coat">Coat</option>
            <option value="jeans">Jeans</option>
            <option value="socks">Socks</option>
            <option value="shorts">Shorts</option>
          </select>
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            rows={3}
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={changeHandler}
          />
        </label>
      </fieldset>
      <button type="button" onClick={resetInitial}>
        Reset
      </button>
      <button type="submit">+ Add item</button>
    </FormStyles>
  );
}
