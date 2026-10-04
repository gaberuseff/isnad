import {createFileRoute} from "@tanstack/react-router";
import UsersLayout from "../../../../features/admin/users/components/UsersLayout";

export const Route = createFileRoute("/_authenticated/admin/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UsersLayout />;
}
