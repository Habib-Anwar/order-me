import React, { useState } from 'react';

const PaymentOptions = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentDetails, setPaymentDetails] = useState('');

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
        // Reset payment details when payment method changes
        setPaymentDetails('');
    };

    const handlePaymentDetailsChange = (event) => {
        setPaymentDetails(event.target.value);
    };

    const handlePaymentSubmit = (event) => {
        event.preventDefault();

        // Handle payment submission based on payment method and details
        if (paymentMethod === 'cardPayment') {
            // Implement card payment method
            console.log('Processing card payment with details:', paymentDetails);
        } else if (paymentMethod === 'bKashNagadPayment') {
            // Implement mobile banking payment method
            console.log('Processing mobile banking payment with details:', paymentDetails);
        }
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
                <label htmlFor="cashOnDelivery">Cash on Delivery</label>
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
                <label htmlFor="onlinePayment">Online Payment</label>
                {paymentMethod === 'onlinePayment' && (
                    <div>
                        <input
                            type="radio"
                            id="cardPayment"
                            name="onlinePaymentOption"
                            value="cardPayment"
                            checked={paymentMethod === 'cardPayment'}
                            onChange={handlePaymentChange}
                        />
                        <label htmlFor="cardPayment">Card Payment</label>
                        <br />
                        <input
                            type="radio"
                            id="bKashNagadPayment"
                            name="onlinePaymentOption"
                            value="bKashNagadPayment"
                            checked={paymentMethod === 'bKashNagadPayment'}
                            onChange={handlePaymentChange}
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
