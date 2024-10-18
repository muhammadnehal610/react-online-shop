import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Rate, Spin } from "antd";

function ProductDetail() {
  const { id } = useParams();
  const { addItemToCart, isItemAdded } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const productRef = doc(db, "products", id); // Use Firestore document reference
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct({ ...productSnap.data(), id }); // Make sure ID is set properly
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

  const cartItem = product ? isItemAdded(product.id) : null; // Check if the product is in the cart
  const cartQuantity = cartItem ? cartItem.cartQuantity : 0; // Get the cart quantity, default to 0

  return (
    <>
      {loading ? (
        <Spin />
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
                      src={product?.image}
                      alt={product?.title}
                    />
                  </div>
                </aside>

                {/* Product Details */}
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h4 className="title text-dark">{product?.title}</h4>

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
                      <span className="h5">${product?.price}</span>
                      <span className="text-muted"> / per box</span>
                    </div>

                    {/* Description */}
                    <p>{product?.description}</p>

                    {/* Action Button */}
                    <button
                      className="btn btn-primary shadow-0"
                      onClick={() => addItemToCart(product)}
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
