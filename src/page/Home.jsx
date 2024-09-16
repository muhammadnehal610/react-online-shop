import { useContext } from "react";
import { ProductContext } from "../context/productContex";
import { Link } from "react-router-dom";

function Home() {
  const { products } = useContext(ProductContext);
  console.log("products in hmoe", products);

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
        {products.products?.map((data) => {
          return (
            <Link
              to={`/productdetail/${data?.id}`}
              key={data.id}
              className="lg:w-1/4 md:w-1/2 p-4 w-full"
            >
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={data?.images[0]}
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {data?.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {data?.title}
                </h2>
                <p className="mt-1">${data?.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
