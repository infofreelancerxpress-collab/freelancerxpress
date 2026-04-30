<div align="center">
  <br />
  <h1>🚀 FreelancerXpress</h1>
  <p>
    <strong>A Premium Digital Marketing & Freelancer Services Platform</strong>
  </p>
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react" alt="React" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  </p>
  <br />
</div>

## 📖 About The Project

**FreelancerXpress** is a high-performance, modern web application designed to seamlessly connect clients with skilled professionals across various digital marketing services. Built with the latest web technologies, it features a complete digital ecosystem ranging from dynamic promotional offers to a fully integrated Influencer Marketplace.

The application leverages the power of Next.js App Router for optimal Server-Side Rendering (SSR) and SEO performance, accompanied by a beautifully crafted, highly interactive UI utilizing Tailwind CSS v4, Framer Motion, and Radix UI primitives.

---

## ✨ Key Features

- **🛍️ Influencer Marketplace**: A dedicated, searchable marketplace for clients to discover and inquire about top-tier digital influencers. Filter by engagement, platform, and niche.
- **📊 Admin Dashboard**: A comprehensive, secure admin panel to manage influencers, track platform analytics, view inquiries, and manage promotional offers in real-time.
- **🎁 Dynamic Promotional Offers**: Smart, scheduled UI popups utilizing glassmorphism and modern gradient animations to boost conversion rates.
- **🎨 Premium User Interface**: Tailored components using Radix UI and complex Framer Motion animations to ensure fluid transitions and an incredible UX.
- **🌗 Dark Mode Optimization**: Fully integrated, CSS-variable driven light and dark modes that maintain high contrast and aesthetic appeal.
- **🔒 Secure Architecture**: Robust authentication system built on Next-Auth (v5) with secure API routes and Server Actions.
- **📈 Built-in Analytics**: Custom analytics tracking for unique visitors and page views directly integrated into the admin dashboard.

---

## 🛠️ Technology Stack

This project is built on the shoulders of modern, bleeding-edge web technologies:

### Core Frameworks
- **[Next.js 16](https://nextjs.org/)** - React framework for production (App Router + Turbopack)
- **[React 19](https://react.dev/)** - Core frontend library
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing for scalable codebases

### Styling & UI
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### Backend & Database
- **[Prisma ORM](https://www.prisma.io/)** - Next-generation Node.js and TypeScript ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Powerful, open-source object-relational database system
- **[NextAuth.js (v5)](https://next-auth.js.org/)** - Complete open-source authentication

### Additional Tools
- **Zod & React Hook Form** - Type-safe schema validation and form state management
- **ImageKit** - Real-time image optimization and media management
- **Nodemailer** - Robust email delivery system for inquiries and notifications

---

## 📂 Project Architecture

```text
freelancerxpress/
├── app/                        # Next.js App Router files
│   ├── (main)/                 # Public-facing routes (Home, About, Services)
│   ├── api/                    # Secure RESTful API endpoints
│   ├── dashboard/              # Protected Admin Dashboard routes
│   └── influencer-marketing/   # Dedicated influencer marketplace
├── components/                 # Modular, reusable React components
│   ├── admin/                  # Dashboard-specific components
│   ├── influencer/             # Marketplace components
│   └── ui/                     # Base UI elements (Buttons, Inputs, Dialogs)
├── lib/                        # Utility functions, Prisma client, and configurations
├── prisma/                     # Database schema models and migrations
├── public/                     # Static assets and media
└── types/                      # Global TypeScript definitions
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed on your local environment:
- **[Node.js](https://nodejs.org/)** (v18 or higher)
- **[Bun](https://bun.sh/)** (Highly recommended for package management and script execution)
- **[Git](https://git-scm.com/)**
- A running instance of **PostgreSQL** (Local or Cloud, e.g., Neon, Supabase)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/freelancerxpress.git
   cd freelancerxpress
   ```

2. **Install dependencies:**
   Using Bun is highly recommended for faster module resolution:
   ```bash
   bun install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *Make sure to configure the required variables, including your Database URL, NextAuth secret, and API keys for ImageKit and email services.*

4. **Initialize Database:**
   Generate the Prisma Client and push the schema to your PostgreSQL database:
   ```bash
   bunx prisma generate
   bunx prisma db push
   ```
   *(Optional)* If you have seed data, you can run: `bun run prisma:seed`

5. **Start the Development Server:**
   Launch the app using Turbopack for lightning-fast HMR:
   ```bash
   bun run dev
   ```
   The platform should now be running locally at `http://localhost:3000`.

---

## 🎨 Design Philosophy

FreelancerXpress is built with intense attention to visual detail and user experience:
- **Glassmorphism:** Strategic use of blurred components and gradient overlays for a premium, modern feel.
- **Fluid Interactions:** Tailored micro-animations on hover states, page transitions, and data loading sequences.
- **Performance First:** Utilizing React Server Components (RSC) to minimize client-side JavaScript, ensuring lightning-fast load times and seamless hydration.

---

## 🛡️ License & Legal

This project is proprietary and confidential. Unauthorized copying, distribution, or modification of these files, via any medium, is strictly prohibited unless explicitly authorized by the repository owner.
