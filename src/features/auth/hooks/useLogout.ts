import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logout as logoutApi} from "../../../services/apiAuth";
import {toast} from "@heroui/react";
import {useNavigate} from "@tanstack/react-router";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {mutate: logout, isPending: isLoggingOut} = useMutation({
    mutationFn: () => logoutApi(),

    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({queryKey: ["user"]});
      toast.success("تم تسجيل الخروج بنجاح");
      navigate({to: "/login"});
    },

    onError: (err) => {
      toast.danger(err.message || "حدث خطأ أثناء تسجيل الخروج");
    },
  });

  return {logout, isLoggingOut};
}

export default useLogout;
