import { useMutation } from "@apollo/client";
import Router from "next/router";

import { ME, SIGN_IN } from "../graphql/user";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/Form";

export default function SigninComponent({ query, changeForm }) {
  const { inputs, resetInitial, changeHandler } = useForm({
    username: "",
    password: "",
  });
  const [signin, { data, loading, error }] = useMutation(SIGN_IN, {
    variables: { ...inputs },
    refetchQueries: [{ query: ME }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        data: { signinUser },
      } = await signin();
      if (signinUser) {
        resetInitial();
        Router.push({
          pathname: `/`,
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Your username"
          value={inputs.username}
          onChange={changeHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={inputs.password}
          onChange={changeHandler}
        />
      </fieldset>
      <button type="button" onClick={resetInitial}>
        Reset
      </button>
      <button type="submit">Sign in!</button>
      <p onClick={() => changeForm("signup")}>
        Do not have an account? Click here!
      </p>
      <p onClick={() => changeForm("request")}>Forgott password? Click here!</p>
    </FormStyles>
  );
}
