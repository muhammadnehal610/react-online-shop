import { CheckOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Spinner } from "@nextui-org/react";
import { Rate, Tabs } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContex } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addItemToCart, removeCartItem, isItemAdded } = useContext(CartContex);

  const [products, setProducts] = useState(null); // Initialize with null to handle loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
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
                      src={products?.images[0]}
                      alt={products?.title}
                    />
                  </div>

                  {/* Thumbnails */}
                  <div className="d-flex justify-content-center mb-3 gap-3">
                    {products?.images.map((image, index) => (
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

                    {/* Additional Product Info */}
                    <div className="row">
                      <dt className="col-3">Type:</dt>
                      <dd className="col-9">Regular</dd>
                      <dt className="col-3">Color:</dt>
                      <dd className="col-9">Brown</dd>
                      <dt className="col-3">Material:</dt>
                      <dd className="col-9">Cotton, Jeans</dd>
                      <dt className="col-3">Brand:</dt>
                      <dd className="col-9">Reebok</dd>
                    </div>

                    <hr />

                    {/* Size and Quantity Controls */}
                    <div className="row mb-4">
                      {/* Size Selection */}
                      <div className="col-md-4 col-6">
                        <label className="mb-2">Size</label>
                        <select
                          className="form-select border border-secondary"
                          style={{ height: 35 }}
                        >
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                        </select>
                      </div>

                      {/* Quantity Controls */}
                    </div>

                    {/* Action Buttons */}
                    <a href="#" className="btn btn-warning shadow-0">
                      Buy now
                    </a>
                    <button
                      className="btn btn-primary shadow-0"
                      onClick={() => addItemToCart(products)}
                    >
                      {cartItem ? `Added (${cartQuantity})` : "Add to cart"}
                    </button>
                    <a
                      href="#"
                      className="btn btn-light border border-secondary py-2 icon-hover px-3"
                    >
                      <i className="me-1 fa fa-heart fa-lg" /> Save
                    </a>
                  </div>
                </main>
              </div>
            </div>
          </section>

          {/* Tabs Section */}
          <section className="bg-light border-top py-4">
            <div className="container">
              <Tabs
                defaultActiveKey="1"
                type="card"
                size="large"
                items={[
                  {
                    label: "Specifications",
                    key: "1",
                    children: (
                      <div className="border rounded-2 px-3 py-2 bg-white">
                        <p>{products?.description}</p>
                        <table className="table border mt-3 mb-2">
                          <tbody>
                            <tr>
                              <th>Display:</th>
                              <td>13.3-inch LED-backlit display with IPS</td>
                            </tr>
                            <tr>
                              <th>Processor capacity:</th>
                              <td>2.3GHz dual-core Intel Core i5</td>
                            </tr>
                            <tr>
                              <th>Camera quality:</th>
                              <td>720p FaceTime HD camera</td>
                            </tr>
                            <tr>
                              <th>Memory:</th>
                              <td>8 GB RAM or 16 GB RAM</td>
                            </tr>
                            <tr>
                              <th>Graphics:</th>
                              <td>Intel Iris Plus Graphics 640</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ),
                  },
                  {
                    label: "Warranty Info",
                    key: "2",
                    children: (
                      <div className="border rounded-2 px-3 py-2 bg-white">
                        <p>Lorem ipsum dolor sit amet...</p>
                      </div>
                    ),
                  },
                  {
                    label: "Shipping Info",
                    key: "3",
                    children: (
                      <div className="border rounded-2 px-3 py-2 bg-white">
                        <p>Lorem ipsum dolor sit amet...</p>
                      </div>
                    ),
                  },
                  {
                    label: "Seller Profile",
                    key: "4",
                    children: (
                      <div className="border rounded-2 px-3 py-2 bg-white">
                        <p>Lorem ipsum dolor sit amet...</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
