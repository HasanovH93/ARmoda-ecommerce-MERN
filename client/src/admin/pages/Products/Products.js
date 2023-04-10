import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../store/slices/product-slice";
import ProductList from "../../components/Products/ProductList";
import styles from "./Products.module.scss";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  console.log("Products", sidebarOpen);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
