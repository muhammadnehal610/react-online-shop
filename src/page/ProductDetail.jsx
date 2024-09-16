import { CheckOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Spinner } from "@nextui-org/react";
import { Rate, Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  console.log(id);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading to true at the beginning of the request
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProducts(response.data); // Set the product data from the response
        setLoading(false); // Set loading to false after the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [id]);

  console.log("products in detail", products);

  return (
    <>
      {/* content */}

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {" "}
          <section className="py-5">
            <div className="container">
              <div className="row gx-5">
                <aside className="col-lg-6">
                  <div className="border rounded-4 mb-3 d-flex justify-content-center ">
                    <img
                      style={{
                        maxWidth: "100%",
                        maxHeight: "50vh",
                        margin: "auto",
                      }}
                      className="rounded-4 fit"
                      src={products?.images[0]}
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-3 gab-3">
                    {products.images.map((data, ind) => {
                      console.log(data);

                      return (
                        <img
                          key={ind}
                          width={60}
                          height={60}
                          className="rounded-2"
                          src={data}
                        />
                      );
                    })}
                  </div>
                  {/* thumbs-wrap.// */}
                  {/* gallery-wrap .end// */}
                </aside>
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h4 className="title text-dark">{products?.title}</h4>
                    <div className="d-flex flex-row my-3">
                      <div className="text-warning mb-1 me-2">
                        <Rate disabled defaultValue={4} />

                        <span className="ms-1">4.5</span>
                      </div>
                      <span className="text-muted">
                        <i className="fas fa-shopping-basket fa-sm mx-1" />
                        154 orders
                      </span>
                      <span className="text-success ms-2">In stock</span>
                    </div>
                    <div className="mb-3">
                      <span className="h5">${products?.price}</span>
                      <span className="text-muted">/per box</span>
                    </div>
                    <p>{products?.description}</p>
                    <div className="row">
                      <dt className="col-3">Type:</dt>
                      <dd className="col-9">Regular</dd>
                      <dt className="col-3">Color</dt>
                      <dd className="col-9">Brown</dd>
                      <dt className="col-3">Material</dt>
                      <dd className="col-9">Cotton, Jeans</dd>
                      <dt className="col-3">Brand</dt>
                      <dd className="col-9">Reebook</dd>
                    </div>
                    <hr />
                    <div className="row mb-4">
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
                      {/* col.// */}
                      <div className="col-md-4 col-6 mb-3">
                        <label className="mb-2 d-block">Quantity</label>
                        <div
                          className="input-group mb-3"
                          style={{ width: 170 }}
                        >
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon1"
                            data-mdb-ripple-color="dark"
                          >
                            <MinusOutlined />
                          </button>
                          <input
                            type="text"
                            className="form-control text-center border border-secondary"
                            placeholder={14}
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                          />
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon2"
                            data-mdb-ripple-color="dark"
                          >
                            <PlusOutlined />
                          </button>
                        </div>
                      </div>
                    </div>
                    <a href="#" className="btn btn-warning shadow-0">
                      {" "}
                      Buy now{" "}
                    </a>
                    <a href="#" className="btn btn-primary shadow-0">
                      {" "}
                      <i className="me-1 fa fa-shopping-basket" /> Add to cart{" "}
                    </a>
                    <a
                      href="#"
                      className="btn btn-light border border-secondary py-2 icon-hover px-3"
                    >
                      {" "}
                      <i className="me-1 fa fa-heart fa-lg" /> Save{" "}
                    </a>
                  </div>
                </main>
              </div>
            </div>
          </section>
          {/* content */}
          <section className="bg-light border-top py-4">
            <div className="container">
              <div className="row gx-4">
                {/* Main content with Tabs */}
                <div className="col-lg-8">
                  <Tabs
                    className="text-base"
                    defaultActiveKey="1"
                    type="card"
                    size={"large"}
                    tabBarStyle={{ fontSize: "54px" }}
                    items={[
                      {
                        label: "Specifications",
                        key: "1",
                        children: (
                          <section className="bg-light border-top py-4">
                            <div className="container">
                              <div className="row gx-4">
                                <div className="col-lg-12 mb-4">
                                  <div className="border rounded-2 px-3 py-2 bg-white">
                                    {/* Specifications */}
                                    <p>
                                      With supporting text below as a natural
                                      lead-in to additional content. Lorem ipsum
                                      dolor sit amet, consectetur adipisicing
                                      elit, sed do eiusmod tempor incididunt ut
                                      labore et dolore magna aliqua.
                                    </p>
                                    <div className="row mb-2">
                                      <div className="col-12 col-md-6">
                                        <ul className="list-unstyled mb-0">
                                          <li>
                                            <CheckOutlined className="text-blue-600" />{" "}
                                            Some great feature name here
                                          </li>
                                          <li>
                                            <CheckOutlined className="text-blue-600" />{" "}
                                            Lorem ipsum dolor sit amet,
                                            consectetur
                                          </li>
                                          <li>
                                            <CheckOutlined className="text-blue-600" />{" "}
                                            Duis aute irure dolor in
                                            reprehenderit
                                          </li>
                                          <li>
                                            <CheckOutlined className="text-blue-600" />{" "}
                                            Optical heart sensor
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="col-12 col-md-6 mb-0">
                                        <ul className="list-unstyled">
                                          <li>
                                            <CheckOutlined className="text-blue-600" />{" "}
                                            Easy fast and very good
                                          </li>
                                          <li>
                                            <CheckOutlined className="text-blue-600" />{" "}
                                            Some great feature name here
                                          </li>
                                          <li>
                                            <CheckOutlined className="text-blue-600" />{" "}
                                            Modern style and design
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <table className="table border mt-3 mb-2">
                                      <tbody>
                                        <tr>
                                          <th className="py-2">Display:</th>
                                          <td className="py-2">
                                            13.3-inch LED-backlit display with
                                            IPS
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="py-2">
                                            Processor capacity:
                                          </th>
                                          <td className="py-2">
                                            2.3GHz dual-core Intel Core i5
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="py-2">
                                            Camera quality:
                                          </th>
                                          <td className="py-2">
                                            720p FaceTime HD camera
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="py-2">Memory:</th>
                                          <td className="py-2">
                                            8 GB RAM or 16 GB RAM
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="py-2">Graphics:</th>
                                          <td className="py-2">
                                            Intel Iris Plus Graphics 640
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        ),
                      },
                      {
                        label: "Warranty Info",
                        key: "2",
                        children: (
                          <section className="bg-light border-top py-4">
                            <div className="container">
                              <div className="row gx-4">
                                <div className="col-lg-12 mb-4">
                                  <div className="border rounded-2 px-3 py-2 bg-white">
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna
                                      aliqua. Ut enim ad minim veniam, quis
                                      nostrud exercitation ullamco laboris nisi
                                      ut aliquip ex ea commodo consequat.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        ),
                      },
                      {
                        label: "Shipping Info",
                        key: "3",
                        children: (
                          <section className="bg-light border-top py-4">
                            <div className="container">
                              <div className="row gx-4">
                                <div className="col-lg-12 mb-4">
                                  <div className="border rounded-2 px-3 py-2 bg-white">
                                    <p>
                                      Dolor sit amet, consectetur adipisicing
                                      elit, sed do eiusmod tempor incididunt ut
                                      labore et dolore magna aliqua. Ut enim ad
                                      minim veniam, quis nostrud exercitation
                                      ullamco laboris nisi ut aliquip ex ea
                                      commodo consequat.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        ),
                      },
                      {
                        label: "Seller Profile",
                        key: "4",
                        children: (
                          <section className="bg-light border-top py-4">
                            <div className="container">
                              <div className="row gx-4">
                                <div className="col-lg-12 mb-4">
                                  <div className="border rounded-2 px-3 py-2 bg-white">
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna
                                      aliqua. Ut enim ad minim veniam, quis
                                      nostrud exercitation ullamco laboris nisi
                                      ut aliquip ex ea commodo consequat.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        ),
                      },
                    ]}
                  />
                </div>

                {/* Sidebar with similar items */}
                <div className="col-lg-4">
                  <div className="px-0 border rounded-2 shadow-0">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Similar items</h5>
                        <div className="d-flex mb-3">
                          <a href="#" className="me-3">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/8.webp"
                              style={{ minWidth: 96, height: 96 }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              Rucksack Backpack Large <br />
                              Line Mounts
                            </a>
                            <strong className="text-dark"> $38.90</strong>
                          </div>
                        </div>
                        <div className="d-flex mb-3">
                          <a href="#" className="me-3">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/9.webp"
                              style={{ minWidth: 96, height: 96 }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              Summer New Men's Denim <br />
                              Jeans Shorts
                            </a>
                            <strong className="text-dark"> $29.50</strong>
                          </div>
                        </div>
                        <div className="d-flex mb-3">
                          <a href="#" className="me-3">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/10.webp"
                              style={{ minWidth: 96, height: 96 }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              T-shirts with multiple colors, for men and lady
                            </a>
                            <strong className="text-dark"> $120.00</strong>
                          </div>
                        </div>
                        <div className="d-flex">
                          <a href="#" className="me-3">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/11.webp"
                              style={{ minWidth: 96, height: 96 }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              Blazer Suit Dress Jacket for Men, Blue
                            </a>
                            <strong className="text-dark"> $339.90</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Similar items end */}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
    </>
  );
}
export default ProductDetail;
