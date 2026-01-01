import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../useFetch";
import useCartWishlistContext from "./CartWishlistContext";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify"

const ProductDetailContext = createContext();
const useProductDetailContext = () => useContext(ProductDetailContext)
export default useProductDetailContext;


export function ProductDetailProvider({children}){

  const [quantity, setQuantity] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const param = useParams();

  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState(param.productId)
  
  const {addToCart, removeFromCart, toggleWishlist} = useCartWishlistContext();

  useEffect(() => {
    setProductId(productId)
    setQuantity(0);
    setAlertMessage("")
  },[productId])

  const decrement = () => {
    const newQuantity = quantity - 1
    setQuantity(quantity === 0 ? 0 : newQuantity);
    toast.info(`Quantity updated to ${newQuantity}`)
    setAlertMessage("");
  };

  const increment = () => {
    if (quantity === 5) {
      toast.warning("Maximum available quantity: 5");
      return;
    }
    const newQuantity = quantity + 1
    setQuantity(newQuantity);
    
    setAlertMessage("");
    toast.info(`Quantity updated to ${newQuantity}`)
  };

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

    if(cartStatus){
        addToCart(item, cartQuantity)
    }else{
        removeFromCart(item)
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

    toggleWishlist(item)
  };

  return (
    <ProductDetailContext.Provider value = {{productId, setProductId, quantity, setQuantity, loading, error
        , increment, decrement, alertMessage, setAlertMessage, product, setProduct, handleCart, handleWishlist
    }}>
        {children}
    </ProductDetailContext.Provider>
  )
}