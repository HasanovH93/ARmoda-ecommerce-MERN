import React from "react";
import ImageDropzone from "../ImageDropzone/ImageDropzone";

const VariationForm = ({ variations, setVariations }) => {
  const addVariation = () => {
    setVariations([...variations, { color: "", image: "", size: [] }]);
  };
  const removeVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value, checked) => {
    setVariations((prevVariations) => {
      const updatedVariations = [...prevVariations];
      const updatedVariation = { ...updatedVariations[index] };

      if (field === "color") {
        updatedVariation[field] = value;
      } else if (field === "image") {
        updatedVariation[field] = value;
      } else if (field === "size") {
        const sizeIndex = updatedVariation.size.findIndex(
          (sizeObj) => sizeObj.name === value
        );

        if (checked) {
          if (sizeIndex === -1) {
            updatedVariation.size.push({ name: value, stock: "" });
          }
        } else {
          if (sizeIndex !== -1) {
            updatedVariation.size.splice(sizeIndex, 1);
          }
        }
      } else if (field.startsWith("stock")) {
        const sizeName = field.split("-")[1];
        const sizeObjIndex = updatedVariation.size.findIndex(
          (sizeObj) => sizeObj.name === sizeName
        );

        if (sizeObjIndex === -1 && value) {
          updatedVariation.size.push({ name: sizeName, stock: value });
        } else if (sizeObjIndex !== -1 && value) {
          updatedVariation.size[sizeObjIndex].stock = value;
        } else if (sizeObjIndex !== -1 && !value) {
          updatedVariation.size.splice(sizeObjIndex, 1);
        }
      }
      updatedVariation.size.forEach((sizeObj) => {
        if (sizeObj.stock === "") {
          delete sizeObj.stock;
        }
      });

      updatedVariations[index] = updatedVariation;
      return updatedVariations;
    });
  };
  return (
    <div className="variation-form">
      {variations.map((variation, index) => (
        <div key={index} className="variation">
          {index > 0 && (
            <button
              type="button"
              className="remove-variation-button"
              onClick={() => removeVariation(index)}
            >
              X
            </button>
          )}
          <label>
            Color:
            <select
              value={variation.color}
              onChange={(e) =>
                handleInputChange(index, "color", e.target.value)
              }
            >
              <option value="">Select a color</option>
              <option value="red">red</option>
              <option value="blue">blue</option>
              <option value="green">green</option>
              <option value="black">Black</option>
              <option value="white">white</option>
            </select>
          </label>
          <div className="sizes">
            Sizes:
            {["x", "m", "xxl", "s"].map((size) => {
              const isChecked = variation.size.some(
                (sizeObj) => sizeObj.name === size
              );
              return (
                <div key={size}>
                  <label>
                    <input
                      type="checkbox"
                      value={size}
                      checked={isChecked}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "size",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    {size}
                  </label>
                  {isChecked && (
                    <label className="stock-for">
                      Stock:
                      <input
                        type="number"
                        value={
                          (
                            variation.size.find(
                              (sizeObj) => sizeObj.name === size
                            ) || { stock: "" }
                          ).stock
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            `stock-${size}`,
                            e.target.value
                          )
                        }
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </div>
          <label>
            Image URL:
            <ImageDropzone
              product={variation}
              setProduct={(updatedProduct) =>
                handleInputChange(index, "image", updatedProduct.image)
              }
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={addVariation}>
        Add More Variations
      </button>
    </div>
  );
};

export default VariationForm;
