# 🪡 Balaji Handlooms — Handloom Sarees E-Commerce Platform

> A full-stack e-commerce web application built to bring authentic Indian handloom sarees from village artisans to customers across the country — digitizing a traditional B2B handloom business into a modern online storefront.

---

<!-- Replace the path below once you upload your screenshot -->
<!-- ![Balaji Handlooms Home](assets/screenshots/home.png) -->

---

## 📖 About the Project

**Balaji Handlooms** is a production-level e-commerce platform dedicated to selling authentic handloom sarees online. This project was built to help a traditional handloom business — which previously operated only through bulk B2B wholesale — expand its reach and connect directly with customers across India.

The platform celebrates the craft of Indian weaving by featuring the stories of the village artisans behind every saree, giving customers not just a product, but a connection to the people and process behind it.

---

## ✨ Features

### 🛍️ Customer-Facing
- **Home Page** with Hero Banner, Category Browsing, Featured/Best-Selling Sarees, and Weaver Stories
- **Shop Page** — Full product listing with browsing and filtering
- **Collections** — Silks, Cotton, Festival, New Arrivals
- **Product Detail Page (PDP)** — Variant selection (color/type), multi-image gallery per variant, and Related Products section
- **Our Weavers** — Stories of village artisans with a step-by-step visual journey of how a saree is made
- **Cart** — Guest cart + authenticated user cart with seamless cart merging on login
- **Checkout Flow** — Address selection → Order placement → Order Confirmation page
- **Order History & Order Details** pages for registered users

### 🔐 Authentication & Authorization
- **JWT-based Authentication**
- **Role-Based Access Control (RBAC)** — `USER` and `ADMIN` roles
- Guest users can browse and add to cart; prompted to log in before checkout

### 🛠️ Admin Panel
- Add new products with variants and images
- Edit existing products
- Delete products
- View all products

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind |
| Backend | Spring Boot (Java) |
| Database | PostgreSQL |
| Authentication | JWT (JSON Web Tokens) |
| Authorization | RBAC (Role-Based Access Control) |

---

## 📸 Screenshots

### Home Page
![Home Page](assets/screenshots/Home-1.png)

![Home Page](assets/screenshots/Home-2.png)

![Home Page](assets/screenshots/Home-3.png)

### Collections & Category Browsing
![Collections](assets/screenshots/CategorySection.png)

![Collections](assets/screenshots/ShopByCategory.png)

![Collections](assets/screenshots/FeaturedSection.png)

### Product Detail Page
![Product Detail Page](assets/screenshots/PDP.png)

![Product Detail Page](assets/screenshots/PDP-2.png)

![Product Detail Page](assets/screenshots/relatedProducts.png)

### Our Weavers Section
![Our Weavers](assets/screenshots/OurWeavers.png)

### Cart
![Cart](assets/screenshots/Cart.png)

### Checkout
![Checkout](assets/screenshots/checkout.png)

### Order Info
![Order Confirmation](assets/screenshots/orderConfirmation.png)

![Order Confirmation](assets/screenshots/OrderSuccess.png)

![Order Confirmation](assets/screenshots/OrderHistory.png)

![Order Confirmation](assets/screenshots/OrderDetailsPage.png)

### Admin Panel
![Admin Panel](assets/screenshots/AdminDashboard.png)

![Admin Panel](assets/screenshots/AdminProducts.png)

![Admin Panel](assets/screenshots/CreateProducts-1.png)

![Admin Panel](assets/screenshots/CreateProducts-2.png)

![Admin Panel](assets/screenshots/EditProduct.png)

---

## 🗂️ Project Structure

```
balaji-handlooms/
├── frontend/                  # React.js application
│   ├── src/
│   │   ├── components/        # Reusable UI components (Navbar, Hero, etc.)
│   │   ├── pages/             # Page-level components (Home, Shop, PDP, Checkout...)
│   │   ├── context/           # Cart context, Auth context
│   │   ├── services/          # API service calls
│   │   ├── admin/             # Admin Pages
│   │   └── App.jsx
│   └── package.json
│
├── backend/                   # Spring Boot application
│   ├── src/main/java/
│   │   ├── controller/        # REST API controllers
│   │   ├── service/           # Business logic
│   │   ├── repository/        # JPA repositories
│   │   ├── entity/            # Entity classes
│   │   ├── security/          # JWT filter, RBAC config
│   │   ├── config/            # Security, third-party config
│   │   ├── exception/         # Custom exception handling
│   │   └── dto/               # Data Transfer Objects
│   └── pom.xml
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- JavaScript
- Java 17+
- PostgreSQL
- Maven

---

### 🔧 Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/balaji-handlooms.git
cd balaji-handlooms/backend

# 2. Configure the database
# Update src/main/resources/application.properties:
# spring.datasource.url=jdbc:postgresql://localhost:5432/myDB
# spring.datasource.username=your_db_user
# spring.datasource.password=your_db_password

# 3. Run the Spring Boot application
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

---

### 💻 Frontend Setup

```bash
cd balaji-handlooms/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start at `http://localhost:5173`

---

## 🔑 Environment Variables

### Backend — `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/myDB
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update

```

### Frontend — `.env`

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 📡 API Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive JWT |
| `GET` | `/api/products` | Public | Get all products |
| `GET` | `/api/products/{id}` | Public | Get product by ID |
| `GET` | `/api/products/category/{id}` | Public | Get Category wise products by ID |
| `GET` | `/api/products/featured` | Public | Get featured products |
| `GET` | `/api/products/{id}/related` | Public | Get Realted products by ID |
| `POST` | `/api/admin/products` | Admin | Create a product |
| `GET` | `/api/admin/products` | Admin | Get all products |
| `GET` | `/api/admin/products/{id}` | Admin | Get product by ID |
| `PUT` | `/api/admin/products/{id}` | Admin | Update a product |
| `DELETE` | `/api/admin/products/{id}` | Admin | Delete a product |
| `GET` | `/api/cart` | User | Get user cart |
| `POST` | `/api/cart/add` | User/Guest | Add to cart |
| `DELETE` | `/api/cart/item/{id}` | User/Guest | Delete cart item from cart |
| `PUT` | `/api/cart/update` | User/Guest |Update CartItem/Quantity |
| `POST` | `/api/orders` | User | Place an order |
| `GET` | `/api/orders` | User | Get order history |
| `GET` | `/api/orders/{id}` | User | Get order details |
| `POST` | `/api/uploads/images` | Admin | Upload Variant Images by admin |
| `GET` | `/api/address` | User | Get user addresses |
| `POST` | `/api/address` | User | Create new address |

---

## 🧭 Pages & Routing

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/products` | All Products | Public |
| `/products/category/:type` | Filtered Collection | Public |
| `/products/:id` | Product Detail Page | Public |
| `/meet-our-weavers` | Our Weavers | Public |
| `/cart` | Cart | Public |
| `/checkout` | Checkout | Authenticated |
| `/order-success` | Order Confirmation | Authenticated |
| `/orders` | Order History | Authenticated |
| `/orders/:id` | Order Details | Authenticated |
| `/admin` | Admin Dashboard | Admin |
| `/admin/products` | Manage Products | Admin |
| `/admin/products/add` | Create Product | Admin |

---

## 🔮 Upcoming Features

- [ ] Payment gateway integration (Razorpay / Stripe)
- [ ] Admin order management (view, update order status)
- [ ] Search and filter on Shop page
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] SMS / Email order notifications
- [ ] Mobile-responsive improvements

---

## 🌾 Our Weavers

This platform is dedicated to the skilled artisans of our village who pour their craftsmanship into every saree. The **Our Weavers** section tells their stories and showcases the beautiful, painstaking process of handloom weaving — from thread to finished saree — so every customer understands the human effort and heritage behind what they buy.

---

## 🤝 Acknowledgements

This project was built with love and gratitude for a mentor and family friend whose support made education — and this project — possible. Balaji Handlooms is a small way of giving back, by helping a traditional business grow into the digital world.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://www.linkedin.com/in/chandra-sekhar-010028248/)

---

> _"Every saree tells a story. Every thread carries a tradition."_ 🪡
