import React from "react";
import { useSelector } from "react-redux";
import ProductForm from "./ProductForm/ProductForm";
import styles from "./AddProduct.module.scss";
import Container from "react-bootstrap/Container";

const AddProduct = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  return (
    <Container
      className={`${styles.addProduct} ${
        sidebarOpen ? "" : styles.sidebarOpen
      }`}
    >
      <h2 className={styles.title}>Add Product</h2>
      <ProductForm />
    </Container>
  );
};

export default AddProduct;
