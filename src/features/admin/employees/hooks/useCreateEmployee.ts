import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {createEmployee as createEmployeeApi} from "../../../../services/apiEmployees";
import type {EmployeeFormData} from "../../../../types";

function useCreateEmployee() {
  const queryClient = useQueryClient();

  const {mutate: createEmployee, isPending: isCreating} = useMutation({
    mutationFn: (newEmployee: EmployeeFormData) =>
      createEmployeeApi(newEmployee),
    onSuccess: () => {
      toast.success("تمت إضافة الموظف بنجاح");
      queryClient.invalidateQueries({queryKey: ["employees"]});
    },
    onError: (err: Error) => {
      toast.danger(err.message || "حدث خطأ أثناء إضافة الموظف");
    },
  });

  return {createEmployee, isCreating};
}

export default useCreateEmployee;
