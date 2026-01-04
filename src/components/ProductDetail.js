import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import { useEffect } from "react";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
import useProductDetailContext from "../context/ProductDetailContext";
import Footer from "../constants/Footer";
const ProductDetail = () => {
    const {loading, error, quantity, product
        , handleCart, handleWishlist, decrement, increment, alertMessage
    } = useProductDetailContext();


  
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderWithoutSearch />
      <div className="container bg-body-secondary p-4 flex-grow-1">
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
            
        {error && <p>Error while fetching the details for the product</p>}

        <div className="container mt-4 ">
          {!loading && product.map((item) => (
            <div className="row">
              <div className="col-md-4 text-center">
                <div style = {{maxWidth: "400px", width: "100%"}}>
                  <img
                    className="img-fluid"
                    style={{ height: "400px",width: "400px", objectFit: "contain" }}
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
              <div className="col-md-8 text-center">
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
      <Footer/>
    </div>
  );
};

export default ProductDetail;
