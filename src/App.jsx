import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("hey");
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const d = await res.json();
      if (d) {
        console.log(d);
        setData(d);
        setPageData(d.products.slice(0, 10));
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (data && pageSize > 10) {
      setPageData(data.products.slice(0, pageSize));
    }
  }, [pageSize]);

  useEffect(() => {
    console.log(pageData);
  }, [pageData]);

  if (pageData.length == 0) return "Loading";

  return (
    <div className="App">
      {pageData?.map((product, i) => {
        return <div key={i}>{product.title}</div>;
      })}
      <button onClick={() => setPageSize(pageSize + 10)}>Load More</button>
    </div>
  );
}
