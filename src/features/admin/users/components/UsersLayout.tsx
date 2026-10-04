import Heading from "../../../../ui/Heading";
import UserDrawer from "./UserDrawer";
import UsersTable from "./UsersTable";

function UsersLayout() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Heading size="3xl">إدارة المستخدمين</Heading>
          <p className="text-muted mt-1 text-sm">
            إدارة حسابات المستخدمين والصلاحيات
          </p>
        </div>

        <UserDrawer />
      </div>

      <UsersTable />
    </div>
  );
}

export default UsersLayout;
