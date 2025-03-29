import { useEffect } from 'react';

const useStockAlerts = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/stock-alerts');

    socket.onmessage = (event) => {
      alert(event.data);
    };

    socket.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };

    return () => {
      socket.close();
    };
  }, []);
};

export default useStockAlerts;
