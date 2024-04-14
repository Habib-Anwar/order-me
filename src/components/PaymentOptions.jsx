import React, { useState } from 'react';

const PaymentOptions = ({ updateOption, updateDetails }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentDetails, setPaymentDetails] = useState('');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');

    const handlePaymentChange = (event) => {
        const selectedMethod = event.target.value;
        setPaymentMethod(selectedMethod);
        // Reset payment details when payment method changes
        setPaymentDetails('');

        // Call the updateOption function passed as props to update payment option in parent component
        updateOption(selectedMethod);
    };

    const handlePaymentDetailsChange = (event) => {
        const details = event.target.value;
        setPaymentDetails(details);

        // Call the updateDetails function passed as props to update payment details in parent component
        updateDetails(details);
    };
    // const handlePaymentSubmit = async (event) => {
    //     event.preventDefault();
    
    //     try {
    //         const payload = {
    //             // Include payment method and details
    //             paymentMethod: paymentMethod,
    //             paymentDetails: paymentDetails,
    //         };
    
    //         const response = await fetch('http://localhost:5000/orders', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(payload),
    //         });
    
    //         if (response.ok) {
    //             console.log('Order and payment options saved successfully');
    //             // Optionally, you can perform further actions upon successful submission
    //         } else {
    //             console.error('Failed to save order and payment options:', response.statusText);
    //             // Handle the error case accordingly
    //         }
    //     } catch (error) {
    //         console.error('Error saving order and payment options:', error);
    //         // Handle any network or other errors
    //     }
    // };
    
    

    const handlePaymentSubmit = (event) => {
        event.preventDefault();

        // This part can be handled in the parent component based on the selected payment method and details
        if (paymentMethod === 'cardPayment') {
            console.log('Processing card payment with details:', paymentDetails);
        } else if (paymentMethod === 'bKashNagadPayment') {
            console.log('Processing mobile banking payment with details:', paymentDetails);
        }
    };
    // Function to handle payment option change
const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
  };

    return (
        <div className='flex gap-4'>
            <div>
                <input
                    type="radio"
                    id="cashOnDelivery"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === 'cashOnDelivery'}
                    onChange={handlePaymentChange}
                />
                <label htmlFor="cash On Delivery">Cash on Delivery</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="onlinePayment"
                    name="paymentMethod"
                    value="onlinePayment"
                    checked={paymentMethod === 'onlinePayment'}
                    onChange={handlePaymentChange}
                />
                <label htmlFor="online Payment">Online Payment</label>
                {paymentMethod === 'onlinePayment' && (
                    <div>
                        <input
                            type="radio"
                            id="cardPayment"
                            name="onlinePaymentOption"
                            value="cardPayment"
                            checked={ selectedPaymentOption=== 'cardPayment'} // paymentMethod
                            onChange={(e)=>{handlePaymentChange(e); handlePaymentOptionChange(e)}}
                        />
                        <label htmlFor="cardPayment">Card Payment</label>
                        <br />
                        <input
                            type="radio"
                            id="bKashNagadPayment"
                            name="onlinePaymentOption"
                            value="bKashNagadPayment"
                            checked={selectedPaymentOption === 'bKashNagadPayment'} // paymentMethod
                            onChange={(e)=>{handlePaymentChange(e);handlePaymentOptionChange(e)}}
                        />
                        <label htmlFor="bKashNagadPayment">bKash/Nagad Payment</label>
                        <br />
                        {/* Payment details input */}
                        {paymentMethod && (
                            <div>
                                <input
                                    type="text"
                                    value={paymentDetails}
                                    onChange={handlePaymentDetailsChange}
                                    placeholder={
                                        paymentMethod === 'cardPayment'
                                            ? 'Enter card details...'
                                            : 'Enter mobile banking details...'
                                    }
                                />
                                <button onClick={handlePaymentSubmit}>Pay</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentOptions;
