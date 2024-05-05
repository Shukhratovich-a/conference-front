import { IAuthContext } from "@/contexts/auth.context";
import { IHeaderContext } from "@/contexts/header.context";

export type ILayout = Record<string, unknown> & IAuthContext & IHeaderContext;
