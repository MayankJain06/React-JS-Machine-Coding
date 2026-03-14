import { useState, useMemo, useCallback, useRef } from "react";
import useFetch from "./useFetch";
import useDebounce from "./useDebounce";

const Search = () => {
  const [text, setText] = useState("");

  const debouncedText = useDebounce(text, 300);
  const cacheRef = useRef({});

  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products?sort=asc",
  );

  const productTitles = useMemo(() => {
    return data.map((item, index) => item.title) || [];
  }, [data]);

  const filteredProducts = useMemo(() => {
    if (!debouncedText) return [];

    // check cache first
    if (cacheRef.current[debouncedText]) {
      console.log("Returning from the Cache");
      return cacheRef.current[debouncedText];
    }
    const filtered = productTitles.filter((item, index) =>
      item.toLowerCase().includes(debouncedText.toLowerCase()),
    );
    cacheRef.current[debouncedText] = filtered;
    console.log("Computed and Cached");

    return filtered;
  }, [debouncedText, productTitles]);

  const handleSearch = useCallback((e) => {
    setText(e.target.value);
  }, []);

  if (loading) return <h1>Loading.....</h1>;
  if (error) return <h1>Error from the API Response...</h1>;

  return (
    <>
      <div>
        <h1>Search with Debouncing and Caching</h1>
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
