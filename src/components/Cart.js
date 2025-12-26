import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";

const Cart = () => {
  const [cartItems, setCartItems] = useState(0);
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/api/products/cart/true`
  );
  console.log(data);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  const increment = async (item) => {
    if (item.cartQuantity === 5) {
      setAlertMessage("Maximum available quantity: 5 ");
      return;
    }
    const cartQuantity = item.cartQuantity + 1;

    const updatedProds = products.map((prod) => {
      return prod._id === item._id
        ? { ...prod, cartQuantity: cartQuantity }
        : { ...prod };
    });
    setProducts(updatedProds);
    setCartItems(
      updatedProds.reduce((acc, item) => acc + item.cartQuantity, 0)
    );

    const payload = {
      cartQuantity: cartQuantity,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${item.name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (error) {
      alert("Error in incrementing the cart item. Try again.");
    }
  };

  const decrement = async (item) => {
    if (item.cartQuantity === 1) {
      // setAlertMessage("Remove from cart ? ")
      handleCart(item);
      return;
    }

    const cartQuantity = item.cartQuantity - 1;

    const updatedProds = products.map((prod) => {
      return prod._id === item._id
        ? { ...prod, cartQuantity: cartQuantity }
        : { ...prod };
    });
    setProducts(updatedProds);
    setCartItems(
      updatedProds.reduce((acc, item) => acc + item.cartQuantity, 0)
    );
    const payload = {
      cartQuantity: cartQuantity,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${item.name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch {
      alert("Error while trying to decrement the cart Quantity");
    }
  };

  useEffect(() => {
    if (data && data.products) {
      setCartItems(
        data.products.reduce((acc, item) => acc + item.cartQuantity, 0)
      );
      setProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    let priceSum = 0;
    let discountSum = 0;

    products.forEach((prod) => {
      const originalPrice = prod.price;
      const discountAmount = prod.price * (prod.discountPercentage / 100);

      priceSum = priceSum + originalPrice * prod.cartQuantity;

      discountSum = discountSum + discountAmount * prod.cartQuantity;
    });

    setPrice(priceSum);
    setDiscount(discountSum);
    setTotal(priceSum - discountSum);
  }, [products]);

  const handleWishlist = async (item) => {
    const wishListStatus = item.inWishlist === true ? false : true;

    const updatedProducts = products.map((prod) =>
      prod._id === item._id
        ? { ...prod, inWishlist: wishListStatus }
        : { ...prod }
    );

    setProducts(updatedProducts);

    const payload = {
      inWishlist: wishListStatus,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${item.name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw "Failed to update the item";
      }
      const data = await response.json();
    } catch (error) {
      alert("Failed to add the item to wishlist. Try again.");
    }
  };

  const handleCart = async (item) => {
    const cartStatus = false;
    const cartQuantity = 0;

    const newProducts = products.filter((prod) => prod._id !== item._id);

    setProducts(newProducts);
    setCartItems(newProducts.reduce((acc, item) => acc + item.cartQuantity, 0));

    const payload = {
      inCart: cartStatus,
      cartQuantity,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${item.name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (error) {
      alert("Error while handling cart. Try again.");
    }
  };

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
                {products.map((prod) => (
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
                        onClick={() => handleWishlist(prod)}
                      >
                        {prod.inWishlist === true
                          ? "Remove From Wishlist"
                          : "Move To Wishlist"}
                      </button>
                      <br />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleCart(prod)}
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
      ;
    </>
  );
};

export default Cart;
