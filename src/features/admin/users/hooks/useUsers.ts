import {useQuery} from "@tanstack/react-query";
import {getUsers} from "../../../../services/apiUsers";

function useUsers() {
  const {
    data: users,
    isPending: isLoadingUsers,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {users, isLoadingUsers, error, refetch};
}

export default useUsers;
