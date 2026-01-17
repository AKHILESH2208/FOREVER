🛍️ FOREVER – Full‑Stack E‑Commerce Platform
A modern, full‑stack e‑commerce website built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features secure authentication, role‑based access control, product management, and a seamless checkout experience.

Live Demo: [Add deployment URL if deployed]
GitHub: https://github.com/AKHILESH2208/FOREVER

✨ Features
For Customers
🔍 Browse Products – Search, filter by category, and view detailed product information

🛒 Shopping Cart – Add/remove items, update quantities, persistent cart state

💳 Secure Checkout – Address entry, order summary, and order confirmation

👤 User Accounts – Register, login, view order history and profile

🔐 JWT Authentication – Secure token-based auth with HTTP-only cookies

For Administrators
📦 Product Management – Create, update, delete products with images and pricing

📊 Inventory Control – Track stock levels and manage availability

📋 Order Management – View customer orders and update order status

👥 User Management – Manage user roles and permissions

Technical Highlights
Role-based Access Control – Separate user and admin routes

RESTful APIs – Clean, modular backend architecture

Responsive UI – Mobile-friendly design across devices

State Management – Context API or Redux for client-side state

Password Security – bcrypt hashing for user passwords

🛠️ Tech Stack
Layer	Technology
Frontend	React.js, React Router, Tailwind CSS (or your CSS)
Backend	Node.js, Express.js
Database	MongoDB (with Mongoose ODM)
Authentication	JWT, bcrypt
API Testing	Postman
Deployment	[Specify your hosting: Vercel/Netlify, Render/Railway, etc.]
📋 Prerequisites
Node.js (LTS v16+)

npm or yarn

MongoDB (local instance or MongoDB Atlas cloud)

Git

🚀 Getting Started
1. Clone the Repository
bash
git clone https://github.com/AKHILESH2208/FOREVER.git
cd FOREVER
2. Install Dependencies
Backend:

bash
cd backend
npm install
Frontend:

bash
cd ../frontend
npm install
3. Configure Environment Variables
Create a .env file in the backend directory:

text
# MongoDB
MONGO_URI=mongodb://localhost:27017/forever
# or MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/forever

# Server Port
PORT=5000

# JWT Secret
JWT_SECRET=your_super_secret_key_change_this

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# Optional: Payment Gateway Keys
# STRIPE_SECRET_KEY=sk_test_...
# RAZORPAY_KEY_SECRET=...
4. Run the Application
Development Mode:

bash
# Terminal 1: Start Backend
cd backend
npm run dev     # Uses nodemon for auto-reload

# Terminal 2: Start Frontend
cd frontend
npm start       # React dev server (http://localhost:3000)
The application will be available at http://localhost:3000
📁 Project Structure
text
FOREVER/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & environment config
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Auth, error handling
│   │   ├── models/           # MongoDB schemas (User, Product, Order)
│   │   ├── routes/           # API routes
│   │   └── utils/            # Helper functions
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components (Home, Product, Cart, etc.)
│   │   ├── context/          # State management (Cart, Auth)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # API client, helpers
│   │   └── styles/           # CSS/Tailwind
│   ├── index.js
│   └── package.json
│
├── admin/
│   ├── src/
│   │   ├── components/       # Admin-specific UI components
│   │   ├── pages/            # Admin pages (Dashboard, Products, Orders, Users)
│   │   ├── context/          # Admin state management
│   │   ├── utils/            # Admin API client
│   │   └── styles/           # Admin styling
│   ├── index.js
│   └── package.json
│
└── README.md
🛠️ Setup with Admin Panel
Install All Dependencies
bash
# Backend
cd backend
npm install

# Frontend (Customer)
cd ../frontend
npm install

# Admin Dashboard
cd ../admin
npm install
Run All Services
bash
# Terminal 1: Backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2: Frontend - Customer (http://localhost:3000)
cd frontend
npm start

# Terminal 3: Admin Panel (http://localhost:3001)
cd admin
npm start
👨‍💼 Admin Dashboard
The admin folder contains a separate React application for store management.

Admin Features
📦 Product Management – Create, read, update, delete products

📊 Inventory Control – Monitor stock levels

📋 Order Management – View and update customer orders

👥 User Management – Manage customer accounts and roles

📈 Analytics Dashboard – Sales insights, revenue tracking (optional)

Admin Routes (Protected)
/admin/login – Admin login page

/admin/dashboard – Analytics overview

/admin/products – Product CRUD operations

/admin/orders – Order management

/admin/users – User management

Admin Authentication
Admin panel uses JWT tokens with role-based access:

javascript
// Only users with "admin" role can access
app.use('/api/admin', authMiddleware, adminMiddleware);
🚀 Deployment
Frontend (Customer App)
bash
cd frontend
npm run build
# Deploy 'build' folder to Vercel/Netlify
Admin Panel
bash
cd admin
npm run build
# Deploy 'build' folder to separate Vercel/Netlify subdomain
# e.g., admin.yourdomain.com
Backend
Deploy to Render, Railway, or Heroku (same as before)

Ensure both frontend and admin origins are whitelisted in CORS
