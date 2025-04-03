import React, {  useContext, useEffect } from 'react';
import { CartContext } from '../../App.jsx';
import FullCart from './FullCart.jsx';
import EmptyCart from './EmptyCart.jsx';

function CartPage() {
  const {cart} = useContext(CartContext);

  useEffect(() => {
    console.log("Cart context updated:", cart);
  }, [cart]);

  return (
    <div className='min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 gap-12 '>
      {Object.keys(cart).length === 0 ? <EmptyCart /> : <FullCart />}
    </div>
  );
}

export default CartPage;