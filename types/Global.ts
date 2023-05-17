import { Document } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    emailVerified : boolean;
    image: string;
    role: string;
    gender: string;
}
export interface AdapterUser extends User {
    id: string;
  }
  