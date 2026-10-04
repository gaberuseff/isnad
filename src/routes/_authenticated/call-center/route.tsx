import {createFileRoute, Navigate, Outlet} from "@tanstack/react-router";
import useAuth from "../../../features/auth/hooks/useAuth";
import Header from "../../../layouts/Header";
import {getDashboardPath, USER_ROLES} from "../../../lib/constants";
import LoadingState from "../../../ui/LoadingState";

export const Route = createFileRoute("/_authenticated/call-center")({
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

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role !== USER_ROLES.CALL_CENTER) {
    return <Navigate to={getDashboardPath(role)} />;
  }

  return (
    <div className="flex gap-2">
      <div className="h-dvh w-full">
        <Header />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
