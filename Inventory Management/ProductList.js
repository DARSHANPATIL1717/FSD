import React from 'react';

const products = [
  { id: 1, name: "Laptop", price: 55000, stock: 10 },
  { id: 2, name: "Keyboard", price: 1200, stock: 0 },
  { id: 3, name: "Mouse", price: 600, stock: 8 }
];

function ProductList() {
  return (
    <table className="table table-bordered text-center">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Price (₹)</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>

            {/* Conditional Rendering */}
            <td>
              {product.stock > 0 ? (
                <span className="text-success">In Stock</span>
              ) : (
                <span className="text-danger">Out of Stock</span>
              )}
            </td>

            {/* Conditional Button */}
            <td>
              <button
                className="btn btn-success"
                disabled={product.stock === 0}
              >
                Buy
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;