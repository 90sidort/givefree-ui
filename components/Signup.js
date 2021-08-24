import { useMutation } from "@apollo/client";
import { useState } from "react/cjs/react.production.min";
import { ME, SIGN_UP } from "../graphql/user";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/Form";

export default function Signup({ query, changeForm }) {
  const { inputs, resetInitial, changeHandler } = useForm({
    username: "",
    password: "",
    retype: "",
    name: "",
    surname: "",
    email: "",
    about: "",
  });
  const [signup, { data, loading, error }] = useMutation(SIGN_UP, {
    variables: { ...inputs },
    refetchQueries: [{ query: ME }],
  });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        data: { signupUser },
      } = await signup();
      if (signupUser) resetInitial();
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
          required
        />
        <label htmlFor="username">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={inputs.name}
          onChange={changeHandler}
          required
        />
        <label htmlFor="username">Surname</label>
        <input
          type="text"
          name="surname"
          placeholder="Your surname"
          value={inputs.surname}
          onChange={changeHandler}
          required
        />
        <label htmlFor="username">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={inputs.email}
          onChange={changeHandler}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={inputs.password}
          onChange={changeHandler}
          required
        />
        <label htmlFor="password">Repeat password</label>
        <input
          type="password"
          name="retype"
          placeholder="Repeat your password"
          value={inputs.retype}
          onChange={changeHandler}
          required
        />
        <label htmlFor="username">About</label>
        <input
          type="textarea"
          name="about"
          placeholder="Tell us something about yourself if you'd like to!"
          value={inputs.about}
          onChange={changeHandler}
        />
      </fieldset>
      <button type="button" onClick={resetInitial}>
        Reset
      </button>
      <button type="submit">Sign up!</button>
      <p onClick={() => changeForm("signin")}>
        Already have an account? Click here!
      </p>
    </FormStyles>
  );
}
