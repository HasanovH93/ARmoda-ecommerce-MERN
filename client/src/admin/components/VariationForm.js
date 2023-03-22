import React from "react";
import ImageDropzone from "./ImageDropzone";

const VariationForm = ({ variations, setVariations }) => {
  const addVariation = () => {
    setVariations([...variations, { color: "", image: "", size: [] }]);
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

      // Remove "stock" keys with empty values
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
          <label>
            Color:
            <select
              value={variation.color}
              onChange={(e) =>
                handleInputChange(index, "color", e.target.value)
              }
            >
              <option value="">Select a color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Yellow">Yellow</option>
              <option value="Black">Black</option>
            </select>
          </label>
          <div className="sizes">
            Sizes:
            {["S", "M", "L", "XL"].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  value={size}
                  checked={variation.size.some(
                    (sizeObj) => sizeObj.name === size
                  )}
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
            ))}
          </div>
          {variation.size.map((sizeObj, sizeIndex) => (
            <label key={sizeObj.name}>
              Stock for {sizeObj.name}:
              <input
                type="number"
                value={sizeObj.stock || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    `stock-${sizeObj.name}`,
                    e.target.value
                  )
                }
              />
            </label>
          ))}
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
