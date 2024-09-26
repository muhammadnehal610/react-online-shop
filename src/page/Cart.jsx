import { useContext } from "react";
import { CartContex } from "../context/CartContext";
import { DeleteFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";

function CartList() {
  const {
    cartItem,
    removeCartItem,
    addItemToCart,
    setCartQuantity, // Assuming setCartQuantity is a function from the context
  } = useContext(CartContex);

  const totalAmount = cartItem.reduce(
    (total, item) => total + item.cartQuantity * item.price,
    0
  );
  const totalQuantity = cartItem.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  const handleQuantityChange = (item, action) => {
    if (action === "increment") {
      addItemToCart(item); // Add one more of this item
    } else if (action === "decrement" && item.cartQuantity > 1) {
      setCartQuantity(item.id, item.cartQuantity - 1); // Reduce quantity for this item
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
                  {cartItem.map((item) => (
                    <tr key={item.id}>
                      {/* Product Image and Title */}
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.thumbnail}
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
                      {/* Brand */}
                      <td className="align-middle">
                        <p className="mb-0" style={{ fontWeight: 500 }}>
                          {item.brand}
                        </p>
                      </td>
                      {/* Quantity Controls */}
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
                      {/* Price */}
                      <td className="align-middle">
                        <p className="mb-0" style={{ fontWeight: 500 }}>
                          ${item.cartQuantity * item.price}
                        </p>
                      </td>
                      {/* Remove Item */}
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
                  {/* Payment Method */}
                  <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                    <h5 className="mb-3">Payment Methods</h5>
                    <form>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="creditCard"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="creditCard"
                        >
                          <i className="fab fa-cc-mastercard fa-2x text-body pe-2" />
                          Credit Card
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="debitCard"
                        />
                        <label className="form-check-label" htmlFor="debitCard">
                          <i className="fab fa-cc-visa fa-2x text-body pe-2" />
                          Debit Card
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="paypal"
                        />
                        <label className="form-check-label" htmlFor="paypal">
                          <i className="fab fa-cc-paypal fa-2x text-body pe-2" />
                          PayPal
                        </label>
                      </div>
                    </form>
                  </div>

                  {/* Card Details */}
                  <div className="col-md-6 col-lg-4 col-xl-6">
                    <div className="row">
                      <div className="col-12 col-xl-6 mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John Smith"
                          aria-label="Name on card"
                        />
                        <label>Name on card</label>
                      </div>
                      <div className="col-12 col-xl-6 mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                          aria-label="Expiration"
                        />
                        <label>Expiration</label>
                      </div>
                      <div className="col-12 col-xl-6 mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Card Number"
                          aria-label="Card Number"
                        />
                        <label>Card Number</label>
                      </div>
                      <div className="col-12 col-xl-6 mb-4">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="CVV"
                          aria-label="Cvv"
                        />
                        <label>CVV</label>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="col-lg-4 col-xl-3">
                    <h5 className="mb-3">Summary</h5>
                    <div className="d-flex justify-content-between">
                      <p>Total Quantity</p>
                      <p>{totalQuantity}</p>
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
                    <button className="btn btn-primary btn-block btn-lg">
                      <div className="d-flex justify-content-between">
                        <span>Checkout</span>
                        <span>${(totalAmount + 2.99).toFixed(2)}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartList;
