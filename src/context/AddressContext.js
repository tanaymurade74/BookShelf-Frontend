import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const AddressContext = createContext();
const useAddressContext = () => useContext(AddressContext);

export default useAddressContext;


export function AddressProvider({children}){

    const navigate = useNavigate();
    const location = useLocation();

    // const addressToUpdate = location.state?.address;
    // console.log(addressToUpdate);


    const [addressToUpdate, setAddressToUpdate] = useState(location.state?.address || ""); 
    const[block, setBlock] = useState(addressToUpdate?.block || "" )
    const[street, setStreet] = useState(addressToUpdate?.street || "")
    const [city, setCity] = useState(addressToUpdate?.city || "")
    const [state, setState] = useState(addressToUpdate?.state || "")
    const [pincode, setPincode] = useState(addressToUpdate?.pincode );
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            block, 
            street,
            city,
            state,
            pincode
        }

        try{
            const url = addressToUpdate? `${process.env.REACT_APP_API_URL}/api/user/address/${addressToUpdate._id}`:
                                            `${process.env.REACT_APP_API_URL}/api/user/address`;

            const response = await  fetch(url ,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            )

            const data = await response.json();
        }catch{
            alert("Error occurred while trying to add the address. Try again")
        }
        
        e.target.reset();
        navigate("/checkout")
    }


    return <AddressContext.Provider value = {{addressToUpdate, setBlock, setCity, setPincode
    , setState, setStreet, handleSubmit, block, city, street, pincode, state }}>
        {children}
    </AddressContext.Provider>

}
