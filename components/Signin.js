import React from "react";
import { useMutation } from "@apollo/client";
import Router from "next/router";

import { ME, SIGN_IN } from "../graphql/user";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Load from "./Load";
import FormStyles from "./styles/Form";

export default function SigninComponent({ changeForm }) {
  const { inputs, resetInitial, changeHandler } = useForm({
    username: "",
    password: "",
  });
  const [signin, { loading, error }] = useMutation(SIGN_IN, {
    variables: { ...inputs },
    refetchQueries: [{ query: ME }],
    onError: () => true,
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
  return (
    <>
      {loading && <Load />}
      {!loading && (
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
              data-test="inputUsername"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={inputs.password}
              onChange={changeHandler}
              data-test="inputPassword"
            />
          </fieldset>
          <button
            type="button"
            onClick={resetInitial}
            data-test="signinResetButton"
          >
            Reset
          </button>
          <button type="submit" data-test="signinButton">
            Sign in!
          </button>
          <p onClick={() => changeForm("signup")} data-test="signupForm">
            Do not have an account? Click here!
          </p>
          <p onClick={() => changeForm("request")} data-test="resetPassForm">
            Forgott password? Click here!
          </p>
        </FormStyles>
      )}
    </>
  );
}
