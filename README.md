BookShelf

A full‑stack bookstore app to browse, search, add to cart/wishlist, and place orders.
Built with a React frontend, Express/Node backend, MongoDB database.

Quick Start

git clone https://github.com/<your-username>/<your-repo>.git
cd MajorProject
# Backend
cd backend
npm install
npm run dev
# Frontend (new terminal)
cd ../frontend
npm install
npm start

Technologies

React JS
React Router
Node.js
Express
MongoDB (Mongoose)
Fetch API / simple custom hooks


Features

Home
- Displays a list of latest / featured books
- Quick links to categories and top deals

Product Listing
- Category based listing (route: /products or /products/:categoryName)
- Search by title/term (updates URL ?search=term)
- Client-side filters: rating, discount, price sort
- Add to Cart / Add to Wishlist from listing

Product Details
- View full product information (description, rating, price, images)
- Add to Cart / Add to Wishlist from detail page

Cart & Checkout
- View cart items, update quantities, remove items
- Checkout flow posts order to backend (/api/user/orders)

Wishlist
- View and manage wishlist items


API Reference

GET /api/products
- List all products or default listing
Sample Response:
[{ _id, name, price, rating, imageUrl, discountPercentage, ... }, …]

GET /api/products/category/:categoryName
- Products for a specific category
Sample Response:
{ products: [ { _id, name, ... }, ... ] }

GET /api/product/search/:searchTerm
- Search products by term
Sample Response:
{ products: [ { _id, name, ... }, ... ] }

GET /api/products/:productId
- Get product detail
Sample Response:
{ _id, name, description, price, rating, imageUrl, discountPercentage, ... }

POST /api/products/:productName
- Toggle/update product flags (used for inCart / inWishlist updates)
Request body example:
{ inCart: true, cartQuantity: 1 }
Sample Response:
{ success: true, product: { _id, name, inCart, inWishlist, cartQuantity, ... } }

GET /api/user/orders
- Get orders for authenticated user
Sample Response:
[{ _id, items, totals, deliveryAddress, createdAt }, ...]

POST /api/user/orders
- Create a new order (protected)
Request body example:
{ items: [...], deliveryAddress: {...}, totals: {...} }
Sample Response:
{ _id, items, totals, status, createdAt }

Environment

Frontend (.env)
REACT_APP_API_URL=https://book-shelf-backend-i1xg.vercel.app
Backend (.env)
MONGODB=<your-mongodb-connection-string>


