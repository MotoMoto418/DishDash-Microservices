"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://43.204.189.209:8080/inventory');

        if (response.status === 200) {
          const data = response.data.inventory;
          setInventoryData(data);
        } else {
          setError('Error retrieving data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error retrieving data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '3em', marginBottom: '10px', justifyContent: 'center' }}>Inventory</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {inventoryData.length > 0 && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  backgroundColor: '#f2f2f2',
                  textAlign: 'left',
                }}
              >
                Branch Loc
              </th>
              <th
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  backgroundColor: '#f2f2f2',
                  textAlign: 'left',
                }}
              >
                Item
              </th>
              <th
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  backgroundColor: '#f2f2f2',
                  textAlign: 'left',
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  backgroundColor: '#f2f2f2',
                  textAlign: 'left',
                }}
              >
                Expiry
              </th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((inventory, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {inventory.branchLocation.name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {inventory.item.name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {inventory.stockQuantity}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {inventory.expiryDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inventory;
