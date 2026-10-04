import {
  IconHome2,
  IconPackages,
  IconUserKey,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import {createFileRoute, Navigate, Outlet} from "@tanstack/react-router";
import Header from "../../../layouts/Header";
import Nav from "../../../layouts/Nav";
import {getDashboardPath, ROUTES, USER_ROLES} from "../../../lib/constants";
import useAuth from "../../../features/auth/hooks/useAuth";
import LoadingState from "../../../ui/LoadingState";

export const Route = createFileRoute("/_authenticated/admin")({
  component: RouteComponent,
});

const links = [
  {href: ROUTES.ADMIN, label: "داشبورد", Icon: IconHome2},
  {href: ROUTES.ADMIN_REQUESTS, label: "الطلبات", Icon: IconPackages},
  {href: ROUTES.ADMIN_EMPLOYEES, label: "الموظفين", Icon: IconUsersGroup},
  {href: ROUTES.ADMIN_CUSTOMERS, label: "العملاء", Icon: IconUsers},
  {href: ROUTES.ADMIN_USERS, label: "المستخدمين", Icon: IconUserKey},
];

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

  if (role !== USER_ROLES.ADMIN) {
    return <Navigate to={getDashboardPath(role)} />;
  }

  return (
    <div className="flex gap-2">
      <aside className="w-18 h-dvh border-l border-border p-2 flex flex-col">
        <Nav links={links} />
      </aside>

      <div className="h-dvh w-full">
        <Header />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
