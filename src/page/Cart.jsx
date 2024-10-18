import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { DeleteFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Button, message, Spin } from "antd"; // Import Ant Design Modal
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase"; // Make sure you import db from firebase config
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Signin from "./auth/signin";
import { useNavigate } from "react-router-dom";

function CartList() {
  const {
    cartItems,
    removeCartItem,
    setCartItems,
    addItemToCart,
    setCartQuantity,
  } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(false); // Loading state
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state to current user
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // Calculate total amount whenever cartItems change
    const amount = cartItems.reduce(
      (total, item) => total + item.cartQuantity * item.price,
      0
    );
    setTotalAmount(amount);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (!user) {
      // If the user is not logged in, show the modal
      setIsModalVisible(true);
    } else {
      // Proceed with checkout process
      setLoading(true);
      try {
        const purchaseData = {
          createdAt: new Date().toISOString(),
          items: cartItems.map((item) => ({
            id: item.id,
            image: item.image,
            price: item.price,
            quantity: item.cartQuantity,
            title: item.title,
          })),
          totalAmount: (totalAmount + 2.99).toFixed(2), // Including shipping
          totalQuantity: cartItems.reduce(
            (total, item) => total + item.cartQuantity,
            0
          ),
          userId: user.uid, // Store user ID
        };

        // Store purchase in Firestore
        const purchasesRef = collection(db, "purchases");
        await addDoc(purchasesRef, purchaseData);
        await message.success("Purchase completed successfully!");

        // Clear the cart after purchase
        setCartItems([]); // Assuming you have a clearCart function
        setLoading(false);
        navigate("/thankyou");
      } catch (error) {
        await message.error("Error completing purchase: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="h-100 h-custom">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="h5">
                      Shopping Bag
                    </th>
                    <th scope="col">Brand</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            className="img-fluid rounded-3"
                            style={{ width: 120 }}
                            alt={item.title}
                          />
                          <div className="flex-column ms-4">
                            <p className="mb-2">{item.title}</p>
                            <p className="mb-0">{item.category}</p>
                          </div>
                        </div>
                      </th>
                      <td className="align-middle">
                        <p className="mb-0" style={{ fontWeight: 500 }}>
                          {item.brand}
                        </p>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex flex-row">
                          <button
                            className="btn btn-link px-2"
                            onClick={() =>
                              handleQuantityChange(item, "decrement")
                            }
                          >
                            <MinusOutlined />
                          </button>
                          <input
                            disabled
                            value={item.cartQuantity}
                            className="form-control form-control-sm text-center"
                            style={{ width: 50 }}
                          />
                          <button
                            className="btn btn-link px-2"
                            onClick={() =>
                              handleQuantityChange(item, "increment")
                            }
                          >
                            <PlusOutlined />
                          </button>
                        </div>
                      </td>
                      <td className="align-middle">
                        <p className="mb-0" style={{ fontWeight: 500 }}>
                          ${item.cartQuantity * item.price}
                        </p>
                      </td>
                      <td className="align-middle">
                        <DeleteFilled
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => removeCartItem(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div
              className="card shadow-2-strong mb-5 mb-lg-0"
              style={{ borderRadius: 16 }}
            >
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-4 col-xl-3">
                    <h5 className="mb-3">Summary</h5>
                    <div className="d-flex justify-content-between">
                      <p>Total Quantity</p>
                      <p>
                        {cartItems.reduce(
                          (total, item) => total + item.cartQuantity,
                          0
                        )}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p>${totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Shipping</p>
                      <p>$2.99</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <p>Total (tax included)</p>
                      <p>${(totalAmount + 2.99).toFixed(2)}</p>
                    </div>
                    <button
                      className="btn btn-primary btn-block btn-lg"
                      onClick={handleCheckout}
                    >
                      <Button
                        loading={loading}
                        className="d-flex justify-content-between"
                      >
                        <span>Checkout</span>
                        <span>${(totalAmount + 2.99).toFixed(2)}</span>
                      </Button>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title="Not Logged In"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <Signin />
      </Modal>

      {loading && <Spin tip="Processing checkout..." />}
    </section>
  );
}

export default CartList;
