import { Link, useNavigate, useLocation } from "react-router-dom"
import Footer from "../constants/Footer";
import useAddressContext from "../context/AddressContext";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
const AddAddress = () => {
    
    const {addressToUpdate, setBlock, setCity, setPincode, setState
        , setStreet, handleSubmit, block, city, street, pincode, state} = useAddressContext();
  
    return <>
    <HeaderWithoutSearch/>
    <div className="container p-3">
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
    <Footer/>
    </>
}

export default AddAddress;