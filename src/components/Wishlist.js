import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";

const Wishlist = () => {
  const [items, setItems] = useState(0);
  const [products, setProducts] = useState([]);

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/api/products/wishlist/true`
  );
  console.log(data);
  useEffect(() => {
    if (data && data.products) {
      setItems(data.products.length);
      setProducts(data.products);
    }
  }, [data]);

  const handleWishlist = async (item) => {
    const wishListStatus = false;

    const updatedProducts = products.filter((prod) => item._id !== prod._id);

    setProducts(updatedProducts);
    setItems(updatedProducts.length);

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
      alert("Failed to remove the item from wishlist. Try again.");
    }
  };

  const handleCart = async (item) =>{
        const cartStatus = item.inCart === true? false: true;
        const cartQuantity = cartStatus === true? 1 : 0;

        const payload = {
            cartQuantity : cartQuantity,
            inCart: cartStatus
        }

        const updatedProd = products.map(prod => {
            return prod._id === item._id ? {...prod, cartQuantity: cartQuantity, inCart: cartStatus} : {...prod}
        })
        setProducts(updatedProd);
        setItems(updatedProd.length)

        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${item.name}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        )
        }catch{
            alert("Error while updating the cart")
        }
  }

  return (
    <>
      <HeaderWithoutSearch />
      {items == 0 ? (
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
          <h1>My Wishlist ({items})</h1>
          <div className="row">
            {products.map((prod) => (
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
                    onClick={() => handleWishlist(prod)}
                  >
                    {prod.inWishlist === true
                      ? "Remove From Wishlist"
                      : "Move To Wishlist"}
                  </button><br/><br/>
                  <button className="btn btn-success " onClick = {() => handleCart(prod)}>{prod.inCart === true? "Remove From Cart" : "Add To Cart"}</button>
                </>
              </div>
            ))}

          </div>
        </div>
      )}
      
    </>
  );
};

export default Wishlist;
