import React, { useState } from "react";
import SigninComponent from "../components/Signin";
import Signup from "../components/Signup";
import ResetRequest from "../components/ResetRequest";

export default function Signin() {
  const [showForm, setShowForm] = useState("signin");
  return (
    <div>
      {showForm === "signin" && <SigninComponent changeForm={setShowForm} />}
      {showForm === "signup" && <Signup changeForm={setShowForm} />}
      {showForm === "request" && <ResetRequest changeForm={setShowForm} />}
    </div>
  );
}
