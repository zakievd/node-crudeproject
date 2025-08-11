export interface UpdateUserInterface{
    phone: string,
    password: string,
    name: string,
    email: string,
    department: string
}

import { HydratedDocument } from "mongoose";
export type updateDocument = HydratedDocument<UpdateUserInterface>;