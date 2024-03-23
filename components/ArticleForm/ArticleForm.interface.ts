export interface IArticleForm {
  title: string;

  topicId: number;

  subtitle?: string;

  body: string;

  userId: number;

  fileUpload: FileList;

  file: string;
}
