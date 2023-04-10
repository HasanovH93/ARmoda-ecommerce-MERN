import React from "react";
import { useSelector } from "react-redux";
import ProductForm from "./ProductForm/ProductForm";
import styles from "./AddProduct.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddProduct = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  console.log("Add-Products", sidebarOpen);
  return (
    <div
      className={`${styles.container} ${sidebarOpen ? "" : styles.sidebarOpen}`}
    >
      <Row>
        <Col>
          <h2 className={styles.title}>Add Product</h2>
          <ProductForm />
        </Col>
      </Row>
    </div>
  );
};

export default AddProduct;
