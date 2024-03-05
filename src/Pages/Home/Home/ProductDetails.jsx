import React, { useState } from 'react';
import Modal from 'react-modal';
import productData from '../../../../public/product.json'
import { InputBox } from '../../Shared/InputBox/InputBox';

const ProductDetails = () => {
  const [productCode, setProductCode] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const code = e.target.value;
    setProductCode(code);

    const foundProduct = productData.products.find(
      (product) => product.code === code
    );

    if (foundProduct) {
      setProductDetails(foundProduct);
    } else {
      setProductDetails(null);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission if needed
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="mb-10">
      <label>
        <input type="text" name="name" placeholder="Full Name" className='input input-bordered w-full max-w-xs'/>
      </label>
    </div>

    <div className="mb-10">
      <label>
        <input type="number" name="number" placeholder="Mobile Number" className='input input-bordered w-full max-w-xs'/>
      </label>
    </div>

    <div className="mb-10">
      <label>
        <input type="text" name="address" placeholder="Address" className='input input-bordered w-full max-w-xs'/>
      </label>
    </div>

    <div className="mb-10">
      <label>
        <input
          type="text"
          value={productCode}
          onChange={handleInputChange}
          placeholder="Enter Product Code"
          className='input input-bordered w-full max-w-xs'
        />
      </label>
    </div>

    <div className="mb-10">
      <label>
        <input type="number" name="quantity" placeholder="Product Quantity" className='input input-bordered w-full max-w-xs' />
      </label>
    </div>

    {productDetails && (
      <div className="mb-10">
        <button
          onClick={openModal}
          className="w-full btn btn-info rounded-md border border-primary bg-info px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
        >
          View Product Details
        </button>
      </div>
    )}

    <div className="mb-10">
      <input
        type="submit"
        value="Sign In"
        className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
       />
    </div>

    <Modal
isOpen={isModalOpen}
onRequestClose={closeModal}
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
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}
</Modal>
  </form>
  );
};

export default ProductDetails;
