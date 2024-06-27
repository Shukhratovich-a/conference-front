import { GenderEnum } from "@/enums/gender.enum";
import { IArticleForm } from "@/components/ArticleForm/ArticleForm.interface";

export interface IRegisterForm {
  firstName: string;

  lastName: string;

  gender: GenderEnum;

  institute: string;

  specialty: string;

  country: string;

  city: string;

  address: string;

  postalCode: string;

  phone: string;

  description: string;

  role: string;

  email: string;

  password: string;
}

export interface ICreateUser {
  articleData: IArticleForm;
  registerData: IRegisterForm;
}
