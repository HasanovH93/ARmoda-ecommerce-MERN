import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import ImageDropzone from "./ImageDropzone";
import api from "../../api";
import VariationForm from "./VariationForm";
import { setProducts } from "../../store/slices/product-slice";
import CategoriesForm from "./CategoriesForm";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    files: [],
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const completeProduct = { ...product, variations, categories };

    Object.entries(completeProduct).forEach(([key, value]) => {
      console.log(key === "categories" || key === "categories");
      if (key === "files") {
        value.forEach((file) => {
          formData.append("img", file);
        });
      } else if (key === "variations" || key === "categories") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    try {
      console.log(formData);
      const response = await api.post("/hotels/create", formData);
      console.log(response.data);
      dispatch(setProducts(response.data.createdData));
    } catch (error) {
      console.error("Error while adding hotel:", error);
    }
  };

  const [variations, setVariations] = useState([{ color: "", size: [] }]);

  const [categories, setCategories] = useState([]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="productName">
        <Form.Label>Product Name:</Form.Label>
        <Form.Control
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>Product Image:</Form.Label>
        <div className="image-dropzone-container">
          <ImageDropzone product={product} setProduct={setProduct} />
        </div>
      </Form.Group>

      <Form.Group controlId="variations">
        <Form.Label>Product Variations:</Form.Label>
        <VariationForm variations={variations} setVariations={setVariations} />
      </Form.Group>
      <Form.Group controlId="categories">
        <CategoriesForm categories={categories} setCategories={setCategories} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};

export default ProductForm;
