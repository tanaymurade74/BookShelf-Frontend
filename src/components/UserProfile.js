import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
import useFetch from "../useFetch";
import Footer from "../constants/Footer";
import useUserProfileContext from "../context/UserProfileContext";
const UserProfile = () => {
  const { userDetails, data, allAddress, viewAddress, setViewAddress } =
    useUserProfileContext();

  return (
    <>
      <HeaderWithoutSearch />
      <div className="container p-3">
        <div className="text-center ">
          <p>
            <img
              className="img-fluid rounded-circle"
              src={userDetails.imageUrl}
            />
          </p>
          <p>
            <strong>Name:</strong> {userDetails.name}{" "}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}{" "}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone}{" "}
          </p>
          <p>
            <button
              onClick={() => setViewAddress(viewAddress == true ? false : true)}
            >
              {viewAddress == true
                ? "Hide Available Address"
                : "View Available Address"}
            </button>
          </p>
          {viewAddress === true ? (
            <div>
              <div className="row">
                {allAddress?.map((item) => (
                  <div className="col-md-4">
                    {item.block}, <br /> {item.street} <br /> {item.city},{" "}
                    {item.state} <br /> {item.pincode}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <hr />
        <div>
          <h2 className="text-center mb-4">Orders Placed</h2>
          {data && data.orders && data.orders.length > 0 ? (
            <div className="row mt-4 p-3 g-4">
              {data &&
                data.orders &&
                data.orders.map((order) => (
                  <div className="col-lg-6 col-12 mt-4 d-flex align-items-stretch">
                    <div className="card w-100">
                      <div className="row">
                        {order.items.map((item) => (
                          <div className="col-12 border-bottom p-3">
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="img-fluid rounded"
                                  style={{
                                    height: "80px",
                                    width: "60px",
                                    objectFit: "cover",
                                  }}
                                  src={item.imageUrl}
                                />
                              </div>
                              <div className="flex-grow-1 ms-3 text-start">
                                <h6 className="mb-1">
                                  <strong>{item.name}</strong>
                                </h6>
                                <p className="mb-0 small text-muted">
                                  Price: USD {item.price} x {item.quantity}
                                </p>
                              </div>
                              <div className="fw-bold">
                                USD {(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <hr />
                      <div className="p-3 text-center">
                        <p>
                          <strong>Total Order Amount:</strong> USD{" "}
                          {order.totalAmount}
                        </p>
                        <p>
                          <strong>Total Discount Amount:</strong> USD{" "}
                          {order.discountedAmount}
                        </p>
                        <p>
                          <strong>Date Of Order:</strong> {order.orderDate}
                        </p>
                        <p>
                          <strong>
                            Delivery Address: <br />
                          </strong>
                          {order.deliveryAddress.block} <br />
                          {order.deliveryAddress.street} <br />
                          {order.deliveryAddress.city}
                          <br />
                          {order.deliveryAddress.state}
                          <br />
                          {order.deliveryAddress.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center">
              <img
                className="img-fluid"
                style={{ height: "400px", objectFit: "cover" }}
                src="https://imgs.search.brave.com/uZf6lmRBQIsWvPYlftctq3LYUZ53dcZxCC2TgeAEjQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9uby1zaG9w/cGluZy1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMTExMTYwNTku/cG5nP2Y9d2VicCZ3/PTEyOA"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
