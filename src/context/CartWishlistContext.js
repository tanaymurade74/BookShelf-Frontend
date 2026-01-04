import { useContext, useEffect, useState, createContext} from "react";
import useFetch from "../useFetch";
import {toast} from "react-toastify"

const CartWishlistContext = createContext();
const useCartWishlistContext = () => useContext(CartWishlistContext)
export default useCartWishlistContext;

export function CartWishlistProvider({children}){

  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

   const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/api/products/cart/true`
  );
  console.log(data);

  const {data: wishlistData, loading: wishlistLoading, error: wishlistError} = useFetch(
    `${process.env.REACT_APP_API_URL}/api/products/wishlist/true`
  )
   
  const increment = async (item) => {
    if (item.cartQuantity === 5) {
      toast.warn("Maximum available quantity: 5 ");
      return;
    }
    const cartQuantity = item.cartQuantity + 1;

    addToCart(item, cartQuantity);
    
  };

  const decrement = async (item) => {
    if (item.cartQuantity === 1) {
      // setAlertMessage("Remove from cart ? ")
      removeFromCart(item);
      return;
    }

    const cartQuantity = item.cartQuantity - 1;

    addToCart(item, cartQuantity);

  };

  useEffect(() => {
    if (data && data.products) {
      setCartItems(
        data.products.reduce((acc, item) => acc + item.cartQuantity, 0)
      );
      setCartProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    if(wishlistData && wishlistData.products){
        setWishlistItems(wishlistData.products.length)
        setWishlistProducts(wishlistData.products)
    }
  },[wishlistData])

  useEffect(() => {
    let priceSum = 0;
    let discountSum = 0;

    cartProducts.forEach((prod) => {
      const originalPrice = prod.price;
      const discountAmount = prod.price * (prod.discountPercentage / 100);

      priceSum = priceSum + originalPrice * prod.cartQuantity;

      discountSum = discountSum + discountAmount * prod.cartQuantity;
    });

    setPrice(priceSum);
    setDiscount(discountSum);
    setTotal(priceSum - discountSum);
  }, [cartProducts]);

   const toggleWishlist = async (item) => {
    const isAlreadyInWishlist = wishlistProducts.some(
      (p) => p._id === item._id
    );
    let updatedList;

    if (isAlreadyInWishlist) {
      updatedList = wishlistProducts.filter((p) => p._id !== item._id);
    } else {
      updatedList = [...wishlistProducts, { ...item, inWishlist: true }];
    }

    setWishlistProducts(updatedList);
    setWishlistItems(updatedList.length);
    
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${item.name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({inWishlist: !isAlreadyInWishlist}),
        }
      );
      if (!response.ok) {
        throw "Failed to update the item";
      }
      const data = await response.json();
    } catch (error) {
      alert("Failed to remove the item from wishlist. Try again.");
    }

    if(isAlreadyInWishlist){
        toast.info(`${item.name} removed from wishlist`)
    }else{
        toast.success(`${item.name} added to wishlist`)
    }

  };

  const removeFromCart = async (item) => {
    const cartStatus = false;
    const cartQuantity = 0;

    const newProducts = cartProducts.filter((prod) => prod._id !== item._id);

    setCartProducts(newProducts);
    setCartItems(newProducts.reduce((acc, item) => acc + item.cartQuantity, 0));

    const payload = {
      inCart: cartStatus,
      cartQuantity,
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
    } catch (error) {
      alert("Error while handling cart. Try again.");
    }

    toast.info(`${item.name} removed from cart`)
  };

  const addToCart = async (item, quantity = 1) =>{
        const existingProductIndex = cartProducts.findIndex(
      (p) => p._id === item._id
    );
    let updatedList;

    if (existingProductIndex >= 0) {
      updatedList = [...cartProducts];
      updatedList[existingProductIndex].cartQuantity = quantity;
    } else {
      updatedList = [
        ...cartProducts,
        { ...item, inCart: true, cartQuantity: quantity },
      ];
    }
   
    setCartProducts(updatedList);
    setCartItems(updatedList.reduce((acc, item) => acc + item.cartQuantity, 0));

        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${item.name}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({inCart: true, cartQuantity: quantity})
            }
        )
        }catch{
            alert("Error while updating the cart")
        }
        
        if(existingProductIndex >= 0){
            toast.info(`${item.name} quantity updated to ${quantity}`)
        }else{
            toast.success(`${item.name} added to cart`)
        }

        
  }

  const handleCartDeletion = async () => {

      const itemsToRemove = [...cartProducts];

      setCartProducts([]);
      setCartItems(0);
      setPrice(0);
      setTotal(0);
      setDiscount(0);

     for(const item of itemsToRemove){
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${item.name}`, 
             {
              method: "POST",
              headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify({inCart: false, cartQuantity: 0})
             }
          )
        }catch(error){
          console.log(`Failed to delete ${item.name} from cart`)
        }
     }
     toast.info("Cart Cleared")
  }

  return (
    <CartWishlistContext.Provider value ={{cartItems, setCartItems, wishlistItems, setWishlistItems, cartProducts, setCartProducts
        , wishlistProducts, setWishlistProducts, loading, error, price, setPrice, discount, setDiscount, total, setTotal
        , alertMessage, setAlertMessage, addToCart, removeFromCart, toggleWishlist, increment, decrement, handleCartDeletion
    }}>
        {children}
    </CartWishlistContext.Provider>
  )

};