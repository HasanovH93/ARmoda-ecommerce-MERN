import React from "react";
import { BsTrash } from "react-icons/bs";
import { colorOptions, sizeOptions } from "../../../data/data";
import styles from "./VariationForm.module.scss";
import useHandleInputChange from "../../../hooks/HandleInputChange";

const VariationForm = ({ variations, setVariations }) => {
  const addVariation = () => {
    setVariations([...variations, { color: "", image: "", size: [] }]);
  };
  const removeVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const handleInputChange = useHandleInputChange(
    null,
    null,
    null,
    null,
    setVariations,
    null,
    null
  );
  return (
    <div className={styles.variationForm}>
      {variations.map((variation, index) => (
        <div key={index} className={styles.variation}>
          {index > 0 && (
            <button
              type="button"
              className={styles.removeVariationButton}
              onClick={() => removeVariation(index)}
            >
              <BsTrash />
            </button>
          )}
          <label className={styles.colorLabel}>
            Color:
            <select
              className={styles.colorSelect}
              value={variation.color}
              onChange={(e) =>
                handleInputChange("variations", index, "color", e.target.value)
              }
            >
              <option value="">Select a color</option>
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.sizes}>
            <div>Sizes:</div>
            {sizeOptions.map((size) => {
              const isChecked = variation.size.some(
                (sizeObj) => sizeObj.name === size
              );
              return (
                <div key={size} className={styles.sizeWrapper}>
                  <label className={styles.sizeLabel}>
                    <input
                      className={styles.sizeCheckbox}
                      type="checkbox"
                      value={size}
                      checked={isChecked}
                      onChange={(e) =>
                        handleInputChange(
                          "variations",
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
                    <label className={styles.stockFor}>
                      Stock:
                      <input
                        className={styles.stockInput}
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
                            "variations",
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
        </div>
      ))}
      <button
        className={styles.addVariationButton}
        type="button"
        onClick={addVariation}
      >
        Add More Variations
      </button>
    </div>
  );
};

export default VariationForm;
