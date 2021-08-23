import { useQuery } from "@apollo/client";

export function useUser() {
  const { data } = useQuery(CURRENT_USER);
}
