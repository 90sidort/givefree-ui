import React from "react";

import ResetRequest from "../components/ResetRequest";
import ResetPassword from "../components/ResetPassword";

export default function reset({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry, you must provide token!</p>
        <ResetRequest />
      </div>
    );
  }
  return (
    <div>
      <ResetPassword token={query.token} />
    </div>
  );
}
