
import { useState } from "react"
const UpdateAddress = () =>{
     const[block, setBlock] = useState("")
    const[street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState(0);
    const navigate = useNavigate();

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
            const response = await  fetch(`http://localhost:3001/api/user/address`,
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
        <form onSubmit = {handleSubmit} className="form-control">
            <label>Block: </label><br/>
            <input required type = "text" onChange = {(event) => setBlock(event.target.value)}/><br/><br/>
            <label>Street: </label><br/>
            <input required  type = "text" onChange = {(e) => setStreet(e.target.value)}/><br/><br/>
            <label>City: </label><br/>
            <input required type= "text" onChange = {(e) => setCity(e.target.value)}/><br/><br/>
            <label>State: </label><br/>
            <input required type = "text" onChange = {(e) => setState(e.target.value)}/><br/><br/>
            <label>Pincode: </label><br/>
            <input required type = "Number" onChange = {(e) => setPincode(e.target.value)}/><br/><br/>
            <button type = "submit" className="btn btn-primary">Update Address</button>&nbsp; &nbsp;
            <Link className="btn btn-warning" to = "/checkout">Back To Checkout</Link>
            
        </form>
    </div>
}