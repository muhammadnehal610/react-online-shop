import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import AuthContextProvider from "./context/authContext.jsx";

import CartContextProvider from "./context/CartContext.jsx";
import ProductProvider from "./context/productContex.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <AuthContextProvider>
        <ProductProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductProvider>
      </AuthContextProvider>
    </NextUIProvider>
  </StrictMode>
);
