import { useMutation, useQuery } from "@apollo/client";
import Router from "next/router";

import { GET_ITEM, UPDATE_ITEM } from "../graphql/items";
import useForm from "../lib/useForm";
import { stateOptions, categoryOptions, statusOptions } from "../lib/options";
import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/Form";
import createOptions from "../lib/createOptions";

export default function UpdateItem({ id }) {
  const optionsState = createOptions(stateOptions);
  const optionsCategory = createOptions(categoryOptions);
  const optionsStatus = createOptions(statusOptions);
  const searchId = parseInt(id);
  const { data: getData, loading: getLoading, error: getError } = useQuery(
    GET_ITEM,
    {
      variables: { id: searchId },
    }
  );
  const { inputs, changeHandler } = useForm(getData?.getItem);
  const [
    updateItem,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_ITEM, {
    variables: {
      id: searchId,
      item: {
        name: inputs.name,
        state: inputs.state,
        status: inputs.status,
        category: inputs.category,
        description: inputs.description,
      },
    },
    refetchQueries: [{ query: GET_ITEM, variables: { id: searchId } }],
  });
  if (getLoading) return <p>Loading...</p>;
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        await updateItem();
        Router.push({
          pathname: `/item/${id}`,
        });
      }}
    >
      <DisplayError error={getError || updateError} />
      <fieldset
        disabled={getLoading || updateLoading}
        aria-busy={getLoading || updateLoading}
      >
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
        <label htmlFor="state">
          State
          <select
            type="select"
            id="state"
            name="state"
            value={inputs.state}
            onChange={changeHandler}
          >
            {optionsState}
          </select>
        </label>
        <label htmlFor="status">
          Status
          <select
            type="select"
            id="status"
            name="status"
            value={inputs.status}
            onChange={changeHandler}
          >
            {optionsStatus}
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
            {optionsCategory}
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
      <button type="submit">Update item</button>
    </FormStyles>
  );
}
