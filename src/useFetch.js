
import { useState, useEffect} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        // setData(null)
        async function fetchData(){
        try{
        const response = await fetch(url);
        if(!response.ok){
          throw "Failed to fetch the data"
        }
        const data = await response.json();
    
        setData(data);
    }catch(error){
        setError(error)
    }finally{
        setLoading(false)
    }
    }
    fetchData();

    }, [url])

    return {data, loading, error};
}

export default useFetch;