import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {createUser as createUserApi} from "../../../../services/apiUsers";
import type {UserFormData} from "../../../../types";

function useCreateUser() {
  const queryClient = useQueryClient();

  const {mutate: createUser, isPending: isCreating} = useMutation({
    mutationFn: (newUser: UserFormData) => createUserApi(newUser),
    onSuccess: () => {
      toast.success("تم إنشاء حساب المستخدم بنجاح");
      queryClient.invalidateQueries({queryKey: ["users"]});
    },
    onError: (err: Error) => {
      toast.danger(err.message || "حدث خطأ أثناء إنشاء حساب المستخدم");
    },
  });

  return {createUser, isCreating};
}

export default useCreateUser;
