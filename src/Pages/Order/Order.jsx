import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider';
import { getOrders } from '../../api/orders';
import { OrderData } from './OrderData';
import PriceCalculator from './PriceCalculator';
import PaymentOptions from '../../components/PaymentOptions';
import { useNavigate } from 'react-router-dom';

export const Order = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [paymentOption, setPaymentOption] = useState('');
    const [priceCalculatorData, setPriceCalculatorData] = useState({});
    const fetchOrders = () =>{
        getOrders(user?.email).then(data =>{ setOrders(data)})
    }
    useEffect(() => {
        fetchOrders();
      },[user])

      const handleOrderConfirm = async () => {
        try {
          const customerData = orders.map(({ customerName, image, number, address, code, quantity, product, price,date }) => ({ customerName, image, number, address, code, quantity, product, price,date }));
          const email = user?.email; // Extract email from user object
          const orderData = {
            customerData,
            paymentOption,
            priceCalculatorData,
            email: email, // Assign email to orderData
          };
    
          const response = await fetch('http://localhost:5000/admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });
    
          if (response.ok) {
            const responseData = await response.json();
            console.log('Order stored successfully:', responseData.result);
    
            const deleteResponse = await fetch(`http://localhost:5000/orders/${email}`, {
              method: 'DELETE',
            });
            navigate('/home')
    
            if (deleteResponse.ok) {
              console.log('Order data deleted successfully');
            } else {
              console.error('Failed to delete order data:', deleteResponse.statusText);
              // Handle the error case accordingly
            }
          } else {
            console.error('Failed to store order:', response.statusText);
            // Handle the error case accordingly
          }
        } catch (error) {
          console.error('Error handling order:', error);
          // Handle any unexpected errors
        }
      };
      
      

      

    
    
    
    
    

  
      const ordersByEmailAddress = {};
orders.forEach(order => {
  if (!ordersByEmailAddress[order.email]) {
    ordersByEmailAddress[order.email] = [];
  }
  ordersByEmailAddress[order.email].push(order);
});

  return (
    <div className='lg:grid grid-cols-2 gap-12 mb-12'>
      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
{orders.length > 0 ? (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rtl">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th key="header1" scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th key="header2"  scope="col" className="px-6 py-3">
                    Product
                </th>
                <th key="header3"  scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th key="header4"  scope="col" className="px-6 py-3">
                    Price
                </th>
                <th key="header5"  scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>{orders && orders.map(order => (<OrderData
                key={order?._id}
                order={order}
                fetchOrders={fetchOrders}></OrderData>))}</tbody>
    </table>
     ) : (
      <p>No data available.</p>
    )}
</div>
<div className="card w-96 bg-slate-300 shadow-xl h-1/2">
  <div className="card-body">
    <h2 className="card-title">Hi!</h2>
    <div className="avatar flex gap-4">
  <div className="w-24 mask mask-squircle">
    <img src={user?.photoURL} />
  </div>
  <div>
  <h3 className=' font-semibold'>{user?.displayName}</h3>
  </div>
  </div>
  {Object.keys(ordersByEmailAddress).map(email => (
      <div key={email}>
        <h3 className='font-semibold mt-4'>Shipping Address</h3>
        {ordersByEmailAddress[email].map(order => (
          <p key={order.id} className="-mt-2">
            <span>{order.address}</span>
          </p>
        ))}
        <h3 className='font-semibold'>Mobile</h3>
        {ordersByEmailAddress[email].map(order => (
          <p key={order.id} className="-mt-2">
            <span>{order.number}</span>
          </p>
        ))}
      </div>
    ))}
  </div>
</div>
<div className="card w-96 bg-base-100 shadow-xl ml-80 -mt-10">
  <div className="card-body">
   <PriceCalculator updateData={setPriceCalculatorData}></PriceCalculator>
   <div>
   <h3 className='font-semibold'>
      Payment Option:
    </h3>
    <PaymentOptions updateOption={setPaymentOption}></PaymentOptions>
   </div>
    <div className="card-actions justify-end mt-4">
      <button onClick={handleOrderConfirm} className="btn btn-primary">Confirm Order</button>
    </div>
  </div>
</div>
    </div>
  )
}



// const handleOrderConfirm = async () => {
//   try {
//       // Ensure totalPrice, paymentMethod, and paymentDetails are properly set in the component state
//       // Construct the payload including order data, total price, payment method, and payment details
//       const payload = {
//           totalPrice: priceCalculatorData.totalPrice,
//           paymentMethod: paymentOption,
//           paymentDetails: paymentOption === 'cardPayment' ? 'Card details' : 'Mobile banking details', // Adjust based on selected payment method
//       };

//       // Send the payload to the backend
//       const response = await fetch('http://localhost:5000/orders', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//           const responseData = await response.json();
//           console.log('Order stored successfully:', responseData.result);
//           // Optionally, you can perform further actions upon successful order submission
//       } else {
//           console.error('Failed to store order:', response.statusText);
//           // Handle the error case accordingly
//       }
//   } catch (error) {
//       console.error('Error storing order:', error);
//       // Handle any network or other errors
//   }
// };

// const handleOrderConfirm = async () => {
//   try {
//     const orderData = {
//       paymentOption,
//       priceCalculatorData,
//       // Any other relevant data you need for the order
//     };

//     // Send a POST request to your backend endpoint
//     const response = await fetch('http://localhost:5000/admin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(orderData),
//     });

//     if (response.ok) {
//       const responseData = await response.json();
//       console.log('Order stored successfully:', responseData.result);
//       // Optionally, you can perform further actions upon successful order submission
//     } else {
//       console.error('Failed to store order:', response.statusText);
//       // Handle the error case accordingly
//     }
//   } catch (error) {
//     console.error('Error storing order:', error);
//     // Handle any unexpected errors
//   }
// };

