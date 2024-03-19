import { ITopic } from "@/types/topic.type";

export interface IArticleForm {
  title: string;

  topicId: number;

  subtitle?: string;

  body: string;

  userId: number;

  fileUpload: FileList;

  file: string;
}
