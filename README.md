# 🛒 E-Commerce Backend — Spring Boot + MySQL

A complete, production-ready REST API backend for an e-commerce platform.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Spring Boot 3.2 |
| Security | Spring Security + JWT |
| Database | MySQL 8+ |
| ORM | Spring Data JPA / Hibernate |
| Build Tool | Maven |
| Java Version | Java 17 |

---

## ⚙️ Setup & Run

### 1. Prerequisites
- Java 17+
- MySQL 8+
- Maven 3.8+

### 2. Database Setup
```sql
CREATE DATABASE ecommerce_db;
```

### 3. Configure application.properties
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### 4. Run the project
```bash
mvn spring-boot:run
```

Server starts at: `http://localhost:8080`

---

## 📁 Project Structure

```
src/main/java/com/ecommerce/
├── config/
│   └── SecurityConfig.java          # Spring Security + JWT config
├── controller/
│   ├── AuthController.java          # Register / Login
│   ├── ProductController.java       # Product CRUD
│   ├── CategoryController.java      # Category CRUD
│   ├── CartController.java          # Cart management
│   └── OrderController.java         # Order placement & tracking
├── dto/
│   ├── AuthDto.java                 # Register/Login request & response
│   ├── ProductDto.java              # Product create/update
│   └── OrderDto.java                # Order request & response
├── entity/
│   ├── User.java                    # User with roles
│   ├── Product.java                 # Product with stock
│   ├── Category.java                # Product categories
│   ├── Cart.java + CartItem.java    # Shopping cart
│   └── Order.java + OrderItem.java  # Orders
├── exception/
│   ├── GlobalExceptionHandler.java  # Centralized error handling
│   ├── ResourceNotFoundException.java
│   └── BadRequestException.java
├── repository/                      # JPA repositories
├── security/
│   ├── JwtUtil.java                 # JWT generate/validate
│   ├── JwtAuthFilter.java           # JWT request filter
│   └── CustomUserDetailsService.java
└── service/
    ├── AuthService.java
    ├── ProductService.java
    ├── CategoryService.java
    ├── CartService.java
    └── OrderService.java
```

---

## 🔐 Authentication

All protected endpoints require:
```
Authorization: Bearer <your_jwt_token>
```

### Roles
| Role | Access |
|---|---|
| `CUSTOMER` | Cart, Orders, view Products |
| `ADMIN` | Full access + manage Products, Categories, update Order status |
| `SELLER` | (Extendable) |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, get JWT |

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "phone": "9876543210",
  "address": "123 Street, City"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "CUSTOMER"
}
```

---

### Products
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/products` | Public | All active products |
| GET | `/api/products/{id}` | Public | Product by ID |
| GET | `/api/products/category/{id}` | Public | Products by category |
| GET | `/api/products/search?keyword=` | Public | Search products |
| POST | `/api/products` | ADMIN | Create product |
| PUT | `/api/products/{id}` | ADMIN | Update product |
| DELETE | `/api/products/{id}` | ADMIN | Soft delete product |

---

### Categories
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/categories` | Public | All categories |
| GET | `/api/categories/{id}` | Public | Category by ID |
| POST | `/api/categories` | ADMIN | Create category |
| PUT | `/api/categories/{id}` | ADMIN | Update category |
| DELETE | `/api/categories/{id}` | ADMIN | Delete category |

---

### Cart (requires auth)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart` | View my cart |
| POST | `/api/cart/add/{productId}?quantity=2` | Add item |
| PUT | `/api/cart/update/{productId}?quantity=3` | Update quantity |
| DELETE | `/api/cart/remove/{productId}` | Remove item |

---

### Orders (requires auth)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/orders/place` | Customer | Place order from cart |
| GET | `/api/orders` | Customer | My order history |
| GET | `/api/orders/{id}` | Customer | Order details |
| PUT | `/api/orders/{id}/status?status=SHIPPED` | ADMIN | Update order status |

**Place Order:**
```json
POST /api/orders/place
{
  "shippingAddress": "456 Avenue, Mumbai"
}
```

**Order Status Flow:**
```
PENDING → CONFIRMED → SHIPPED → DELIVERED
                              → CANCELLED
```

---

## 🗄️ Database Schema

```sql
users        → id, name, email, password, phone, address, role
categories   → id, name, description, image_url
products     → id, name, description, price, stock, brand, image_url, active, category_id
carts        → id, user_id
cart_items   → id, cart_id, product_id, quantity
orders       → id, user_id, total_amount, status, payment_status, shipping_address
order_items  → id, order_id, product_id, quantity, price
```

---

## 🧪 Testing with Postman

1. Register → POST `/api/auth/register`
2. Login → POST `/api/auth/login` → copy token
3. Set header: `Authorization: Bearer <token>`
4. Add products (as ADMIN) → POST `/api/products`
5. Add to cart → POST `/api/cart/add/1?quantity=2`
6. Place order → POST `/api/orders/place`

---

## 🔧 Extend This Project

- [ ] Add Razorpay / Stripe payment integration
- [ ] Add product reviews & ratings
- [ ] Add image upload (Cloudinary / S3)
- [ ] Add email notifications (JavaMailSender)
- [ ] Add pagination to product listings
- [ ] Add coupon/discount system
- [ ] Deploy to AWS / Railway / Render
