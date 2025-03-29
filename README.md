# 📊 Full-Stack CRM Management System

A full-stack CRM (Customer Relationship Management) system built with **Spring Boot**, **React**, and **MySQL**, featuring secure JWT authentication, role-based access control, real-time WebSocket alerts, and a responsive UI.

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

| Layer         | Tech Used                          |
|---------------|------------------------------------|
| **Frontend**  | React, Axios, React Router DOM     |
| **Backend**   | Spring Boot, Spring Security, JWT  |
| **Database**  | MySQL                              |
| **Real-time** | WebSocket (`spring-websocket`)     |
| **Styling**   | CSS, Custom background             |
| **Auth**      | JWT, BCrypt                        |

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

## 🛠️ Setup Instructions

---

### 🔧 Backend (Spring Boot)

1. Clone this repo  
2. Navigate to the `crm-backend` folder  
3. Set up `application.properties`:

```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/crm_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_user
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=your_secret_key
jwt.expirationMs=86400000
```

---

### ▶️ Run the Server

```bash
./mvnw spring-boot:run
```

---

### 💻 Frontend (React)

1. Navigate to the `crm-frontend` folder  
2. Run:

```bash
npm install
npm start
```

---

### 📁 Project Structure

```bash
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
```

---

