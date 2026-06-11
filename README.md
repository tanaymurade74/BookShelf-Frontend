# BookShelf – Frontend

An online bookstore where you can browse books by category, search the catalog, view details, manage a cart and wishlist, and check out with a saved delivery address. Built with React, React Router, and Bootstrap, backed by a REST API.

## Live Demo

[Live Demo](https://book-shelf-frontend-ym5b.vercel.app/)

## Quick Start

```bash
git clone https://github.com/tanaymurade74/BookShelf-Frontend.git
cd BookShelf-Frontend
npm install
```

Create a `.env` file in the project root, pointing at the backend:

```env
REACT_APP_API_URL=http://localhost:3001
```

> Replace with your deployed [backend](https://github.com/tanaymurade74/BookShelf-Backend) URL in production (e.g. `https://book-shelf-backend-i1xg.vercel.app`).

Then start the app:

```bash
npm start
```

## Technologies

* React JS
* React Router
* Bootstrap
* React Toastify
* Create React App

## Features

**Home**

* Landing page with featured books and category navigation

**Product Listing**

* Browse products by category
* Search the catalog by title
* Filter and sort the listing

**Product Details**

* View full book details, price, rating, and description
* Add to cart or wishlist from the details page

**Cart & Wishlist**

* Add and remove items, adjust quantities
* Move items between cart and wishlist

**Checkout**

* Select or add a delivery address
* Place an order and see an order confirmation

**User Profile**

* Manage saved addresses and view past orders

**General**

* Toast notifications for real-time feedback on actions

## API Reference

This app consumes the BookShelf backend REST API. The base URL is read from `REACT_APP_API_URL`, and all endpoints are prefixed with `/api`.

### GET /api/products · GET /api/products/category/:categoryName · GET /api/product/search/:searchTerm
Fetch the catalog, filter by category, or search by title.

### GET /api/products/:productId
Fetch a single product's details.

### POST /api/products/:productName
Update a product to add/remove it from the cart or wishlist, or change quantity.

### GET /api/products/cart/true · GET /api/products/wishlist/true
Fetch the current cart and wishlist contents.

### GET /api/user/address · POST /api/user/address · POST /api/user/orders
Manage delivery addresses and place orders at checkout.

> Full endpoint list: see the [backend repository](https://github.com/tanaymurade74/BookShelf-Backend).
