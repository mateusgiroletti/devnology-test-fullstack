import axios from "axios";
import { useEffect, useState } from "react";

export function useFetchProducts() {
    const [productNational, setProductNational] = useState();
    const [productEuropeon, setProductEuropeon] = useState();
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {

        const fetchProductNational = async () => {
            const { data } = await axios.get("http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider");
            setProductNational(data);
        };

        fetchProductNational();

        const fetchProductEuropeon = async () => {
            const { data } = await axios.get("http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider");
            setProductEuropeon(data);
        };

        fetchProductEuropeon();

        setIsFetching(false);
    }, []);

    return { productNational, productEuropeon, error, isFetching };
}
