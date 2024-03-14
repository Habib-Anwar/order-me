import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider';
import { getOrders } from '../../api/orders';
import { OrderData } from './OrderData';
import PriceCalculator from './PriceCalculator';

export const Order = () => {

    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([])
    const fetchOrders = () =>{
        getOrders(user?.email).then(data =>{ setOrders(data)})
    }
    useEffect(() => {
        fetchOrders();
      },[user])

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
<div className="card w-96 bg-base-100 shadow-xl h-1/2">
  <div className="card-body">
    <h2 className="card-title">Customer</h2>
    <div className="avatar flex gap-4">
  <div className="w-24 mask mask-squircle">
    <img src={user?.photoURL} />
  </div>
  <div>
  <h3 className=' font-semibold'>{user?.displayName}</h3>
  </div>
  </div>
  <h3 className='font-semibold mt-4'>Shipping Address</h3>
    <p className='-mt-2'>If a dog chews shoes whose shoes does he choose?</p>
   <h3 className='font-semibold'>Mobile</h3>
    <p className='-mt-2'>0171000000</p>
  </div>
</div>
<div className="card w-96 bg-base-100 shadow-xl ml-80 -mt-10">
  <div className="card-body">
   <PriceCalculator></PriceCalculator>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>


    </div>
  )
}
