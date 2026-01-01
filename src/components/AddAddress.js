import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

const AddAddress = () => {
    
  
    const navigate = useNavigate();
    const location = useLocation();

    const addressToUpdate = location.state?.address;
    console.log(addressToUpdate);


     
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

    return <div className="container p-3">
        <h2>Address Form</h2>
        <form onSubmit = {handleSubmit} className="form-control">
            <label>Block: </label><br/>
            <input required type = "text" value = {block} onChange = {(event) => setBlock(event.target.value)}/><br/><br/>
            <label>Street: </label><br/>
            <input required  type = "text" value = {street} onChange = {(e) => setStreet(e.target.value)}/><br/><br/>
            <label>City: </label><br/>
            <input required type= "text" value = {city} onChange = {(e) => setCity(e.target.value)}/><br/><br/>
            <label>State: </label><br/>
            <input required type = "text" value = {state} onChange = {(e) => setState(e.target.value)}/><br/><br/>
            <label>Pincode: </label><br/>
            <input required type = "Number" value = {pincode} onChange = {(e) => setPincode(e.target.value)}/><br/><br/>
            <button type = "submit" className="btn btn-primary">{`${addressToUpdate? "Update Address": "Add Address"}`}</button>&nbsp; &nbsp;
            <Link className="btn btn-warning" to = "/checkout">Back To Checkout</Link>
            
        </form>
    </div>
}

export default AddAddress;