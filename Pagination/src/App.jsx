import { useState } from "react";
import "./App.css";
import Pagination from "./Components/Pagination";
import ProductCard from "./Components/ProductCard";
import { PAGE_SIZE } from "./constants";
import { useEffect } from "react";

// "https://dummyjson.com/products?limit=500"
function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch("https://dummyjson.com/products?limit=500");
      const res = await data.json();
      setProducts(res.products);
    } catch (e) {
      setError("Error Fetching the Data from the API:", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h1>Loading.......</h1>;
  if (error) return <h1>Error Fetching the Data from the API</h1>;

  const totalProducts = products.length;
  const noofPages = Math.ceil(totalProducts / PAGE_SIZE); //50
  const start = currentPage * PAGE_SIZE; // 0 * 10 =0
  const end = start + PAGE_SIZE; // 0 +10 = 10

  return !products.length ? (
    <h1>No Products Found</h1>
  ) : (
    <div className="App">
      <h1>Pagination</h1>

      <div className="product-container">
        {products?.slice(start, end)?.map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            title={product.title}
          />
        ))}
      </div>

      <Pagination
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        noofPages={noofPages}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
