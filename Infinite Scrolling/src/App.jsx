import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { useRef } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const observer = useRef();

  const lastElement = (node) => {
    console.log(node);

    if (loading) return;
    if (observer.current) observer.current.disconnect();
    console.log(observer.current);

    observer.current = new IntersectionObserver((entries) => {
      console.log(entries);
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  const getSearchItems = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `https://openlibrary.org/search.json?title=${query}&page=${page}`,
      );

      setData((prev) => {
        return [
          ...new Set([
            ...prev,
            ...data?.data?.docs?.map((data, index) => data.title),
          ]),
        ];
      });
    } catch (e) {
      setError("Error Fetching Data from the API:" + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    getSearchItems();
  }, [query, page]);

  //if (error) return <h1>Error Fetching the Data from the API</h1>;

  //if (loading) return <h1>Loading.........</h1>;
  return (
    <>
      <h1>Debounce Search with Infinite Scrolling...</h1>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        value={query}
      ></input>
      {data.map((book, index) => {
        if (data.length === index + 1) {
          return <div ref={lastElement}>{book}</div>;
        } else {
          return <div>{book}</div>;
        }
      })}

      {loading && <h2>Loading...</h2>}
    </>
  );
}

export default App;
