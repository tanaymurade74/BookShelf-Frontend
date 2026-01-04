import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
import useCartWishlistContext from "../context/CartWishlistContext";
import Footer from "../constants/Footer";
const Wishlist = () => {
  const [items, setItems] = useState(0);
  const [products, setProducts] = useState([]);
  const{addToCart, removeFromCart, toggleWishlist, wishlistItems, wishlistProducts, loading, error, cartProducts} = useCartWishlistContext();
  const isInCart = (id) => cartProducts.some((p) => p._id === id);

  return (
    <div className="d-flex flex-column min-vh-100">
      
      <HeaderWithoutSearch />
      <div className="flex-grow-1">
      {wishlistItems == 0 ? (
        <div className="container p-3 text-center">
          <img
            className="img-fluid"
            style={{ height: "600px", objectFit: "cover" }}
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-svg-download-png-9824477.png"
          />
        </div>
      ) : (
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
            
          {error && <p>Error while fetching the wishlist items</p>}
          <h1>My Wishlist ({wishlistItems})</h1>
          <div className="row mt-4">
            {wishlistProducts.map((prod) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={prod._id}>
                <div className="card h-100 ">
                  <Link to={`/product/${prod._id}`} className="d-block h-100">
                    <img
                      src={prod.imageUrl}
                      className="card-img-top"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      alt={prod.name || "Product image"}
                    />
                  </Link>

                  <div className="card-body d-flex flex-column">
                    {prod.name && (
                      <h6 className="card-title text-truncate mb-2">
                        {prod.name}
                      </h6>
                    )}

                    <div className="mb-3">
                      <span className="fw-bold me-2">
                        USD{" "}
                        {(
                          prod.price -
                          prod.price * (prod.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      <small className="text-muted text-decoration-line-through">
                        USD {prod.price.toFixed(2)}
                      </small>
                    </div>

                    <div className="mt-auto">
                      <button
                        type="button"
                        className="btn btn-outline-danger w-100 mb-2"
                        onClick={() => toggleWishlist(prod)}
                      >
                        {prod.inWishlist ? "Remove from Wishlist" : "Move to Wishlist"}
                      </button>

                      <button
                        type="button"
                        className={`btn w-100 ${
                          isInCart(prod._id) ? "btn-outline-secondary" : "btn-success"
                        }`}
                        onClick={() =>
                          isInCart(prod._id)
                            ? removeFromCart(prod)
                            : addToCart(prod, 1)
                        }
                      >
                        {isInCart(prod._id) ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}
      <Footer/>
    </div>
    </div>
  );
};

export default Wishlist;
