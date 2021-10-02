import React, { useState } from "react";
import { useUser } from "../components/User";
import UpdateUser from "../components/UpdateUser";

export default function Account() {
  const [showDetails, setShowDetails] = useState(true);
  const changeView = () => setShowDetails(showDetails !== true);
  let body;
  const userData = useUser();
  if (userData?.me) {
    const {
      me: { username, email, name, surname, about, active },
    } = userData;
    body = (
      <div>
        <p data-test="usernamPar">
          Username:
          {username}
        </p>
        <p data-test="emailPar">
          Email:
          {email}
        </p>
        <p data-test="firstNamePar">
          First name:
          {name}
        </p>
        <p data-test="lastNamePar">
          Last name:
          {surname}
        </p>
        {!active && <p data-test="deactivPar">DEACTIVATED ACCOUNT</p>}
        {about && (
          <p data-test="aboutPar">
            About:
            {about}
          </p>
        )}
      </div>
    );
  } else body = <p>Loading...</p>;
  if (showDetails === true)
    return (
      <div>
        {body}
        <button type="button" onClick={changeView} data-test="accountEditBttn">
          Edit
        </button>
      </div>
    );

  return (
    <div>
      <UpdateUser data={userData?.me} setView={setShowDetails} />
      <button type="button" onClick={changeView} data-test="accountCancelBttn">
        Cancel
      </button>
    </div>
  );
}
