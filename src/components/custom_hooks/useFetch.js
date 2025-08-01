import { useState, useEffect } from "react";
import axios from "axios";
function useFetch(url) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let fechedData = async () => {
            try {
                //?using fetch()
                // let response = await fetch(url, { method: "GET" });
                // if (response.ok) {
                //     let data = await response.json();
                //     setProducts(data);
                // } else {
                //     throw new Error("Data Not Found!");
                // }
                //?using axios 
                let { data } = await axios.get(url);
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => setLoading(false), 1000);
            }
        }
        fechedData();
    }, [url]);
    return { products, setProducts, error, loading };
}

export default useFetch;