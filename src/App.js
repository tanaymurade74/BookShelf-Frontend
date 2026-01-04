import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductListing from "./components/ProductListing";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import CheckoutPage from "./components/CheckoutPage";
import AddAddress from "./components/AddAddress";
import UserProfile from "./components/UserProfile";
import { ProductProvider } from "./context/ProductContext";
import { ProductDetailProvider } from "./context/ProductDetailContext";
import { CartWishlistProvider } from "./context/CartWishlistContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  CheckoutContextProvider } from "./context/CheckoutContext";
import { AddressProvider } from "./context/AddressContext";
import { UserProfileProvider } from "./context/UserProfileContext";

function App() {
  return (
    <CartWishlistProvider>

      <div >
        <Router>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products/category/:categoryName"
              element={
                <ProductProvider>
                  <ProductListing />
                </ProductProvider>
              }
            />
            <Route
              path="/product/:productId"
              element={
                <ProductDetailProvider>
                  <ProductDetail />
                </ProductDetailProvider>
              }
            />
            <Route path="/products/cart" element={<Cart />} />
            <Route path="/products/wishlist" element={<Wishlist />} />
            <Route
              path="/checkout"
              element={
                <CheckoutContextProvider>
                  <CheckoutPage />
                  </CheckoutContextProvider>
              }
            />
            <Route path="/addAddress" element={
              <AddressProvider>
              <AddAddress />
              </AddressProvider>
              } />
            <Route path="/user" element={
              <CheckoutContextProvider>
                <CartWishlistProvider>
              <UserProfileProvider>
              <UserProfile />
              </UserProfileProvider>
              </CartWishlistProvider>
              </CheckoutContextProvider>
              } />
          </Routes>
        </Router>
      </div>
    </CartWishlistProvider>
  );
}

export default App;
