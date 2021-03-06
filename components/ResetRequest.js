import React from "react";
import { useMutation } from "@apollo/client";
import Router from "next/router";

import { RESET_REQUEST } from "../graphql/user";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Load from "./Load";
import FormStyles from "./styles/Form";

export default function ResetRequest({ changeForm }) {
  const { inputs, resetInitial, changeHandler } = useForm({
    email: "",
  });
  const [resetRequest, { data, loading, error }] = useMutation(RESET_REQUEST, {
    variables: { ...inputs },
    onError: () => true,
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
  return (
    <>
      {loading && <Load />}
      {!loading && (
        <FormStyles method="POST" onSubmit={handleSubmit}>
          {error && <DisplayError error={error} />}
          {data?.requestReset && (
            <p data-test="successReset">Success! Check your email!</p>
          )}
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
          </fieldset>
          <button type="button" onClick={resetInitial}>
            Reset
          </button>
          <button type="submit" data-test="resetPassBttn">
            Request reset!
          </button>
          <p onClick={() => changeForm("signin")} data-test="singinForm">
            Do not need password reset? Click here!
          </p>
        </FormStyles>
      )}
    </>
  );
}
