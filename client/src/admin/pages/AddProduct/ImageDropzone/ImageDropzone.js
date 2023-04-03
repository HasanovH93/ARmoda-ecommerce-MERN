import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

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
    <div className="imageUpload">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag 'n' drop up to 5 images here, or click to select files</p>
      </div>
      <ul>
        {acceptedFiles.map((file, index) => (
          <li key={file.name} className="uploaded-file">
            {file.name}
            {uploadedImages[index] && (
              <img
                src={uploadedImages[index]}
                alt={file.name}
                className="uploaded-image"
              />
            )}
            <button
              className="remove-image-button"
              onClick={() => removeImage(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageDropzone;
