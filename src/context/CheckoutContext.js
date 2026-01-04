import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import useCartWishlistContext from "./CartWishlistContext";

const CheckoutContext = createContext();
const useCheckoutContext = () => useContext(CheckoutContext)
export default useCheckoutContext;

export function CheckoutContextProvider({children}){

  const [selectAddress, setSelectAddress] = useState(null);
  const [allAddress, setAllAddress] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
    
  const {cartProducts, price, discount, total} = useCartWishlistContext();
  const {removeFromCart, handleCartDeletion} = useCartWishlistContext();

  const navigate = useNavigate();

  const {
    data: fetchedAddress,
    loading,
    error,
  } = useFetch(`${process.env.REACT_APP_API_URL}/api/user/address`);
  console.log(fetchedAddress);

  useEffect(() => {
    if (fetchedAddress && fetchedAddress.Addresses) {
      setAllAddress(fetchedAddress.Addresses);
    }
  }, [fetchedAddress]);


  const handleDelete = async (addressId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/address/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      const data = await response.json();

      const updatedAddresses = allAddress.filter(
        (item) => item._id !== addressId
      );
      setAllAddress(updatedAddresses);
    } catch {
      alert("Error occurred while trying to delete the address. Try again");
    }
  };


  const handleOrder = async () => {
    if (selectAddress === null) {
      alert("Select address for delivery");
      return;
    }
  
    console.log(selectAddress);
    setOrderPlaced(true);
    const items = cartProducts.map((prod) => {
      return {
        name: prod.name,
        imageUrl: prod.imageUrl,
        quantity: prod.cartQuantity,
        price: (
          prod.price -
          (prod.price * prod.discountPercentage) / 100
        ).toFixed(2),
      };
    });
    const payload = {
      items: items,
      totalAmount: total.toFixed(2),
      discountedAmount: discount.toFixed(2),
      deliveryAddress: selectAddress,
    };

    console.log(payload);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

       await handleCartDeletion();

      setTimeout(() => {
        navigate("/user");
      }, 1500);
    } catch {
      alert("Error while trying to place order");
      return;
    }
    // navigate("/user")
  };

  return <CheckoutContext.Provider value = {{selectAddress, setSelectAddress, orderPlaced, setOrderPlaced, allAddress
  , setAllAddress, handleDelete, handleOrder, loading, error}}>
    {children}
  </CheckoutContext.Provider>
    

}
