# 📊 Full-Stack CRM Management System

A full-stack CRM (Customer Relationship Management) system built with **Spring Boot**, **React**, and **MYSQL**, featuring secure JWT authentication, role-based access control, real-time WebSocket alerts, and responsive UI.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login with **JWT**
- **BCrypt** password hashing
- Role-based access: `ADMIN`, `STAFF`
- Frontend role-based UI control using `jwt-decode`

### 📦 Inventory Management
- Admins can **add** and **update stock**
- Staff can **view inventory**
- Each item has a `threshold` value to trigger low stock alerts

### 📋 Order Management
- Staff can place orders on available inventory
- Stock auto-updates on successful order
- Admins and Staff can view all orders

### 🔔 Real-Time Stock Alerts
- WebSocket-based stock alert system
- Alerts trigger when stock drops below the set threshold
- Real-time updates shown in browser

---

## 🧰 Tech Stack

| Layer       | Tech Used                          |
|-------------|------------------------------------|
| **Frontend**    | React, Axios, React Router DOM     |
| **Backend**     | Spring Boot, Spring Security, JWT  |
| **Database**    | PostgreSQL                         |
| **Real-time**   | WebSocket (`spring-websocket`)     |
| **Styling**     | CSS, Background image              |
| **Auth**        | JWT, BCrypt Password Encoding      |

---

## ⚙️ How It Works

### 👤 Roles
- `ADMIN`: Manage inventory, view all orders
- `STAFF`: Place orders, view inventory & orders

### 📦 Inventory API
- `GET /api/inventory` → Admin & Staff
- `POST /api/inventory` → Admin only
- `PUT /api/inventory/{id}/updateStock` → Admin only

### 🧾 Order API
- `POST /api/order` → Staff only
- `GET /api/order` → Admin & Staff

### 🔄 WebSocket
- WebSocket endpoint: `/stock-alerts`
- Triggered when stock quantity < threshold

---
### 📁 Project Structure

crm-backend/
├── controller/
├── service/
├── model/
├── security/
└── websocket/

crm-frontend/
├── pages/
├── components/
├── hooks/
└── utils/
