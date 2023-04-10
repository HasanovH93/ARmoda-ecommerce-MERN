import { Table } from "react-bootstrap";
import ProductRow from "./ProductRow";

const ProductList = ({ products }) => {
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
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
