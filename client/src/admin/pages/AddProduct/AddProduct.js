import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm/ProductForm";
import styles from "./AddProduct.module.scss";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import ImageDropzone from "./ImageDropzone/ImageDropzone";
import SelectionForm from "./SelectionForm/SelectionForm";
import VariationForm from "./VariationForm/VariationForm";
import { setProducts } from "../../../store/slices/product-slice";
import api from "../../../api";
import { categoriesList, tagsList } from "../../data/data";

const AddProduct = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  console.log("Add-Products", sidebarOpen);
  return (
    <div
      className={`${styles.container} ${sidebarOpen ? "" : styles.sidebarOpen}`}
    >
      <Container>
        <Form onSubmit={handleSubmit} className={styles.createForm}>
          <Row>
            <Col>
              <h2 className={styles.title}>Add Product</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <ProductForm product={product} setProduct={setProduct} />

              <Form.Group controlId="image">
                <Form.Label>Product Image:</Form.Label>
                <div className="image-dropzone-container">
                  <ImageDropzone product={product} setProduct={setProduct} />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
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
            </Col>
          </Row>
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
    </div>
  );
};

export default AddProduct;
