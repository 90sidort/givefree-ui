export const signButton = 'button[data-test="sectionSign"]';
export const usernameInput = 'input[data-test="inputUsername"]';
export const passwordInput = 'input[data-test="inputPassword"]';
export const nameInput = 'input[data-test="inputName"]';
export const surnameInput = 'input[data-test="inputSurname"]';
export const emailInput = 'input[data-test="inputEmail"]';
export const retypeInput = 'input[data-test="inputRetype"]';
export const aboutInput = 'input[data-test="inputAbout"]';
export const validUsername = "normal_user";
export const itemOwner = "nduffieldl";
export const validPassword = "testtest2";
export const invalidCredential = "nonexistent";
export const normalEmail = "normal@test.com";
export const signinButton = 'button[data-test="signinButton"]';
export const errorWrongUser = "User nonexistent does not exist!";
export const errorMissingUsername =
  "Username has to be bewteen 4 and 200 characters long!";
export const errorNonexistUser =
  "User with email: nonexists@email.com does not exist!";
export const errorNonmatchPassword = "Passwords have to match!";
export const errorUserExists = (username) => `User ${username} already exists!`;
export const errorEmailExists = (email) =>
  `User with email ${email} already exists!`;
export const errorWrongPass = "Password for user normal_user is incorrect!";
export const signinResetBttn = 'button[data-test="signinResetButton"]';
export const signoutButton = 'button[data-test="signoutButton"]';
export const signupRedirect = 'p[data-test="signupForm"]';
export const signinRedirect = 'p[data-test="singinForm"]';
export const resetPassRedirect = 'p[data-test="resetPassForm"]';
export const buttonSignup = 'button[data-type="signupButton"]';
export const resetPassBttn = 'button[data-test="resetPassBttn"]';
export const successResetP = 'p[data-test="successReset"]';
export const signoutReq = {
  operationName: "SIGN_OUT",
  variables: {},
  query: "mutation SIGN_OUT {\n  signout\n}\n",
};
