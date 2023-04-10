import { Table } from "react-bootstrap";
import ProductRow from "./ProductRow";

const ProductList = ({ products }) => {
  console.log("products", products);

  if (!Array.isArray(products)) {
    return null;
  }

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Product Image</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <ProductRow key={product._id} product={product} />
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
