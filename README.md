<div align="center">
  
# 🚀 FreelancerXpress

**Modern Digital Marketing & Freelance Services Platform**

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind-CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript" alt="TypeScript" />
</p>

[FreelancerXpress](#) is a premium, high-performance web application designed to connect clients with skilled professionals for various digital services. It features a complete marketing ecosystem, dynamic user interfaces, and an optimized conversion funnel.

</div>

---

## ✨ Features

- **Dynamic Promotional Offers:** Smart, session-aware UI popups utilizing glassmorphism and modern gradient animations.
- **Premium User Interface:** Tailored utilizing Radix UI primitives and complex Framer Motion animations for fluid transitions.
- **Comprehensive Service Catalog:** Explore services ranging from SEO and Web Design to highly-targeted Influencer Marketing.
- **Dark Mode Optimization:** Fully integrated, CSS-variable driven light/dark modes that maintain high contrast and aesthetics.
- **Robust Database Architecture:** Leveraging PostgreSQL with Prisma ORM for type-safe database queries.
- **Fast & Scalable:** Built on Next.js App Router and Turbopack for near-instant rendering and hydration.

## 🛠️ Technology Stack

### Core
- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

### Dependencies & Integrations
- **Database:** PostgreSQL on Neon DB
- **ORM:** Prisma Studio
- **Authentication:** Next-Auth (v5 Beta)
- **UI Architecture:** Radix UI primitives, Lucide Icons, Shadcn-like components
- **Media Management:** ImageKit
- **Mailing Services:** Nodemailer

---

## 📂 Project Structure

```text
freelancerxpress/
├── app/                  # Next.js App Router structural files (pages, API routes, layout)
├── components/           # Modular React components
│   ├── home/             # Landing page components (Popups, Testimonials, etc.)
│   ├── layout/           # Global Headers, Footers, navigation
│   ├── contact/          # Forms, FAQ Accordions
│   └── ui/               # Reusable base logic (Radix UI implementations)
├── data/                 # Constant datasets (e.g. FAQ structures, placeholder strings)
├── prisma/               # Database schemas and seed files
└── public/               # Public assets and icons
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Bun** package manager
- **Git**

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/freelancerxpress.git
   cd freelancerxpress
   ```

2. **Install dependencies:**
   Using Bun is highly recommended for faster resolution:
   ```bash
   bun install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root configuration by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   **Required variables:**
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://[user]:[password]@[host]/[dbname]"

   # Next-Auth Secret
   AUTH_SECRET="your-secret-here"
   
   # Mailing System Credentials
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"

   # ImageKit Integration
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="public_..."
   IMAGEKIT_PRIVATE_KEY="private_..."
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/..."
   ```

4. **Initialize Database:**
   Push the Prisma schema to your remote/local PostgreSQL database:
   ```bash
   bunx prisma generate
   bunx prisma db push
   ```

5. **Start the Development Server:**
   ```bash
   bun run dev
   ```

   The platform should now be running at `http://localhost:3000`.

---

## 🎨 UI/UX Philosophy

FreelancerXpress is built with intense attention to visual details:
- **Glassmorphism:** Strategic use of blurred components and gradient overlays for a premium feel.
- **Accented Shimmering:** Use of HTML `<style>` tags to inject tailored CSS `@keyframes`, establishing organic fluid movement in promotional badges.
- **Hydration Safe:** Utilizing specific React `useEffect` and module-pattern mounting logic to provide exactly zero UI-flash during client-side hydration.

---

## 📝 License

This project is proprietary and confidential. Unauthorized copying of these files, via any medium, is strictly prohibited. 
