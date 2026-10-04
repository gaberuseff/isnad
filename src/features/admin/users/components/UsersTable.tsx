import {Button, Chip, Popover, Table} from "@heroui/react";
import {IconDots, IconTrash} from "@tabler/icons-react";
import {useState} from "react";
import {USER_ROLE_LABELS, USER_ROLES} from "../../../../lib/constants";
import type {TableColumn} from "../../../../ui/EmptTable";
import type {User} from "../../../../types";
import ConfirmDelete from "../../../../ui/ConfirmDelete";
import EmptTable from "../../../../ui/EmptTable";
import LoadingState from "../../../../ui/LoadingState";
import useDeleteUser from "../hooks/useDeleteUser";
import useUsers from "../hooks/useUsers";

interface UsersTableProps {
  initialUsers?: User[];
}

const cols: TableColumn[] = [
  {key: "name", label: "الاسم", isRowHeader: true, align: "start"},
  {key: "email", label: "البريد الإلكتروني", align: "start"},
  {key: "role", label: "الدور", align: "start"},
  {key: "actions", label: "الإجراءات", align: "center"},
];

function UsersTable({initialUsers}: UsersTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const {users: fetchedUsers, isLoadingUsers} = useUsers();
  const {deleteUser, isDeleting} = useDeleteUser();

  const users = fetchedUsers || initialUsers;

  const handleDelete = () => {
    if (!userToDelete) return;
    deleteUser(userToDelete.id, {
      onSettled: () => setUserToDelete(null),
    });
  };

  if (isLoadingUsers && !users) {
    return <LoadingState />;
  }

  if (!users || users.length === 0) {
    return (
      <EmptTable
        cols={cols}
        title="لا يوجد مستخدمين حالياً"
        description="لم يتم إضافة أي مستخدم بعد، يمكنك إضافة مستخدم جديد من خلال الزر بالأعلى."
      />
    );
  }

  return (
    <div className="w-full">
      <Table className="w-full">
        <Table.ScrollContainer>
          <Table.Content aria-label="جدول المستخدمين">
            <Table.Header>
              {cols.map((col) => (
                <Table.Column
                  key={col.key}
                  isRowHeader={col.isRowHeader}
                  className={`py-3.5 px-4 font-semibold text-foreground ${
                    col.align === "center" ? "text-center" : "text-start"
                  }`}>
                  {col.label}
                </Table.Column>
              ))}
            </Table.Header>

            <Table.Body className="divide-y divide-border">
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <span className="font-medium text-foreground truncate">
                      {user.name || user.email}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      dir="ltr"
                      className="text-muted text-xs font-mono inline-block">
                      {user.email}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant={
                        user.role === USER_ROLES.ADMIN ? "soft" : "secondary"
                      }
                      color={
                        user.role === USER_ROLES.ADMIN ? "accent" : "default"
                      }
                      className="text-xs font-medium">
                      {USER_ROLE_LABELS[user.role] || user.role}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell className="py-3 px-4 text-center">
                    <Popover
                      isOpen={openMenuId === user.id}
                      onOpenChange={(isOpen) =>
                        setOpenMenuId(isOpen ? user.id : null)
                      }>
                      <Popover.Trigger>
                        <IconDots size={16} stroke={1.8} />
                      </Popover.Trigger>
                      <Popover.Content
                        placement="bottom end"
                        className="p-1 min-w-28 rounded-xl">
                        <Popover.Dialog className="flex flex-col gap-0.5 outline-none p-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex items-center justify-start gap-2 px-2.5 py-1.5 rounded-lg text-xs 
                              cursor-pointer hover:bg-danger/10 text-danger transition-colors w-full font-normal h-auto"
                            onPress={() => {
                              setOpenMenuId(null);
                              setUserToDelete(user);
                            }}>
                            <IconTrash size={15} stroke={1.8} />
                            <span>حذف</span>
                          </Button>
                        </Popover.Dialog>
                      </Popover.Content>
                    </Popover>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <ConfirmDelete
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDelete}
        resourceName={`المستخدم "${userToDelete?.name || userToDelete?.email}"`}
        isPending={isDeleting}
      />
    </div>
  );
}

export default UsersTable;
