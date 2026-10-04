import {queryOptions, useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../../../services/apiAuth";

export const userQueryOptions = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

function useAuth() {
  const {data, isLoading, error} = useQuery(userQueryOptions());

  const user = data?.user;
  const profile = data?.profile;
  const isAuthenticated = !!user;
  const role = profile?.role || user?.user_metadata?.role;

  return {user, profile, isAuthenticated, isLoading, error, role};
}

export default useAuth;
