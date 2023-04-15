import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import useHandleInputChange from "../../../hooks/HandleInputChange";
import styles from "./ImageDropzone.module.scss";

const ImageDropzone = ({ product, setProduct }) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleInputChange = useHandleInputChange(
    product,
    setProduct,
    null,
    null,
    null,
    setAcceptedFiles,
    setUploadedImages
  );

  const removeImage = (index) => {
    setAcceptedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        files: prevProduct.files.filter((_, i) => i !== index),
      };
    });
  };

  return (
    <div className={styles.imageUpload}>
      <Row>
        <Col>
          <Form.Group className="mb-0">
            <div className={styles.dropzone}>
              <label htmlFor="uploadInput">
                <FiUpload className={styles.uploadIcon} />
                Upload Image
              </label>
              <input
                id="uploadInput"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => handleInputChange("files", event)}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Row className={styles.uploadedFilesContainer}>
        {acceptedFiles.map((file, index) => (
          <Col xs={6} md={4} lg={2} key={file.name}>
            <div className={styles.uploadedFile}>
              {uploadedImages[index] && (
                <img
                  src={uploadedImages[index]}
                  alt={file.name}
                  className={styles.uploadedImage}
                />
              )}
              <button
                className={`btn ${styles.removeImageButton}`}
                onClick={() => removeImage(index)}
              >
                <BsTrash />
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImageDropzone;
