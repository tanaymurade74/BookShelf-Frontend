import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Header from "../constants/Header";
import useProductContext from "../context/ProductContext"
// import { ProductProvider } from "../context/ProductContext";
import Footer from "../constants/Footer";
const ProductListing = () => {
  const param = useParams();
  console.log(param);
  const categoryName = param.categoryName;
  console.log(categoryName);
   
 
  const { products, selectCategory, setSelectCategory,
        ratingRange, setRatingRange, discountRange, setDiscountRange, priceOrder, setPriceOrder
        , search, setSearch, handleWishlist, handleCart, handleClear, loading, error } = useProductContext();


  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      <div className="container p-4 bg-body-secondary">

          <button 
            className="btn btn-primary w-100 mb-3 d-md-none" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#filterSection" 
            aria-expanded="false" 
            aria-controls="filterSection"
        >
            Show/Hide Filters
        </button>

        <div className="row">
          <div className="col-md-4">
             <div className="collapse d-md-block" id="filterSection">
            <div className="row">
              <div className="col-md-6">
                <h3>Filters</h3>
              </div>
              <div className="col-md-6">
                <button onClick={() => handleClear()}>Clear</button>
              </div>
            </div>
            <div>
            <label className="mt-3">
              <strong>Category:</strong>
            </label>
            <br />
            <select
              value={selectCategory}
              onChange={(event) => setSelectCategory(event.target.value)}
            >
              <option  value="fiction">Fiction</option>
              <option  value="non-fiction">Non-fiction</option>
              <option  value="poetry">Poetry</option>
              <option  value="history">History</option>
              <option  value="classic">Classic</option>
              <option  value="art & music">Art & Music</option>
            </select>
            <hr />
            <label id="rating">
              <strong>Rating Range: </strong>
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
        </div>
        </div>

          <div className="col-md-8">
            {/* <h3>
              Showing All {data && data.products && data.products.length}{" "}
              Products
            </h3> */}
            {loading && <p className="text-center align-middle"> <img className="img-fluid" style = {{height: "300px", objectFit: "cover"}} 
            src = "https://i.ytimg.com/vi/rumF8zJUFYI/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AHeA4AC4AOKAgwIABABGGUgZShlMA8=&rs=AOn4CLBetpZfRpGjZ-Z0To7ykofzqT43XQq"/>
            </p>}
            {error && <p> Error while trying to fetch the data </p>}

            {!loading && products && products.length === 0 ? <div className="text-center">
                    <img className="img-fluid" src = "https://www.jalongi.com/public/assets/images/product_not_found.jpeg" />
            </div> :
            <div className="row mt-4">
               {!loading && <h3>
              Showing All {products && products.length}{" "}
              Products
            </h3>}
              {!loading && products && products.length > 0 && products.map((item) => (
                <div className="col-md-6 mt-4">
                  <div className="row">
                    <div className="col-md-6 text-center" style = {{height: "250px"}} >
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={item.imageUrl}
                          className="img-fluid"
                          style={{ height: "250px", objectFit: "contain" }}
                        />
                      </Link>
                    </div>
                    <div className="col-md-6 text-center mt-2 text-dark">
                      <span>
                        <h5>
                          <strong>{item.name}</strong>
                        </h5>
                      </span>
                      <span>Rating: {item.rating}</span><br/>
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
}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductListing;
