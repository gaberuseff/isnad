import {Button, Input, Label} from "@heroui/react";
import {useForm} from "react-hook-form";
import type {Employee, EmployeeFormData} from "../../../../types";
import useCreateEmployee from "../hooks/useCreateEmployee";
import useUpdateEmployee from "../hooks/useUpdateEmployee";

interface EmployeeFormProps {
  employeeToEdit?: Employee | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function EmployeeForm({
  employeeToEdit,
  onSuccess,
  onCancel,
}: EmployeeFormProps) {
  const isEditMode = Boolean(employeeToEdit);
  const {createEmployee, isCreating} = useCreateEmployee();
  const {updateEmployee, isUpdating} = useUpdateEmployee();

  const isWorking = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<EmployeeFormData>({
    defaultValues: employeeToEdit
      ? {
          name: employeeToEdit.name,
          position: employeeToEdit.position || "",
          phone: employeeToEdit.phone,
          salary: employeeToEdit.salary,
          birth_date: employeeToEdit.birth_date,
        }
      : {
          name: "",
          position: "",
          phone: "",
          salary: undefined,
          birth_date: "",
        },
  });

  const onSubmit = (data: EmployeeFormData) => {
    if (isEditMode && employeeToEdit) {
      updateEmployee(
        {id: employeeToEdit.id, employee: data},
        {
          onSuccess: () => {
            if (onSuccess) onSuccess();
          },
        },
      );
    } else {
      createEmployee(data, {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* الاسم الكامل */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium text-foreground">
          الاسم الكامل <span className="text-danger">*</span>
        </Label>
        <Input
          type="text"
          placeholder="مثال: أحمد محمد علي"
          className="w-full text-sm border border-border rounded-xl"
          {...register("name", {
            required: "اسم الموظف مطلوب",
            minLength: {
              value: 3,
              message: "يجب ألا يقل الاسم عن 3 أحرف",
            },
          })}
        />
        {errors.name && (
          <span className="text-xs text-danger">{errors.name.message}</span>
        )}
      </div>

      {/* الوظيفة */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium text-foreground">
          الوظيفة / المسمى الوظيفي <span className="text-danger">*</span>
        </Label>
        <Input
          type="text"
          placeholder="مثال: محاسب، مدير فرع، فني"
          className="w-full text-sm border border-border rounded-xl"
          {...register("position", {
            required: "الوظيفة مطلوبة",
          })}
        />
        {errors.position && (
          <span className="text-xs text-danger">{errors.position.message}</span>
        )}
      </div>

      {/* رقم الهاتف */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium text-foreground">
          رقم الهاتف <span className="text-danger">*</span>
        </Label>
        <Input
          type="tel"
          dir="ltr"
          placeholder="أدخل رقم الهاتف"
          className="w-full text-sm border border-border rounded-xl text-end"
          {...register("phone", {
            required: "رقم الهاتف مطلوب",
          })}
        />
        {errors.phone && (
          <span className="text-xs text-danger">{errors.phone.message}</span>
        )}
      </div>

      {/* المرتب الشهري */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium text-foreground">
          المرتب الشهري <span className="text-danger">*</span>
        </Label>
        <Input
          type="number"
          placeholder="مثال: 5000"
          className="w-full text-sm border border-border rounded-xl"
          {...register("salary", {
            required: "المرتب مطلوب",
            valueAsNumber: true,
            min: {
              value: 500,
              message: "المرتب يجب ألا يقل عن 500",
            },
            max: {
              value: 100000,
              message: "المرتب يجب ألا يزيد عن 100000",
            },
          })}
        />
        {errors.salary && (
          <span className="text-xs text-danger">{errors.salary.message}</span>
        )}
      </div>

      {/* تاريخ الميلاد */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium text-foreground">
          تاريخ الميلاد <span className="text-danger">*</span>
        </Label>
        <Input
          type="date"
          className="w-full text-sm border border-border rounded-xl"
          {...register("birth_date", {
            required: "تاريخ الميلاد مطلوب",
          })}
        />
        {errors.birth_date && (
          <span className="text-xs text-danger">
            {errors.birth_date.message}
          </span>
        )}
      </div>

      {/* الأزرار */}
      <div className="flex items-center justify-end gap-2 pt-4 border-t border-border mt-4">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            isDisabled={isWorking}
            onPress={onCancel}>
            إلغاء
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          size="sm"
          isDisabled={isWorking}>
          {isWorking
            ? isEditMode
              ? "جاري التعديل..."
              : "جاري الإضافة..."
            : isEditMode
              ? "تعديل الموظف"
              : "إضافة موظف"}
        </Button>
      </div>
    </form>
  );
}

export default EmployeeForm;
