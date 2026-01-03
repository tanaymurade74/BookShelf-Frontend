import { Link } from "react-router-dom";
import HeaderWithoutSearch from "../constants/HeaderWithoutSearch";
import Footer from "../constants/Footer";

const HomePage = () => {
  const CategoryCard = ({ title, image, link }) => {
    return (
      <div className="col-6 col-md-4 d-flex align-items-stretch col-lg-2 text-center mt-2">
        <Link to={link}>
          <div className="card d-block h-100">
            <div className="card-img d-block h-100 " style = {{overflow: "hidden"}}>
              <img
                className="img-fluid "
                style={{
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                  objectFit: "cover",
                  transform: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
                 onMouseMove={(e) => (e.target.style.transform = "scale(1.2)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                src={image}
              />
            </div>
            <div
              className="position-absolute w-100 d-flex align-items-end justify-content-center"
              style={{
                bottom: 0,
                left: 0,
                height: "50%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              }}
            >
              <h5 className="text-white mb-3 fw-bold">{title}</h5>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
   <div>
      <HeaderWithoutSearch />
 <div className="container mt-4">
      <div className="bg-light py-5 mb-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Discover Your Next Read</h1>
          <p className="lead text-muted mb-4">
            Explore curated collection of books across genres.
          </p>
          <Link
            to="/products/category/Fiction"
            className="btn btn-dark btn-lg px-5 rounded-pill"
          >
            Explore Collections
          </Link>
        </div>
      </div>

      <div>
        <div className="row mt-4">
          <CategoryCard
            title="Poetry"
            image="https://covers.libro.fm/9780063429536_1120.jpg"
            link="/products/category/poetry"
          />
          <CategoryCard
            title="Fiction"
            image="https://m.media-amazon.com/images/I/612KmKeEYEL._AC_UF1000,1000_QL80_.jpg"
            link="/products/category/fiction"
          />
          <CategoryCard
            title="Non-fiction"
            image="https://m.media-amazon.com/images/I/71m+kC4vOxL._UF1000,1000_QL80_.jpg"
            link="/products/category/non-fiction"
          />
          <CategoryCard
            title="Art & Music"
            image="https://c.files.bbci.co.uk/1260/production/_108240740_beatles-abbeyroad-index-reuters-applecorps.jpg"
            link="/products/category/art & music"
          />
          <CategoryCard
            title="History"
            image="https://m.media-amazon.com/images/I/71vkxIftlzL._AC_UF1000,1000_QL80_.jpg"
            link="/products/category/history"
          />
          <CategoryCard
            title="Classic"
            image="https://m.media-amazon.com/images/I/91U1UDM3cnL._UF1000,1000_QL80_.jpg"
            link="/products/category/classic"
          />
        </div>
      </div>
     
    </div>
     <Footer/>
    </div>
  );
};

export default HomePage;
