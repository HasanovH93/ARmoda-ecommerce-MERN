import React from "react";
import PropTypes from "prop-types";

const categoriesList = [
  "Baby bodysuits",
  "Rompers",
  "Dresses",
  "Pants and leggings",
  "T-shirts",
  "Blouses and vests",
  "Jackets",
  "Swimwear",
  "Accessories",
];

const CategoriesForm = ({ categories, setCategories }) => {
  const handleCategoryChange = (e) => {
    const category = e.target.name;
    const checked = e.target.checked;
    if (checked) {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.filter((c) => c !== category));
    }
  };

  return (
    <div>
      <h4>Categories:</h4>
      {categoriesList.map((category) => (
        <div key={category}>
          <input
            type="checkbox"
            id={category}
            name={category}
            checked={categories.includes(category)}
            onChange={handleCategoryChange}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
    </div>
  );
};

CategoriesForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default CategoriesForm;