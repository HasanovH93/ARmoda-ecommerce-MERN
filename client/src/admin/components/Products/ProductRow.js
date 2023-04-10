import { Button } from "react-bootstrap";

const ProductRow = ({ product }) => {
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
        <Button variant="danger">Delete</Button>
      </td>
    </tr>
  );
};

export default ProductRow;
