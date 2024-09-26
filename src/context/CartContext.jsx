import { createContext, useState } from "react";

export const CartContex = createContext();

function CartContextProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);

  console.log("Items in cart =>", cartItem);

  // Function to add item to the cart
  function addItemToCart(item) {
    const itemIndex = cartItem.findIndex((data) => data.id === item.id);

    if (itemIndex === -1) {
      // Item not in cart, add new item with quantity 1
      setCartItem([...cartItem, { ...item, cartQuantity: 1 }]);
    } else {
      // Item already in cart, increase quantity
      const updatedCart = cartItem.map((cartItem, index) =>
        index === itemIndex
          ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
          : cartItem
      );
      setCartItem(updatedCart);
    }
  }

  // Function to decrease the item quantity or remove if quantity is 1
  function removeItemFromCart(item) {
    const itemIndex = cartItem.findIndex((data) => data.id === item.id);

    if (itemIndex !== -1) {
      if (cartItem[itemIndex].cartQuantity > 1) {
        const updatedCart = cartItem.map((cartItem, index) =>
          index === itemIndex
            ? { ...cartItem, cartQuantity: cartItem.cartQuantity - 1 }
            : cartItem
        );
        setCartItem(updatedCart);
      } else {
        // Remove item completely if quantity is 1
        removeCartItem(item.id);
      }
    }
  }

  // Function to remove an item from the cart entirely
  function removeCartItem(id) {
    const updatedCart = cartItem.filter((item) => item.id !== id);
    setCartItem(updatedCart);
  }

  // Function to check if an item is already added in the cart
  function isItemAdded(id) {
    return cartItem.some((item) => item.id === id);
  }

  return (
    <CartContex.Provider
      value={{
        cartItem,
        addItemToCart,
        removeItemFromCart,
        removeCartItem,
        isItemAdded,
      }}
    >
      {children}
    </CartContex.Provider>
  );
}

export default CartContextProvider;
