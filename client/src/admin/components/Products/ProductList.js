import { Table } from "react-bootstrap";
import { useState } from "react";
import ProductRow from "./ProductRow";

const ProductList = ({ products }) => {
  const [editedProduct, setEditedProduct] = useState(null);
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
          <th>Product Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <ProductRow
            key={product._id}
            onEditProduct={(product) => setEditedProduct(product)}
            product={product}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
