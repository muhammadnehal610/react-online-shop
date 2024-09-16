import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const ProductContext = createContext();
function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios("https://dummyjson.com/products").then((data) => {
      setProducts(data.data);
    });
    setLoading(false);
  }, []);
  console.log(products);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {loading ? (
        <div className="w-full h-80 flex justify-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </ProductContext.Provider>
  );
}
export default ProductContextProvider;
