import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const ProductDetails = () => {
  const [productCode, setProductCode] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formValue, setFormValue] = useState({
    name: '',
    number: '',
    address: '',
    quantity: ''
  });
  const [disable, setDisable] = useState('typing')
  const [orderProduct, setOrderProduct] = useState([]);
  const [quantity, setQuantity] = useState(1); 


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
  // const openModalForAddProduct = (product) => {
  //   setIsModalOpen(true);
  //   setSelectedProduct(product);
  // };

  const showSuccessAlert = (product) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    
    swalWithBootstrapButtons.fire({
      title: "Your product is added",
      text: "Want to add new product?",
      iconHtml: '<img src="https://t4.ftcdn.net/jpg/01/36/70/67/360_F_136706734_KWhNBhLvY5XTlZVocpxFQK1FfKNOYbMj.jpg" class="swal2-icon" style="width: auto;height: 80px;">',
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, place order!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Redirect to "/order" route when cancel button is clicked
        window.location.href = "/order";
      }
    });
    
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
    setDisable('submitted');

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
        setProductDetails(prevProducts =>{
          return prevProducts =>{
            return prevProducts.map(product => {
              if(product.id === selectedProduct.id){
                return res.data.product;
              }
              return product;
            })
          }
        })
      })
      .catch((error) => {
        console.error('Error storing order:', error);
    });
    
  };
  

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormValue({...formValue, [name]:value})
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value); // Parse the input value to an integer
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
  }
  };



  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="mb-10">
      <label>
        <input type="text" name="name" placeholder="Full Name" className='input input-bordered w-full max-w-xs' value={formValue.name} required
        onChange={handleInput}/>
      </label>
    </div>

    <div className="mb-10">
      <label>
        <input type="number" name="number" min="0" placeholder="Mobile Number" className='input input-bordered w-full max-w-xs' value={formValue.number} required
        onChange={handleInput}/>
      </label>
    </div>

    <div className="mb-10">
      <label>
        <input type="text" name="address" placeholder="Address" className='input input-bordered w-full max-w-xs' value={formValue.address} required
        onChange={handleInput}/>
      </label>
    </div>

    <div className="mb-10">
      <label>
        <input
          type="text"
          value={productCode}
          onChange={(e) => {
            handleInputChange(e);
          }}
          placeholder="Enter Product Code"
          className='input input-bordered w-full max-w-xs'
          name='code'
          required
          />
      </label>
      {productDetails && parseInt(productDetails.stock) < parseInt(quantity) && (
    <p className='text-sm text-red-500 font-semibold'>Sorry!! this dress is sold out</p>
  )}
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
        <input type="number" min="1" name="quantity" placeholder="Product Quantity" className='input input-bordered w-full max-w-xs'
        value={formValue.quantity} required    onChange={(event) => {
        handleQuantityChange(event);
        handleInput(event);
    }} />
      </label>
    </div>

    {productDetails && (
      <div className="mb-10">
        <button
          onClick={(e)=>{openModal(e);handleAddProductClick(e)}}
          className="w-full btn btn-info rounded-md border border-primary bg-info px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
        >
          View Product Details
        </button>
      </div>
    )}
     <div className="mb-10">
        <button
           type="submit"
          onClick={() => showSuccessAlert(selectedProduct)}
          className="w-full btn btn-info rounded-md bg-error px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
        disabled={formValue.name.length === 0 ||
        formValue.address.length === 0 ||
      formValue.number.length === 0 ||
      formValue.quantity.length === 0 ||
    
  disable === 'submitted'}
        >
          Add Product
        </button>
      </div>
      </form>
    {/* <Link to="/order">
    <div className="mb-10">
      <input
       type="button"
        value="Place Order"
        className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
       />
    </div>
    </Link> */}
    <Modal
isOpen={isModalOpen}
onRequestClose={closeModal}
contentLabel="Product Details Modal"
>
{isModalOpen && productDetails && (
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

