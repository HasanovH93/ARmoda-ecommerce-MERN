import { useSelector } from "react-redux";
import ProductForm from "./ProductForm/ProductForm";
import styles from "./AddProduct.module.scss";
import { Row, Col } from "react-bootstrap";

const AddProduct = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  return (
    <div
      className={`${styles.container} ${sidebarOpen ? "" : styles.sidebarOpen}`}
    >
      <Row>
        <Col>
          <h2 className={styles.title}>Add Product</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProductForm />
        </Col>
      </Row>
    </div>
  );
};

export default AddProduct;
