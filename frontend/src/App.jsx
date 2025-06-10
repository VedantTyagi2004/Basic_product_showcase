import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import product1 from './assets/download (1).jpg';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then((res) => {
        const item = res.data.find(p => p.name === 'counter');
        if (item) {
          setCount(item.quantity);
        }
      })
      .catch((err) => {
        console.error('Error fetching count:', err);
      });
  }, []);

  const updateCount = (newCount) => {
    setCount(newCount);
    axios.post('http://localhost:5000/data', {
      name: 'counter',
      quantity: newCount
    })
    .then((res) => {
      console.log("POST success", res.data);
    })
    .catch(err => console.error('Failed to update count:', err));
  };

  return (
    <div>
      <h1>Product Showcase</h1>
      <img src={product1} alt="Product 1" style={{ width: 200 }} />
      <div className="card">
        <button onClick={() => updateCount(count + 1)}>
          Add Item (Count: {count})
        </button>
      </div>
      <div className="card">
        <button onClick={() => updateCount(Math.max(count - 1, 0))}>
          Drop Item (Count: {count})
        </button>
      </div>
    </div>
  );
}

export default App;
