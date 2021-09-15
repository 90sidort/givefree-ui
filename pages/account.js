import { useUser } from "../components/User";
export default function Account() {
  let body;
  const userData = useUser();
  if (userData?.me) {
    const {
      me: { username, name, surname, about },
    } = userData;
    body = (
      <div>
        <p>Username: {username}</p>
        <p>Email: {name}</p>
        <p>First name: {name}</p>
        <p>Last name: {surname}</p>
        {about && <p>About: {about}</p>}
      </div>
    );
  } else body = <p>Loading...</p>;
  return <div>{body}</div>;
}
