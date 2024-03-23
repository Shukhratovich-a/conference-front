import { ISection } from "./section.type";
import { IUser } from "./user.type";

export interface IArticle {
  id: number;

  title: string;

  subtitle: string;

  body: string;

  file?: string;

  section: ISection;

  user: IUser;

  createAt: Date;

  updateAt: Date;
}
