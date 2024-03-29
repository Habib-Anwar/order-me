import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const ProductDetails = () => {
  const [productCode, setProductCode] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderProduct, setOrderProduct] = useState([]);


  const {user} = useContext(AuthContext);

  useEffect(()=>{
     fetch('http://localhost:5000/product')
     .then(res =>res.json())
     .then(data =>setOrderProduct(data))
  }, [])

  const handleInputChange = (e) => {
    const code = e.target.value;
    setProductCode(code);

    const foundProduct = orderProduct[0].products.find(
      (product) => product.code === code
    );

    if (foundProduct) {
      setProductDetails(foundProduct);
    } else {
      setProductDetails(null);
    }
  };
  const openModalForAddProduct = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const customerName = form.name.value;
    const number = form.number.value;
    const address = form.address.value;
    const code = form.code.value;
    const quantity = form.quantity.value;
    console.log(customerName, number, address, code, quantity)

    const apiUrl = 'http://localhost:5000/orders';

    const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Dhaka' });
    
    const orderData = {
      customerName,
      number,
      address,
      code,
      quantity,
      product: productDetails.name,
      price: productDetails.price,
      image: productDetails.image,
      userEmail: user?.email,
      date: currentDate // Add the current date to the order data
    };
    
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server as needed
        console.log('Order stored successfully:', data);
      })
      .catch((error) => {
        console.error('Error storing order:', error);
    });
    
  };

  return (
    <>
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
          name='code'
        />
      </label>
    </div>
    {productDetails && (
      <div className="mb-10">
        <input
          type='text'
          value={productDetails.price}
          className="input input-bordered w-full max-w-xs"
          placeholder="Price"
          name='price'
        />
      </div>
    )}

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
        <button
           type="submit"
          onClick={() => openModalForAddProduct(selectedProduct)}
          className="w-full btn btn-info rounded-md bg-error px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
        >
          Add Product
        </button>
      </div>
      </form>
    <Link to="/order">
    <div className="mb-10">
      <input
       type="button"
        value="Place Order"
        className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
       />
    </div>
    </Link>
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
      <p className='text-md font-semibold'>Price: {productDetails.price} tk</p>
      <p>Description: {productDetails.description}</p>
      {/* Add other details as needed */}
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}
</Modal>
</>
  );
};

export default ProductDetails;