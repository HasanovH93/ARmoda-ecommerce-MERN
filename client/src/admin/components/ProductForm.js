import React, { useState } from "react";
import ImageDropzone from "./ImageDropzone";
import api from "../../api";
import VariationForm from "./VariationForm";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const completeProduct = { ...product, variations };

    Object.entries(completeProduct).forEach(([key, value]) => {
      if (key === "files") {
        value.forEach((file) => {
          formData.append("img", file);
        });
      } else if (key === "variations") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await api.post("/hotels/create", formData);
    } catch (error) {
      console.error("Error while adding hotel:", error);
    }
  };

  const [variations, setVariations] = useState([{ color: "", size: [] }]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            step="0.01"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>
        <div className="image-dropzone-container">
          <ImageDropzone product={product} setProduct={setProduct} />
        </div>
      </div>

      <div className="variations-container">
        <VariationForm variations={variations} setVariations={setVariations} />
      </div>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
