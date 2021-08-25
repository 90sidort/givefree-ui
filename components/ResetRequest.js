import { useMutation } from "@apollo/client";
import Router from "next/router";

import { RESET_REQUEST } from "../graphql/user";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/Form";

export default function ResetRequest({ query, changeForm }) {
  const { inputs, resetInitial, changeHandler } = useForm({
    email: "",
  });
  const [resetRequest, { data, loading, error }] = useMutation(RESET_REQUEST, {
    variables: { ...inputs },
  });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        data: { requestReset },
      } = await resetRequest();
      if (requestReset) {
        resetInitial();
        Router.push({
          pathname: `/signin`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (loading) return <p>Loading...</p>;
  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error} />
      {data?.requestReset && <p>Success! Check your email!</p>}
      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={inputs.email}
          onChange={changeHandler}
        />
      </fieldset>
      <button type="button" onClick={resetInitial}>
        Reset
      </button>
      <button type="submit">Request reset!</button>
      <p onClick={() => changeForm("signin")}>
        Do not need password reset? Click here!
      </p>
    </FormStyles>
  );
}
