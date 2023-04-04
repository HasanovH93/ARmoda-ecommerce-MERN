import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "./CategoriesForm.module.scss";

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
    <Container className={styles.categoriesContainer}>
      <h4 className={styles.categoriesTitle}>Categories:</h4>
      <Row className={styles.categoriesRow}>
        {categoriesList.map((category, index) => (
          <Col sm={6} key={index} className={styles.categoryCol}>
            <div className={styles.cardWrapper}>
              <Form.Check
                custom
                type="checkbox"
                id={`category-${index}`}
                label={category}
                name={category}
                checked={categories.includes(category)}
                onChange={handleCategoryChange}
                className={styles.checkboxContainer}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

CategoriesForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default CategoriesForm;
