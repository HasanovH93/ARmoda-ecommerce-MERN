import { useCallback } from "react";

const useHandleInputChange = (
  product,
  setProduct,
  selectedItems,
  setSelectedItems,
  setVariations,
  setAcceptedFiles,
  setUploadedImages
) => {
  const handleInputChange = useCallback(
    (type, ...args) => {
      console.log(type);
      if (type === "variations") {
        console.log("here ");
        const [index, field, value, checked] = args;

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
          updatedVariation.size.forEach((sizeObj) => {
            if (sizeObj.stock === "") {
              delete sizeObj.stock;
            }
          });

          updatedVariations[index] = updatedVariation;
          return updatedVariations;
        });
      } else if (type === "files") {
        const [event] = args;
        const newAcceptedFiles = [...event.target.files];

        setAcceptedFiles((prevFiles) => [...prevFiles, ...newAcceptedFiles]);

        setProduct((prevProduct) => {
          return {
            ...prevProduct,
            files: [...prevProduct.files, ...newAcceptedFiles],
          };
        });

        setUploadedImages((prevImages) => [
          ...prevImages,
          ...newAcceptedFiles.map((file) => URL.createObjectURL(file)),
        ]);
      } else if (type === "product") {
        const [event] = args;
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
      } else if (type === "item") {
        const [event] = args;
        const item = event.target.name;
        const checked = event.target.checked;
        if (checked) {
          setSelectedItems([...selectedItems, item]);
        } else {
          setSelectedItems(selectedItems.filter((i) => i !== item));
        }
      }
    },
    [
      product,
      setProduct,
      selectedItems,
      setSelectedItems,
      setVariations,
      setAcceptedFiles,
      setUploadedImages,
    ]
  );

  return handleInputChange;
};

export default useHandleInputChange;
