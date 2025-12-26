import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import { useEffect } from "react";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [product, setProduct] = useState([]);

  const decrement = () => {
    setQuantity(quantity === 0 ? 0 : quantity - 1);
    setAlertMessage("");
  };

  const increment = () => {
    if (quantity === 5) {
      setAlertMessage("Maximum available quantity: 5");
      return;
    }
    setQuantity(quantity + 1);
    setAlertMessage("");
  };

  const id = useParams();
  const productId = id.productId;
  console.log(productId);

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/api/products/${productId}`
  );
  console.log(data);
  useEffect(() => {
    if (data && data.product) {
      setProduct(data.product);
    }
  }, [data]);

  const handleCart = async (item) => {
    if (quantity === 0 && item.inCart === false) {
      alert("The quantity selected is zero. ");
      return;
    }

    const cartStatus = item.inCart === true ? false : true;
    const cartQuantity = cartStatus === true ? quantity : 0;

    const newProduct = product.map((prod) => {
      return item._id === prod._id
        ? { ...prod, inCart: cartStatus, cartQuantity: cartQuantity }
        : { ...prod };
    });
    setProduct(newProduct);
    const payload = {
      inCart: cartStatus,
      cartQuantity: cartQuantity,
    };

    try {
      console.log(item.name);
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
      const data = await response.json();
    } catch {
      alert(
        "An error occurred while trying add/remove to/from cart. Try again"
      );
    }
  };

  const handleWishlist = async (item) => {
    const wishListStatus = item.inWishlist === true ? false : true;

    const newProd = product.map((prod) => {
      return prod._id === item._id
        ? { ...prod, inWishlist: wishListStatus }
        : { ...prod };
    });

    setProduct(newProd);

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
        throw "Failed to update";
      }

      const data = await response.json();
    } catch (error) {
      alert("Error while moving/removing from wishList.Try again");
    }
  };

  return (
    <>
      <HeaderWithoutSearch />
      <div className="container bg-body-secondary p-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error while fetching the details for the product</p>}

        <div className="container mt-4 ">
          {product.map((item) => (
            <div className="row">
              <div className="col-md-6">
                <div>
                  <img
                    className="img-fluid"
                    style={{ height: "500px", objectFit: "cover" }}
                    src={item.imageUrl}
                  />
                  <br />
                  <button
                    className="btn btn-primary mt-3 form-control"
                    onClick={() => handleCart(item)}
                  >
                    {item.inCart === true ? "Remove From Cart" : "Add To Cart"}
                  </button>
                  <br />
                  <button
                    className="btn btn-secondary mt-3 form-control"
                    onClick={() => handleWishlist(item)}
                  >
                    {item.inWishlist === true
                      ? "Remove From Wishlist"
                      : "Move To Wishlist"}
                  </button>
                  <br />
                </div>
              </div>
              <div className="col-md-6">
                <h2>{item.name}</h2>
                <br />
                <p>
                  <strong>Rating:</strong> {item.rating}
                </p>
                <span>
                  <strong>
                    USD :{" "}
                    {(
                      item.price -
                      item.price * (item.discountPercentage / 100)
                    ).toFixed(2)}
                  </strong>
                </span>
                &nbsp;&nbsp;
                <span className="text-decoration-line-through">
                  USD: {item.price.toFixed(2)}
                </span>
                <br />
                <span>Discount: {item.discountPercentage}% off</span>
                <hr />
                <span>Quantity: </span>
                <button type="button" onClick={decrement}>
                  {" "}
                  -{" "}
                </button>
                &nbsp;
                <span>{quantity}</span>&nbsp;
                <button type="button" onClick={increment}>
                  {" "}
                  +{" "}
                </button>
                <br />
                <div className="text-danger">{alertMessage}</div>
                <hr />
                <div className="row">
                  <div className="col-md-3 p-3">
                    <img
                      className="img-fluid"
                      style={{ height: "75px", objectFit: "cover" }}
                      src="https://png.pngtree.com/png-clipart/20220930/original/pngtree-10-day-replacement-guarantee-badge-image-png-image_8646350.png"
                    />
                    <br />
                    10 days returnable
                  </div>
                  <div className="col-md-3 p-3">
                    <img
                      src="https://miro.medium.com/1*5c8KOrF2CKKQCcY67sJDWA.jpeg"
                      className="img-fluid"
                      style={{ height: "75px", objectFit: "cover" }}
                    />
                    <br />
                    Pay on Delivery
                  </div>
                  <div className="col-md-3 p-3">
                    <img
                      className="img-fluid"
                      style={{ height: "75px", objectFit: "cover" }}
                      src="https://png.pngtree.com/png-clipart/20230120/ourmid/pngtree-free-delivery-truck-icon-png-image_6565580.png"
                    />
                    <br />
                    Free Delivery
                  </div>
                  <div className="col-md-3 p-3">
                    <img
                      className="img-fluid"
                      style={{ height: "75px", objectFit: "cover" }}
                      src="https://img.freepik.com/premium-vector/100-secure-payment-green-badge-isolated-transparent-background_105700-1800.jpg"
                    />
                    <br />
                    Secure Payment
                  </div>
                </div>
                <hr />
                <strong>Description: </strong>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
