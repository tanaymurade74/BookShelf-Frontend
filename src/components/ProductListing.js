import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Header from "../constants/Header";

const ProductListing = () => {
  const param = useParams();
  console.log(param);
  const categoryName = param.categoryName;
  console.log(categoryName);
   
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState(`${categoryName}`);
  const [ratingRange, setRatingRange] = useState(0);
  const [discountRange, setDiscountRange] = useState(0);
  const [priceOrder, setPriceOrder] = useState("");
   
  const [search, setSearch] = useState("");

  console.log(search);

  const apiUrl =
    search.trim() === ""
      ? `${process.env.REACT_APP_API_URL}/api/products/category/${selectCategory}`
      : `${process.env.REACT_APP_API_URL}/api/product/search/${encodeURIComponent(
          search
        )}`;

  console.log(apiUrl);

  const { data, loading, error } = useFetch(apiUrl);

  console.log("data", data);

  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
      setAllProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    let filteredProducts = [...allProducts];
    if (ratingRange > 0) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.rating >= ratingRange
      );
    }
    if (discountRange > 0) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.discountPercentage >= discountRange
      );
    }
 
    if (priceOrder === "asc") {
      filteredProducts.sort((a, b) => {
        const priceA = a.price - (a.price * a.discountPercentage) / 100;
        const priceB = b.price - (b.price * b.discountPercentage) / 100;
        return priceA - priceB;
      });
    } else if (priceOrder === "desc") {
      filteredProducts.sort((a, b) => {
        const priceA = a.price - (a.price * a.discountPercentage) / 100;
        const priceB = b.price - (b.price * b.discountPercentage) / 100;
        return priceB - priceA;
      });
    }
    setProducts(filteredProducts);
  }, [ratingRange, discountRange, allProducts, priceOrder]);

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
    const cartStatus = item.inCart === true ? false : true;
    const newQuantity = item.inCart === true ? 0 : item.cartQuantity + 1;
    const previousProducts = [...products];

    const updatedProducts = products.map((prod) =>
      prod._id === item._id
        ? { ...prod, inCart: cartStatus, cartQuantity: newQuantity }
        : { ...prod }
    );
    setProducts(updatedProducts);

    const payload = {
      inCart: cartStatus,
      cartQuantity: newQuantity,
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
        throw "error while updating";
      }
      const data = await response.json();
    } catch (error) {
      // throw error;
      setProducts(previousProducts);
      alert("Failed to upadate the cart. Please try again.");
    }
  };

  const handleClear = (event) => {
    setDiscountRange(0);
    setRatingRange(0);
    setSelectCategory(`${categoryName}`);
    setPriceOrder("");
  };

  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      <div className="container p-4 bg-body-secondary">
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-6">
                <h3>Filters</h3>
              </div>
              <div className="col-md-6">
                <button onClick={() => handleClear()}>Clear</button>
              </div>
            </div>
            <label className="mt-3">
              <strong>Category:</strong>
            </label>
            <br />
            <select
              value={selectCategory}
              onChange={(event) => setSelectCategory(event.target.value)}
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Poetry">Poetry</option>
              <option value="History">History</option>
              <option value="Classic">Classic</option>
              <option value="Art & Music">Art & Music</option>
            </select>
            <hr />
            <label id="rating">
              <strong>Rating Range: </strong>{" "}
            </label>
            <br />
            <input
              checked={ratingRange === 4}
              name="rating"
              type="radio"
              value="4"
              onChange={(event) => setRatingRange(parseInt(event.target.value))}
            />
            4 & Above
            <br />
            <input
              checked={ratingRange === 3}
              name="rating"
              type="radio"
              value="3"
              onChange={(event) => setRatingRange(parseInt(event.target.value))}
            />
            3 & Above
            <br />
            <input
              checked={ratingRange === 2}
              name="rating"
              type="radio"
              value="2"
              onChange={(event) => setRatingRange(parseInt(event.target.value))}
            />
            2 & Above
            <br />
            <input
              checked={ratingRange === 1}
              name="rating"
              type="radio"
              value="1"
              onChange={(event) => setRatingRange(parseInt(event.target.value))}
            />
            1 & Above
            <hr />
            <label id="discount">
              <strong>Discount Range: </strong>{" "}
            </label>
            <br />
            <input
              checked={discountRange === 15}
              name="discount"
              type="radio"
              value="15"
              onChange={(event) =>
                setDiscountRange(parseInt(event.target.value))
              }
            />
            15% & Above
            <br />
            <input
              checked={discountRange === 10}
              name="discount"
              type="radio"
              value="10"
              onChange={(event) =>
                setDiscountRange(parseInt(event.target.value))
              }
            />
            10% & Above
            <br />
            <input
              checked={discountRange === 5}
              name="discount"
              type="radio"
              value="5"
              onChange={(event) =>
                setDiscountRange(parseInt(event.target.value))
              }
            />
            5% & Above
            <br />
            <hr />
            <label id="price">
              <strong>Price Range:</strong>{" "}
            </label>
            <br />
            <input
              name="price"
              type="radio"
              value="asc"
              checked = {priceOrder === "asc"}
              onChange={(e) => setPriceOrder(e.target.value)}
            />
            Low To High
            <br />
            <input
              name="price"
              type="radio"
              value="desc"
              checked = {priceOrder === "desc"}
              onChange={(e) => setPriceOrder(e.target.value)}
            />
            High To Low
          </div>

          <div className="col-md-8">
            <h3>
              Showing All {data && data.products && data.products.length}{" "}
              Products
            </h3>
            {loading && <p>Loading....</p>}
            {error && <p> Error while trying to fetch the data </p>}

            <div className="row mt-4">
              {products.map((item) => (
                <div className="col-md-6 mt-4">
                  <div className="row">
                    <div className="col-md-6 ">
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={item.imageUrl}
                          className="img-fluid"
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                      </Link>
                    </div>
                    <div className="col-md-6 mt-2 text-dark">
                      <span>
                        <h5>
                          <strong>{item.name}</strong>
                        </h5>
                      </span>
                      <br />
                      <span>MRP - USD: {item.price.toFixed(2)}</span>
                      <br />
                      <span>Discount: {item.discountPercentage}% off</span>
                      <p>
                        <h6>
                          <strong>
                            USD :
                            {(
                              item.price -
                              item.price * (item.discountPercentage / 100)
                            ).toFixed(2)}
                          </strong>
                        </h6>
                      </p>
                      <button
                        className="btn btn-primary form-control"
                        onClick={() => handleCart(item)}
                      >
                        {item.inCart === true
                          ? "Remove From Cart"
                          : "Add To Cart"}
                      </button>
                      <br />
                      <button
                        className="btn btn-secondary mt-2 form-control"
                        onClick={() => handleWishlist(item)}
                      >
                        {item.inWishlist === true
                          ? "Remove From Wishlist"
                          : "Add To Wishlist"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
