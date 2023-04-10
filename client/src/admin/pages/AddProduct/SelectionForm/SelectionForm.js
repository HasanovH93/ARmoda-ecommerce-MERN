import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "./SelectionForm.module.scss";

const SelectionForm = ({ title, items, selectedItems, setSelectedItems }) => {
  const handleItemChange = (e) => {
    const item = e.target.name;
    const checked = e.target.checked;
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    }
  };

  return (
    <Container className={styles.selectionContainer}>
      <h4 className={styles.selectionTitle}>{title}:</h4>
      <Row className={styles.selectionRow}>
        {items.map((item, index) => (
          <Col sm={6} key={index} className={styles.itemCol}>
            <div className={styles.cardWrapper}>
              <Form.Check
                custom="true"
                type="checkbox"
                id={`${title.toLowerCase()}-${index}`}
                label={item}
                name={item}
                checked={selectedItems.includes(item) ? "true" : ""}
                onChange={handleItemChange}
                className={styles.checkboxContainer}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

SelectionForm.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedItems: PropTypes.func.isRequired,
};

export default SelectionForm;
