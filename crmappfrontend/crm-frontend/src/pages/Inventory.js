import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { getRole } from '../utils/auth';
import useStockAlerts from '../hooks/useStockAlerts';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ productName: '', stockQuantity: 0, threshold: 0 });

  useStockAlerts();

  const fetchInventory = async () => {
    const res = await axios.get('/api/inventory');
    setInventory(res.data);
  };

  const addItem = async () => {
    await axios.post('/api/inventory', newItem);
    fetchInventory();
  };

  const updateStock = async (id, quantity) => {
    await axios.put(`/api/inventory/${id}/updateStock`, null, {
      params: { newQuantity: quantity }
    });
    fetchInventory();
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {inventory.map(item => (
          <li key={item.id}>
            {item.productName} - {item.stockQuantity} (Threshold: {item.threshold})
            {getRole() === 'ADMIN' && (
              <>
                <button onClick={() => updateStock(item.id, item.stockQuantity + 1)}>+1</button>
                <button onClick={() => updateStock(item.id, item.stockQuantity - 1)}>-1</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {getRole() === 'ADMIN' && (
        <div>
          <h3>Add Item</h3>
          <input placeholder="Name" onChange={e => setNewItem({ ...newItem, productName: e.target.value })} />
          <input placeholder="Stock" type="number" onChange={e => setNewItem({ ...newItem, stockQuantity: parseInt(e.target.value) })} />
          <input placeholder="Threshold" type="number" onChange={e => setNewItem({ ...newItem, threshold: parseInt(e.target.value) })} />
          <button onClick={addItem}>Add</button>
        </div>
      )}
    </div>
  );
};

export default Inventory;
