# DevwkStore 🛒

![DevwkStore - Home](https://github.com/user-attachments/assets/a213a78c-b47b-4502-8523-76d7f7080403)

**DevwkStore** is a modern full-stack e-commerce application built with cutting-edge technologies like Next.js 15, React 19, and TypeScript. The project offers a comprehensive shopping experience, including user authentication, product management, shopping cart functionality, integration with payments (Stripe and PayPal), transactional email sending, and a robust administrative dashboard.

> ⚠️ The project is still under active development. Access the current version at: [https://devwkstoree.vercel.app/](https://devwkstoree.vercel.app/)

## 📂 Repository

Source code available at: [https://github.com/wandskk/devwkstore](https://github.com/wandskk/devwkstore)

## 🧰 Technologies Used


- **Frontend:**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - ShadCN UI
  - React Hook Form
  - Zod

- **Backend:**
  - PostgreSQL (Neon)
  - Prisma ORM
  - NextAuth.js
  - Uploadthing
  - Jest

- **Payments & Emails:**
  - Stripe API
  - PayPal API
  - Resend (for transactional emails)

- **Others:**
  - Recharts (data visualization)
  - Vercel (continuous deployment)

## 🛠️ Features

- User authentication with NextAuth.js
- Product listing and detailed views
- Shopping cart with session persistence
- Checkout with multiple payment options: Stripe, PayPal, and Cash on Delivery
- Order history and user profile management
- Administrative dashboard for managing products, users, and orders
- Image uploading for products with Uploadthing
- Order confirmation emails sent via Resend
- Responsive and modern interface with Tailwind CSS and ShadCN UI
- Form validation with React Hook Form and Zod
- Automated testing with Jest

## 📦 Installation

To run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/wandskk/devwkstore.git
   cd devwkstore
   ````

2. **Install dependencies:**

   ```bash
   npm install
   ````

3. **Configure environment variables:**
Create a .env.local file at the root of the project with the following content:

   ```bash
   NEXT_PUBLIC_APP_NAME="DevwkStore"
   NEXT_PUBLIC_APP_DESCRIPTION="A modern ecommerce platform built with Next.js"
   NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
   DATABASE_URL="your_postgresql_connection_string"
   LATEST_PRODUCTS_LIMIT=4
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_URL_INTERNAL="http://localhost:3000"
   ENCRYPTION_KEY="your_encryption_key"
   ````

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ````

5. **Start the development server:**

   ```bash
   npm run dev
   ````

## ✅ Testing
To run tests:

   ```bash
   npm run test
   ````

## 📈 Roadmap

[x] User authentication

[x] Product listing and detailed views

[ ] Shopping cart and checkout

[ ] Integration with Stripe and PayPal

[ ] Administrative dashboard

[ ] Review and rating system

[ ] Advanced search filters

[ ] Performance and accessibility optimizations

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests with improvements, fixes, or new features.

## 📄 License
This project is licensed under the MIT License.

## 📬 Contact
Name: Wanderson
LinkedIn: [[https://devwkstoree.vercel.app/](https://www.linkedin.com/in/wanderson-kenedy-soares/)]
Email: [[devwk.c@gmail.com](mailto:devwk.c@gmail.com)]
