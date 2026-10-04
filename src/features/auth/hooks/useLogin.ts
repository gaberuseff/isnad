import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login as loginApi} from "../../../services/apiAuth";
import {toast} from "@heroui/react";
import {useNavigate} from "@tanstack/react-router";
import {getDashboardPath} from "../../../lib/constants";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {mutate: login, isPending: isLoggingIn} = useMutation({
    mutationFn: ({email, password}: {email: string; password: string}) =>
      loginApi({email, password}),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], {
        user: data.user,
        profile: data.profile,
      });
      queryClient.invalidateQueries({queryKey: ["user"]});

      toast.success("تم تسجيل الدخول بنجاح");
      navigate({to: getDashboardPath(data.role)});
    },

    onError: (err) => {
      toast.danger(err.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });

  return {login, isLoggingIn};
}

export default useLogin;
