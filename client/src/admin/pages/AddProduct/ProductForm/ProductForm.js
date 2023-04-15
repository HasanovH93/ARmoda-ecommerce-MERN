import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ImageDropzone from "../ImageDropzone/ImageDropzone";
import api from "../../../../api";
import VariationForm from "../VariationForm/VariationForm";
import { setProducts } from "../../../../store/slices/product-slice";
import styles from "./ProductForm.module.scss";
import SelectionForm from "../SelectionForm/SelectionForm";
import { categoriesList, tagsList } from "../../../data/data";
import useHandleInputChange from "../../../hooks/HandleInputChange";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    discount: "",
    files: [],
    variations: [],
    categories: [],
    tags: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = useHandleInputChange(
    product,
    setProduct,
    null,
    null,
    null,
    null,
    null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const completeProduct = { ...product, variations, categories, tags };

    Object.entries(completeProduct).forEach(([key, value]) => {
      if (key === "files") {
        value.forEach((file) => {
          formData.append("img", file);
        });
      } else if (
        key === "variations" ||
        key === "categories" ||
        key === "tags"
      ) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    try {
      console.log(formData);
      const response = await api.post("/hotels/create", formData);
      dispatch(setProducts(response.data.createdData));
      navigate("/dashboard/all-products");
    } catch (error) {
      console.error("Error while adding hotel:", error);
    }
  };

  const [variations, setVariations] = useState([{ color: "", size: [] }]);

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  return (
    <Container>
      <Form onSubmit={handleSubmit} className={styles.createForm}>
        <Row>
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
        </Row>

        <Row>
          <Col sm={12} md={2}>
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
          <Col sm={12} md={2}>
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
          <Col sm={12} md={8}>
            <Form.Group controlId="image">
              <Form.Label>Product Image:</Form.Label>
              <div className="image-dropzone-container">
                <ImageDropzone product={product} setProduct={setProduct} />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="variationsAndCategories">
          <Row>
            <Col sm={12} md={6}>
              <Form.Label>Product Variations:</Form.Label>
              <VariationForm
                variations={variations}
                setVariations={setVariations}
              />
            </Col>
            <Col sm={12} md={3}>
              <SelectionForm
                title="Categories"
                items={categoriesList}
                selectedItems={categories}
                setSelectedItems={setCategories}
              />
            </Col>
            <Col sm={12} md={3}>
              <SelectionForm
                title="Tags"
                items={tagsList}
                selectedItems={tags}
                setSelectedItems={setTags}
              />
            </Col>
          </Row>
        </Form.Group>
        <div className={styles.centerButton}>
          <Button
            variant="primary"
            type="submit"
            className={`${styles.addButton}`}
          >
            Add Product
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ProductForm;
