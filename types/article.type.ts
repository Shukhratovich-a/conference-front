import { ITopic } from "./topic.type";
import { IUser } from "./user.type";

export interface IArticle {
  id: number;

  title: string;

  subtitle: string;

  body: string;

  file?: string;

  topic: ITopic;

  user: IUser;

  createAt: Date;

  updateAt: Date;
}
