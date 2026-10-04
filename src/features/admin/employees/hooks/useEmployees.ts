import {useQuery} from "@tanstack/react-query";
import {getEmployees} from "../../../../services/apiEmployees";

function useEmployees() {
  const {
    data: employees,
    isPending: isLoadingEmployees,
    error,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  return {employees, isLoadingEmployees, error, refetch};
}

export default useEmployees;
