import React, { useContext, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import Modal from 'react-modal';
// Modal.setAppElement('#root');

export const AdminData = ({item}) => {
    const {user} = useContext(AuthContext);
    
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
  <>
       <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={user?.photoURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{item.customerName}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          {item.address}
          <br/>
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>{item.number}</td>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={openModal}>details</button>
        </th>
      </tr>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Details Modal"
      >
        <h2>Details</h2>
        {/* <img src={item.image} alt="" srcset="" className='w-64' /> */}
        <p>{item.code}</p>
        <p>{item.paymentOption}</p>
        <p>{item.totalPrice}</p>

        <button onClick={closeModal}>Close Modal</button>
      </Modal>
  </>
  )
}
