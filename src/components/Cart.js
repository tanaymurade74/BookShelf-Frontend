import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
import useCartWishlistContext from "../context/CartWishlistContext";
import Footer from "../constants/Footer";
const Cart = () => {

    const {cartProducts, wishlistProducts, cartItems, price
        , discount, total, increment, decrement, loading, error
        , toggleWishlist, removeFromCart
    } = useCartWishlistContext();



  return (
    <>
      <HeaderWithoutSearch />
      {cartItems == 0 ? (
        <div className="container p-3 text-center">
          <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" />
        </div>
      ) : (
        <div className="container p-3 ">
          {loading && <p>Loading...</p>}
          {error && <p>Error occurred while trying to fetch the cartItems</p>}
          <h1>My Cart ({cartItems})</h1>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="row">
                {cartProducts.map((prod) => (
                  <div className="col-md-6 ">
                    <div className="card p-3">
                      <Link to={`/product/${prod._id}`}>
                        <img
                          src={prod.imageUrl}
                          className="card-image img-fluid"
                          style={{
                            height: "300px",
                            width: "300px",
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
                      <br />
                      <div>
                        <span>
                          <strong>Quantity: </strong>{" "}
                        </span>
                        <button onClick={() => decrement(prod)}> - </button>
                        <span> {prod.cartQuantity} </span>
                        <button onClick={() => increment(prod)}> + </button>
                        <br />
                        <div className="text-danger">
                          {/* {prod.cartQuantity === 1 && alertMessage || prod.cartQuantity === 5 && alertMessage} */}
                        </div>
                      </div>
                      <br />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => toggleWishlist(prod)}
                      >
                        {wishlistProducts.some(p => p._id === prod._id) ? "Remove From Wishlist"
                          : "Move To Wishlist"}
                      </button>
                      <br />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => removeFromCart(prod)}
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-3 ">
                <div className="card-title p-3">
                  <h3>
                    <strong>Cart Details</strong>
                  </h3>
                </div>
                <hr />

                <p>
                  <strong>Price ({cartItems}): </strong> USD :{" "}
                  {price.toFixed(2)}
                </p>
                <p>
                  <strong>Discount Applied : </strong> USD :{" "}
                  {discount.toFixed(2)}
                </p>
                <hr />
                <p>
                  <strong>Total Cart Value : </strong> USD : {total.toFixed(2)}
                </p>
              </div>
              <Link className="btn btn-danger form-control mt-3" to="/checkout">
                Proceed to Checkout ({cartItems} items)
              </Link>
            </div>
          </div>
          
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Cart;
