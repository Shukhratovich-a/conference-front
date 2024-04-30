export interface IArticleForm {
  title: string;

  sectionId: number;

  subtitle?: string;

  body: string;

  userId: number;

  fileUpload: FileList;

  file: string;
}
