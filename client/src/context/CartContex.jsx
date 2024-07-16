import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const cartContext = createContext();

export const useCart = () => {
  const context = useContext(cartContext);

  if (!context) {
    throw new Error('useAuth deberia estar en AuthProvider');
  }

  return context;
};
export const CartProvider = ({ children }) => {
  const [cartMenu, setCartMenu] = useState(false);

  const products = useSelector((state) => state.cart.products);

  const total = () => {
    let totalprice = 0;
    products.forEach((item) => {
      totalprice += item.quantity * item.price;
    });

    return totalprice.toFixed(2);
  };
  return (
    <cartContext.Provider value={{ cartMenu, setCartMenu, total, products }}>
      {children}
    </cartContext.Provider>
  );
};
