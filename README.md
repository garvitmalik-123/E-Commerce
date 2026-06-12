<div align="center">

<br/>

# ⚡ LUXMART

### *Premium E-Commerce Experience*

<br/>

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)

<br/>

> A full-stack e-commerce platform built with Spring Boot + React + Supabase.  
> Curated product catalog, cart management, order tracking, and a sleek dark UI.

<br/>

---

</div>

## ✦ Preview

<div align="center">

**Products Page**

<img src="screenshots/products.png" width="100%" alt="Products Page"/>

<br/><br/>

**Orders Page** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Login Page**

<img src="screenshots/orders.png" width="49%" alt="Orders Page"/> <img src="screenshots/login.png" width="49%" alt="Login Page"/>

</div>

<br/>

---

## ✦ Overview

LUXMART is a full-stack web application that delivers a premium online shopping experience. Built with **Spring Boot** on the backend and **React** on the frontend, backed by **Supabase (PostgreSQL)** as the cloud database.

<br/>

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router, Axios |
| **Backend** | Java 17, Spring Boot 3, Spring Data JPA |
| **Database** | PostgreSQL via Supabase |
| **Build Tool** | Maven |
| **Styling** | CSS3, Custom Components |

<br/>

## ✦ Features

- 🛍️ **Product Catalog** — Browse 90+ seeded products across multiple categories
- 🛒 **Cart Management** — Add, remove, and update quantities in real-time
- 📦 **Order Tracking** — View all past orders with status and totals
- 🔐 **Authentication** — Register and login with secure sessions
- 🌐 **REST API** — Clean backend API consumed by the React frontend
- ☁️ **Cloud Database** — Supabase-hosted PostgreSQL with persistent data
- 📱 **Responsive UI** — Works across desktop and mobile

<br/>

## ✦ Project Structure

```
Ecommerce/
└── ecommerce/
    ├── screenshots/              # App previews
    ├── src/
    │   └── main/
    │       ├── java/com/luxmart/
    │       │   ├── controller/
    │       │   ├── model/
    │       │   ├── repository/
    │       │   └── service/
    │       └── resources/
    │           └── application.properties
    ├── ecom-frontend/
    │   └── src/
    │       ├── components/
    │       ├── pages/
    │       └── App.js
    └── pom.xml
```

<br/>

## ✦ Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Maven 3.8+
- Supabase account (or local PostgreSQL)

---

### 1 — Clone the Repository

```bash
git clone https://github.com/yourusername/luxmart.git
cd luxmart/ecommerce
```

---

### 2 — Configure the Database

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://<your-supabase-host>:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=<your-password>
spring.jpa.hibernate.ddl-auto=update
```

---

### 3 — Run the Backend

```bash
cd ecommerce
mvn spring-boot:run
```

Backend → `http://localhost:8080`

---

### 4 — Run the Frontend

```bash
cd ecom-frontend
npm install
npm start
```

Frontend → `http://localhost:3000`

<br/>

## ✦ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/{id}` | Get product by ID |
| `GET` | `/api/products/category/{cat}` | Filter by category |
| `POST` | `/api/cart` | Add item to cart |
| `GET` | `/api/cart/{userId}` | Get user's cart |
| `DELETE` | `/api/cart/{itemId}` | Remove cart item |
| `GET` | `/api/orders/{userId}` | Get user's orders |

<br/>

## ✦ Roadmap

- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Product search & filters
- [ ] Wishlist feature
- [ ] Email notifications

<br/>

## ✦ Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

<br/>

---

<div align="center">

Made with ☕ and Java &nbsp;|&nbsp; **LUXMART** &nbsp;|&nbsp; 2026

</div>
