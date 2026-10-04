import {Drawer} from "@heroui/react";
import type {Employee} from "../../../../types";
import EmployeeForm from "./EmployeeForm";

interface EmployeeDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  employeeToEdit: Employee | null;
  onClose: () => void;
}

function EmployeeDrawer({
  isOpen,
  onOpenChange,
  employeeToEdit,
  onClose,
}: EmployeeDrawerProps) {
  const isEditMode = Boolean(employeeToEdit);

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="left">
          <Drawer.Dialog className="w-96 max-w-[85vw] p-6 flex flex-col">
            {({close}) => (
              <>
                <Drawer.CloseTrigger />
                <Drawer.Header className="mb-4">
                  <Drawer.Heading className="text-lg font-semibold text-foreground">
                    {isEditMode ? "تعديل بيانات الموظف" : "إضافة موظف جديد"}
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="text-sm overflow-y-auto">
                  <EmployeeForm
                    key={employeeToEdit?.id || "create"}
                    employeeToEdit={employeeToEdit}
                    onSuccess={() => {
                      close();
                      onClose();
                    }}
                    onCancel={() => {
                      close();
                      onClose();
                    }}
                  />
                </Drawer.Body>
              </>
            )}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export default EmployeeDrawer;
