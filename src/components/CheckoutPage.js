import { useNavigate, Link } from "react-router-dom";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
import Footer from "../constants/Footer";
import useCartWishlistContext from "../context/CartWishlistContext";
import useCheckoutContext from "../context/CheckoutContext";
const CheckoutPage = () => {
  const {
    setSelectAddress,
    orderPlaced,
    allAddress,
    handleDelete,
    handleOrder,
  } = useCheckoutContext();

  const { cartProducts, price, discount, total, loading, error } =
    useCartWishlistContext();

  if (orderPlaced === true) {
    return (
      <div className="container p-3 text-center">
        <img
          className="img-fluid"
          src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/order-placed-purchased-icon.png"
        />
        <h4 className="text-success">Order Placed</h4>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderWithoutSearch />
      <div className="container p-3 flex-grow-1">
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="text-center">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 fs-5 text-muted">Fetching...</p>
            </div>
          </div>
        )}

        {error && <p>Error while fetching the address</p>}

        {allAddress.length > 0 ? (
          <div>
            <label id="address">
              <h3>Select Address for Delivery</h3>
            </label>
            <br />
            <br />
            <div className="row text-center">
              {allAddress.map((item) => (
                <div className="col-md-6 mt-2" key={item._id}>
                  <div className="card h-100 p-3 shadow-sm">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex">
                        <input
                          name="address"
                          type="radio"
                          className="form-check-input mt-1 me-2"
                          onChange={(e) => setSelectAddress(item)}
                        />
                        <div>
                          <strong>{item.block}</strong>
                          <br />
                          {item.street}, {item.city}
                          <br />
                          {item.state} - {item.pincode}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                      <Link
                        className="btn btn-sm btn-outline-secondary"
                        state={{ address: item, page: "checkout" }}
                        to="/addAddress"
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <img
              className="align-middle"
              style={{ height: "400px", width: "800px", objectFit: "cover" }}
              src="https://www.shutterstock.com/image-illustration/modern-design-concept-add-address-600nw-2559007593.jpg"
            />
          </div>
        )}
        <div className="mt-4 mb-4 d-flex flex-wrap ">
          <Link className="btn btn-secondary me-4" to="/addAddress" state = {{page: "checkout"}}>
            Add New Address
          </Link>
          <Link className="btn btn-warning" to="/products/cart">
            Back To Cart
          </Link>
        </div>
        <hr />
      </div>

      <div className="container p-3">
        {loading && <p>Loading...</p>}
        {error && <p>Error while fetching the cartItems</p>}
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <h4 className="text-center ">Order Items</h4>
            <div className="row ">
              {cartProducts.map((prod) => (
                <div
                  className="col-12 col-md-6 d-flex"
                  key={prod._id}
                >
                  <div className="card p-2 mt-2">
                      <Link
                        to={`/product/${prod._id}`}
                        className="d-block h-100"
                      >
                        <img
                          src={prod.imageUrl}
                          className=" card-img img-fluid"
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          alt={prod.name}
                        />
                      </Link>

                    <div className="mt-3 text-center">
                      <p>
                        <strong>{prod.name}</strong>
                      </p>
                      <div >
                        <span >
                          USD{" "}
                          {(
                            prod.price -
                            prod.price * (prod.discountPercentage / 100)
                          ).toFixed(2)}
                        </span>
                        <span
                          className="text-decoration-line-through text-muted ms-2"
                        >
                          {prod.price.toFixed(2)}
                        </span>
                      </div>
                      <div >
                        <strong>Quantity: </strong> {prod.cartQuantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6 col-12 ">
            <h4 className="text-center ">
              Order Details (
              {cartProducts.reduce((acc, item) => acc + item.cartQuantity, 0)}){" "}
            </h4>
            <div className="card p-3">
              <p className="d-flex justify-content-between">
                <strong>
                  Price (
                  {cartProducts.reduce(
                    (acc, item) => acc + item.cartQuantity,
                    0
                  )}
                  ):{" "}
                </strong>{" "}
                USD : {price.toFixed(2)}
              </p>
              <p className="d-flex justify-content-between">
                <strong>Discount Applied : </strong> USD : {discount.toFixed(2)}
              </p>
              <hr />
              <p className="d-flex justify-content-between">
                <strong>Total Order Value : </strong> USD : {total.toFixed(2)}
              </p>
            </div>
            <button
              className="btn btn-danger form-control mt-3"
              onClick={handleOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
