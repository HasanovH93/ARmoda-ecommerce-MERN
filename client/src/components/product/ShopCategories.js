import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categories, getSortParams, selectedCategory }) => {
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category, e) => {
    getSortParams("category", category);
    setActiveCategory(category);
    setActiveSort(e);
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <Link to={`/category/all`}>
                  <button
                    onClick={(e) => {
                      getSortParams("category", "");
                      setActiveCategory("");
                      setActiveSort(e);
                    }}
                    className={activeCategory === "" ? "active" : ""}
                  >
                    <span className="checkmark" /> All Categories
                  </button>
                </Link>
              </div>
            </li>
            {categories.map((category, key) => {
              const categoryName = category.replace(/-/g, " ");
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <Link to={`/category/${category.toLowerCase()}`}>
                      <button
                        onClick={(e) => {
                          handleCategoryClick(category, e);
                        }}
                        className={activeCategory === category ? "active" : ""}
                      >
                        {" "}
                        <span className="checkmark" /> {categoryName}{" "}
                      </button>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
  selectedCategory: PropTypes.string,
};

export default ShopCategories;
