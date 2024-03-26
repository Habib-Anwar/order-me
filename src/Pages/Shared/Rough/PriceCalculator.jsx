import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { getOrders } from '../../api/orders';

const PriceCalculator = () => {
    const [totalPrice, setTotalPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders(user?.email);
                console.log("Data received:", data);

                // Perform price calculation
                let total = 0;
                data.forEach(item => {
                    total += item.quantity * item.price; // Multiply price by quantity for each item
                });

                console.log("Total price calculated:", total); 
                setTotalPrice(total);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <h2 className='text-lg font-semibold'>Total Price: {totalPrice} tk</h2>
            )}
        </div>
    );
};

export default PriceCalculator;
