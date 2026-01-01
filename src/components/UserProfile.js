import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
import useFetch from "../useFetch";
import Footer from "../constants/Footer";
const UserProfile = () => {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/api/user/address`
  );
  console.log(data);

  const {
    data: orders,
    loading: load,
    error: ordersError,
  } = useFetch(`${process.env.REACT_APP_API_URL}/api/user/orders`);
  console.log(orders);

  const userDetails = {
    name: "User1",
    email: "abc@mail.com",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGOXfXTU8aFxFIxmWNUoMfq690PSezjg94Q&s",
    phone: "+45999999",
  };

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
        </div>
        <hr />
        <div>
          <h2 className="text-center">Orders Placed</h2>
          {orders && orders.orders && orders.orders.length > 0 ? (
            <div className="row mt-4 p-3">
              {orders &&
                orders.orders &&
                orders.orders.map((order) => (
                  <div className="col-md-6 mt-4">
                    <div className="card">
                      <div className="row">
                        {order.items.map((item) => (
                          <div className="col-md-4 text-center p-3">
                            <img
                              className="img-fluid"
                              style={{ height: "250px", objectFit: "cover" }}
                              src={item.imageUrl}
                            />
                            <p>
                              <strong>Name:</strong> {item.name}
                            </p>
                            <p>
                              <strong>Price:</strong> USD {item.price}
                            </p>
                            <p>
                              <strong>Quantity:</strong> {item.quantity}
                            </p>
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
      <Footer/>
    </>
  );
};

export default UserProfile;
