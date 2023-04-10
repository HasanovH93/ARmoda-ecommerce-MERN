import { Button } from "react-bootstrap";
import { deleteProductById } from "../../../api";

const ProductRow = ({ product }) => {
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProductById(id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <tr>
      <td>
        <img src={product.image} alt={product.name} width="100" height="100" />
      </td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <Button variant="primary">Edit</Button>
      </td>
      <td>
        <Button
          variant="danger"
          onClick={() => handleDeleteProduct(product._id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ProductRow;
