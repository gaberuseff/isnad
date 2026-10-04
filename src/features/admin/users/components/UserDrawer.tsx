import {Button, Drawer, Input, Label} from "@heroui/react";
import {IconPlus} from "@tabler/icons-react";
import {useForm} from "react-hook-form";
import {USER_ROLES, USER_ROLES_OPTIONS} from "../../../../lib/constants";
import type {UserFormData} from "../../../../types";

import useCreateUser from "../hooks/useCreateUser";

interface UserDrawerProps {
  onSuccess?: (data: UserFormData) => void;
}

function UserDrawer({onSuccess}: UserDrawerProps) {
  const {createUser, isCreating} = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<UserFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: USER_ROLES.TECHNICIAN,
    },
  });

  const onSubmit = (data: UserFormData, close?: () => void) => {
    createUser(data, {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess(data);
        }
        reset();
        if (close) close();
      },
    });
  };

  return (
    <Drawer>
      <Drawer.Trigger className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-all cursor-pointer shadow-xs outline-none">
        <IconPlus size={16} stroke={2} />
        <span>إضافة مستخدم جديد</span>
      </Drawer.Trigger>

      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="left">
          <Drawer.Dialog className="w-96 max-w-[85vw] p-6 flex flex-col">
            {({close}) => (
              <>
                <Drawer.CloseTrigger />
                <Drawer.Header className="mb-4">
                  <Drawer.Heading className="text-lg font-semibold text-foreground">
                    إضافة مستخدم جديد
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="text-sm overflow-y-auto">
                  <form
                    onSubmit={handleSubmit((data) => onSubmit(data, close))}
                    className="flex flex-col gap-4">
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
                          required: "اسم المستخدم مطلوب",
                          minLength: {
                            value: 3,
                            message: "يجب ألا يقل الاسم عن 3 أحرف",
                          },
                        })}
                      />
                      {errors.name && (
                        <span className="text-xs text-danger">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* البريد الإلكتروني */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-foreground">
                        البريد الإلكتروني <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="email"
                        dir="ltr"
                        placeholder="user@example.com"
                        className="w-full text-sm border border-border rounded-xl text-end"
                        {...register("email", {
                          required: "البريد الإلكتروني مطلوب",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "بريد إلكتروني غير صالح",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="text-xs text-danger">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    {/* كلمة المرور */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-foreground">
                        كلمة المرور <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="password"
                        dir="ltr"
                        placeholder="••••••••"
                        className="w-full text-sm border border-border rounded-xl text-end"
                        {...register("password", {
                          required: "كلمة المرور مطلوبة",
                          minLength: {
                            value: 6,
                            message: "يجب ألا تقل كلمة المرور عن 6 أحرف",
                          },
                        })}
                      />
                      {errors.password && (
                        <span className="text-xs text-danger">
                          {errors.password.message}
                        </span>
                      )}
                    </div>

                    {/* الصلاحية / الدور */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-foreground">
                        الصلاحية / الدور <span className="text-danger">*</span>
                      </Label>
                      <select
                        className="w-full text-sm border border-border rounded-xl px-3 py-2 bg-surface text-foreground outline-none focus:border-accent cursor-pointer"
                        {...register("role", {
                          required: "يرجى اختيار الصلاحية",
                        })}>
                        {USER_ROLES_OPTIONS.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                      {errors.role && (
                        <span className="text-xs text-danger">
                          {errors.role.message}
                        </span>
                      )}
                    </div>

                    {/* الأزرار */}
                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-border mt-4">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        isDisabled={isCreating}
                        onPress={() => {
                          reset();
                          close();
                        }}>
                        إلغاء
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        isDisabled={isCreating}>
                        {isCreating ? "جاري الإنشاء..." : "إضافة مستخدم"}
                      </Button>
                    </div>
                  </form>
                </Drawer.Body>
              </>
            )}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export default UserDrawer;
