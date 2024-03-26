import React, { useEffect, useState } from 'react'
import { AdminData } from './AdminData'

export const AdminPage = () => {

  const [customerData, setCustomerData] = useState([]);

  useEffect(()=>{
fetch('http://localhost:5000/orders')
.then(res =>res.json())
.then(data =>setCustomerData(data))
  }, [])
  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Mobile Number</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      { customerData.map(item =>(
        <AdminData
        key={item.id}
        item={item}></AdminData>
      ))
 
      }
    </tbody>
    
  </table>
</div>
  )
}
