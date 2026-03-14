import { useCallback, useState, useMemo } from "react";
import useFetch from "./useFetch";

const Search = () => {
  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products?sort=asc",
  );
  const [text, setText] = useState("");

  const productTitles = useMemo(() => {
    return data?.map((item, index) => item.title) || [];
  }, [data]);

  const filteredProducts = useMemo(() => {
    if (!text) return [];
    return productTitles.filter((item, index) =>
      item.toLowerCase().includes(text.toLowerCase()),
    );
  }, [text, productTitles]);

  const handleSearch = useCallback((e) => {
    setText(e.target.value);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error Fetching the Data from the API</h1>;

  return (
    <>
      <div>
        <h1>Search</h1>
        <input type="text" value={text} onChange={handleSearch}></input>
      </div>

      <div>
        {filteredProducts.map((item, index) => {
          return <h1 key={index}>{item}</h1>;
        })}
      </div>
    </>
  );
};

export default Search;
