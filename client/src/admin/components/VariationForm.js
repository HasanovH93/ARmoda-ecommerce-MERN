import React from "react";

const VariationForm = ({ variations, setVariations }) => {
  const addVariation = () => {
    setVariations([...variations, { color: "", image: "", size: [] }]);
  };

  const handleInputChange = (index, field, value, checked) => {
    setVariations((prevVariations) => {
      const updatedVariations = [...prevVariations];
      const updatedVariation = { ...updatedVariations[index] };

      if (field === "color" || field.startsWith("stock")) {
        updatedVariation[field] = value;
      } else if (field === "size") {
        const sizeIndex = updatedVariation.size.findIndex(
          (sizeObj) => sizeObj.name === value
        );

        if (checked) {
          if (sizeIndex === -1) {
            updatedVariation.size.push({ name: value, stock: 0 });
          }
        } else {
          if (sizeIndex !== -1) {
            updatedVariation.size.splice(sizeIndex, 1);
          }
        }
      }

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
                  checked={variation.size.includes(size)}
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
                    parseInt(e.target.value)
                  )
                }
              />
            </label>
          ))}
          <label>
            Image URL:
            <input
              type="text"
              value={variation.image}
              onChange={(e) =>
                handleInputChange(index, "image", e.target.value)
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
