import { useMutation } from "@apollo/client";
import Router from "next/router";

import { perPage } from "../config";
import { ADD_ITEM, GET_GIVING, GET_ITEMS } from "../graphql/items";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/Form";
import { useUser } from "./User";

export default function CreateItem() {
  const userData = useUser();
  const input = viewName => ({
    skip: 1 * perPage - perPage,
    first: perPage,
    userId: userData?.me?.id,
    view: viewName
  });
  const { inputs, changeHandler, resetInitial } = useForm({
    name: "",
    file: "",
    state: "GOOD",
    status: "ONGOING",
    category: "OTHER",
    giverId: userData?.me?.id ? userData?.me?.id : 1,
    description: ""
  });
  const [addItem, { loading, error, data }] = useMutation(ADD_ITEM, {
    variables: {
      item: {
        name: inputs.name,
        state: inputs.state,
        category: inputs.category,
        status: inputs.status,
        giverId: inputs.giverId,
        description: inputs.description
      },
      file: inputs.file
    },
    refetchQueries: [
      { query: GET_ITEMS, variables: { input: input("items") } },
      { query: GET_GIVING, variables: { input: input("giving") } }
    ],
    onError: () => true
  });
  return (
    <>
      {error && <DisplayError error={error} />}
      {
        <FormStyles
          onSubmit={async e => {
            e.preventDefault();
            const res = await addItem();
            resetInitial();
            if (res?.data?.addItem?.id)
              Router.push({
                pathname: `/item/${res.data.addItem.id}`
              });
          }}
        >
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
                data-test="itemNameInput"
              />
            </label>
            <label htmlFor="file">
              Image
              <input
                type="file"
                id="file"
                name="file"
                onChange={changeHandler}
                data-test="itemFileInput"
              />
            </label>
            <label htmlFor="state">
              State
              <select
                type="select"
                id="state"
                name="state"
                value={inputs.state}
                onChange={changeHandler}
                data-test="itemStateSelect"
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
                data-test="itemCategorySelect"
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
                data-test="itemStatusSelect"
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
                data-test="itemDescriptionTextarea"
              />
            </label>
          </fieldset>
          <button
            type="button"
            onClick={resetInitial}
            data-test="resetItemBttn"
          >
            Reset
          </button>
          <button type="submit" data-test="addItemBttn">
            + Add item
          </button>
        </FormStyles>
      }
    </>
  );
}
