import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    emailVerified : boolean;
    image: string;
    role: string;
    gender: string;
    followers : string[] ;
    following : string[] ;
    isVerified : boolean
}
export interface AdapterUser extends IUser {
    id: string;
}
  