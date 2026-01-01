import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../useFetch";
import useCartWishlistContext from "./CartWishlistContext";
import { useParams } from "react-router-dom";
const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);
export default useProductContext;


export function ProductProvider({children}){

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const {categoryName} = useParams();
  const [selectCategory, setSelectCategory] = useState(categoryName || "Fiction");
  const [ratingRange, setRatingRange] = useState(0);
  const [discountRange, setDiscountRange] = useState(0);
  const [priceOrder, setPriceOrder] = useState("");
   
  const [search, setSearch] = useState("");

  const{addToCart, removeFromCart, toggleWishlist} = useCartWishlistContext();

  console.log(search);


  const apiUrl =
    search.trim() === ""
      ? `${process.env.REACT_APP_API_URL}/api/products/category/${selectCategory}`
      : `${process.env.REACT_APP_API_URL}/api/product/search/${encodeURIComponent(
          search
        )}`;

//   console.log(apiUrl);

  const { data, loading, error } = useFetch(apiUrl);

//   console.log("data", data);
  useEffect(() => {
    setSelectCategory(categoryName)
  }, [categoryName])

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

    toggleWishlist(item);
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

    if(cartStatus){
        addToCart(item, 1)
    }else{
        removeFromCart(item)
    }
  };

  const handleClear = (event) => {
    setDiscountRange(0);
    setRatingRange(0);
    setSelectCategory(categoryName);
    setPriceOrder("");
  };
     

  return (
    <ProductContext.Provider value = {{allProducts, setAllProducts, products, setProducts, selectCategory, setSelectCategory,
        ratingRange, setRatingRange, discountRange, setDiscountRange, priceOrder, setPriceOrder, search, setSearch, handleWishlist
        , handleCart, handleClear, loading, error}}>
        
        {children}
   
    </ProductContext.Provider>
  )

}