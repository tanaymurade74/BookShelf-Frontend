import { useState, useEffect } from "react";
import useFetch from "../useFetch";
import { useNavigate, Link } from "react-router-dom";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
const CheckoutPage = () => {
  const [selectAddress, setSelectAddress] = useState(null);
  const [allAddress, setAllAddress] = useState([]);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const navigate = useNavigate();

  const {
    data: fetchedAddress,
    loading,
    error,
  } = useFetch(`${process.env.REACT_APP_API_URL}/api/user/address`);
  console.log(fetchedAddress);

  useEffect(() => {
    if (fetchedAddress && fetchedAddress.Addresses) {
      setAllAddress(fetchedAddress.Addresses);
    }
  }, [fetchedAddress]);

  const {
    data: cartItems,
    loading: load,
    error: cartItemsError,
  } = useFetch(`${process.env.REACT_APP_API_URL}/api/products/cart/true`);
  console.log(cartItems);

  useEffect(() => {
    if (cartItems && cartItems.products) {
      setProducts(cartItems.products);
    }
  }, [cartItems]);

  const handleDelete = async (addressId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/address/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      const data = await response.json();

      const updatedAddresses = allAddress.filter(
        (item) => item._id !== addressId
      );
      setAllAddress(updatedAddresses);
    } catch {
      alert("Error occurred while trying to delete the address. Try again");
    }
  };

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

  const handleOrder = async () => {
    if (selectAddress === null) {
      alert("Select address for delivery");
      return;
    }
    console.log(selectAddress);
    setOrderPlaced(true);
    const items = products.map((prod) => {
      return {
        name: prod.name,
        imageUrl: prod.imageUrl,
        quantity: prod.cartQuantity,
        price: (
          prod.price -
          (prod.price * prod.discountPercentage) / 100
        ).toFixed(2),
      };
    });
    const payload = {
      items: items,
      totalAmount: total.toFixed(2),
      discountedAmount: discount.toFixed(2),
      deliveryAddress: selectAddress,
    };

    console.log(payload);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      setTimeout(() => {
        navigate("/user");
      }, 1500);
    } catch {
      alert("Error while trying to place order");
      return;
    }
    // navigate("/user")
  };

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
        {loading && <p>Loading...</p>}
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
                        Update{" "}
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
        {load && <p>Loading...</p>}
        {cartItemsError && <p>Error while fetching the cartItems</p>}
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-center ">Order Items</h4>
            <div className="row">
              {products.map((prod) => (
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
              {products.reduce((acc, item) => acc + item.cartQuantity, 0)}){" "}
            </h4>
            <div className="card p-3">
              <p>
                <strong>
                  Price (
                  {products.reduce((acc, item) => acc + item.cartQuantity, 0)}):{" "}
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
    </>
  );
};

export default CheckoutPage;
