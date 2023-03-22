import React, { useState } from "react";
import ImageDropzone from "./ImageDropzone";
import api from "../../api";
import CheckboxGroup from "./CheckBoxGroup";
import VariationForm from "./VariationForm";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    files: [],
    sizes: [],
    colors: [],
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
      console.log(formData);
      const response = await api.post("/hotels/create", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error while adding hotel:", error);
    }
  };
  const handleCheckboxChange = (type, e) => {
    const { value, checked } = e.target;
    setProduct((prevProduct) => {
      const updatedArray = checked
        ? [...prevProduct[type], value]
        : prevProduct[type].filter((item) => item !== value);

      return {
        ...prevProduct,
        [type]: updatedArray,
      };
    });
  };

  const [variations, setVariations] = useState([{ color: "", size: [] }]);

  return (
    <form onSubmit={handleSubmit}>
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

      {/* <label>
        Sizes:
        <CheckboxGroup
          type="sizes"
          options={["S", "M", "L"]}
          handleCheckboxChange={handleCheckboxChange}
        />
      </label>
      <label>
        Colors:
        <CheckboxGroup
          type="colors"
          options={["Red", "Blue", "Green"]}
          handleCheckboxChange={handleCheckboxChange}
        />
      </label> */}
      <VariationForm variations={variations} setVariations={setVariations} />
      <ImageDropzone product={product} setProduct={setProduct} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
