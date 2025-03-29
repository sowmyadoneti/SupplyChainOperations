import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/order').then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.productName} - Qty: {order.quantity} - {new Date(order.orderDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
