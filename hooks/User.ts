import { User } from "@/types/Global";
import axios from "axios";
import { useState } from "react";

const useUser = () => {
    // states 
    const [isloading, setisloading] = useState<Boolean>(false);
    const [user, setuser] = useState<User | null>(null);
    const [Error, setError] = useState<string | null>(null);

    // Get User function whose take the email
    const GetUser = async (email: string) => {
        setisloading(true);
        try {
            const response = await axios.post("/api/user/GetUser", { email });
            const data = response.data;
            setuser(data.user);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setisloading(false);
        }
    }
    // return all the valus 
    return { GetUser, Error, isloading, user }
}
export default useUser;