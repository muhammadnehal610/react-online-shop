import { CheckOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Spinner } from "@nextui-org/react";
import { Rate, Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContex } from "../context/CartContext";
import { db } from "../utils/firebase"; // Ensure you import your Firestore instance
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions

function ProductDetail() {
  const { id } = useParams();
  const { addItemToCart, removeCartItem, isItemAdded } = useContext(CartContex);

  const [products, setProducts] = useState(null); // Initialize with null to handle loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const productRef = doc(db, "products", id); // Use Firestore document reference
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProducts(productSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const cartItem = isItemAdded(products?.id); // Get the cart item from CartContext
  const cartQuantity = cartItem ? cartItem.cartQuantity : 0; // Default to 0 if the item is not added yet

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <section className="py-5">
            <div className="container">
              <div className="row gx-5">
                {/* Product Image */}
                <aside className="col-lg-6">
                  <div className="border rounded-4 mb-3 d-flex justify-content-center">
                    <img
                      style={{
                        maxWidth: "100%",
                        maxHeight: "50vh",
                        margin: "auto",
                      }}
                      className="rounded-4 fit"
                      src={products?.image}
                      alt={products?.title}
                    />
                  </div>
                  {/* Thumbnails */}
                  <div className="d-flex justify-content-center mb-3 gap-3">
                    {products?.images?.map((image, index) => (
                      <img
                        key={index}
                        width={60}
                        height={60}
                        className="rounded-2"
                        src={image}
                        alt={`Thumbnail ${index}`}
                      />
                    ))}
                  </div>
                </aside>

                {/* Product Details */}
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h4 className="title text-dark">{products?.title}</h4>

                    {/* Rating and Orders */}
                    <div className="d-flex flex-row my-3">
                      <div className="text-warning mb-1 me-2">
                        <Rate disabled defaultValue={4.5} />
                        <span className="ms-1">4.5</span>
                      </div>
                      <span className="text-muted">
                        <i className="fas fa-shopping-basket fa-sm mx-1" />
                        154 orders
                      </span>
                      <span className="text-success ms-2">In stock</span>
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <span className="h5">${products?.price}</span>
                      <span className="text-muted"> / per box</span>
                    </div>

                    {/* Description */}
                    <p>{products?.description}</p>

                    {/* Action Buttons */}
                    <button
                      className="btn btn-primary shadow-0"
                      onClick={() => addItemToCart(products)}
                    >
                      {cartItem ? `Added (${cartQuantity})` : "Add to cart"}
                    </button>
                  </div>
                </main>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
