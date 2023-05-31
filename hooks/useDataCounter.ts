import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const useDataCounter = () => {
    const [userCount, setUserCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const GetValue = async () => {
        try {
            setLoading(true);
            setError(null);
            const req = await axios.get('/api/user/TotalUsers');
            const data = await req.data;
            setUserCount(data.TotlaNumber);
            setLoading(false);
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again later.");
                setError("Something went wrong. Please try again later.");
            }
        }
    }
    useEffect(() => {
        GetValue();
    }, []);

    return { loading, error, userCount };
};

export default useDataCounter;