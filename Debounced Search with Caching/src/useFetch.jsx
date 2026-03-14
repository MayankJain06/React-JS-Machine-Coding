import { useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetch("");
      const res = await data.json();
    } catch (e) {}
  };
}
