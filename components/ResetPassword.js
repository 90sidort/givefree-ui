import { useMutation } from "@apollo/client";
import Router from "next/router";

import { RESET_PASSWORD } from "../graphql/user";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/Form";

export default function ResetPassword({ token }) {
  const { inputs, resetInitial, changeHandler } = useForm({
    email: "",
    password: "",
    retype: "",
    token: token,
  });
  const [resetsPassword, { data, loading, error }] = useMutation(
    RESET_PASSWORD,
    {
      variables: { ...inputs },
    }
  );
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        data: { resetPassword },
      } = await resetsPassword();
      if (resetPassword) {
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
      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={inputs.email}
          onChange={changeHandler}
          data-test="inputEmail"
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your new password"
          value={inputs.password}
          onChange={changeHandler}
        />
        <label htmlFor="email">Retype</label>
        <input
          type="password"
          name="retype"
          placeholder="Retype your new email"
          value={inputs.retype}
          onChange={changeHandler}
        />
      </fieldset>
      <button type="button" onClick={resetInitial}>
        Reset
      </button>
      <button type="submit">Reset password!</button>
    </FormStyles>
  );
}
