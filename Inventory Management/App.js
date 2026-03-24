import React from 'react';
import ProductList from './components/ProductList.js';

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">
            Product Inventory Management
          </span>
        </div>
      </nav>

      <div className="container mt-4">
        <ProductList />
      </div>
    </div>
  );
}

export default App;