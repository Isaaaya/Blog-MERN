import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (configObj) => {
    const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL, withCredentials: true });
    const {
        method = 'GET',
        url,
        requestConfig = {}
    } = configObj;

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);

    const refetch = () => setReload(prev => prev + 1);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await API[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal
                });
                setResponse(res.data);
            } catch (error) {
                setError(error.response?.data.message);
            };
            setLoading(false);

        }

        fetchData();

        return () => controller.abort();

    }, [reload]);

    return [response, error, loading, refetch];
}

export default useAxios