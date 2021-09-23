import { useMutation } from "@apollo/client";
import Router from "next/router";
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
    onError: () => true,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        data: { signupUser },
      } = await signup();
      if (signupUser) resetInitial();
      Router.push({
        pathname: `/`,
      });
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
          data-test="inputUsername"
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={inputs.name}
          onChange={changeHandler}
          required
          data-test="inputName"
        />
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          placeholder="Your surname"
          value={inputs.surname}
          onChange={changeHandler}
          required
          data-test="inputSurname"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={inputs.email}
          onChange={changeHandler}
          required
          data-test="inputEmail"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={inputs.password}
          onChange={changeHandler}
          required
          data-test="inputPassword"
        />
        <label htmlFor="password">Repeat password</label>
        <input
          type="password"
          name="retype"
          placeholder="Repeat your password"
          value={inputs.retype}
          onChange={changeHandler}
          required
          data-test="inputRetype"
        />
        <label htmlFor="about">About</label>
        <input
          type="textarea"
          name="about"
          placeholder="Tell us something about yourself if you'd like to!"
          value={inputs.about}
          onChange={changeHandler}
          data-test="inputAbout"
        />
      </fieldset>
      <button
        type="button"
        onClick={resetInitial}
        data-test="signinResetButton"
      >
        Reset
      </button>
      <button type="submit" data-type="signupButton">
        Sign up!
      </button>
      <p onClick={() => changeForm("signin")} data-test="singinForm">
        Already have an account? Click here!
      </p>
    </FormStyles>
  );
}
