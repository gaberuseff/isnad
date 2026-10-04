import {createFileRoute, Navigate} from "@tanstack/react-router";
import useAuth from "../features/auth/hooks/useAuth";
import {getDashboardPath} from "../lib/constants";
import LoadingState from "../ui/LoadingState";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {isAuthenticated, isLoading, role} = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <LoadingState />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={getDashboardPath(role)} />;
  }

  return <Navigate to="/login" />;
}
