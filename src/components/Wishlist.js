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


  return (
    <>
      <HeaderWithoutSearch />
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
          {loading && <p>Loading...</p>}
          {error && <p>Error while fetching the wishlist items</p>}
          <h1>My Wishlist ({wishlistItems})</h1>
          <div className="row">
            {wishlistProducts.map((prod) => (
              <div className="col-md-4 mt-4">
                <>
                  <Link to={`/product/${prod._id}`}>
                    <img
                      src={prod.imageUrl}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <br />
                  </Link>
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
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={() => toggleWishlist(prod)}
                  >
                    {prod.inWishlist === true
                      ? "Remove From Wishlist"
                      : "Move To Wishlist"}
                  </button><br/><br/>
                  <button className="btn btn-success " onClick = {() => cartProducts.some(p => p._id === prod._id)? removeFromCart(prod): addToCart(prod, 1)}>{cartProducts.some(p => p._id === prod._id)? "Remove From Cart" : "Add To Cart"}</button>
                </>
              </div>
            ))}

          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Wishlist;
