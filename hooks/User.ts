import { UserApiConstants } from "@/constant/ApiConstrants";
import { IUser } from "@/types/Global";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface FormData {
    firstName?: string;
    lastName?: string;
    gender?: string;
}

const useUser = () => {
    // states 
    const [isloading, setisloading] = useState<Boolean>(false);
    const [user, setuser] = useState<IUser | null>(null);
    const [Error, setError] = useState<string | null>(null);
    const [status, setstatus] = useState<string | null>();

    // Get User function whose take the email
    const GetUser = async (email: string) => {
        setisloading(true);
        try {
            const response = await axios.get(UserApiConstants.GetUser(email));
            const data = response.data;
            setuser(data.user);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setisloading(false);
        }
    }

    // Update function whose take a email and those data whose changed by the user
    const UpdateUser = async ({ email, changedFields }: { email: string, changedFields: Partial<FormData> }) => {
        setisloading(true);
        try {
            const response = await axios.post(UserApiConstants.UpdateUser, { email, formData: changedFields });
            const data = response.data;
            if (!data.success) {
                setError(data.error)
            } else {
                toast.success("Data was updated. After few time you see changes")
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setisloading(false);
        }
    }

    const FollowUser = async (followerId: string) => {
        setisloading(true);
        try {
            const response = await axios.post(UserApiConstants.FollowUser, {
                followerId,
            });
            const data = response.data;
            if (data.success) {
                setstatus("Following list is updated");
                setuser(data.user);
            }

        } catch (error: any) {
            setError(error.message);
        } finally {
            setisloading(false);
        }
    }

    // return all the valus 
    return { GetUser, UpdateUser, FollowUser, Error, isloading, user }
}
export default useUser;