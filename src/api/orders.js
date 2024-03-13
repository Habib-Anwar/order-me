// // Get all rooms
// export const getAllOrders = async () =>{
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`)
//     const data = await response.json()
//     return data
// }

// get filtered rooms for hosts
export const getOrders = async email => {
    const response = await fetch(
        `http://localhost:5000/orders/${email}`,
        {
            headers: {
                'content-type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        // Handle non-successful response (e.g., log an error or throw an exception)
        console.error(`Error: ${response.status} - ${response.statusText}`);
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};
