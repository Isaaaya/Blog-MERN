import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useAxiosFunction = () => {
    const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL, withCredentials: true });
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [controller, setController] = useState();

    const axiosFetch = async (configObj) => {
        const {
            method = 'GET',
            url,
            requestConfig = {}
        } = configObj;

        setLoading(true);

        try {
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await API[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            });
            setResponse(res?.data);
        } catch (error) {
            if (error.response?.data?.errors) {
                setError(error?.response?.data.errors);
                error.response?.data?.errors.forEach((errorItem) => {
                    toast.error(errorItem.msg)
                })
            } else {
                setError(error?.response?.data.message);
                toast.error(error?.response?.data.message)
            };
            console.log(error)
        };
        setLoading(false);
    }

    useEffect(() => {
        return () => controller && controller.abort();
    }, [controller]);

    return [axiosFetch, response, loading, error];
}

export default useAxiosFunction