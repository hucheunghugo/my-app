'use client';

import React, { useEffect, useState } from 'react';
import { Item, getAllItems } from './core';
import './index.css';
import Link from 'next/link';
import { create } from 'zustand';

export interface CartItems extends Item{
  qty: number
}

interface CartState {
  cartItems: CartItems[]
  addCartItems: (item: CartItems) => void
  removeCartItems: (item: CartItems) => void
}

export const useBearStore = create<CartState>((set) => ({
  cartItems: [],
  addCartItems: (item: CartItems) => set((state) => {
    // Check if the item already exists in the cartItems array
    const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id);
    
    if (itemIndex !== -1) {
      // If the item already exists, update the amount
      const updatedCartItems = [...state.cartItems];
      updatedCartItems[itemIndex].qty += item.qty;
      
      return { cartItems: updatedCartItems };
    } else {
      // If the item doesn't exist, add it to the cartItems array
      return { cartItems: [...state.cartItems, item] };
    }
  }),
  removeCartItems: (item: CartItems) => set((state) => {
    // Check if the item already exists in the cartItems array
    const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id);
    
    if (itemIndex !== -1) {
      // If the item exists, remove it from the cartItems array
      const updatedCartItems = [...state.cartItems];
      updatedCartItems.splice(itemIndex, 1);
      
      return { cartItems: updatedCartItems };
    } else {
      // If the item doesn't exist, return the current state
      return state;
    }
  }),
}))

const index: React.FC = function () {
  const items: readonly Item[] = getAllItems();
  const cartItems = useBearStore();

  const TableItems: React.FC<{ data: Item }> = ({ data }) => {
    const [qty, setQty] = useState(0);  

    return (
      <tr key={data.id}>
        <td>{data.title}</td>
        <td>{data.description}</td>
        <td>{data.price}</td>
        <td>
          <div style={{alignItems:'center', gap:'2em'}}>
            <button onClick={() => setQty(qty + 1)}>+</button>
            {qty}
            <button onClick={() => setQty(qty > 0?qty - 1:0)}>-</button>
          </div>
        </td>
        <td>
          <button onClick={() => {
            cartItems.addCartItems({...data,qty})
          }}>Add to cart</button>
          <button onClick={() => {
            cartItems.removeCartItems({...data,qty})
          }}>Remove from cart</button>
        </td>
      </tr>
    )
  }
  
  return (
    <div className='Topic'>
      <h1>Shop Items</h1>
      <table className='table'>
        <tbody>
        <tr>
          <th>
            Name
          </th>
          <th>
            Description
          </th>
          <th>
            Price
          </th>
          <th>
            Quantity
          </th>
          <th>
            Action
          </th>
        </tr>
          {items.map((item) => {
            return (
              <TableItems data={item} key={item.id} />
            )
          })}
        </tbody>
      </table>
      <Link href="/shopping-cart">
        <button>Checkout</button>
      </Link>
    </div >
  );
}

export default index;

/*
        <td>
          {cartItems.cartItems.filter(cartItem => cartItem.id === data.id).map(cartItem => cartItem.id.length  != 0 ? `Amount in Cart: ${cartItem.qty}` : `It is not in cart`)}
        </td>
*/