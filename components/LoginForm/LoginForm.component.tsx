import { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import cn from "classnames";

import { LoginFormProps } from "./LoginForm.props";
import { ILoginForm } from "./LoginForm.interface";

import { login } from "@/api/auth.api";

import { Input, Button } from "@/components";

import styles from "./LoginForm.module.scss";

export const LoginForm: FC<LoginFormProps> = ({ className, ...props }) => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const [error, setError] = useState<string>();

  const onSubmit = async (formData: ILoginForm) => {
    const { status, id } = await login(formData);

    if (status === 200 && !!id) replace(`/profile/${id}`);
    else if (status === 401) setError("Wrong email or password");
    else setError("Something went wrong");
  };

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={cn(styles.nav)}>
        <Link className={cn(styles.link, styles["link--active"])} href="/auth/login">
          Login
        </Link>
        <Link className={cn(styles.link)} href="/auth/register">
          Register
        </Link>
      </div>

      <div className={cn(styles.form__inner)}>
        <Input
          {...register("email", {
            required: { value: true, message: "Enter email" },
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
          })}
          className={cn(styles.input)}
          error={errors.email}
          placeholder="Email"
        />

        <Input
          {...register("password", {
            required: { value: true, message: "Enter password" },
            minLength: { value: 8, message: "Password must be longer than 8" },
          })}
          className={cn(styles.input)}
          error={errors.password}
          type="password"
          placeholder="Password"
        />

        <Button className={cn(styles.button)} type="submit">
          Login
        </Button>

        {error && <span className={cn(styles.error)}>{error}</span>}
      </div>
    </form>
  );
};
