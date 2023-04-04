import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Row, Col, Form } from "react-bootstrap";
import styles from "./ImageDropzone.module.scss";

const ImageDropzone = ({ product, setProduct }) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setAcceptedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

      setProduct((prevProduct) => {
        return {
          ...prevProduct,
          files: [...prevProduct.files, ...acceptedFiles],
        };
      });

      setUploadedImages((prevImages) => [
        ...prevImages,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ]);
    },
  });

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
            <div {...getRootProps()} className={styles.dropzone}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop up to 5 images here, or click to select files</p>
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {acceptedFiles.map((file, index) => (
          <Col xs={12} md={4} key={file.name}>
            <div className={styles.uploadedFile}>
              <p className={styles.uploadedFileName}>{file.name}</p>
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
                X
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImageDropzone;
