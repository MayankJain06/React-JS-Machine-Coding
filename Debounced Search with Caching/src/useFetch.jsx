import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (url) => {
    try {
      const data = await fetch(url);
      const res = await data.json();
      setData(res);
    } catch (e) {
      setError("Error from the API Response:" + e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(url);
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
