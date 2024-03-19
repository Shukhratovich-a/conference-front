import { FC, useState, useContext } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import cn from "classnames";

import { IArticleForm } from "./ArticleForm.interface";
import { ArticleFormProps } from "./ArticleForm.props";

import { create } from "@/api/article.api";
import { fileUpload } from "@/api/axios";

import { AuthContext } from "@/contexts/auth.context";

import { Select, Input, Textarea, Button } from "@/components";

import styles from "./ArticleForm.module.scss";

export const ArticleForm: FC<ArticleFormProps> = ({ className, topics, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IArticleForm>();

  const [error, setError] = useState<string>();

  const { push, replace } = useRouter();
  const { user, token } = useContext(AuthContext);

  const onSubmit = async (formData: IArticleForm) => {
    if (!user || !token) return;

    formData.userId = Number(user.id);
    formData.topicId = Number(formData.topicId);

    try {
      const { data: fileData } = await fileUpload(formData.fileUpload[0]);

      formData.file = fileData.url;
      const { status } = await create(formData, token);

      if (status === 201) {
        push("/profile/articles");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) replace("/auth/login");
      else setError("something went wrong");
    }
  };

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={cn(styles.form__inner)}>
        {topics.length && (
          <Select
            {...register("topicId", { required: { value: true, message: "Select topic" } })}
            className={cn(styles.input)}
            defaultValue={""}
            error={errors.topicId}
          >
            <option value={""} disabled>
              Topic
            </option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </Select>
        )}

        <Input
          {...register("title", { required: { value: true, message: "Enter title" } })}
          className={cn(styles.input)}
          error={errors.title}
          placeholder="Title"
        />

        <Textarea
          {...register("body", { required: { value: true, message: "Enter description" } })}
          className={cn(styles.input)}
          error={errors.title}
          placeholder="Description"
        />

        <Input
          {...register("fileUpload", { required: { value: true, message: "Select file" } })}
          className={cn(styles.input)}
          error={errors.fileUpload}
          type="file"
          placeholder="File"
        />

        <Button>Create</Button>

        {error && <span className={cn(styles.error)}>{error}</span>}
      </div>
    </form>
  );
};
