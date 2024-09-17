import { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { RegisterFormProps } from "./RegisterForm.props";
import { ICreateUser } from "./RegisterForm.interface";
import { GenderEnum } from "@/enums/gender.enum";

import { fileUpload } from "@/api/axios";
import { create as createArticle } from "@/api/article.api";
import { login, register as registerApi } from "@/api/auth.api";

import { Input, Select, Button, Textarea } from "@/components";

import styles from "./RegisterForm.module.scss";

export const RegisterForm: FC<RegisterFormProps> = ({ className, sections, ...props }) => {
  const { replace } = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>();

  const [error, setError] = useState<string>();

  const onSubmit = async ({ articleData, registerData }: ICreateUser) => {
    try {
      const { status } = await registerApi({ ...registerData, trip: String(registerData.trip) === "true" });

      if (status === 201) {
        const { status, id: userId, token } = await login(registerData);

        if (status === 200 && !!userId && !!token) {
          articleData.userId = Number(userId);
          articleData.sectionId = Number(articleData.sectionId);

          try {
            const { data: fileData } = await fileUpload(articleData.fileUpload[0]);

            articleData.file = fileData.url;
            const { status } = await createArticle(articleData, token);

            if (status === 201) {
              replace("/profile/articles");
            }
          } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 401) replace("/auth/login");
            else setError("something went wrong");
          }
        }
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
          {t("auth.name.login")}
        </Link>

        <Link className={cn(styles.link, styles["link--active"])} href="/auth/register">
          {t("auth.name.register")}
        </Link>
      </div>

      <div className={cn(styles.form__inner)}>
        <p>{t("auth.end")}</p>
      </div>

      {/* <div className={cn(styles.form__inner)}>
        <div className={cn(styles.form__aside)}>
          <h4 className={cn(styles.form__heading)}>{t("auth.name.user-info")}</h4>

          <Input
            {...register("registerData.firstName", {
              required: { value: true, message: "Enter first name" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.firstName}
            placeholder={t("auth.register.first-name")}
          />

          <Input
            {...register("registerData.lastName", {
              required: { value: true, message: "Enter last name" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.lastName}
            placeholder={t("auth.register.last-name")}
          />

          <Select
            {...register("registerData.gender", {
              required: { value: true, message: "Select gender" },
            })}
            className={cn(styles.input)}
            defaultValue={""}
            error={errors.registerData?.gender}
          >
            <option value={""} disabled>
              {t("auth.register.gender")}
            </option>
            <option value={GenderEnum.MALE}>Male</option>
            <option value={GenderEnum.FEMALE}>Female</option>
          </Select>

          <Input
            {...register("registerData.institute", {
              required: { value: true, message: "Enter institute" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.institute}
            placeholder={t("auth.register.institute")}
          />

          <Input
            {...register("registerData.specialty", {
              required: { value: true, message: "Enter specialty" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.specialty}
            placeholder={t("auth.register.specialty")}
          />

          <Input
            {...register("registerData.country", {
              required: { value: true, message: "Enter country" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.country}
            placeholder={t("auth.register.country")}
          />

          <Input
            {...register("registerData.city", {
              required: { value: true, message: "Enter city" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.city}
            placeholder={t("auth.register.city")}
          />

          <Input
            {...register("registerData.address", {
              required: { value: true, message: "Enter address" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.address}
            placeholder={t("auth.register.address")}
          />

          <Input
            {...register("registerData.postalCode", {
              required: { value: false, message: "Enter postal code" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.postalCode}
            placeholder={t("auth.register.postal-code")}
          />

          <Input
            {...register("registerData.phone", {
              required: { value: true, message: "Enter phone" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.phone}
            placeholder={t("auth.register.phone")}
          />
        </div>

        <div className={cn(styles.form__aside)}>
          <h4 className={cn(styles.form__heading)}>{t("auth.name.article")}</h4>

          {sections.length && (
            <Select
              {...register("articleData.sectionId", { required: { value: true, message: "Select topic" } })}
              className={cn(styles.input)}
              defaultValue={""}
              error={errors.articleData?.sectionId}
            >
              <option value={""} disabled>
                {t("section")}
              </option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </Select>
          )}

          <Input
            {...register("articleData.title", { required: { value: true, message: "Enter title" } })}
            className={cn(styles.input)}
            error={errors.articleData?.title}
            placeholder="Title"
          />

          <Textarea
            {...register("articleData.body", { required: { value: false, message: "Enter description" } })}
            className={cn(styles.input)}
            error={errors.articleData?.body}
            placeholder="Description"
          />

          <Input
            {...register("articleData.fileUpload", { required: { value: true, message: "Select file" } })}
            className={cn(styles.input)}
            error={errors.articleData?.fileUpload}
            type="file"
            placeholder="File"
          />
        </div>

        <div className={cn(styles.form__aside)}>
          <div className={cn(styles.form__radio)}>
            <span className={cn(styles.form__radio__heading)}>{t("auth.register.trip")}</span>

            <div className={cn(styles.form__radio__inner)}>
              <label className={cn(styles.form__radio__label)}>
                <input {...register("registerData.trip")} type="radio" value={"true"} defaultChecked />

                <span>{t("check.yes")}</span>
              </label>

              <label className={cn(styles.form__radio__label)}>
                <input {...register("registerData.trip")} type="radio" value={"false"} />

                <span>{t("check.no")}</span>
              </label>
            </div>
          </div>

          <Input
            {...register("registerData.email", {
              required: { value: true, message: "Enter email" },
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.email}
            placeholder={t("auth.register.email")}
          />

          <Input
            {...register("registerData.password", {
              required: { value: true, message: "Enter password" },
              minLength: { value: 8, message: "Password must be longer than 8" },
            })}
            className={cn(styles.input)}
            error={errors.registerData?.password}
            type="password"
            placeholder={t("auth.register.password")}
          />
        </div>

        <Button className={cn(styles.button)} type="submit">
          {t("auth.name.register")}
        </Button>

        {error && <span className={cn(styles.error)}>{error}</span>}
      </div> */}
    </form>
  );
};
