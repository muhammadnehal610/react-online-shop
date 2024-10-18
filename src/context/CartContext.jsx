import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add item to the cart
  function addItemToCart(item) {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex === -1) {
      setCartItems([...cartItems, { ...item, cartQuantity: 1 }]);
    } else {
      const updatedCartItems = cartItems.map((cartItem, index) =>
        index === existingItemIndex
          ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    }
  }

  // Function to remove item from the cart
  function removeCartItem(id) {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  }

  // Function to set cart item quantity
  function setCartQuantity(id, quantity) {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, cartQuantity: quantity } : item
    );
    setCartItems(updatedCartItems);
  }

  // Function to check if an item is already in the cart
  function isItemAdded(id) {
    return cartItems.find((item) => item.id === id);
  }

  // Function to clear the cart
  function clearCart() {
    setCartItems([]); // Set cartItems to an empty array
    localStorage.removeItem("cart"); // Clear cart from localStorage
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeCartItem,
        setCartQuantity,
        isItemAdded,
        clearCart, // Provide clearCart function to the context
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
