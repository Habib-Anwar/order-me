import React from 'react'

export const OrderData = ({order, fetchOrders}) => {
    console.log(order.length)
  return (
    <>
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img src={order.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white -mt-[696]">
        {order.product}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          {order.quantity}
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {order.price}
      </td>
      <td className="px-6 py-4">
        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
      </td>
    </tr>

            </>
  )
}
