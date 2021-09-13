import { useMutation } from "@apollo/client";
import Router from "next/router";

import { ADD_ITEM, GET_ITEMS } from "../graphql/items";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/Form";
import { useUser } from "./User";

export default function CreateItem() {
  const userData = useUser();
  const { inputs, changeHandler, resetInitial } = useForm({
    name: "",
    file: "",
    state: "GOOD",
    status: "ONGOING",
    category: "OTHER",
    giverId: userData?.me?.id,
    description: "",
  });
  const [addItem, { loading, error, data }] = useMutation(ADD_ITEM, {
    variables: {
      item: {
        name: inputs.name,
        state: inputs.state,
        category: inputs.category,
        giverId: inputs.giverId,
        description: inputs.description,
      },
      file: inputs.file,
    },
    refetchQueries: [{ query: GET_ITEMS, variables: { input: {} } }],
  });
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await addItem();
        resetInitial();
        Router.push({
          pathname: `/item/${res.data.addItem.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
        <label htmlFor="file">
          Image
          <input type="file" id="file" name="file" onChange={changeHandler} />
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
            <option value="NEW">New</option>
            <option value="GOOD">Good</option>
            <option value="DECENT">Decent</option>
            <option value="BROKEN">Broken</option>
          </select>
        </label>
        <label htmlFor="category">
          Category
          <select
            type="select"
            id="category"
            name="category"
            value={inputs.category}
            onChange={changeHandler}
          >
            <option value="OTHER">Other</option>
            <option value="TSHIRT">T-shirt</option>
            <option value="SWEATSHIRT">Sweatshirt</option>
            <option value="TROUSERS">Trousers</option>
            <option value="HOODIE">Hoodie</option>
            <option value="DRESS">Dress</option>
            <option value="POLO">Polo</option>
            <option value="JACKET">Jacket</option>
            <option value="COAT">Coat</option>
            <option value="JEANS">Jeans</option>
            <option value="SOCKS">Socks</option>
            <option value="SHORTS">Shorts</option>
          </select>
        </label>
        <label htmlFor="state">
          Status
          <select
            type="select"
            id="status"
            name="status"
            value={inputs.status}
            onChange={changeHandler}
          >
            <option value="ONGOING">Ongoing</option>
            <option value="DRAFT">Draft</option>
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
