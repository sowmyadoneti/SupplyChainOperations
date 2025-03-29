import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const PlaceOrder = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get('/api/inventory').then(res => setInventory(res.data));
  }, []);

  const placeOrder = async () => {
    await axios.post('/api/order', {
      quantity,
      inventory: { id: selectedId }
    });
    alert("Order placed!");
  };

  return (
    <div>
      <h2>Place Order</h2>
      <select onChange={e => setSelectedId(e.target.value)}>
        <option value="">Choose Item</option>
        {inventory.map(item => (
          <option key={item.id} value={item.id}>{item.productName}</option>
        ))}
      </select>
      <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} />
      <button onClick={placeOrder}>Submit</button>
    </div>
  );
};

export default PlaceOrder;
