import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/productContex";
import { Link } from "react-router-dom";
import { Tag, Spin } from "antd"; // Import Tag and Spin from Ant Design

function Home() {
  const { products, loading } = useContext(ProductContext); // Get products and loading state
  const [selectedCategory, setSelectedCategory] = useState(null); // State for the selected category
  const [categories, setCategories] = useState([]); // State to store unique categories

  // Effect to extract unique categories from the products
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle selection
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  console.log(filteredProducts);

  if (loading) return <Spin size="large" />; // Show loading spinner while fetching

  return (
    <div className="container px-5 py-24 mx-auto">
      {/* Render category chips */}
      <div className="flex flex-wrap mb-4">
        {categories.map((category) => (
          <Tag
            key={category}
            color={selectedCategory === category ? "blue" : "default"} // Change color if selected
            onClick={() => handleCategoryClick(category)} // Handle click to filter products
            style={{ cursor: "pointer" }}
          >
            {category}
          </Tag>
        ))}
      </div>

      <div className="flex flex-wrap -m-4">
        {filteredProducts.map((data) => {
          return (
            <Link
              to={`/productdetail/${data.id}`}
              key={data.id}
              className="lg:w-1/4 md:w-1/2 p-4 w-full"
            >
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={data.image} // Assuming 'images' is an array
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {data.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {data.title}
                </h2>
                <p className="mt-1">${data.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 

export default Home;
