import axios from "axios";
import { useEffect, useState } from "react";

type ProductNational = {
    id: number;
    nome: string;
    imagem: string;
    preco: string;
    material: string;
    departamento: string;
    categoria: string;
    descricao: string;
    name: string;
    newPrice: string;
    image: string;
    origin: string;
}

type DetailsProps = {
    adjective: string;
    material: string;
}

type ProductEuropeon = {
    id: number;
    name: string;
    gallery: [string];
    price: number;
    discountValue: number;
    hasDiscount: boolean;
    description: string
    details: DetailsProps;
    newPrice: number;
    image: string;
    origin: string;
}

export function useFetchProducts() {
    const [productNational, setProductNational] = useState<ProductNational[]>();
    const [productEuropeon, setProductEuropeon] = useState<ProductEuropeon[]>();
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
