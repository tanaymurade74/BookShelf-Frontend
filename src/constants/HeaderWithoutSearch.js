
import { NavLink } from "react-router-dom"
import useCartWishlistContext from "../context/CartWishlistContext";
const HeaderWithoutSearch = () => {
  const {cartItems, wishlistItems} = useCartWishlistContext();

   return  <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-danger fst-italic" to="/">
            <h3>BookShelf</h3>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <NavLink
                  className="nav-link active "
                  aria-current="page"
                  to="/products/cart"
                >
                  <img className = "img-fluid" style ={{height: "50px", objectFit: "cover"}}
                   src = "https://imgs.search.brave.com/SJG3LLS_kw2B4iTuld9VtXvuTy7l5vI4qd37w58psuw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDQv/MzMzLzMxNC9zbWFs/bC9mbHlpbmctc2hv/cHBpbmctY2FydC1n/bHlwaC1pY29uLWZh/c3QtcHVyY2hhc2Vz/LXF1aWNrLW9ubGlu/ZS1zaG9wcGluZy1z/aWxob3VldHRlLXN5/bWJvbC1uZWdhdGl2/ZS1zcGFjZS1pc29s/YXRlZC1pbGx1c3Ry/YXRpb24tdmVjdG9y/LmpwZw" />
                  <span style = {{verticalAlign: "top", marginLeft: "-5px", color: "purple"}}>{cartItems}</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products/wishlist">
                  <img className = "img-fluid" style ={{height: "50px", objectFit: "cover"}}
                  src = "https://imgs.search.brave.com/EyFZofMWSc24WNusWNz_9SVgULO1vPVaCmNP5NMotSs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTEv/NjE0LzEwNC9zbWFs/bC93aXNobGlzdC1p/Y29uLXdpc2gtbGlz/dC1pY29uLXN5bWJv/bC1zaWduLWZyZWUt/dmVjdG9yLmpwZw"/>
                  <span style = {{verticalAlign: "top", marginleft: "-5px", color: "red" }}>{wishlistItems}</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/user">
                  <img className = "img-fluid" style ={{height: "50px", objectFit: "cover"}}
                  src = "https://imgs.search.brave.com/W0rThKMN88Gt0xEG5hx_ZupIfeK6QhqpQc7kfX2rCaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/aWNvbnM4LmNvbS9z/dGlja2Vycy8xMjAw/L3VzZXItbWFsZS1j/aXJjbGUuanBn"/>
                </NavLink>
              </li>
             
            </ul>

          </div>
          
        </div>
      </nav>
    </div>

}

export default HeaderWithoutSearch;