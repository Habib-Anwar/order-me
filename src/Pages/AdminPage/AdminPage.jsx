import React, { useEffect, useState } from 'react';
import { AdminData } from './AdminData';

export const AdminPage = () => {
  // const [customerData, setCustomerData] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5000/admin')
  //     .then(res => res.json())
  //     .then(data => setCustomerData(data));
  // }, []);
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin?date=${searchDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  return (
    <>
        <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        placeholder="Search by date"
        className="input input-bordered"
      />
      <button onClick={handleSearch}>Search</button>
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
        {searchResult.map(({ _id, customerData, paymentOption, priceCalculatorData }) => (
              customerData.map(({ customerName, address, number, image, code, quantity, product, price, date }) => (
                <AdminData
                  key={_id} // Assuming _id is unique
                  customerName={customerName}
                  address={address}
                  number={number}
                  image={image}
                  code={code}
                  quantity={quantity}
                  product={product}
                  price={price}
                  date={date}
                  paymentOption={paymentOption}
                  priceCalculatorData={priceCalculatorData}
                />
              ))
            ))}
        </tbody>
      </table>
    </div>
    </>
  );
};



// {customerData.map(({ _id, customerData, paymentOption, priceCalculatorData }) => (
//   customerData.map(({ customerName, address, number, image, code, quantity, product, price, date }) => (
//     <AdminData
//       key={_id} // Assuming _id is unique
//       customerName={customerName}
//       address={address}
//       number={number}
//       image={image}
//       code={code}
//       quantity={quantity}
//       product={product}
//       price={price}
//       date={date}
//       paymentOption={paymentOption}
//       priceCalculatorData={priceCalculatorData}
//     />
//   ))
// ))}