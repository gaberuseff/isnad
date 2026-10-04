import {Button} from "@heroui/react";
import {IconPlus} from "@tabler/icons-react";
import {useState} from "react";
import type {Employee} from "../../../../types";
import Heading from "../../../../ui/Heading";
import EmployeeDrawer from "./EmployeeDrawer";
import EmployeeTable from "./EmployeeTable";

function EmployeeLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const handleOpenAdd = () => {
    setEmployeeToEdit(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsDrawerOpen(true);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    setEmployeeToEdit(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading size="3xl">الموظفين</Heading>
        <Button
          variant="primary"
          onPress={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl 
          bg-accent text-accent-foreground hover:opacity-90 transition-all cursor-pointer shadow-xs outline-none">
          <IconPlus size={16} stroke={2} />
          <span>إضافة موظف جديد</span>
        </Button>
      </div>

      <EmployeeTable onEdit={handleOpenEdit} />

      <EmployeeDrawer
        isOpen={isDrawerOpen}
        onOpenChange={(open) => {
          setIsDrawerOpen(open);
          if (!open) setEmployeeToEdit(null);
        }}
        employeeToEdit={employeeToEdit}
        onClose={handleClose}
      />
    </div>
  );
}

export default EmployeeLayout;
