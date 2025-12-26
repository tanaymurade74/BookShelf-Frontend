import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from './components/HomePage';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import CheckoutPage from './components/CheckoutPage';
import AddAddress from './components/AddAddress';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
        <Route path = "/" element = {<HomePage/>} />
        <Route path = "/products/category/:categoryName" element = {<ProductListing/>}/>
        <Route path = "/product/:productId" element = {<ProductDetail/>}/>
        <Route path = "/products/cart" element = {<Cart/>}/>
        <Route path = "/products/wishlist" element = {<Wishlist/>}/>
        <Route path = "/checkout" element = {<CheckoutPage/>}/>
        <Route path = "/addAddress" element = {<AddAddress/>}/>
        <Route path = "/user" element = {<UserProfile/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
