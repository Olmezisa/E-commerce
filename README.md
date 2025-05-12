# 🛒 Full-Stack E-commerce Web Application

A modern, full-featured e-commerce platform built with **Angular** (frontend) and **Spring Boot** (backend), supporting buyers, sellers, and administrators. This system includes secure authentication, product management, role-based dashboards, and Stripe integration for payments.

---

## 📁 Project Structure

- **Frontend:** Angular (SPA with Tailwind CSS)
- **Backend:** Spring Boot (REST APIs, JWT Auth, MySQL, Stripe)
- **Database:** MySQL with Hibernate ORM
- **Authentication:** JWT-based login, refresh, and role management

---

## 🚀 Features

### 👤 Buyer
- Browse, search, and filter products
- View product details and variants
- Add items to cart and place orders
- Stripe payment integration (sandbox)
- Track orders, write reviews, manage favorites

### 🛍️ Seller
- Register via seller form
- Add, edit, and manage products and variants
- Track product statuses and sales
- View analytics and fulfill orders

### 🔧 Admin
- Moderate all users and products
- Approve, ban, or reject seller submissions
- Resolve order/payment issues
- Manage product categories

### 🔓 Guest
- View products and public reviews
- Must log in to add items to cart or place orders

---

## 🛠️ Setup & Configuration

### 📦 Backend (`ecommerce-backend`)
Create a `.env` file in the backend root:

```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_MS=your_expiry
DB_NAME=your_db_name
DB_USER=your_user
DB_PASS=your_pass
STRIPE_SECRET_KEY=your_stripe_key
SERVER_PORT=your_server_port
