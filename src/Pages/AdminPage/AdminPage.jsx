import React, { useEffect, useState } from 'react';
import { AdminData } from './AdminData';

export const AdminPage = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/admin')
      .then(res => res.json())
      .then(data => setCustomerData(data));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Mobile Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customerData.map(({ customerData: [{ id, customerName, address, number,image,  code, quantity, product, price,date }] }) => (
            <AdminData
              key={id} // Assuming customerName is unique
              customerName={customerName}
              address={address}
              number={number}
              image={image}
              code={code}
              quantity={quantity}
              product={product}
              price={price}
              date={date}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
