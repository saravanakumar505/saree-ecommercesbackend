# Pretex – Premium Textiles E-Commerce

Full-stack e-commerce application built with Node.js, Express, MongoDB, and Vanilla HTML/CSS/JS.

## Features

- **Storefront**: Browse products, filter by category/color/price, search.
- **Cart System**: Add to cart, update quantities, remove items.
- **Checkout**: Simple order placement.
- **User Accounts**: Register, Login, Order History.
- **Admin Dashboard**: Manage products, Manage orders, View sales stats.
- **Security**: JWT Authentication, Password Hashing.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

## Prerequisities

- Node.js installed
- MongoDB installed and running locally on port 27017 (or update .env)

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Review `.env` file. Default configuration:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/pretex
    JWT_SECRET=pretex_premium_secret_key_12345
    ```

3.  **Seed Database**
    Populate the database with sample products and users.
    ```bash
    npm run seed
    ```
    
    **Default Users created:**
    - **Admin**: `admin@pretex.com` / `password123`
    - **Customer**: `customer@pretex.com` / `password123`

4.  **Run Application**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

## API Endpoints

- `GET /api/products` - List products
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user
- `GET /api/cart` - Get user cart
- `POST /api/orders` - Place order

## License

ISC
