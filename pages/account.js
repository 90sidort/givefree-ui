import { useState } from "react";
import { useUser } from "../components/User";
import UpdateUser from "../components/UpdateUser";

export default function Account() {
  const [showDetails, setShowDetails] = useState(true);
  const changeView = () => setShowDetails(showDetails === true ? false : true);
  let body;
  const userData = useUser();
  console.log(userData?.me);
  if (userData?.me) {
    const {
      me: { id, username, email, name, surname, about, active },
    } = userData;
    body = (
      <div>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>First name: {name}</p>
        <p>Last name: {surname}</p>
        {!active && <p>DEACTIVATED ACCOUNT</p>}
        {about && <p>About: {about}</p>}
      </div>
    );
  } else body = <p>Loading...</p>;
  if (showDetails === true)
    return (
      <div>
        {body}
        <button type="button" onClick={changeView}>
          Edit
        </button>
      </div>
    );
  else {
    return (
      <div>
        <UpdateUser data={userData?.me} />
        <button type="button" onClick={changeView}>
          Cancel
        </button>
      </div>
    );
  }
}
