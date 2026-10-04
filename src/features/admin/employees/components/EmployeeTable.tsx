import {Button, Chip, Popover, Table} from "@heroui/react";
import {IconDots, IconPencil, IconTrash} from "@tabler/icons-react";
import {useState} from "react";
import {
  calculateAge,
  formatCurrency,
  formatDate,
} from "../../../../lib/helpers";
import type {Employee} from "../../../../types";
import ConfirmDelete from "../../../../ui/ConfirmDelete";
import EmptTable from "../../../../ui/EmptTable";
import ErrorState from "../../../../ui/ErrorState";
import LoadingState from "../../../../ui/LoadingState";
import useDeleteEmployee from "../hooks/useDeleteEmployee";
import useEmployees from "../hooks/useEmployees";

interface EmployeeTableProps {
  onEdit: (employee: Employee) => void;
}

const cols = [
  {key: "name", label: "الاسم", isRowHeader: true, align: "start"},
  {key: "position", label: "الوظيفة", align: "start"},
  {key: "phone", label: "رقم الهاتف", align: "start"},
  {key: "salary", label: "المرتب", align: "start"},
  {key: "birth_date", label: "تاريخ الميلاد", align: "start"},
  {key: "age", label: "العمر", align: "start"},
  {key: "actions", label: "الإجراءات", align: "center"},
];

function EmployeeTable({onEdit}: EmployeeTableProps) {
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const {employees, isLoadingEmployees, error, refetch} = useEmployees();

  const {deleteEmployee, isDeleting} = useDeleteEmployee();

  const handleDelete = () => {
    if (!employeeToDelete) return;
    deleteEmployee(employeeToDelete.id, {
      onSettled: () => setEmployeeToDelete(null),
    });
  };

  if (isLoadingEmployees) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        title="فشل تحميل قائمة الموظفين"
        onRetry={() => refetch()}
      />
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <EmptTable
        cols={cols}
        title="لا يوجد موظفين حالياً"
        description="لم يتم إضافة أي موظف بعد، يمكنك إضافة موظف جديد من خلال الزر بالأعلى."
      />
    );
  }

  return (
    <div className="w-full">
      <Table className="w-full">
        <Table.ScrollContainer>
          <Table.Content aria-label="جدول الموظفين">
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
              {employees?.map((employee) => (
                <Table.Row key={employee.id}>
                  <Table.Cell>
                    <span className="truncate">{employee.name}</span>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="secondary"
                      color="default"
                      className="text-xs">
                      {employee.position || "—"}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell className="py-3 px-4 text-muted text-start font-mono text-xs">
                    <span dir="ltr" className="inline-block">
                      {employee.phone}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="py-3 px-4 text-start font-medium text-foreground">
                    <span>{formatCurrency(employee.salary)}</span>
                  </Table.Cell>

                  <Table.Cell className="py-3 px-4 text-muted text-start text-xs">
                    {formatDate(employee.birth_date)}
                  </Table.Cell>

                  <Table.Cell className="py-3 px-4 text-start">
                    <Chip
                      size="sm"
                      variant="secondary"
                      color="default"
                      className="text-xs font-medium">
                      {calculateAge(employee.birth_date)} سنة
                    </Chip>
                  </Table.Cell>

                  <Table.Cell className="py-3 px-4 text-center">
                    <Popover
                      isOpen={openMenuId === employee.id}
                      onOpenChange={(isOpen) =>
                        setOpenMenuId(isOpen ? employee.id : null)
                      }>
                      <Popover.Trigger>
                        <IconDots size={16} stroke={1.8} />
                      </Popover.Trigger>
                      <Popover.Content
                        placement="bottom end"
                        className="p-1 min-w-32 rounded-xl">
                        <Popover.Dialog className="flex flex-col gap-0.5 outline-none p-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex items-center justify-start gap-2 px-2.5 py-1.5 rounded-lg text-xs w-full"
                            onPress={() => {
                              setOpenMenuId(null);
                              onEdit(employee);
                            }}>
                            <IconPencil size={15} stroke={1.8} />
                            <span>تعديل</span>
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex items-center justify-start gap-2 px-2.5 py-1.5 rounded-lg text-xs w-full"
                            onPress={() => {
                              setOpenMenuId(null);
                              setEmployeeToDelete(employee);
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
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={handleDelete}
        resourceName={`الموظف "${employeeToDelete?.name}"`}
        isPending={isDeleting}
      />
    </div>
  );
}

export default EmployeeTable;
