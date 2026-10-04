import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {deleteEmployee as deleteEmployeeApi} from "../../../../services/apiEmployees";

function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const {mutate: deleteEmployee, isPending: isDeleting} = useMutation({
    mutationFn: deleteEmployeeApi,
    onSuccess: () => {
      toast.success("تم حذف الموظف بنجاح");
      queryClient.invalidateQueries({queryKey: ["employees"]});
    },
    onError: (err: Error) => {
      toast.danger(err.message || "حدث خطأ أثناء حذف الموظف");
    },
  });

  return {deleteEmployee, isDeleting};
}

export default useDeleteEmployee;
