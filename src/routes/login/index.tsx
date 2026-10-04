import {createFileRoute, Navigate} from "@tanstack/react-router";
import LoginForm from "../../features/auth/components/LoginForm";
import useAuth from "../../features/auth/hooks/useAuth";
import {getDashboardPath} from "../../lib/constants";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {isAuthenticated, isLoading, role} = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Navigate to={getDashboardPath(role)} />;
  }

  return (
    <div className="grid min-h-screen place-items-center">
      <LoginForm />
    </div>
  );
}
