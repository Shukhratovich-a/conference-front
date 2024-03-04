import { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import cn from "classnames";

import { RegisterFormProps } from "./RegisterForm.props";
import { IRegisterForm } from "./RegisterForm.interface";
import { GenderEnum } from "@/enums/gender.enum";

import { login, register as registerApi } from "@/api/auth.api";

import { Input, Select, Button } from "@/components";

import styles from "./RegisterForm.module.scss";

export const RegisterForm: FC<RegisterFormProps> = ({ className, ...props }) => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IRegisterForm) => {
    try {
      const { status } = await registerApi(formData);

      if (status === 201) {
        const { status, id } = await login(formData);

        if (status === 200 && !!id) replace(`/profile/${id}`);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) setError("This email exist");
      else setError("something went wrong");
    }
  };

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={cn(styles.nav)}>
        <Link className={cn(styles.link)} href="/auth/login">
          Login
        </Link>

        <Link className={cn(styles.link, styles["link--active"])} href="/auth/register">
          Register
        </Link>
      </div>

      <div className={cn(styles.form__inner)}>
        <Input
          {...register("firstName", {
            required: { value: true, message: "Enter first name" },
          })}
          className={cn(styles.input)}
          error={errors.firstName}
          placeholder="First name"
        />

        <Input
          {...register("lastName", {
            required: { value: true, message: "Enter last name" },
          })}
          className={cn(styles.input)}
          error={errors.lastName}
          placeholder="Last name"
        />

        <Select
          {...register("gender", {
            required: { value: true, message: "Select gender" },
          })}
          className={cn(styles.input)}
          defaultValue={""}
          error={errors.gender}
        >
          <option value={""} disabled>
            Gender
          </option>
          <option value={GenderEnum.MALE}>Male</option>
          <option value={GenderEnum.FEMALE}>Female</option>
        </Select>

        <Input
          {...register("institute", {
            required: { value: true, message: "Enter institute" },
          })}
          className={cn(styles.input)}
          error={errors.institute}
          placeholder="Institute"
        />

        <Input
          {...register("specialty", {
            required: { value: true, message: "Enter specialty" },
          })}
          className={cn(styles.input)}
          error={errors.specialty}
          placeholder="Specialty"
        />

        <Input
          {...register("country", {
            required: { value: true, message: "Enter country" },
          })}
          className={cn(styles.input)}
          error={errors.country}
          placeholder="Country"
        />

        <Input
          {...register("city", {
            required: { value: true, message: "Enter city" },
          })}
          className={cn(styles.input)}
          error={errors.city}
          placeholder="City"
        />

        <Input
          {...register("address", {
            required: { value: true, message: "Enter address" },
          })}
          className={cn(styles.input)}
          error={errors.address}
          placeholder="Address"
        />

        <Input
          {...register("postalCode", {
            required: { value: true, message: "Enter postal code" },
          })}
          className={cn(styles.input)}
          error={errors.postalCode}
          placeholder="Postal code"
        />

        <Input
          {...register("phone", {
            required: { value: true, message: "Enter phone" },
          })}
          className={cn(styles.input)}
          error={errors.phone}
          placeholder="Phone"
        />

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
          Register
        </Button>

        {error && <span className={cn(styles.error)}>{error}</span>}
      </div>
    </form>
  );
};
