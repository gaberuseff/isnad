import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {updateEmployee as updateEmployeeApi} from "../../../../services/apiEmployees";
import type {EmployeeFormData} from "../../../../types";

function useUpdateEmployee() {
  const queryClient = useQueryClient();

  const {mutate: updateEmployee, isPending: isUpdating} = useMutation({
    mutationFn: ({
      id,
      employee,
    }: {
      id: string;
      employee: Partial<EmployeeFormData>;
    }) => updateEmployeeApi({id, employee}),
    onSuccess: () => {
      toast.success("تم تحديث بيانات الموظف بنجاح");
      queryClient.invalidateQueries({queryKey: ["employees"]});
    },
    onError: (err: Error) => {
      toast.danger(err.message || "حدث خطأ أثناء تحديث الموظف");
    },
  });

  return {updateEmployee, isUpdating};
}

export default useUpdateEmployee;
