import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import {Controller, useForm, type SubmitHandler} from "react-hook-form";
import Heading from "../../../ui/Heading";
import useLogin from "../hooks/useLogin";

type LoginFormInputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const {login, isLoggingIn} = useLogin();

  const {control, handleSubmit} = useForm<LoginFormInputs>({
    mode: "onTouched",
    defaultValues: {
      email: "dev.gaber@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    login(data);
  };

  return (
    <Card className="p-6">
      <Form
        className="flex w-96 flex-col gap-4"
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Heading as="h1" size="2xl">
            تسجيل الدخول
          </Heading>
          <p className="text-muted">ادخل بيانات حسابك لتسجيل الدخول</p>
        </div>

        <Controller
          name="email"
          control={control}
          rules={{
            required: "البريد الإلكتروني مطلوب",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "البريد الإلكتروني غير صالح",
            },
          }}
          render={({field, fieldState: {invalid, error}}) => (
            <TextField
              isRequired
              isInvalid={invalid}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              variant="secondary"
              className="space-y-2">
              <Label>البريد الإلكتروني</Label>
              <Input
                ref={field.ref}
                type="email"
                autoComplete="email"
                placeholder="ادخل البريد الإلكتروني"
                disabled={isLoggingIn}
              />
              <FieldError>{error?.message}</FieldError>
            </TextField>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "كلمة المرور مطلوبة",
            minLength: {
              value: 8,
              message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
            },
          }}
          render={({field, fieldState: {invalid, error}}) => (
            <TextField
              isRequired
              isInvalid={invalid}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              variant="secondary"
              className="space-y-2">
              <Label>كلمة المرور</Label>
              <Input
                ref={field.ref}
                type="password"
                autoComplete="current-password"
                placeholder="ادخل كلمة المرور"
                disabled={isLoggingIn}
              />
              <FieldError>{error?.message}</FieldError>
            </TextField>
          )}
        />

        <Button type="submit" className="w-full mt-4" isDisabled={isLoggingIn}>
          {isLoggingIn && <Spinner size="sm" color="current" />}
          دخول
        </Button>
      </Form>
    </Card>
  );
}

export default LoginForm;
