import { useNavigate, Link } from "react-router-dom";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
import Footer from "../constants/Footer";
import useCartWishlistContext from "../context/CartWishlistContext";
import useCheckoutContext from "../context/CheckoutContext";
const CheckoutPage = () => {
  const {
    selectAddress,
    setSelectAddress,
    orderPlaced,
    setOrderPlaced,
    allAddress,
    setAllAddress,
    handleDelete,
    handleOrder,
  } = useCheckoutContext()

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
    <>
      <HeaderWithoutSearch />
      <div className="container p-3">
        {loading && (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
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
            <div className="row">
              {allAddress.map((item) => (
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        name="address"
                        type="radio"
                        onChange={(e) => setSelectAddress(item)}
                      />
                      &nbsp;
                      {item.block}, <br /> {item.street} <br /> {item.city},{" "}
                      {item.state} <br /> {item.pincode}
                      <br />
                      <br />
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn btn-danger "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                      <Link
                        className="btn btn-secondary ms-3"
                        state={{ address: item }}
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
        <Link className="btn btn-secondary me-5" to="/addAddress">
          Add Another Address
        </Link>
        <Link className="btn btn-warning ms-5" to="/products/cart">
          Back To Cart
        </Link>
        <hr />
      </div>

      <div className="container p-3">
        {loading && <p>Loading...</p>}
        {error && <p>Error while fetching the cartItems</p>}
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-center ">Order Items</h4>
            <div className="row">
              {cartProducts.map((prod) => (
                <div className="col-md-6 mt-4">
                  <Link to={`/product/${prod._id}`}>
                    <img
                      src={prod.imageUrl}
                      className="card-image img-fluid"
                      style={{
                        height: "300px",
                        // width: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </Link>

                  <br />
                  <div>
                    <strong>
                      USD :{" "}
                      {(
                        prod.price -
                        prod.price * (prod.discountPercentage / 100)
                      ).toFixed(2)}
                    </strong>
                    &nbsp;&nbsp;
                    <span className="text-decoration-line-through">
                      USD: {prod.price.toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <span>
                      <strong>Quantity: </strong>{" "}
                    </span>
                    <span> {prod.cartQuantity} </span>
                    <br />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <h4 className="text-center">
              Order Details (
              {cartProducts.reduce((acc, item) => acc + item.cartQuantity, 0)}){" "}
            </h4>
            <div className="card p-3">
              <p>
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
              <p>
                <strong>Discount Applied : </strong> USD : {discount.toFixed(2)}
              </p>
              <hr />
              <p>
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
    </>
  );
};

export default CheckoutPage;
