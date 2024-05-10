import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            console.log(response);
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Error fetching orders');
            toast.error('Error fetching orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token, url]); // Also watch for changes in 'url'

    // Function to return appropriate icon based on order status
    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending":
                return <img src={assets.pending} alt="Pending Icon" />;
            case "Food Processing":
                return <img src={assets.cooking} alt="Processing Icon" />;
            case "Out for delivery":
                return <img src={assets.delivery} alt="Shipped Icon" />;
            case "Delivered":
                return <img src={assets.delivered} alt="Delivered Icon" />;
            default:
                return null;
        }
    }

    return (
        <div className="my-orders-container">
            <h1>My Orders</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div className="orders-list">
                    {orders.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel} alt="" />
                            <p>
                                {order.items.map((item, index) => (
                                    <span key={index}>
                                        {index === order.items.length - 1
                                            ? `${item.name} X ${item.quantity}`
                                            : `${item.name} X ${item.quantity} `
                                        }
                                    </span>
                                ))}
                            </p>
                            <p>&#x20b9; {order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span><p className='imp'> {getStatusIcon(order.status)}</p> </span><b>{order.status}</b></p>
                            
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
