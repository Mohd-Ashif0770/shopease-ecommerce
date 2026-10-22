# 🛍️ ShopEase

**An online shopping website, built from scratch.**

ShopEase is an e-commerce web app where customers will be able to browse and buy products, and admins will be able to manage the store. Right now, the first big piece is finished: a **safe and complete sign-up and login system**.

---

## 📖 What is this project?

Every online store needs a way for people to create an account and log in securely. That is what is ready today. The shopping features (products, cart, payments) are planned next.

---

## ✨ What works today

| Feature | What it means for the user |
| :--- | :--- |
| **Create an account** | Sign up with your name, email, and password. |
| **Email verification** | We email you a 6-digit code to confirm the email is really yours. |
| **Log in** | Sign in with email and password. A "Remember me" option keeps you signed in for 7 days. |
| **Sign in with Google** | Log in with one click using your Google account. |
| **Forgot password** | Get a code by email, then set a new password. |
| **Stay signed in safely** | You are logged in without having to enter your password again and again. |

---

## 🔒 How we keep accounts safe

- **Passwords are never stored as plain text.** They are scrambled so nobody can read them, even if the database is leaked.
- **Email codes are scrambled too** and expire after a short time.
- **Protection against hackers guessing passwords.** Too many wrong attempts are blocked for a while.
- **Strong password rules** are checked before an account is created.
- **Automatic cleanup.** Old, unused email codes are deleted regularly so the system stays tidy.

---

## 🗺️ What's coming next

- [x] Sign up, login, Google login, password reset ✅ *(done)*
- [ ] Product catalog (categories, brands, search, filters)
- [ ] Shopping cart and wishlist
- [ ] Checkout, addresses, and online payments
- [ ] Order placement, invoices, and tracking
- [ ] Admin dashboard (manage products, orders, and sales reports)

---

## 🧰 Built with (for developers)

| Part | Tools used |
| :--- | :--- |
| **Website (frontend)** | React 19, Vite, Tailwind CSS, Redux Toolkit |
| **Server (backend)** | Node.js, Express 5 |
| **Database** | MySQL |
| **Fast temporary storage** | Redis (running in Docker) |
| **Emails** | Nodemailer |
| **Login** | JWT tokens, Google Sign-In |

---

## 🚀 How to run it on your computer

### What you need first
- Node.js (version 20 or newer)
- MySQL (version 8 or newer)
- Docker (used to run Redis)

### Steps

**1. Download the project**
```bash
git clone https://github.com/Mohd-Ashif0770/shopease-ecommerce.git
cd shopease-ecommerce
```

**2. Start Redis**
```bash
docker-compose up -d
```

**3. Set up the backend**
```bash
cd backend
npm install
```
Create a file named `.env` inside the `backend` folder (see the settings below), then run:
```bash
npm run db:init
npm run dev
```
The server will start at `http://localhost:5000`.

**4. Set up the frontend**

Open a new terminal window:
```bash
cd frontend
npm install
```
Create a file named `.env` inside the `frontend` folder (see below), then run:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## ⚙️ Settings files

### `backend/.env`
```env
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=shopease

# Email sending
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com

# Secret keys (use your own long, random values)
OTP_SECRET=your_secret_key
JWT_SECRET=your_secret_key
JWT_ACCESS_EXPIRES_IN=15m

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# Google login
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## 🔌 Available API endpoints (for developers)

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `GET` | `/health` | Check that the server is running |
| `POST` | `/auth/register` | Create an account and send a code |
| `POST` | `/auth/verify-otp` | Confirm the email code |
| `POST` | `/auth/resend-otp` | Send the code again |
| `POST` | `/auth/login` | Log in |
| `POST` | `/auth/google` | Log in or sign up with Google |
| `POST` | `/auth/refresh` | Get a fresh login token |
| `POST` | `/auth/logout` | Log out |
| `GET` | `/auth/profile` | Get the logged-in user's details *(login required)* |
| `POST` | `/auth/forgot-password` | Ask for a password reset code |
| `POST` | `/auth/verify-reset-otp` | Check the reset code |
| `POST` | `/auth/reset-password` | Set a new password |

---

## 📁 Project layout

```text
ShopEase/
├── docker-compose.yml   # Runs Redis
├── backend/             # The server (logic, database, emails, security)
└── frontend/            # The website users see and click on
```

---

## 📄 License

Licensed under the [ISC License](LICENSE).