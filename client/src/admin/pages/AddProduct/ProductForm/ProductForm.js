import { Form, Row, Col, Container } from "react-bootstrap";
import styles from "./ProductForm.module.scss";
import useHandleInputChange from "../../../hooks/HandleInputChange";

const ProductForm = ({ product, setProduct }) => {
  const handleInputChange = useHandleInputChange(
    product,
    setProduct,
    null,
    null,
    null,
    null,
    null
  );

  return (
    <Container>
      <Row>
        <Col sm={12} md={4}>
          <Form.Group controlId="productName">
            <Form.Label className={styles.label}>Product Name:</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={product.productName}
              onChange={(event) => handleInputChange("product", event)}
              required
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={8}>
          <Form.Group controlId="description">
            <Form.Label className={styles.label}>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={product.description}
              onChange={(event) => handleInputChange("product", event)}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={4}>
          <Form.Group controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={(event) => handleInputChange("product", event)}
              required
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group controlId="discount">
            <Form.Label>Discount:</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="discount"
              value={product.discount}
              onChange={(event) => handleInputChange("product", event)}
              required
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForm;
