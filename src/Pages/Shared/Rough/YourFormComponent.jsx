import React, { useState } from 'react';
import Modal from 'react-modal';

const YourFormComponent = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleInputChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, selectedProduct]);
    setSelectedProduct(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Existing input fields for user details */}
      
      <div className="mb-10">
        <label>
          Enter Product Code:
          <input
            type="text"
            name="code"
            value={selectedProduct?.code || ''}
            onChange={handleInputChange}
            placeholder="Enter Product Code"
          />
        </label>
      </div>

      <div className="mb-10">
        <label>
          Product Quantity:
          <input
            type="number"
            name="quantity"
            value={selectedProduct?.quantity || ''}
            onChange={handleInputChange}
            placeholder="Product Quantity"
          />
        </label>
      </div>

      <div className="mb-10">
        <button
          type="button"
          onClick={() => openModal(selectedProduct)}
          className="w-full btn btn-info rounded-md border border-primary bg-info px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
        >
          Add Product
        </button>
      </div>

      {products.map((product, index) => (
        <div key={index} className="mb-5">
          <p>
            Product {index + 1}: Code - {product.code}, Quantity - {product.quantity}
          </p>
        </div>
      ))}

      <div className="mb-10">
        <input
          type="submit"
          value="Place Order"
          className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details Modal"
      >
        {selectedProduct && (
          <div>
            <h2>Product Details:</h2>
            <p>Code: {selectedProduct.code}</p>
            <p>Quantity: {selectedProduct.quantity}</p>
            {/* Include other product details here */}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </form>
  );
};

export default YourFormComponent;
