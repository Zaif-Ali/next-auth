import { UserApiConstants } from "@/constant/ApiConstrants";
import { IUser, RootState } from "@/types/Global";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";


const UseAllUsers = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [users, setusers] = useState<IUser[] | null>(null);


    // get the current state value
    const { FilterValue, SearchValue, Refresh } = useSelector(
        (state: RootState) => state.persistedReducer.filteruser
    );


    const GetAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(UserApiConstants.GetAllUser(FilterValue, SearchValue));
            const data = await response.data;
            setusers(data.users);
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again later.");
                setError("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }

    };
    useEffect(() => {
        GetAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [FilterValue, SearchValue]);

    return { loading, error, GetAll, users };
};

export default UseAllUsers;