import React, { useState } from 'react';
import Modal from 'react-modal';
import productData from '../../../../public/product.json';

const CombinedForm = () => {
  // Personal Details State
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    number: '',
    address: '',
  });

  // Product Details State
  const [productCode, setProductCode] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Selected Products State
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Modal Control Functions
  const openProductModal = () => {
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
  };

  // Handle Personal Details Change
  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Product Code Change
  const handleProductCodeChange = (e) => {
    setProductCode(e.target.value);

    const foundProduct = productData.products.find(
      (product) => product.code === e.target.value
    );

    if (foundProduct) {
      setProductDetails(foundProduct);
    } else {
      setProductDetails(null);
    }
  };
  const handleQuantityChange = (e, index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = e.target.value;
    setSelectedProducts(updatedProducts);
  };

  // Add Product to Order
  const handleAddProduct = () => {
    if (productDetails) {
      setSelectedProducts([...selectedProducts, { ...productDetails }]);
      setProductCode('');
      setProductDetails(null);
    }
  };

  // Submit Order
  const handleSubmit = (e) => {
    // setSelectedProducts({
    //     ...selectedProducts,
    //     [e.target.name]: e.target.value,
    //   });
  };

  const handleInputChange = (e) => {
    setSelectedProducts({
      ...selectedProducts,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Details Section */}
      <div className="mb-10">
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={personalDetails.name}
            onChange={handlePersonalDetailsChange}
            placeholder="Full Name"
            className='input input-bordered w-full max-w-xs'
          />
        </label>
      </div>

      <div className="mb-10">
        <label>
          Mobile Number:
          <input
            type="number"
            name="number"
            value={personalDetails.number}
            onChange={handlePersonalDetailsChange}
            placeholder="Mobile Number"
            className='input input-bordered w-full max-w-xs'
          />
        </label>
      </div>

      <div className="mb-10">
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={personalDetails.address}
            onChange={handlePersonalDetailsChange}
            placeholder="Address"
            className='input input-bordered w-full max-w-xs'
          />
        </label>
      </div>

      {/* Product Details Section */}
      <div className="mb-10">
        <label>
          Enter Product Code:
          <input
            type="text"
            value={productCode}
            onChange={handleProductCodeChange}
            placeholder="Enter Product Code"
            className='input input-bordered w-full max-w-xs'
          />
        </label>
      </div>

      <div className="mb-10">
        <label>
          Product Quantity:
          <input
            type="number"
            name="quantity"
            value={selectedProducts?.quantity || ''}
            onChange={handleInputChange}
            placeholder="Product Quantity"
          />
        </label>
      </div>
      

      {productDetails && (
        <div className="mb-10">
          <button
            onClick={openProductModal}
            className="w-full btn btn-info rounded-md border border-primary bg-info px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
          >
            View Product Details
          </button>
        </div>
      )}

      {/* Selected Products Section */}
      {selectedProducts.map((product, index) => (
  <div key={index} className="mb-5">
    <label>
      Product {index + 1}: Code - {product.code}
      <input
        type="number"
        value={product.quantity || ''}
        onChange={(e) => handleQuantityChange(e, index)}
        placeholder="Quantity"
        className='input input-bordered w-full max-w-xs'
      />
    </label>
  </div>
))}

      <div className="mb-10">
        <button
          type="button"
          onClick={handleAddProduct}
          className="w-full btn btn-info rounded-md border border-primary bg-info px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
        >
          Add Product
        </button>
      </div>

      {/* Submit Button */}
      <div className="mb-10">
        <input
          type="submit"
          value="Place Order"
          className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
        />
      </div>

      {/* Product Details Modal */}
      <Modal
        isOpen={isProductModalOpen}
        onRequestClose={closeProductModal}
        contentLabel="Product Details Modal"
      >
        {productDetails && (
          <div className='flex justify-between gap-12'>
            <div>
              <img src={productDetails.image} alt="" />
            </div>
            <div>
              <h2>Product Details:</h2>
              <p>Code: {productDetails.code}</p>
              <p className='text-lg font-bold'>{productDetails.name}</p>
              <p>Description: {productDetails.description}</p>
              {/* Add other details as needed */}
              <button onClick={closeProductModal}>Close</button>
            </div>
          </div>
        )}
      </Modal>
    </form>
  );
};

export default CombinedForm;
