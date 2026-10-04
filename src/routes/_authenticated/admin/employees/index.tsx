import {createFileRoute} from "@tanstack/react-router";
import EmployeeLayout from "../../../../features/admin/employees/components/EmployeeLayout";

export const Route = createFileRoute("/_authenticated/admin/employees/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EmployeeLayout />;
}
