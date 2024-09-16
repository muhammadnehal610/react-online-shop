import { createContext, useState } from "react";

export const CartContex = createContext();

function CartContextProvider({ children }) {
  const [cartItem, setCartItem] = useState();
  return <CartContex.Provider>{children}</CartContex.Provider>;
}
export default CartContextProvider;
