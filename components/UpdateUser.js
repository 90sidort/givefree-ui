import { useMutation, useQuery } from "@apollo/client";
import Router from "next/router";

import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/Form";
import { UPDATE_USER, ME } from "../graphql/user";

export default function UpdateUser({ data, setView }) {
  const { id, name, surname, about } = data;
  const searchId = parseInt(id);
  const { inputs, changeHandler } = useForm({
    id: searchId,
    name,
    surname,
    about,
    newEmail: "",
  });
  const [
    updateUser,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_USER, {
    variables: {
      id: inputs.id,
      name: inputs.name,
      surname: inputs.surname,
      about: inputs.about,
      newEmail: inputs.newEmail,
    },
    refetchQueries: [{ query: ME }],
  });
  if (updateLoading) return <p>Loading...</p>;
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        await updateUser();
        setView(true);
      }}
    >
      <DisplayError error={updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
        <label htmlFor="surname">
          Surname
          <input
            type="text"
            id="surname"
            name="surname"
            placeholder="Surname"
            value={inputs.surname}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="newEmail">
          New email
          <input
            type="email"
            id="newEmail"
            name="newEmail"
            placeholder="New email"
            value={inputs.newEmail}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="about">
          About
          <textarea
            type="text"
            id="about"
            name="about"
            placeholder="About"
            value={inputs.about}
            onChange={changeHandler}
          />
        </label>
      </fieldset>
      <button type="submit">Update user</button>
    </FormStyles>
  );
}
