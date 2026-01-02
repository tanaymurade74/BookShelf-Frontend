import { createContext, useContext, useState } from "react";
import useFetch from "../useFetch";
import useCheckoutContext from "./CheckoutContext";
const UserProfileContext = createContext();
const useUserProfileContext = () => useContext(UserProfileContext);
export default useUserProfileContext;

export function UserProfileProvider({ children }) {
  const { allAddress } = useCheckoutContext();
  const [viewAddress, setViewAddress] = useState(false)

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/api/user/orders`
  );
  console.log(data);

  const userDetails = {
    name: "User1",
    email: "abc@mail.com",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGOXfXTU8aFxFIxmWNUoMfq690PSezjg94Q&s",
    phone: "+45999999",
  };

  

  return (
    <UserProfileContext.Provider
      value={{ data, loading, error, userDetails, allAddress, viewAddress, setViewAddress }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}
