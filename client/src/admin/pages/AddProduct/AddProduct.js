import React from "react";
import ProductForm from "./ProductForm/ProductForm";
import styles from "./AddProduct.module.scss";
import Container from "react-bootstrap/Container";

const AddProduct = () => {
  return (
    <Container className={styles.addProduct}>
      <h2 className={styles.title}>Add Product</h2>
      <ProductForm />
    </Container>
  );
};

export default AddProduct;
