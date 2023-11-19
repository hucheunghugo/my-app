'use client';

import React from 'react';
import { Item, getAllItems } from '../core';
import './cart.css';
import '../index.css';
import { useBearStore } from '../page';

function App() {
  const data = useBearStore();
  let total = 0
  data.cartItems.map((cartItem) =>(
    total += cartItem.price * cartItem.qty
  ))
  return (
    <div className='Topic'>
      <h1>Cart Items</h1>
      <table className='table'>
        <tr>
          <th>
            Name
          </th>
          <th>
            Quantity
          </th>
          <th>
            Price
          </th>
        </tr>
        {data.cartItems.map((cartItem) => (
          <tr key={cartItem.id}>
            <td>{cartItem.title}</td>
            <td>{cartItem.qty}</td>
            <td>{cartItem.price * cartItem.qty}</td>
          </tr>
        ))}
        <tr>
          <td>Total: </td>
          <td></td>
          <td>${total}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;