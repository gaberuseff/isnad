import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {deleteUser as deleteUserApi} from "../../../../services/apiUsers";

function useDeleteUser() {
  const queryClient = useQueryClient();

  const {mutate: deleteUser, isPending: isDeleting} = useMutation({
    mutationFn: (userId: string) => deleteUserApi(userId),
    onSuccess: () => {
      toast.success("تم حذف المستخدم بنجاح من النظام");
      queryClient.invalidateQueries({queryKey: ["users"]});
    },
    onError: (err: Error) => {
      toast.danger(err.message || "حدث خطأ أثناء حذف المستخدم");
    },
  });

  return {deleteUser, isDeleting};
}

export default useDeleteUser;
