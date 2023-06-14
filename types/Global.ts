import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    role: string;
    gender: string;
    followers: string[];
    following: string[];
    isVerified: boolean
}
export interface AdapterUser extends IUser {
    id: string;
}
// Data where the user show in the admin panel 
export interface IF_FilterUserArray {
    FilterValue: string
    SearchValue: string
    Refresh: boolean
}
// the blue print of the redux store 
export interface RootState {
    persistedReducer: {
        filteruser: IF_FilterUserArray
        filterBlogs: IF_FilterUserArray
    };
}