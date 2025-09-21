

# NextJS Login Fullstack

A fullstack authentication prototype built with **Next.js**, **MongoDB**, and **JWT**. This project includes **signup**, **login**, **email notifications**, and **JWT-based authentication** using cookies or `localStorage`.

---

## Features

* User **Signup** and **Login**.
* Passwords hashed securely using **bcrypt**.
* Authentication using **JWT tokens**.
* Tokens can be stored in **httpOnly cookies** or `localStorage`.
* MongoDB integration with **Mongoose**.
* **Email notifications** using **Nodemailer** (e.g., welcome emails, password reset emails).
* Clean, responsive **Next.js frontend** with Framer Motion animations.
* Prototype ready for fullstack development and testing.

---

## Tech Stack

* **Frontend:** Next.js 13+, React, TailwindCSS, Framer Motion, React Hot Toast
* **Backend:** Next.js API Routes
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT, bcryptjs
* **Email:** Nodemailer
* **Version Control:** Git & GitHub

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/A20archi/NextJS_Login_Fullstack.git
cd NextJS_Login_Fullstack
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

4. Run the development server:

```bash
npm run dev
```

---

## Usage

* Navigate to `/signup` to create a new account.
* Navigate to `/login` to log in.
* On successful login, the JWT is stored in either **localStorage** or **httpOnly cookies**.
* Email notifications are sent using Nodemailer (e.g., after signup).

---

## License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

---

