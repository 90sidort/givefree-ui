import { useQuery } from "@apollo/client";

import { ME } from "../graphql/user";

export function useUser() {
  const { data } = useQuery(ME);
  return data;
}
