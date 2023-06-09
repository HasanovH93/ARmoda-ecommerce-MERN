import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../store/slices/product-slice";

const ProductRow = ({ product, onEditProduct }) => {
  const dispatch = useDispatch();

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <tr>
      <td>
        <img
          src={product.image[0]}
          alt={product.name}
          width="100"
          height="100"
        />
      </td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.fullDescription}</td>
      <td>
        <Button variant="primary" onClick={() => onEditProduct(product)}>
          Edit
        </Button>
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
