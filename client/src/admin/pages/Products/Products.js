import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductList from "../../components/Products/ProductList";
import { fetchAllProducts } from "../../../api";
import styles from "./Products.module.scss";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await fetchAllProducts();
      setProducts(allProducts);
    };

    fetchData();
  }, []);

  return (
    <div
      className={`${styles.container} ${sidebarOpen ? "" : styles.sidebarOpen}`}
    >
      <h1>Product List</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
